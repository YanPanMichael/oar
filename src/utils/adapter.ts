// import { AxiosAdapter, AxiosPromise } from 'axios'
// import settle from 'axios/lib/core/settle'

// /**
//  * 此方法负责阻止请求，直接返回本地响应数据
//  */
// export default function setAdapter (localResponse: OarResponse): AxiosAdapter {
//   return function (request: OarRequestConfig): AxiosPromise {
//     return new Promise((resolve, reject) => {
//       settle(resolve, reject, localResponse)
//     })
//   }
// }
