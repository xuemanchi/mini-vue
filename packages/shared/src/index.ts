export const isArray = Array.isArray
export const assign = Object.assign
export function isObject(v: any) { return typeof v === 'object' && v !== null }
export function isString(v: any) { return typeof v === 'string' }
export function isNumber(v: any) { return typeof v === 'number' }
export function isFunction(v: any) { return typeof v === 'function' }
