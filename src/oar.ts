import Axios from 'axios';
import * as qs from 'qs';
import { errorHandler, xhrErrorHandler } from './utils';
import { setCsrfToken, setVisitId } from './core';
import { isClient } from './utils/base';
import { OarInstance, OarRequestConfig } from './types';

/**
 * 默认的 oar 配置
 */
const defaultRequestConfig: OarRequestConfig = {
  withCredentials: true,
  allowCsrf: true,
  csrfKeyName: ['csrf_token', 'csrf'],
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  defaultRequestConfig['baseURL'] = '';
}

// 合并默认配置
Object.assign(Axios.defaults, defaultRequestConfig);

/**
 * 对 Oar 注入拦截器
 */
function setInterceptors(oar: OarInstance): OarInstance {
  /**
   * 默认请求拦截器
   */
  oar?.interceptors?.request?.use((request) => {
    // 当 cacheTime > 0 时，允许开启本地接口缓存, 不开启
    if (
      request.method === 'get' &&
      (request.cacheTime as any) > 0 &&
      isClient()
    ) {
      // getFromCache(request)
    }

    // POST 请求统一设置 CSRF TOKEN & visit_id，强制开启
    if (request.method === 'post' && isClient()) {
      setCsrfToken(request);
      setVisitId(request);
    }

    // http协议强制转动态协议
    if (/^http:\/\//.test(request.url as any) && isClient()) {
      request.url = (request.url as any).replace(/^(http|https):/, '');
    }

    // 未设置 content-type 或 设置的 content-type 为 application/x-www-form-urlencoded
    const isUrlencodedContentType =
      !request.headers['content-type'] ||
      /application\/x-www-form-urlencoded/.test(
        request.headers['content-type'],
      );
    // application/x-www-form-urlencoded 的 POST 请求统一进行参数序列化操作
    if (
      request.method === 'post' &&
      typeof request.data === 'object' &&
      !(request.data instanceof FormData) && // formdata不进行序列化操作
      isUrlencodedContentType
    ) {
      request.data = qs.stringify(request.data);
    }

    return request;
  });

  /**
   * 默认响应拦截器
   */
  oar.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      /* istanbul ignore else */
      if (err.response) {
        errorHandler(err.response);
      } else if (err.message) {
        xhrErrorHandler('', err.message);
      }
      return Promise.reject(err);
    },
  );
  return oar;
}

// 先新建 Axios 实例
const Oar: any = Axios.create();

// 再在全局 Oar 设置拦截器
setInterceptors(Oar as OarInstance);

// 在调用 Oar.create() 创建实例后，也会对其注入默认拦截器
Oar.create = function (config = {}): OarInstance {
  const axiosInstance: any = Axios.create(config);
  // oar 实例设置拦截器
  return setInterceptors(axiosInstance as OarInstance);
};

export default Oar as OarInstance;
