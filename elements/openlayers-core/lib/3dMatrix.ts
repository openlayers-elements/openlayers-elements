/* See
https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web
https://evanw.github.io/lightgl.js/docs/matrix.html
https://github.com/jlmakes/rematrix
https://jsfiddle.net/2znLxda2/
*/
/** Matrix3D; a set of functions to handle matrix3D
 */

/** Get transform matrix3D of an element
 * @param {Element} ele
 * @return {Array<Array<number>>}
 */
function getTransform(ele: Element): number[][] {
  const style = window.getComputedStyle(ele, null)

  const tr = style.getPropertyValue('-webkit-transform') ||
    style.getPropertyValue('-moz-transform') ||
    style.getPropertyValue('-ms-transform') ||
    style.getPropertyValue('-o-transform') ||
    style.getPropertyValue('transform')

  if (tr === 'none' || !tr) {
    return [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
  }

  const values = tr.split('(')[1].split(')')[0].split(',')

  const mx: number[][] = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
  let i: number,
    j: number
  if (values.length === 16) {
    for (i = 0; i < 4; i += 1) {
      for (j = 0; j < 4; j += 1) {
        mx[j][i] = +values[i * 4 + j]
      }
    }
  } else {
    for (i = 0; i < 3; i += 1) {
      for (j = 0; j < 2; j += 1) {
        mx[j][i] = +values[i * 2 + j]
      }
    }
  }

  return mx
}

/** Get transform matrix3D of an element
 * @param {Element} ele
 * @return {Array<number>}
 */
function getTransformOrigin(ele: Element): number[] {
  const style = window.getComputedStyle(ele, null)

  const tr = style.getPropertyValue('-webkit-transform-origin') ||
    style.getPropertyValue('-moz-transform-origin') ||
    style.getPropertyValue('-ms-transform-origin') ||
    style.getPropertyValue('-o-transform-origin') ||
    style.getPropertyValue('transform-origin')

  const values = tr.split(' ')

  const mx: number[] = [0, 0, 0, 1]
  for (let i = 0; i < values.length; i += 1) {
    mx[i] = parseInt(values[i], 10)
  }
  return mx
}

/** Compute translate matrix
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {Array<Array<number>>}
 */
function translateMatrix(x: number, y: number, z: number): number[][] {
  return [
    [1, 0, 0, x],
    [0, 1, 0, y],
    [0, 0, 1, z],
    [0, 0, 0, 1],
  ]
}

/** Identity matrix
 * @return {Array<Array<number>>}
 */
function identity(): number[][] {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]
}

/** Round matrix
 * @param {Array<Array<number>>} mx
 * @param {number} round Rounding value, default 1E-10
 */
function roundTo(mx: number[][], round: number = 1E-10): number[][] {
  const m: number[][] = [[], [], [], []]
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      m[i][j] = Math.round(mx[i][j] / round) * round
    }
  }
  return m
}

/** Multiply matrix3D
 * @param {Array<Array<number>>} mx1
 * @param {Array<Array<number>>} mx2
 * @return {Array<Array<number>>}
 */
function multiply(mx1: number[][], mx2: number[][]): number[][] {
  const mx: number[][] = [[], [], [], []]

  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      let sum = 0
      for (let k = 0; k < 4; k += 1) {
        sum += (mx1[k][i] * mx2[j][k])
      }
      mx[j][i] = sum
    }
  }

  return mx
}

/** Compute the full transform that is applied to the transformed parent: -origin o tx o origin
 * @param {Array<Array<number>>} tx transform matrix
 * @param {Array<Array<number>>} origin transform origin
 * @return {Array<Array<number>>}
 */
function computeTransformMatrix(tx: number[][], origin: number[]): number[][] {
  const preTx = translateMatrix(-origin[0], -origin[1], -origin[2])
  const postTx = translateMatrix(origin[0], origin[1], origin[2])

  const temp1 = multiply(preTx, tx)

  return multiply(temp1, postTx)
}

/** Apply transform to a coordinate
 * @param {Array<Array<number>>} tx
 * @param {ol.pixel} px
 */
