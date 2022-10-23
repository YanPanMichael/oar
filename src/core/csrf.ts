import { cookie } from '../lib/cookie'
import { isArray, isString, isObject } from '../utils/helper'
import { Global, OarRequestConfig } from '../types';

const csrfCookieName = 'csrf_cookie'

/**
 * 检查是否已经有 csrf 相关 cookie
 */
function checkCsrfCookie(): boolean {
  const csrfToken = cookie.getItem(csrfCookieName)
  return !!csrfToken && csrfToken !== ''
}

/**
 * 获得对象的 value 数组
 */
function objectValues(obj): Array<any> {
  if (isObject(obj)) {
    return Object.keys(obj).map(key => obj[key])
  }
  return []
}
/**
 * 设置 csrf cookie
 * 会同时在 headers 和 data 中设置
 * 将来会从 data 中移除
 */
export default function setCsrfToken(request: OarRequestConfig) {
  if (!request.allowCsrf) {
    return
  }

  if (!checkCsrfCookie()) {
    // csrf cookie不存在时给警告
    console.error('[oar error]:', 'CSRF TOKEN 获取失败，请重新登录后再试')
  }

  let csrfKeyName = request.csrfKeyName
  // 在参数中添加csrf token，将来会移除
  const csrfCookie = (window as Global)?.__custom_cookie?.csrf_cookie;
  const csrfToken = cookie.getItem(csrfCookieName) || csrfCookie || ''
  if (!request.data) {
    request.data = {}
  }

  if (isString(csrfKeyName)) {
    csrfKeyName = [csrfKeyName as string]
  }

  // axios 在实例化时会把数组( ['a', 'b'] ) 转为键值对 ( {0: 'a', 1: 'b'} )
  // 因此需要对传入的对象参数重新数组化
  if (isObject(csrfKeyName) && !isArray(csrfKeyName)) {
    csrfKeyName = objectValues(csrfKeyName)
  }

  if (isArray(csrfKeyName)) {
    (csrfKeyName as any[]).forEach((key) => {
      if (typeof request.data === 'object' && !request.data[key] && isString(key)) {
        request.data[key] = csrfToken
      }
    })
  }
}
