# Axios
使用 axios 进行Http请求

## axios管理
- axios被放置在 /src/utils/http 中
- index.ts 进行axios的基本配置
- status.ts 对状态码对于的消息进行设置
- types.ts 定义后端基础返回的 data 类型
### axios基础配置
```js
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
### 二次处理接口返回数据并发出消息提示
```js
// T 为 res.data.data 的类型
// BaseResponse 为 res.data 的类型
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

### 暴露需要发送消息的POST请求
```js
export function msgPost<T = any, U = any>(
   config: AxiosRequestConfig,
   url: string,
   data: U
): Promise<T> {
   return msgRequest({ ...config, url, method: 'POST', data: data });
}
```

### 暴无需发送消息/处理的POST请求
```js
export function post<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<T> {
    return service.request({ ...config, url, method: 'POST', data: data });
}
```

### 统一接口规范
```js
// types.ts
// 暴露 res.data 的类型
// 此处与后端人员配合进行接口的规范
export interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
}
```

### 处理http响应码
```js
// status.ts
// 此处暴露方法，返回对应状态码所对应的中文提示信息
// 便于提示用户发现问题
export const getMessage = (status: number | string): string => {
    let message = '';
    switch (status) {
        case 400:
            message = '请求错误(400)';
            break;
        case 401:
            message = '未授权，请重新登录(401)';
            break;
        case 403:
            message = '拒绝访问(403)';
            break;
        case 404:
            message = '请求出错(404)';
            break;
        case 408:
            message = '请求超时(408)';
            break;
        case 500:
            message = '服务器错误(500)';
            break;
        case 501:
            message = '服务未实现(501)';
            break;
        case 502:
            message = '网络错误(502)';
            break;
        case 503:
            message = '服务不可用(503)';
            break;
        case 504:
            message = '网络超时(504)';
            break;
        case 505:
            message = 'HTTP版本不受支持(505)';
            break;
        default:
            message = `连接出错(${status})!`;
    }
    return `${message}，请检查网络或联系管理员！`;
};
```

## api管理
- api被放置在 /src/api 中
- index.ts 进行api请求的基本配置
- types.ts 定义api的请求类型与返回类型
### api基础配置
```js
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

### api类型管理
```js
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