# Router

使用 vue-router 进行路由管理，搭配路由模块化与自动引入

## 新建路由

可以使用 `npm run gen` 选择 `router` 直接生成一个路由  
或者直接新建一个`xxx.ts`文件，复制粘贴下面的示例，即可使用一个新的路由

- 路由模块放置在 /src/router/modules 中
- 在此文件夹中配置的路由将会自动导入到路由中

```ts
import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/',
    name: 'Home',
    component: () => import('@/layout/index.vue'),
    meta: {
        role: ['common', 'admin'],
    },
    children: [
        {
            path: '/home',
            name: 'HomePage',
            component: () => import('@/views/home/index.vue'),
            meta: {
                role: ['common', 'admin'],
            },
        },
    ],
} as RouteRecordRaw;
```

## 路由拦截器
- 路由文件放置在 /src/router 中
- 在此处您可以处理路由的拦截器
```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

// 自动导入全部路由
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
   eager: true,
});
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
   routes.push(modules[key].default);
});

// 创建路由
const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

// 编写路由钩子
router.beforeEach(async (_to, _from, next) => {});
router.afterEach((_to) => {});

export default router;
```
