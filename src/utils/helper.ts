/**
 * 是否为字符串
 */
export function isString (v: any): boolean {
  return typeof v === 'string' || v instanceof String
}

/**
 * 是否为数组
 */
export function isArray(v: any): boolean {
  return Array.isArray(v)
}

/**
 * 是否为对象
 */
export function isObject (v: any): boolean {
  return typeof v === 'object'
}
