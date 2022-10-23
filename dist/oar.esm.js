/*!
* @ferry-core/oar with v0.0.1
* Author: yanpan
* Built on 2022-05-01, 18:33:42
* Released under the MIT License Copyright (c) 2022
*/
import Axios from 'axios';
import * as qs from 'qs';

/**
 * 输出错误请求信息
 * @param requestName {string} 错误请求的url
 * @param errorDetail {string} 错误请求信息
 */
function xhrErrorHandler(requestName, errorDetail) {
    /* istanbul ignore next */
    var detailStr = errorDetail ? ': ' + errorDetail : '.';
    console.error("[Request Error] \"".concat(requestName, "\" \u8BF7\u6C42\u5931\u8D25").concat(detailStr));
    return false;
}
/**
 * 输出错误请求信息
 */
function errorHandler (errorInfo) {
    /* istanbul ignore next */
    var url = errorInfo.config ? errorInfo.config.url : '';
    xhrErrorHandler(url, 
    /* istanbul ignore next */
    typeof errorInfo === 'string' ? errorInfo : "status: ".concat(errorInfo.status, ", statusText: ").concat(errorInfo.statusText));
}

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
function getItem(sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' +
        encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
        '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
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
function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
    }
    var sExpires = '';
    if (vEnd) {
        switch (vEnd.constructor) {
            case Number:
                sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
                break;
            case String:
                sExpires = '; expires=' + vEnd;
                break;
            case Date:
                sExpires = '; expires=' + vEnd.toUTCString();
                break;
        }
    }
    // tslint:disable-next-line:max-line-length
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
    return true;
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
function removeItem(sKey, sPath, sDomain) {
    if (!sKey || !hasItem(sKey)) {
        return false;
    }
    // tslint:disable-next-line:max-line-length
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
    return true;
}
/**
 * 是否存在 Cookie.
 *
 * @param {any} sKey
 * @returns {boolean}
 */
function hasItem(sKey) {
    // tslint:disable-next-line:max-line-length
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
}
/**
 * 获取所有 Cookie 的 name, 返回为一个数组.
 *
 * @returns {[]}
 */
function keys() {
    // tslint:disable-next-line:max-line-length
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
}
var cookie = {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    hasItem: hasItem,
    keys: keys
};

/**
 * 是否为字符串
 */
function isString(v) {
    return typeof v === 'string' || v instanceof String;
}
/**
 * 是否为数组
 */
function isArray(v) {
    return Array.isArray(v);
}
/**
 * 是否为对象
 */
function isObject(v) {
    return typeof v === 'object';
}

var csrfCookieName = 'csrf_cookie';
/**
 * 检查是否已经有 csrf 相关 cookie
 */
function checkCsrfCookie() {
    var csrfToken = cookie.getItem(csrfCookieName);
    return !!csrfToken && csrfToken !== '';
}
/**
 * 获得对象的 value 数组
 */
function objectValues(obj) {
    if (isObject(obj)) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    }
    return [];
}
/**
 * 设置 csrf cookie
 * 会同时在 headers 和 data 中设置
 * 将来会从 data 中移除
 */
function setCsrfToken(request) {
    var _a;
    if (!request.allowCsrf) {
        return;
    }
    if (!checkCsrfCookie()) {
        // csrf cookie不存在时给警告
        console.error('[oar error]:', 'CSRF TOKEN 获取失败，请重新登录后再试');
    }
    var csrfKeyName = request.csrfKeyName;
    // 在参数中添加csrf token，将来会移除
    var csrfCookie = (_a = window === null || window === void 0 ? void 0 : window.__custom_cookie) === null || _a === void 0 ? void 0 : _a.csrf_cookie;
    var csrfToken = cookie.getItem(csrfCookieName) || csrfCookie || '';
    if (!request.data) {
        request.data = {};
    }
    if (isString(csrfKeyName)) {
        csrfKeyName = [csrfKeyName];
    }
    // axios 在实例化时会把数组( ['a', 'b'] ) 转为键值对 ( {0: 'a', 1: 'b'} )
    // 因此需要对传入的对象参数重新数组化
    if (isObject(csrfKeyName) && !isArray(csrfKeyName)) {
        csrfKeyName = objectValues(csrfKeyName);
    }
    if (isArray(csrfKeyName)) {
        csrfKeyName.forEach(function (key) {
            if (typeof request.data === 'object' && !request.data[key] && isString(key)) {
                request.data[key] = csrfToken;
            }
        });
    }
}

var visitIdName = 'visit_id';
/**
 * 设置 visit_id
 */
function setVisitId(request) {
    var VISIT_ID = window['__statisObserver'] && window['__statisObserver']['__visitId'];
    if (!request.data) {
        request.data = {};
    }
    if (typeof request.data === 'object' && (!request.data[visitIdName] || request.data[visitIdName] === '')) {
        request.data[visitIdName] = VISIT_ID ? VISIT_ID : '';
    }
}

/**
 * 是否是浏览器环境
 */
function isClient() {
    return typeof window !== 'undefined';
}

/**
 * 默认的 oar 配置
 */
var defaultRequestConfig = {
    withCredentials: true,
    allowCsrf: true,
    csrfKeyName: ['csrf_token', 'csrf']
};
/* istanbul ignore next */
{
    defaultRequestConfig['baseURL'] = '';
}
// 合并默认配置
Object.assign(Axios.defaults, defaultRequestConfig);
/**
 * 对 Oar 注入拦截器
 */
function setInterceptors(oar) {
    /**
     * 默认请求拦截器
     */
    oar.interceptors.request.use(function (request) {
        // 当 cacheTime > 0 时，允许开启本地接口缓存
        if (request.method === 'get' && request.cacheTime > 0 && isClient()) ;
        // POST 请求统一设置 CSRF TOKEN & visit_id，强制开启
        if (request.method === 'post' && isClient()) {
            setCsrfToken(request);
            setVisitId(request);
        }
        // http协议强制转动态协议
        if (/^http:\/\//.test(request.url) && isClient()) {
            request.url = request.url.replace(/^(http|https):/, '');
        }
        // 未设置 content-type 或 设置的 content-type 为 application/x-www-form-urlencoded
        var isUrlencodedContentType = !request.headers['content-type'] ||
            /application\/x-www-form-urlencoded/.test(request.headers['content-type']);
        // application/x-www-form-urlencoded 的 POST 请求统一进行参数序列化操作
        if (request.method === 'post' &&
            typeof request.data === 'object' &&
            !(request.data instanceof FormData) && // formdata不进行序列化操作
            isUrlencodedContentType) {
            request.data = qs.stringify(request.data);
        }
        return request;
    });
    /**
     * 默认响应拦截器
     */
    oar.interceptors.response.use(function (response) {
        return response;
    }, function (err) {
        /* istanbul ignore else */
        if (err.response) {
            errorHandler(err.response);
        }
        else if (err.message) {
            xhrErrorHandler('', err.message);
        }
        return Promise.reject(err);
    });
    return oar;
}
// 新建 Axios 实例
var Oar = Axios.create();
// 全局 Oar 设置拦截器
setInterceptors(Oar);
// 在调用 Oar.create() 创建实例后，也会对其注入默认拦截器
Oar.create = function (config) {
    if (config === void 0) { config = {}; }
    var axiosInstance = Axios.create(config);
    // oar 实例设置拦截器
    return setInterceptors(axiosInstance);
};

var win = isClient() ? window : undefined;
var oar = win && win.oar ? win.oar : Oar;

export { oar as default };
