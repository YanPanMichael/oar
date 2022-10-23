import MockAdapter from 'axios-mock-adapter';

/**
 * 开发环境下模拟接口请求
 */
export function registerMockAdapter(instance) {
  const mock = new MockAdapter(instance, { delayResponse: 20 });

  // 成功的 get 请求
  mock.onGet('/getData').reply(200, {
    code: 0,
    data: 1,
    msg: 'ok',
  });
  // 失败的 get 请求
  mock.onGet('/get304').reply(304, {
    data: '304',
  });
  // 成功的 post 请求
  mock.onPost('/postData').reply(200, {
    code: 0,
    data: 2,
    msg: 'ok',
  });
}