function transformVertex(tx: number[][], px: [number, number]): number[] {
  const vert: number[] = [px[0], px[1], 0, 1]
  const mx: number[] = []

  for (let i = 0; i < 4; i += 1) {
    mx[i] = 0
    for (let j = 0; j < 4; j += 1) {
      mx[i] += +tx[i][j] * vert[j]
    }
  }

  return mx
}

/** Perform the homogeneous divide to apply perspective to the points (divide x,y,z by the w component).
 * @param {Array<number>} vert
 * @return {Array<number>}
 */
function projectVertex(vert: number[]): number[] {
  const out: number[] = []

  for (let i = 0; i < 4; i += 1) {
    out[i] = vert[i] / vert[3]
  }

  return out
}

/** Inverse a matrix3D
 * @return {Array<Array<number>>} m matrix to transform
 * @return {Array<Array<number>>}
 */
function inverse(m: number[][]): number[][] {
  const s0 = m[0][0] * m[1][1] - m[1][0] * m[0][1]
  const s1 = m[0][0] * m[1][2] - m[1][0] * m[0][2]
  const s2 = m[0][0] * m[1][3] - m[1][0] * m[0][3]
  const s3 = m[0][1] * m[1][2] - m[1][1] * m[0][2]
  const s4 = m[0][1] * m[1][3] - m[1][1] * m[0][3]
  const s5 = m[0][2] * m[1][3] - m[1][2] * m[0][3]

  const c5 = m[2][2] * m[3][3] - m[3][2] * m[2][3]
  const c4 = m[2][1] * m[3][3] - m[3][1] * m[2][3]
  const c3 = m[2][1] * m[3][2] - m[3][1] * m[2][2]
  const c2 = m[2][0] * m[3][3] - m[3][0] * m[2][3]
  const c1 = m[2][0] * m[3][2] - m[3][0] * m[2][2]
  const c0 = m[2][0] * m[3][1] - m[3][0] * m[2][1]

  const determinant = 1 / (s0 * c5 - s1 * c4 + s2 * c3 + s3 * c2 - s4 * c1 + s5 * c0)

  if (Number.isNaN(determinant) || determinant === Infinity) {
    throw new Error('Inverse determinant attempted to divide by zero.')
  }

  return [
    [
      (m[1][1] * c5 - m[1][2] * c4 + m[1][3] * c3) * determinant,
      (-m[0][1] * c5 + m[0][2] * c4 - m[0][3] * c3) * determinant,
      (m[3][1] * s5 - m[3][2] * s4 + m[3][3] * s3) * determinant,
      (-m[2][1] * s5 + m[2][2] * s4 - m[2][3] * s3) * determinant,
    ], [
      (-m[1][0] * c5 + m[1][2] * c2 - m[1][3] * c1) * determinant,
      (m[0][0] * c5 - m[0][2] * c2 + m[0][3] * c1) * determinant,
      (-m[3][0] * s5 + m[3][2] * s2 - m[3][3] * s1) * determinant,
      (m[2][0] * s5 - m[2][2] * s2 + m[2][3] * s1) * determinant,
    ], [
      (m[1][0] * c4 - m[1][1] * c2 + m[1][3] * c0) * determinant,
      (-m[0][0] * c4 + m[0][1] * c2 - m[0][3] * c0) * determinant,
      (m[3][0] * s4 - m[3][1] * s2 + m[3][3] * s0) * determinant,
      (-m[2][0] * s4 + m[2][1] * s2 - m[2][3] * s0) * determinant,
    ], [
      (-m[1][0] * c3 + m[1][1] * c1 - m[1][2] * c0) * determinant,
      (m[0][0] * c3 - m[0][1] * c1 + m[0][2] * c0) * determinant,
      (-m[3][0] * s3 + m[3][1] * s1 - m[3][2] * s0) * determinant,
      (m[2][0] * s3 - m[2][1] * s1 + m[2][2] * s0) * determinant,
    ],
  ]
}

export {
  getTransform,
  getTransformOrigin,
  translateMatrix,
  identity,
  roundTo,
  multiply,
  computeTransformMatrix,
  transformVertex,
  projectVertex,
  inverse,
}
