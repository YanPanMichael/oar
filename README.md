# @ferry-core/oar

> By YanPan.

## 基于axios的RESTful网络请求库.

## Oar 配置

`Oar` 作为基于 Axios 的扩展，完全兼容 Axios 用法，并对部分 Axios 默认配置进行了修改及扩展：

| 参数 | 类型 | default | 说明 |
| --- | --- | --- | --- |
| withCredentials | boolean | true | 默认允许带 cookie |
| allowCsrf | boolean | true | 默认 post 请求带 csrf 参数 |
| csrfKeyName | string | Array<string> | `['csrf_token', 'csrf']` | post 请求的自定义 csrf 校验字段 |

## Oar 默认拦截器

`Oar` 设置了一组默认请求及响应拦截器，提供了以下功能：

request 拦截器

- CSRF防御
- POST请求参数序列化，以 `application/x-www-form-urlencoded` 格式发送
- http协议强制转动态协议

response 拦截器

- 错误打印
- 设置接口缓存
