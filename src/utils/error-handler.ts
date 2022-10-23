/**
 * 输出错误请求信息
 * @param requestUrl {string} 错误请求的url
 * @param errorDetail {string} 错误请求信息
 */
export function xhrErrorHandler(requestUrl: string, errorDetail: string) {
  /* istanbul ignore next */
  const detailStr = errorDetail ? ': ' + errorDetail : '.';
  console.error(
    `[Request Error] "URL: ${requestUrl}" Request Fail: ${detailStr}`,
  );
  return false;
}

/**
 * 输出错误请求信息
 */
export default function (errorInfo) {
  /* istanbul ignore next */
  const url = errorInfo.config ? errorInfo.config.url : '';
  xhrErrorHandler(
    url,
    /* istanbul ignore next */
    typeof errorInfo === 'string'
      ? errorInfo
      : `status: ${errorInfo.status}, statusText: ${errorInfo.statusText}`,
  );
}
