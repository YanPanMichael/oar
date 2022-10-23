// import { cache, setAdapter } from '../utils'
// import { OarRequestConfig } from '../types';

// /**
//  * 若本地存在未过期的接口缓存，会直接返回本地缓存数据
//  * 否则将走正常网络请求
//  * @param request
//  */
// export default function getFromCache (request: OarRequestConfig) {
//   const curTime = new Date().getTime()
//   const cachedData = cache.get(request)
//   // 未过期的缓存接口响应
//   if (cachedData && cachedData.expireTime > curTime) {
//     const cachedResponse = cachedData.response

//     // 从缓存获取的数据，有 fromCache 字段且为 true
//     cachedResponse.fromLocalCache = true
//     request.adapter = setAdapter(cachedResponse)
//   }
// }
