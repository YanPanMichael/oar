/**
 * 获取一个 Cookie.
 *
 * @param {any} sKey
 * @returns {string}
 *
 * @example
 *  cookie.getItem('session')
 */
export declare function getItem(sKey: any): string | null;
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
declare function setItem(sKey: any, sValue: any, vEnd?: any, sPath?: any, sDomain?: any, bSecure?: any): boolean;
/**
 * 删除一个 Cookie.
 * removeItem(name, path, domain)
 *
 * @param {any} sKey
 * @param {any} sPath
 * @param {any} sDomain
 * @returns {boolean}
 */
declare function removeItem(sKey: any, sPath: any, sDomain: any): boolean;
/**
 * 是否存在 Cookie.
 *
 * @param {any} sKey
 * @returns {boolean}
 */
declare function hasItem(sKey: any): boolean;
/**
 * 获取所有 Cookie 的 name, 返回为一个数组.
 *
 * @returns {[]}
 */
declare function keys(): string[];
export declare const cookie: {
    getItem: typeof getItem;
    setItem: typeof setItem;
    removeItem: typeof removeItem;
    hasItem: typeof hasItem;
    keys: typeof keys;
};
export {};
