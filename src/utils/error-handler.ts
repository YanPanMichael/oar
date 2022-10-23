/**
 * 输出错误请求信息
 * @param requestName {string} 错误请求的url
 * @param errorDetail {string} 错误请求信息
 */
export function xhrErrorHandler (requestName, errorDetail) {
  /* istanbul ignore next */
  const detailStr = errorDetail ? ': ' + errorDetail : '.'
  console.error(`[Request Error] "${requestName}" 请求失败${detailStr}`)
  return false
}

/**
 * 输出错误请求信息
 */
export default function (errorInfo) {
  /* istanbul ignore next */
  const url = errorInfo.config ? errorInfo.config.url : ''
  xhrErrorHandler(
    url,
    /* istanbul ignore next */
    typeof errorInfo === 'string' ? errorInfo : `status: ${errorInfo.status}, statusText: ${errorInfo.statusText}`
  )
}
