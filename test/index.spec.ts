import axios from 'axios'
import * as qs from 'qs'
import oar from '../dist/oar.cjs.min.js'
import {cookie} from '../src/lib/cookie'
import { registerMockAdapter } from '../__mock__'

// 单元测试时使用mock数据
registerMockAdapter(oar)

describe('@ferry-core/oar 基础功能测试.', () => {
  it('应该可以创建一个 oar 实例.', () => {
    const $axiosInstance = axios.create()
    const $oarInstance = oar.create()
    expect(Object.getPrototypeOf($oarInstance).constuctor).toEqual(Object.getPrototypeOf($axiosInstance).constuctor)
  })

  it('应该可以直接调用函数发起请求', async () => {
    const res = await oar({
      method: 'get',
      url: '/getData'
    })
    expect(res.data.data).toBe(1)
  })

  it('应该有一个 get 方法, 并可以成功发起 get 请求.', async () => {
    const res = await oar.get('/getData')
    expect(res.data.data).toBe(1)
  })

  it('应该有一个 post 方法, 并可以成功发起 post 请求.', async () => {
    const res = await oar.post('/postData')
    expect(res.data.data).toBe(2)
  })

  it('应该含有默认拦截器, 并对匹配地址做相应重写.', async () => {
    // http重写成动态协议
    await oar.get('http://api.test.com/getData').catch(err => {
      // eslint-disable-next-line
      expect(err.config.url).toBe('//api.test.com/getData')
    })
    // https不重写
    await oar.get('https://api.test.com/getData').catch(err => {
      // eslint-disable-next-line
      expect(err.config.url).toBe('https://api.test.com/getData')
    })
  })

  it('应该含有默认拦截器，并对 post 请求的对象数据进行序列化', async () => {
    // data 为对象，则进行序列化
    await oar.post('postData', { id: '1' }).then(res => {
      expect(typeof res.config.data).toBe('string')
      expect(qs.parse(res.config.data).id).toEqual('1')
    })
    // data 为非对象，不进行序列化
    await oar.post('postData', 'data').then(res => {
      expect(res.config.data).toBe('data')
    })
    // data 为 FormData, 不进行序列化
    const formData = new FormData()
    formData.append('file', new Blob())
    formData.append('category', 'biz')
    await oar.post('postData', formData).then(res => {
      expect(res.config.data instanceof FormData).toBe(true)
    })
    // get 请求，不进行序列化
    await oar.get('getData', { params: { id: 1 } }).then(res => {
      expect(typeof res.config.params).toBe('object')
    })
  })

  it('当 content-type 不是 application/x-www-form-urlencoded 时，不进行序列化', async () => {
    await oar.post('postData', { id: 1 }, { headers: { 'content-type': 'application/json' } })
      .then(res => {
        expect(typeof JSON.parse(res.config.data)).toBe('object')
      })
  })
  it('应当可以自己添加自定义拦截器, 并正确请求.', async () => {
    // 自定义请求拦截器
    oar.interceptors.request.use(req => {
      req.headers.passCustomRequestInterceptor = true
      return req
    })
    // 自定义响应拦截器
    oar.interceptors.response.use(res => res, err => {
      err.passCustomResponseInterceptor = true
      return Promise.reject(err)
    })
    await oar.get('/get304').catch(err => {
      // eslint-disable-next-line
      expect(err.config.headers.passCustomRequestInterceptor).toBe(true)
      // eslint-disable-next-line
      expect(err.passCustomResponseInterceptor).toBe(true)
    })
  })
})

