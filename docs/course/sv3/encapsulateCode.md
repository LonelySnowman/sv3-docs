# 【从零到一手撕脚手架 | 第二节】模块化封装  降低耦合度 封装 axios pinia router

> Hello大家好我是⛄，前一节我们讲解了脚手架的基础项目搭建。接下来教大家将Vue技术栈常用的工具进行封装，让我们项目的代码更易维护。
>
> - **GitHub**：[LonelySnowman/sv3-template](https://github.com/LonelySnowman/sv3-template)
> - **官方文档**：[SV3-Family | Vue3](https://sv3-docs.snowhouse.space/)

- 前置知识：Vue全家桶，了解Vite或WebPack等构建工具，Node.js
- 您将收获到：从零到一构建一个规范的 Vue3+TS+Vite 脚手架

## 封装axios

#### 状态码提示

- 当浏览器接收并显示网页前，此网页所在的服务器会返回一个包含 HTTP 状态码的信息头（server header）用以响应浏览器的请求。
- 每个状态码都代表一种提示信息

| 分类 | 分类描述                                       |
| :--- | :--------------------------------------------- |
| 1**  | 信息，服务器收到请求，需要请求者继续执行操作   |
| 2**  | 成功，操作被成功接收并处理                     |
| 3**  | 重定向，需要进一步的操作以完成请求             |
| 4**  | 客户端错误，请求包含语法错误或无法完成请求     |
| 5**  | 服务器错误，服务器在处理请求的过程中发生了错误 |

但是用户不一定了解每种状态码对应的提示信息，我们可以将状态码进行封装，将对应的中文含义返回给予用户提示。

我们封装一个方法用于获取常见状态码对应的中文信息，将他放置在 `/src/utils/http/status.ts`:

```ts
// 传入状态码获取对应提示信息
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

然后我们在响应拦截器对响应码进行判断提示，如果不是成功响应发出提示给用户，这里直接使用ElementPlus的Message组件，大家可以根据习惯选择其他方式。

**/src/utils/http/index.ts**

```ts
import { getMessage } from './status';
import { ElMessage } from 'element-plus';

// ...

// axios响应拦截
// 给予用户友好提示
service.interceptors.response.use(
   (response: AxiosResponse) => {
      if (response.status === 200) {
         return response;
      }
      ElMessage({
         message: getMessage(response.status),
         type: 'error',
      });
      return response;
   },
   // 请求失败
   (error: any) => {
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

#### 接口管理

- 在我们成功将axios进项目之后，总是在组件中直接单独引用axios再进行配置请求是十分不方便的，对于一个接口我们可能会有多个组件会用到。

**接口一般会有一层最外围的规范**，下面以一个最简单的为例：

| 参数    | 类型   | 说明     | 备注                              |
| :------ | :----- | :------- | :-------------------------------- |
| code    | Number | 结果码   | 成功=1失败=-1未登录=401无权限=403 |
| message | String | 显示信息 | 给予用户的提示信息                |
| data    | Object | 数据     | JSON 格式                         |

所有接口均会按照这样的格式返回，那么我们可以使用TS设计一个类型，便于我们获得类型提示与校验。

我们将他放置在 `/src/utils/http/types.ts` 下，并且可以传入一个泛型进行 data 数据格式的类型校验。

```ts
export interface BaseResponse<T = any> {
   code: number | string;
   message: string;
   data: T;
}
```

这样我们就可以对第一层响应进行特殊处理，如果code不为1则说明发生错误，直接给予用户提示。

**/src/utils/http/index.ts**

```ts
// BaseResponse 为 res.data 的类型
// T 为 res.data.data 的类型 不同的接口会返回不同的 data 所以我们加一个泛型表示
// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const msgRequest = <T = any>(config: AxiosRequestConfig): Promise<T> => {
   const conf = config;
   return new Promise((resolve, reject) => {
      service
         .request<any, AxiosResponse<BaseResponse>>(conf)
         .then((res: AxiosResponse<BaseResponse>) => {
            const data = res.data;
            // 如果data.code为错误代码返回message信息
            if (data.code != 1) {
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

请求方式有多种，POST、GET、PUT、DELETE等等，为了简化axios配置项的使用，我们可以对不同的请求方式进行封装。

为了获得TS的类型校验与提示，我们传入两个泛型，一个代表请求参数类型，一个代表返回的data类型。

**/src/utils/http/index.ts**

```ts
// 在最后使用封装过的axios导出不同的请求方式
export function get<T = any, U = any>(
   config: AxiosRequestConfig,
   url: string,
   parms?: U
): Promise<T> {
   return msgRequest({ ...config, url, method: 'GET', params: parms });
}

export function post<T = any, U = any>(
   config: AxiosRequestConfig,
   url: string,
   data: U
): Promise<T> {
   return msgRequest({ ...config, url, method: 'POST', data: data });
}
```

#### 接口分类

最基础的接口封装完毕了，接下来我们要使用这些接口。就需要将这些接口分类管理，负责用户信息管理的接口放在一起，负责权限管理的接口放在一起等等。

我们在`/src/api`下建立不同的文件夹代表不同类型的API，在`index.ts`中编写接口配置，在`types.ts`中编写接口所需的请求参数类型以及响应类型。

**/src/api/user/types.ts**

```ts
// 登录所需的参数
export type LoginRequest = {
   username: string;
   password: string;
};

// 刷新登录信息需要的参数
export type reLoginRequest = {
   accessToken: string;
};

// 登录后返回的响应信息
export type LoginResponse = {
   username: string;
   roles: Array<string>;
   accessToken: string;
};
```

然后我们就可以对此类型不同的接口进行封装，之后在组件中或者再次封装在Store中使用即可。

**/src/api/user/index.ts**

```ts
import { post } from '@/utils/http';
// 导入类型
import { LoginRequest, LoginResponse, reLoginRequest } from '@/api/user/types';

// post 请求直接传入一个 data 即可 url 我们直接在此处封装好
// 需要更改时也只需在此处更改
export const userLogin = async (data?: LoginRequest) => {
   return post<LoginResponse>({}, '/login', data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
   return post<LoginResponse>({}, '/getUserInfo', data);
};
```

> 使用的时候我们可以直接在组件中引用，也可将其封装在store的action中，将相关的store与接口关联起来

## 封装router

router在使用过程中如果我们直接在一个文件的一个数组中配置，最后路由越来越多会导致不易管理，我们可以将一个页面的路由配置在一个数组中最后统一导入，这样就会方便很多。

我们将不同页面的路由放置在`/src/router/modules/xxx.ts`

```ts
import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/login',
   name: 'LoginPage',
   component: () => import('@/views/login/index.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [],
} as RouteRecordRaw;
```

然后我们在`/src/router/index.ts`导入这个路由

```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';

// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
   eager: true,
});
const routes: Array<RouteRecordRaw> = [];

// 将路由全部导入数组
Object.keys(modules).forEach((key) => {
   routes.push(modules[key].default);
});

//导入生成的路由数据
const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

router.beforeEach(async (_to, _from, next) => {
	next()
});

router.afterEach((_to) => {
   NProgress.done();
});

export default router;
```

这样我们就可以在module中直接创建路由，无需再次在`index.ts`中手动引入了。

## 封装store

同axios与touter一样，也拥有许多同类别的store数据，我们将他们放置在一个模块中便于调用，例如 user 模块专门用于保存与用户相关的信息与方法。

**/src/store/index.ts**

- 这里用于导出需要使用的pinia并使用持久化插件

```ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
```

**/src/store/xxx/types.ts**

- 以 user 为例
- 这里用于定义stroe中state数据的类型

```ts
export interface UserState {
   username: string;
   accessToken: string;
   refreshToken: string;
   roles: Array<string>;
}
```

**/src/store/xxx/index.ts**

- 定义store模块的主要内容，state、getter、actions
- state用于报错与用户相关的数据
- getter保存需要二次处理的数据
- action封装一些与user模块相关的方法，我们刚刚封装过的api如果需要直接改变用户数据直接在action中调用即可

```ts
import { defineStore } from 'pinia';
import { UserState } from './types';
import pinia from '@/store';
import { refreshUserInfo, userLogin } from '@/api/user';
import router from '@/router';

export const useUserStoreHook = defineStore(
   // 唯一ID
   'User',
   {
      state: () => ({
         username: '游客',
         accessToken: '',
         roles: ['common'],
      }),
      getters: {},
      actions: {
         // 用于更新store数据
         // UserState为定义好的state类型
         updateInfo(partial: Partial<UserState>) {
            this.$patch(partial);
         },
         // 用户登录
         storeUserLogin(data) {
            return userLogin(data).then((res) => {
               this.username = res.username;
               this.roles = res.roles;
               this.accessToken = res.accessToken;
               return res;
            });
         },
         // 刷新用户信息
         refreshUserInfo() {
            if (this.username == '游客' && this.accessToken != '') {
               refreshUserInfo({
                  accessToken: this.accessToken,
               })
                  .then((res) => {
                     this.username = res.username;
                     this.roles = res.roles;
                     this.accessToken = res.accessToken;
                  })
                  .catch(() => {
                     this.accessToken = '';
                  });
            }
         },
      },
      // 持久化保存 accessToken
      persist: {
         key: 'userInfo',
         storage: sessionStorage,
         paths: ['accessToken'],
      },
   }
);

// 导出该Store
export function useUserStore() {
   return useUserStoreHook(pinia);
}
```

> 使用的时候我们直接在需要使用store数据的组件中引用并使用即可
>
> ```vue
> <script lang='ts' setup>
> import { useUserStore } from '@/store/modules/user'
> const userStore = useUserStore()
> </script>
> ```

## 结语

vue3技术栈的常用的基础封装就完成了，每个人的封装习惯各不相同，只要团队用起来方便快捷就好。

一个基础的 Vue3+TypeScrpit+Vite 的项目就此构造完毕！

**系列文章**：

- [【从零到一手撕脚手架 | 第一节】配置基础项目结构 Vite + TypeScrpit + Vue3 初始化项目](https://juejin.cn/post/7207615983950987320)
- [【从零到一手撕脚手架 | 第二节】模块化封装 降低耦合度 封装 axios pinia router](https://juejin.cn/post/7209542304863649852)
- [【从零到一手撕脚手架 | 第三节】项目集成CommitLInt+ESLint+Prettier+StyleLint+LintStaged](https://juejin.cn/post/7213310111623725117)
- [【从零到一手撕脚手架 | 第四节】加速开发效率 使用plop生成开发模板 使用mock进行数据模拟](https://juejin.cn/post/7214759986802294844)

**参考学习项目**：

- [fast-vue3](https://github.com/tobe-fe-dalao/fast-vue3)
- [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)

> 如果有任何不正确的地方请指正，我会及时更改。
>
> 更文不易，如果对你有帮助的话，请给我点个赞吧👍
>
> 关注我，后续文章不迷路⛄