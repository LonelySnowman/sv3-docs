# Router

使用 vue-router 进行路由管理


## 路由管理
- 路由文件放置在 /src/router 中
```js
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

## 路由模块化
- 路由模块放置在 /src/router/modules 中
- 在此文件夹中配置的路由将会自动导入到路由中
```js
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
