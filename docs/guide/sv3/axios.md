# Axios
使用 axios 进行 Http 请求，为便于使用进行了一些基础的封装，定义基本后端响应类型。

## 基本使用

推荐按照下面的使用示例进行API的封装与使用

- api被放置在 /src/api 中
- index.ts 进行api请求的基本配置
- types.ts 定义api的请求类型与返回类型

### 新建 API

- 引入我们在`/src/utils/http`下封装好的`axios`进行URL的传入并根据接口功能分类导出

```ts
// index.ts
import { msgPost } from '@/utils/http';
import { LoginRequest, LoginResponse, reLoginRequest } from '@/api/user/types';

export const userLogin = async (data?: LoginRequest) => {
    return msgPost<LoginResponse>({}, '/login', data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
    return msgPost<LoginResponse>({}, '/getUserInfo', data);
};
```

```ts
// types.ts
export type LoginRequest = {
   username: string;
   password: string;
};

export type reLoginRequest = {
   accessToken: string;
};

export type LoginResponse = {
   username: string;
   roles: Array<string>;
   accessToken: string;
};
```

### 使用API

- 直接引入我们封装好的API调用即可

```ts
import { refreshUserInfo, userLogin } from '@/api/user';
userLogin(data).then((res) => {
    // 接口逻辑处理
});
```



## Axios根目录

- axios被放置在 /src/utils/http 中
- index.ts 进行axios的基本配置
- status.ts 对状态码对于的消息进行设置
- types.ts 定义后端基础返回的 data 类型

### Axios拦截器

- `/src/utils/http/index.ts`可以进行axios拦截器的封装

```ts
// index.ts
// 创建axios实例并设置axios拦截器
import axios from 'axios';
import type {
   AxiosInstance,
   AxiosRequestConfig,
   AxiosResponse,
   AxiosError,
   InternalAxiosRequestConfig,
} from 'axios';
const service: AxiosInstance = axios.create({
   // 此处使用环境变量配置 axios 请求BaseURL
   baseURL: Boolean(import.meta.env.VITE_APP_USE_MOCK)
    ? import.meta.env.VITE_APP_MOCK_BASEURL
    : import.meta.env.VITE_APP_API_BASEURL,
   timeout: 15000,
});
// axios实例拦截请求
service.interceptors.request.use(
   (config: InternalAxiosRequestConfig) => {
      return config;
   },
   (error: AxiosError) => {
      return Promise.reject(error);
   }
);
// axios实例拦截响应
service.interceptors.response.use(
   (response: AxiosResponse) => {},
   (error: any) => {
       // 请求失败利用 ElementPluse 消息组件进行提示
       const { response } = error;
       if (response) {
           // 请求已发出，但是不在2xx的范围
           ElMessage({
               message: getMessage(response.status),
               type: 'error',
           });
           return Promise.reject(response.data);
       }
       ElMessage({
           message: '网络连接异常,请稍后再试!',
           type: 'error',
       });
   }
);
```

### 统一接口规范

- `/src/utils/http/types.ts`封装了后端返回的基础响应类型
- 此处与后端人员配合进行接口的规范

```ts
// types.ts
// 暴露 res.data 的类型
export interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
}
```

### 请求方法封装

- 这里封装的请求方法让我们的响应根据状态码做出相应提示

```ts
// 此处相当于响应拦截
// 为响应数据进行定制化处理
const msgRequest = <T = any>(config: AxiosRequestConfig): Promise<T> => {
   const conf = config;
   return new Promise((resolve, reject) => {
      service
         .request<any, AxiosResponse<BaseResponse>>(conf)
         .then((res: AxiosResponse<BaseResponse>) => {
            const data = res.data;
            // 如果data.code为错误代码返回message信息
            if (data.code != 0) {
               ElMessage({
                  message: data.message,
                  type: 'error',
               });
               reject(data.message);
            } else {
               ElMessage({
                  message: data.message,
                  type: 'success',
               });
               // 此处返回data信息 也就是 api 中配置好的 Response类型
               resolve(data.data as T);
            }
         });
   });
};
```

### 封装 post/get 请求

- 此处将我们配置好拦截器的`axios`根据请求方式不同进行封装

```ts
// 封装我们刚刚封装好的带 msg 提示的请求
export function msgPost<T = any, U = any>(
   config: AxiosRequestConfig,
   url: string,
   data: U
): Promise<T> {
   return msgRequest({ ...config, url, method: 'POST', data: data });
}

// 封装配置拦截器的请求
export function post<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<T> {
    return service.request({ ...config, url, method: 'POST', data: data });
}

export function get<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<T> {
    return service.request({ ...config, url, method: 'GET', data: data });
}
```
