# @ferry-core/oar [![Oar](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/yanppanmichael/oar#readme)

[![Sponsor][sponsor-badge]][sponsor]
[![TypeScript version][ts-badge]][typescript-4-0]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]

> By YanPan

## 基于 axios 的 RESTful 网络请求库.

## ✨ Oar 配置

`Oar` 是基于 Axios 的扩展网络请求库，兼容 Axios 基本用法，并对部分 Axios 的默认配置进行了封装和扩展：

| 参数            | 类型    | default       | 说明                       |
| --------------- | ------- | ------------- | -------------------------- | ------------------------------- |
| allowCsrf       | boolean | true          | 默认 post 请求带 csrf 参数 |
| csrfKeyName     | string  | Array<string> | `['csrf_token', 'csrf']`   | post 请求的自定义 csrf 校验字段 |
| withCredentials | boolean | true          | 默认允许带 cookie          |

## ✨ Oar 默认拦截器

`Oar` 默认设置了请求及响应拦截器，提供了以下功能：

request 拦截器

- http 协议强制转动态协议
- POST 请求参数序列化，以 `application/x-www-form-urlencoded` 格式发送
- CSRF 防御

response 拦截器

- 默认errorHandler错误打印
- 设置接口缓存(已舍弃)

## 🚀 快速开始

### 安装

```bash
npm i -D @ferry-core/oar # 或 yarn add -D @ferry-core/oar
```

## License

[MIT](http://opensource.org/licenses/MIT)

[ts-badge]: https://img.shields.io/badge/TypeScript-4.0-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=12.0-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v8.x/docs/api/
[gha-badge]: https://github.com/jsynowiec/node-typescript-boilerplate/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/jsynowiec/node-typescript-boilerplate/actions/workflows/nodejs.yml
[typescript]: https://www.typescriptlang.org/
[typescript-4-0]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/YanPanMichael/oar
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[wiki-js-tests]: https://github.com/jsynowiec/node-typescript-boilerplate/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io
[volta]: https://volta.sh
[volta-getting-started]: https://docs.volta.sh/guide/getting-started
[volta-tomdale]: https://twitter.com/tomdale/status/1162017336699838467?s=20
[gh-actions]: https://github.com/features/actions
[repo-template-action]: https://github.com/jsynowiec/node-typescript-boilerplate/generate
[esm]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[sindresorhus-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[dynamic-import]: https://v8.dev/features/dynamic-import