describe('@ferry-core/oar CSRF防御功能测试', () => {
  beforeEach(() => {
    // 在登录时注入 csrf_cookie cookie 应由服务端保证，bxios 认为有相关 cookie
    cookie.setItem('csrf_cookie', 'djaklsdjalj')
  })

  it('xsrfCookieName 默认应该为csrf_cookie', async () => {
    const res = await oar.post('postData')
    expect(cookie.getItem('csrf_cookie')).toBe(qs.parse(res.config.data).csrf_token)
  })

  it('post 方法在 cookie 中有 csrf token 时，应该复用已有的 csrf token', async () => {
    const firstRes = await oar.post('/postData') // 先请求一次，以确保已注入csrf token
    const firstToken = cookie.getItem(firstRes.config.xsrfCookieName) // 获取第一次请求的 csrf token
    const secondRes = await oar.post('/postData') // 再请求一次
    const secondToken = cookie.getItem(secondRes.config.xsrfCookieName) // 获取第二次请求的 csrf token
    expect(firstToken).toBe(secondToken)
  })

  it('post 方法在 data 中没有 csrf_token 时，应该给 data 添加 csrf_token', async () => {
    await oar.post('/postData').then(res => {
      expect(qs.parse(res.config.data).csrf_token).not.toBe(undefined)
    })
  })

  it('post 方法在 data 中已经设置了不为空的 csrf_token 时，不再对 data 中重新注入 csrf_token', async () => {
    await oar.post('/postData', { csrf_token: '' }).then(res => {
      expect(qs.parse(res.config.data).csrf_token).not.toBe(undefined)
      expect(qs.parse(res.config.data).csrf_token).not.toBe('')
    })
    await oar.post('/postData', { csrf_token: 'validcsrftoken' }).then(res => {
      expect(qs.parse(res.config.data).csrf_token).toBe('validcsrftoken')
    })
  })

  it('post 方法在 data 中没有 csrf 时，应该给 data 添加 csrf', async () => {
    await oar.post('/postData').then(res => {
      expect(qs.parse(res.config.data).csrf).not.toBe(undefined)
    })
  })

  it('post 方法在 data 中已经设置了不为空的 csrf 时，不再对 data 中重新注入 csrf', async () => {
    await oar.post('/postData', { csrf: '' }).then(res => {
      expect(qs.parse(res.config.data).csrf).not.toBe(undefined)
      expect(qs.parse(res.config.data).csrf).not.toBe('')
    })
    await oar.post('/postData', { csrf: 'validcsrftoken' }).then(res => {
      expect(qs.parse(res.config.data).csrf).toBe('validcsrftoken')
    })
  })

  it('post 请求允许修改 csrf 字段名', async () => {
    await oar.post('/postData', {}, { csrfKeyName: 'csrf_token_custom' }).then(res => {
      expect(qs.parse(res.config.data).csrf_token_custom).not.toBe(undefined)
    })

    await oar.post('/postData', {}, { csrfKeyName: ['csrf_token1', 'csrf_token2'] }).then(res => {
      expect(qs.parse(res.config.data).csrf_token1).not.toBe(undefined)
      expect(qs.parse(res.config.data).csrf_token2).not.toBe(undefined)
    })
  })

  it('允许关闭 post 请求的 csrf 校验', async () => {
    await oar.post('/postData', {}, { allowCsrf: false }).then(res => {
      expect(qs.parse(res.config.data).csrf_token).toBe(undefined)
    })
  })
})

// describe('@ferry-core/oar visit_id 添加', () => {
//   beforeEach(() => {
//     window.__statisObserver = {
//       addClickTracker: noop,
//       forceCommit: noop,
//       sendPV: noop,
//       startSpecialLoop: noop,
//       stopSpecialLoop: noop,
//       setSpecialInterval: noop,
//       __visitId: 'abc'
//     }
//   })

//   it('visit_id 应该注入成功', async () => {
//     const res = await oar.post('postData')
//     expect(window.__statisObserver.__visitId).toBe(qs.parse(res.config.data).visit_id)
//   })
// })

// function noop() {
//   return null
// }

// import { expect } from 'chai';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import UserService from '@/services/UserService';
// import { User } from '@/services/types';

// describe('UserService', () => {
//   let userService: UserService;
//   let mockAxios: MockAdapter;

//   beforeEach(() => {
//     userService = new UserService();
//     mockAxios = new MockAdapter(axios);
//   });

//   it('findById with 1', async () => {
//     mockAxios.onGet('/users/1').reply(200, {
//       id: 1,
//       name: 'QB',
//       age: 18,
//     });

//     const user = await userService.findById(1);
//     expect(user.id).to.equal(1);
//   });

//   it('register user data', async () => {
//     const data = {
//       name: 'kaname madoka',
//       age: 14,
//     } as User;

//     mockAxios.onPost('/users').reply(201, {
//       id: 10,
//       ...data,
//     });

//     const user = await userService.register(data);
//     expect(user.id).to.not.be.undefined;
//     expect(user.name).to.equal(data.name);
//     expect(user.age).to.equal(data.age);
//   });
// });