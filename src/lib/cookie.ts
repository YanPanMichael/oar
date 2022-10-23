/* eslint-disable */

 /*\
 |*|
 |*|  :: cookies.js ::
 |*|
 |*|  A complete cookies reader/writer framework with full unicode support.
 |*|
 |*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
 |*|
 |*|  This framework is released under the GNU Public License, version 3 or later.
 |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 |*|
 |*|  Syntaxes:
 |*|
 |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * docCookies.getItem(name)
 |*|  * docCookies.removeItem(name[, path], domain)
 |*|  * docCookies.hasItem(name)
 |*|  * docCookies.keys()
 |*|
 \*/

/**
 * 获取一个 Cookie.
 *
 * @param {any} sKey
 * @returns {string}
 *
 * @example
 *  cookie.getItem('session')
 */
export function getItem (sKey): string | null {
  return decodeURIComponent(
    document.cookie.replace(
      new RegExp('(?:(?:^|.*;)\\s*' +
      encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
      '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1'
    )
  ) || null
}

/**
 * 写入一个 Cookie.
 *
 * @param {any} sKey
 * @param {any} sValue
 * @param {any} vEnd
 * @param {any} sPath
 * @param {any} sDomain
 * @param {any} bSecure
 * @returns {boolean}
 */
function setItem (sKey, sValue, vEnd?, sPath?, sDomain?, bSecure?): boolean {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false }
  let sExpires = ''
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
        break
      case String:
        sExpires = '; expires=' + vEnd
        break
      case Date:
        sExpires = '; expires=' + vEnd.toUTCString()
        break
    }
  }
  // tslint:disable-next-line:max-line-length
  document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
  return true
}

/**
 * 删除一个 Cookie.
 * removeItem(name, path, domain)
 *
 * @param {any} sKey
 * @param {any} sPath
 * @param {any} sDomain
 * @returns {boolean}
 */
function removeItem (sKey, sPath, sDomain): boolean {
  if (!sKey || !hasItem(sKey)) { return false }
  // tslint:disable-next-line:max-line-length
  document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
  return true
}

/**
 * 是否存在 Cookie.
 *
 * @param {any} sKey
 * @returns {boolean}
 */
function hasItem (sKey): boolean {
  // tslint:disable-next-line:max-line-length
  return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
}

/**
 * 获取所有 Cookie 的 name, 返回为一个数组.
 *
 * @returns {[]}
 */
function keys (): string[] {
  // tslint:disable-next-line:max-line-length
  const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
  for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
  return aKeys
}

export const cookie = {
  getItem,
  setItem,
  removeItem,
  hasItem,
  keys
}
