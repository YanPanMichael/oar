interface AxiosTransformer {
    (data: any, headers?: any): any;
}
interface AxiosAdapter {
    (config: AxiosRequestConfig): AxiosPromise<any>;
}
interface AxiosBasicCredentials {
    username: string;
    password: string;
}
interface AxiosProxyConfig {
    host: string;
    port: number;
}
interface AxiosRequestConfig {
    url?: string;
    method?: string;
    baseURL?: string;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    headers?: any;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    auth?: AxiosBasicCredentials;
    responseType?: string;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: (status: number) => boolean;
    maxRedirects?: number;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig;
    cancelToken?: CancelToken;
}
interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
}
interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse;
}
declare type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;
interface CancelStatic {
    new (message?: string): Cancel;
}
interface Cancel {
    message: string;
}
interface Canceler {
    (message?: string): void;
}
interface CancelTokenStatic {
    new (executor: (cancel: Canceler) => void): CancelToken;
    source(): CancelTokenSource;
}
interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
}
interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
}
interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
}
interface AxiosInstance {
    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    head(url: string, config?: AxiosRequestConfig): AxiosPromise;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}
interface AxiosStatic extends AxiosInstance {
    (config: AxiosRequestConfig): AxiosPromise;
    (url: string, config?: AxiosRequestConfig): AxiosPromise;
    create(config?: AxiosRequestConfig): AxiosInstance;
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    isCancel(value: any): boolean;
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}
