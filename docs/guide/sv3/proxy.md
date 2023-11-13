# 跨域

推荐使用 Vite Proxy 进行本地代理解决开发跨域问题

## Vite Proxy

- 开启 Vite Proxy
- 原理就是本地开启node服务进行代理

```js
      server: {
         https: false,
         host: true,
         port: 3000,
         open: false,
         cors: true,
         proxy: {
            // BASEURL在环境变量中配置
            // target 为后端地址
            [env.VITE_APP_API_BASEURL]: {
               target: 'http://localhost:3000',
               changeOrigin: true,
            },
            [env.VITE_APP_MOCK_BASEURL]: {
               target: 'http://localhost:3000',
               changeOrigin: true,
            },
         },
      },
```