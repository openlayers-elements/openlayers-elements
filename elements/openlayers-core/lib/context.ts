import { createContext } from '@lit/context'
import type OlMap from 'ol/Map.js'
import type VectorSource from 'ol/source/Vector.js'

export const map = createContext<OlMap | undefined>(Symbol('map'))
export const vectorSource = createContext<VectorSource | undefined>(Symbol('vector source'))
