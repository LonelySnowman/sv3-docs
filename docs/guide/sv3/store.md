# Store
使用 Pinia 进行状态管理

## 状态管理
- 在 /src/store 创建pinia并引用持久化插件
```js
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
```

## store模块化
- store模块放置在 /src/store/modules 中
- index.ts 导出store
- types.ts 定义state类型
```js
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

```js
// types.ts
// 定义路由类型
export interface AppState {
   title: string;
   subTitle: string;
   theme: string;
}
```