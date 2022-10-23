// import qs from 'qs'

// /**
//  * 根据请求元数据，获取完整的请求 url
//  */
// function getFullRequestURL (request: OarRequestConfig): string {
//   return request.baseURL + request.url + qs.stringify(request.params)
// }

// /**
//  * 新增或更新一个接口缓存
//  */
// function setCache (response: OarResponse): void {
//   const request: OarRequestConfig = response.config

//   /**
//    * 过期时间
//    */
//   const expireTime: number = new Date().getTime() + (request.cacheTime * 1000)

//   /**
//    * 完整的请求 url 作为缓存的 key
//    */
//   const fullRequestURL: string = getFullRequestURL(request)

//   /**
//    * 所有缓存的api列表
//    */
//   const cachedApisDict: CachedApisDictionary = getCachedDict()

//   /**
//    * 缓存的完整内容，包括接口数据及其元数据
//    */
//   const cachedContent: CachedApiBody = {
//     expireTime,
//     response
//   }

//   cachedApisDict[fullRequestURL] = cachedContent

//   setCachedDict(cachedApisDict)
// }

// /**
//  * 获取一个接口缓存
//  * @param request {OarRequestConfig}
//  * @return 存在则返回接口信息，不存在返回undefined
//  */
// function getCache (request: OarRequestConfig): CachedApiBody | undefined {
//   const cachedApisDict = getCachedDict()
//   const fullRequestURL = getFullRequestURL(request)
//   return cachedApisDict[fullRequestURL]
// }

// /**
//  * 更新 api 缓存对象
//  * @param cachedApisDict 要缓存的对象
//  */
// function setCachedDict (cachedApisDict: CachedApisDictionary): void {
//   try {
//     localStorage.setItem('cachedApis', qs.stringify(cachedApisDict))
//   } catch (e) {
//     /* istanbul ignore next */
//     if (process.env.NODE_ENV === 'development') {
//       console.warn('[Oar Warning]', '接口缓存失败', e.message)
//     }
//   }
// }

// /**
//  * 获取 api 缓存对象
//  */
// function getCachedDict (): CachedApisDictionary {
//   const cachedApisStr: string = localStorage.getItem('cachedApis')
//   return qs.parse(cachedApisStr)
// }

// /**
//  * 清除所有过期缓存
//  */
// function clearExpiredCache (): void {
//   const curTime: number = new Date().getTime()
//   const cachedApisDict: CachedApisDictionary = getCachedDict()
//   const newCachedApisDict: CachedApisDictionary = {}

//   Object.keys(cachedApisDict).forEach(cachedApi => {
//     const cachedBody: CachedApiBody = cachedApisDict[cachedApi]
//     const expireTime: number = cachedBody.expireTime
//     if (expireTime > curTime) {
//       // 将未过期缓存放入新的对象中
//       newCachedApisDict[cachedApi] = cachedBody
//     }
//   })

//   setCachedDict(newCachedApisDict)
// }

// /**
//  * 清除所有缓存
//  */
// function clearAllCache (): void {
//   setCachedDict({})
// }

// export {
//   getCache,
//   setCache,
//   clearExpiredCache,
//   clearAllCache
// }
