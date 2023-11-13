# Store
使用 Pinia 进行状态管理，进行模块化封装并搭配持久化插件

## 新建Store

可以使用 `npm arun gen` 选择 `store` 直接生成一个状态模块  
也可以根据下面的示例自行创建

- store模块放置在 /src/store/modules 中
- index.ts 导出store
- types.ts 定义state类型

```ts
// index.ts
// 创建 pinia 并导处
import { defineStore } from 'pinia';
import pinia from '@/store';
import { AppState } from './types';

export const useHomeStoreHook = defineStore(
   'Home',
   {
      state: () => ({
         title: 'SV3-Template',
         subTitle: 'Vue3快速开发模板',
         subTitle1: '简洁易懂，文档详细，含脚手架搭建教程',
      }),
      getters: {},
      actions: {
         updateInfo(partial: Partial<AppState>) {
            this.$patch(partial);
         },
      },
   }
);

export function useHomeStore() {
   return useHomeStoreHook(pinia);
}
```

```ts
// types.ts
// 定义路由类型
export interface AppState {
   title: string;
   subTitle: string;
   theme: string;
}
```

## Stroe使用

引入stroe模块中的hook即可调用
更多使用方式请查阅Pinia官方文档

```ts
import { useHomeStoreHook } from '@/store/modules/home';
const store = useHomeStoreHook();

const homeInfo = {
    title: store.title,
    subTitle: store.subTitle,
    subTitle1: store.subTitle1,
};
```

## Store根目录

- 项目在 /src/store 创建pinia并引用持久化插件

```ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
```
