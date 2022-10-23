/**
 * 是否是浏览器环境
 */
export function isClient () {
  return typeof window !== 'undefined'
}
