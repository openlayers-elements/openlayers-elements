import { loadStyle } from 'ol-json-style' // eslint-disable-line import/no-extraneous-dependencies

export function fromJson(json: string | null) {
  return json ? loadStyle(JSON.parse(json)) : null
}
