# 【从零到一手撕脚手架】第一节，配置基础项目结构， Vite + TypeScrpit + Vue3 初始化项目

> hello大家好我是雪人⛄，不知不觉断更好久了😄，经过了长时间的学习，终于踏入了前端工程化的大门，大家再日常开发中总是会用到一个开发工具：脚手架，大家在使用其他人的脚手架或者一些官方脚手架的时候，可能只懂得使用并不懂得如何实现，看到一些代码只是知其然不知其所以然，今天为大家带来一套教程，教大家入门“脚手架”，相信你一定会有所收获。
>
> 目前项目已开源且仍处于开发阶段，后续会更新更多内容，如有不正确的地方请大家指正，我会及时更新并纠正我的错误。
>
> - **GitHub**：[LonelySnowman/sv3-template](https://github.com/LonelySnowman/sv3-template)
> - **官方文档**：[SV3-Family | Vue3](https://sv3-docs.snowhouse.space/)

- 前置知识：Vue全家桶，了解Vite或WebPack等构建工具，Node.js
- 您将收获到：从零到一构建一个规范的 Vue3+TS+Vite 脚手架

**项目使用的依赖**：

- 使用 Vite 进行项目构建
- 使用 TypeScript
- 使用 Sass 编写样式
- 对 pinia，vue-router，axios 进行模块化封装
- 使用 CommitLint，ESLint，StyleLint，Prettier，LintStage 进行团队项目规范
- 使用 Mock.js 模拟数据，使用 plop 快速生成开发模板
- 使用 ElementPlus 组件库

**参考学习项目**：

- [fast-vue3](https://github.com/tobe-fe-dalao/fast-vue3)
- [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)

## 确定项目目录结构

- 首先列出目录结构，大家根据目录结构直接创建目录即可，后续会给大家详解这些目录。

> 下面是我学习到的一些项目目录结构，大家可以参考，学习完毕后可以根据自己的习惯进行更改。

```text
sv3-template/
	|- .husky/	# git钩子配置
	|- build/	# 项目打包配置 
	|- mock/	# 数据请求模拟
	|- plop-templates/	# 项目开发模板
	|- public/	# 不经过打包的静态资源
	|- type/	# ts类型定义
	|- src/		# 项目资源
		|- api/		# http请求管理
		|- assets/	# 经过打包的静态资源
		|- components/	# 通用组件
		|- hooks/	# 通用组件状态逻辑函数
		|- router/	# 项目路由管理
		|- store/	# 组件状态管理
		|- styles/	# 项目通用样式
		|- utils/	# 工具函数
			|- http/axios/ # axios封装
		|- views/	# 页面组件
```

- 接下来讲解一个基本的Vue3脚手架需要具备哪功能

## Vue3全家桶

- 我们既然要开发Vue项目，Vue全家桶当然是最重要的，使用pinia进行状态管理，使用vue-router进行路由管理，axios进行http请求等等。
- 下面会讲解全家桶的安装与基础配置，模块化的封装将会在下一节讲解。

### 安装依赖

- 这里我推荐大家使用pnpm进行依赖管理，pnpm的优点大家可在网上查阅，这里就不进行概述了。

```bash
pnpm install axios pinia pinia-plugin-persistedstate vue vue-router nprogress

# 本项目使用 element plus 大家可以根据个人习惯选择自己常用的组件库
pnpm install element-plus @element-plus/icons-vue

pnpm install -D typescript sass
```

下面简单介绍一下这些依赖的作用，大家根据个人习惯选择安装即可。

- vue：(⊙﹏⊙)这个应该不用多说
- axios：vue官方推荐http请求库
- pinia：vue官方推荐状态管理工具
- pinia-plugin-persistedstate：pinia数据持久化插件
- vue-router：路由管理工具
- typescript：使用TS语言
- sass：css预处理
- element-plus：亲民老牌组件库
- nprogres：简洁美观的进度加载条组件

**首先应该搭建一个基础的Vue项目结构**

- 新建以下目录

```text
sv3-template/
	|- public/	# 不经过打包的静态资源
	|- src/		# 项目资源
		|- assets/	# 经过打包的静态资源
		|- components/	# 通用组件
		|- styles/	# 项目通用样式
		|- utils/	# 工具函数
			|- http/axios/ # axios封装
		|- views/	# 页面组件
		|- App.vue  # 项目的主组件
		|- main.ts	# 入口ts文件
	| - index.html # 入口html文件
```

### vue

**index.html**

- 对页面进行基础配置

```html
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>sv3-template</title>
   </head>
   <body>
      <!-- 令 id="app" 便于vue进行挂载 -->
      <div id="app"></div>
      <!-- 引入main.ts文件 -->
      <script type="module" src="/src/main.ts"></script>
   </body>
</html>
```

**/src/App.vue**

- 编写项目的主组件

```vue
<template>
   <!-- 一般vue项目都会使用vue-router -->
   <!-- 所以我们这里直接写一个 router-view -->
   <router-view></router-view>
</template>
<script setup></script>
```

**/src/styles/_reset.scss**

- `_reset.scss`是进行一个对基础HTML默认样式的重置
- 这部分也是根据个人习惯配置即可
- 这里引用一个开源项目：[minireset.css](https://github.com/jgthms/minireset.css/blob/master/minireset.css)

```css
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

ul {
  list-style: none;
}

button,
input,
select {
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

img,
video {
  height: auto;
  max-width: 100%;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}
```

**/src/main.ts**

- 引入样式文件，挂载Vue

```ts
import { createApp } from 'vue';
import App from './App.vue';
import './styles/_reset.scss';
const app = createApp(App);
app.mount('#app');
```

**/views/xxx.vue**

创建页面结构

```text
views/
	|- home/	# 页面文件
		|- components/	# 放置页面使用的组件
			|- xxx.vue
		|- index.vue	# 经过打包的静态资源
```

我们这里可以随便写一个简单的组件

```vue
<template>
    <div>Hello Vue</div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
```

### vue-router

- 然后我们需要进行对路由的配置

**/src/router/index.ts**

- 这里路径中用到了 `@` 是我们配置的别名，指向了src，在后面会讲解到如何配置

```ts
import { createRouter, createWebHashHistory, RouteRecordRaw, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置路由
const routes: Array<RouteRecordRaw> = [{
   path: '/',
   name: 'Home',
   component: () => import('@/viwes/home/index.vue'),
   meta: {},
   children: [],
}];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    next()
});

router.afterEach((_to) => {
    NProgress.done();
});

export default router;
```

**/src/main.ts**

- 在main.ts中，令app使用router插件

```ts
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router'; // ++
import './styles/_reset.scss';
const app = createApp(App);
app.use(router); // ++
app.mount('#app');
```

### pinia

**/src/store/index.ts**

```ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
// 使用pinia数据持久化插件
pinia.use(piniaPluginPersistedstate);
export default pinia;
```

**/src/main.ts**

- 在main.ts中，令app使用store插件

```ts
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import pinia from '@/store'; // ++
import './styles/_reset.scss';
const app = createApp(App);
app.use(router);
app.use(pinia); // ++
app.mount('#app');
```

### axios

**/src/utils/http/index.ts**

```ts
import axios from 'axios';
import type {
   AxiosInstance,
   AxiosRequestConfig,
   AxiosResponse,
   AxiosError,
   InternalAxiosRequestConfig,
} from 'axios';

const service: AxiosInstance = axios.create({
   baseURL: '/'
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
   (response: AxiosResponse) => {
   },
   (error: any) => {
   }
);

export default service
```

## 构建工具

- 我们已经将vue3的基础项目结构搭建完毕，那么我们怎么才能让这个项目跑起来呢？
- 因为浏览器是不能识别Vue，TS，Sass这些语言的，所以我们需要一个工具将它们转变成浏览器可以识别的语言：Html，CSS，JS。Vite就可以做到这些事情，接下来教大家配置Vite帮助我们构建项目。

### 安装依赖

```bash
pnpm install -D vite @vitejs/plugin-vue @vitejs/plugin-vue-jsx

pnpm install -D @types/node @types/nprogress vue-tsc
```

- vite：项目构建工具
- @vitejs/plugin-vue：使vite能够编译vue组件
- @vitejs/plugin-vue-jsx：使vite能够编译jsx组件
- @types/node：node类型包，使ts支持node
- @types/nprogress：nprogress的类型支持
- vue-tsc：vue文件的类型检查工具

### vite环境变量

Vite官方文档对环境变量的介绍：[环境变量和模式 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/env-and-mode.html)

- Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量。
- 我们为了配置方便，可以将一些配置项写在环境变量中。

**我们在项目根目录下新建三个文件**：`.env`，`.env.production`，`.env.development`

- .env：所有情况下都会加载
- .env.[mode]：只在指定模式下加载

> npm run dev 会加载 .env 和 .env.development 内的配置
>
> npm run build 会加载 .env 和 .env.production 内的配置
>
> mode 可以通过命令行 --mode 选项来重写。

**.env**

- **注意**：环境变量名称必须与VITE作为前缀，前缀可以在Vite配置中修改

```env
# axios请求的 baseURL
VITE_APP_API_BASEURL = /api
```

- 剩下的`.env.[mode]`之后会介绍到，这里我们就先配置这一项即可

### 环境变量类型支持

我们在开发过程中，环境变量可能会越来越多，我们可能想要获得智能的TypeScript语法提示来让我们知道有哪些环境变量。

在项目根目录下新建`types`文件夹

**/types/env.d.ts**

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
   // 我们每次添加完新的环境变量就在此添加一次ts类型
   // 这样我们就能在使用 import.meta.env 时获得ts语法提示
   readonly VITE_APP_API_BASEURL: string;
}

interface ImportMeta {
   readonly env: ImportMetaEnv;
}

```

### vite配置文件

**vite.config.ts**

- 在项目根目录下创建 `vite.config.ts` 文件
- 下面的配置项的解释均已注释
- 官网有更加详细的配置介绍：[配置 Vite | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/config/)

```ts
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    // 获取当前工作目录
    const root = process.cwd();
    // 获取环境变量
    const env = loadEnv(mode, root);
    return {
        // 项目根目录 
      root,
        // 项目部署的基础路径
      base: '/',
      publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 无需处理的静态资源位置
      assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置
      plugins: [
          // Vue模板文件编译插件
          vue(),
          // jsx文件编译插件
          vueJsx(),
      ],
      // 运行后本地预览的服务器
      server: {
         // 是否开启https
         https: false,
         // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
         host: true,
         // 开发环境预览服务器端口
         port: 3000,
         // 启动后是否自动打开浏览器
         open: false,
         // 是否开启CORS跨域
         cors: true,
         // 代理服务器
         // 帮助我们开发时解决跨域问题
         proxy: {
            // 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:3000
            '/api': {
               target: 'http://xxx:3000',
               // 改变 Host Header
               changeOrigin: true,
               // 发起请求时将 '/api' 替换为 ''
               rewrite: (path) => path.replace(/^\/api/, ''),
            },
         },
      },
      // 打包配置
      build: {
         // 关闭 sorcemap 报错不会映射到源码
         sourcemap: false,
         // 打包大小超出 4000kb 提示警告
         chunkSizeWarningLimit: 4000,
         rollupOptions: {
            // 打包入口文件 根目录下的 index.html
            // 也就是项目从哪个文件开始打包
            input: {
               index: fileURLToPath(new URL('./index.html', import.meta.url)),
            },
            // 静态资源分类打包
            output: {
               format: 'esm',
               chunkFileNames: 'static/js/[name]-[hash].js',
               entryFileNames: 'static/js/[name]-[hash].js',
               assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            },
         },
      },
      // 配置别名
      resolve: {
         alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '#': fileURLToPath(new URL('./types', import.meta.url)),
         },
      },
    };
});
```

### ts配置文件

- 项目根目录下新建`tsconfig.json`

**/tsconfig.json**

```ts
{
    "compilerOptions": {
        // 编译出JS的目标ES版本
        "target": "esnext",
        // 使用的ES版本
        "module": "esnext",
        // 用于选择模块解析策略，有'node'和'classic'两种类型
        "moduleResolution": "node",
        // 开启严格模式
        "strict": true,
        // 强制代码中使用的模块文件名必须和文件系统中的文件名保持大小写一致
        "forceConsistentCasingInFileNames": true,
        // 允许使用 xxx 代替 * as xxx 导入
        "allowSyntheticDefaultImports": true,
        // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
        "jsx": "preserve",
        // 用来指定编译时是否生成.map文件
        "sourceMap": true,
        // 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
        "esModuleInterop": true,
        // 是否可以导入 json module
        "resolveJsonModule": true,
        // 是否检测定义了但是没使用的变量
        "noUnusedLocals": true,
        // 是否检查是否有在函数体中没有使用的参数
        "noUnusedParameters": true,
        // 是否启用实验性的装饰器特性
        "experimentalDecorators": true,
        // ts中可以使用的库 这里配置为 dom 与 es模块
        "lib": ["dom", "esnext"],
        // 不允许变量或函数参数具有隐式any类型
        "noImplicitAny": false,
        // 启用阻止对下载库的类型检查
        "skipLibCheck": true,
        // types用来指定需要包含的模块
        "types": ["vite/client", "element-plus/global"],
        // 编译的时候删除注释
        "removeComments": true,
        // 使用绝对路径时使用baseUrl去解析导入路径
        "baseUrl": ".",
        // 为导入路径配置别名
        "paths": {
            "@/*": ["src/*"],
            "#/*": ["types/*"]
        },
        // 配置虚拟目录
        "rootDirs": []
    },
    // 指定需要编译文件
    "include": [
        "src/**/*.ts",
        "src/**/*.d.ts",
        "src/**/*.tsx",
        "src/**/*.vue",
        "types/**/*.d.ts",
        "types/**/*.ts",
        "build/**/*.ts",
        "build/**/*.d.ts",
        "mock/**/*.ts",
        "vite.config.ts"
    ],
        // 指定不需要编译的文件
        "exclude": ["node_modules", "dist", "**/*.js"]
}
```

### 指令配置

- 最后我们将构建指令加入 package.json中

**/package.json**

```json
"scripts": {
   "dev": "vite --mode development",
   // 先进行语法检查 再进行项目打包
   "build": "vue-tsc --noEmit --skipLibCheck && vite build",
},
```

## 结语

**接下来我们就可以运行项目吧项目跑起来啦！**

```bash
pnpm run dev
```

一个基础的 Vue3+TypeScrpit+Vite 的项目就此构造完毕！

后续文章：

- **封装模块化**：axios，store，router模块化使用（待更新）
- **规范团队开发**：向项目中集成CommitLInt，ESLint，Prettier，StyleLint（待更新）
- **提高开发效率**：Mock.js进行数据模拟，告别后端摆烂。Plop快速生成模板文件！（待更新）

> 如果对你有帮助的话，请给我点个赞吧👍
>
> 关注我，后续文章不迷路⛄