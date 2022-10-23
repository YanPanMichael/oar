/// <reference path="axios.d.ts" />
interface OarStatic extends OarInstance {
    (config: OarRequestConfig): OarPromise;
    (url: string, config?: OarRequestConfig): OarPromise;
    create(config?: OarRequestConfig): OarInstance;
}
export interface OarInstance extends AxiosStatic {
    (config: OarRequestConfig): OarPromise;
    defaults: OarRequestConfig;
    interceptors: {
        /**
         * 自定义请求拦截器会在默认请求拦截器 * 之前 * 执行
         */
        request: AxiosInterceptorManager<OarRequestConfig>;
        /**
         * 自定义响应拦截器会在默认响应拦截器 * 之后 * 执行
         */
        response: AxiosInterceptorManager<OarResponse>;
    };
    request<T = any>(config: OarRequestConfig): OarPromise<T>;
    get<T = any>(url: string, config?: OarRequestConfig): OarPromise<T>;
    delete<T = any>(url: string, config?: OarRequestConfig): OarPromise<T>;
    head<T = any>(url: string, config?: OarRequestConfig): OarPromise<T>;
    post<T = any>(url: string, data?: any, config?: OarRequestConfig): OarPromise<T>;
    put<T = any>(url: string, data?: any, config?: OarRequestConfig): OarPromise<T>;
    patch<T = any>(url: string, data?: any, config?: OarRequestConfig): OarPromise<T>;
    create(config?: OarRequestConfig): OarInstance;
}
export interface OarRequestConfig extends AxiosRequestConfig {
    /**
     * 设置 get 请求接口缓存时间。
     * 若 cacheTime 大于 0，表示允许使用接口本地缓存。
     * 并在本地缓存不存在时，将 status 为 200 的服务器响应数据缓存到本地。
     */
    cacheTime?: number;
    /**
     * 验证此响应是否可以缓存的回调函数。
     * 必须设置了 cacheTime > 0 时才生效。
     * 默认返回 false。
     */
    validateCache?: boolean;
    /**
     * 是否对 post 请求开启 csrf 参数校验
     */
    allowCsrf?: boolean;
    /**
     * 请求时带的用于进行 csrf 校验的字段名
     * 默认 csrf_token
     * @type {string | string[]}
     * @memberof OarRequestConfig
     */
    csrfKeyName?: string | string[];
}
export interface OarResponse<T = any> extends AxiosResponse<T> {
    config: OarRequestConfig;
    fromLocalCache?: boolean;
}
export declare type OarPromise<T = any> = Promise<OarResponse<T>>;
export interface Global extends Window {
    oar?: OarStatic;
    __custom_cookie?: any;
}
export {};
