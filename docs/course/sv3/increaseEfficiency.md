# 【从零到一手撕脚手架 | 第四节】加速开发效率 使用plop生成开发模板 使用mock进行数据模拟

> Hello大家好我是⛄，之前我们已经配置了脚手架需要具备的基本功能：代码封装，团队协作规范等。但是可能我们有其他的需求，比如说我们想快速生成几个基础的组件模板我们可以使用Plop或者使用文件写入实现。比如我们不想等后端同学的接口，可以直接使用mock模拟数据生成。
>
> - **GitHub**：[LonelySnowman/sv3-template](https://github.com/LonelySnowman/sv3-template)
> - **官方文档**：[SV3-Family | Vue3](https://sv3-docs.snowhouse.space/)

- 前置知识：Vue全家桶，了解Vite或WebPack等构建工具，Node.js
- 您将收获到：从零到一构建一个规范的 Vue3+TS+Vite 脚手架

## 配置 plop

- 想一想平时我们是如何新建一个组件的，右键->新建文件->命名文件->编写组件代码，或者直接使用命令行生成文件，并且这些组件都会编写一些重复的内容，这些内容在新建时就具备，我们平常可能就直接`ctrl+c`、`ctrl+v`，还是有一点繁琐的😓。有没有一种方法能快速生成各种组件的模板呢？接下来就要用到我们的`plop`啦😀，它可以帮助我们快速生成开发模板，提高效率。
- **plop是一种“微型生成器框架”**。 这是因为它提供了一种快速生成代码或其他文本文件的便捷方式，同时又保持了很小的体积。我们总是在代码中创建不同的结构和模式，如路由、控制器、组件、工具类等。这些模式会随着时间的变化不断地被改变和优化，所以当你想要去创建一个新的已经存在的模版时，你很难在你的项目/代码中找到对于当前需要创建的模板的最佳实践，这时候就轮到 plop 大展身手了。使用 plop, 你能够随时在项目中更新某种特定代码模式的最佳实践，你只需要在命令行中键入 plop 就能快速地运行代码。这不仅能避免从整个代码库中寻找最佳模板然后复制的过程，而且又能正确高效地创建文件。
- 官方文档：[Learning to Plop : PLOP (plopjs.com)](https://plopjs.com/documentation/)

### 安装依赖

```bash
pnpm install -D plop
```

### 编写命令行交互

- 接下来以新建一个`vue`组件的模板为例
- 在项目根目录下创建一个用于存放开发模板的文件`plop-templates`
- 再新建一个`component`文件夹代表这里面存放开发组件的模板
- 在`component`中新建`index.hbs`编写文件模板，`prompt.js`编写交互逻辑

```
|plop-templates
	|components
		|index.hbs
		|prompt.js
```

接下来我们就可以在`prompt.js`中编辑交互逻辑啦

我们需要在该模块导出一个配置项，主要需要配置三个内容

- description：该模板的名称
- prompts：该模板需要的参数
- actions：执行后需要进行的操作

具体详情可以看下面的代码，均已加入详细注释

```js
const fs = require('fs');
const path = require('path');
// 引入便于我们验证问价夹中是否存在重名文件的工具函数，后面有详细代码
const verifyFileExist = require('../utils');
// 引入我们需要创建该模板到达的基础路径位置
const baseFile = path.join(__dirname, '../../src/views');

module.exports = {
   // 编写对模板件的描述
   description: '创建组件',
   // 编写命令行交互逻辑，可在命名行中获取参数
   prompts: [
      {
         name: 'componentName', // 该参数的名称 之后可以使用 componentName 调用
         type: 'input', // 该参数的类型 input 代表输入
         message: '请输入页面名称', // 该交互的提示信息
         validate: (dirName) => { // 传入一函数对用户传入的参数进行校验
            if (!dirName || dirName.trim === '') { // 验证用户是否输入
               return '组件名称不能为空'; // 返回字符串报错
            } else if (verifyFileExist(dirName, baseFile)) { // 验证文件是否存在
               return '组件已经存在'; // 返回字符串报错
            } else {
               return true; // 返回 ture 则继续执行 action
            }
         },
      },
   ],
   // 编写接收完参数后需要执行的操作
   actions: (data) => {
      const basePath = path.join(baseFile, `./${data.pageName}`);
      // 新建一个组件文件夹
      fs.mkdirSync(basePath);
      // 新建一个组件文件夹下的通用组件文件夹
      fs.mkdirSync(path.join(baseFile, `./${data.pageName}/components`));
       
      // 最后我们需要返回一个 actions
      // type 用于配置执行的操作类型 add 代表新增文件
      // path 代表新建文件的路径
      // templateFile 代表我们使用的模板 下文会有
      const actions = [
         {
            type: 'add',
            path: path.join(basePath, 'index.vue'),
            templateFile: path.join(__dirname, './index.hbs'),
         },
      ];
      return actions;
   },
};
```

因为检测一个文件是否存在需要经常使用，我们将其封装成一个函数抽离出来，在`plop-templates/utils.js`中编写：

- 就是一个简单的验证函数，大家根据自己的习惯编写即可

```js
const fs = require('fs');

// 验证文件在文件夹中是否存在
function verifyFileExist(dirName, dirPath, tail = '') {
   const directories = fs.readdirSync(dirPath);
   return directories.includes(dirName + tail);
}

module.exports = verifyFileExist;
```

### 编写开发模板

我们在`plop-templates/components/index.hbs`中编写组件的模板：

每一个字符都会被写入`actions`中返回的`path`目标文件中，只有被**双大括号包裹**的内容会被解析成`prompts`传入的参数。

下面的 `properCase pageName` 就是表示写入 pageName 参数 并且小写。

```vue
<template>
   <div>
     {{ properCase pageName }}
   </div>
</template>

<script lang="ts" setup>
// typeScript
</script>

<style lang="scss" scoped>
/* scss */
</style>
```

### 调用指令

要使用我们的开发模板，我们需要在项目根目录下新建一个`plopfile.js`进行配置，详细内容如下：

```js
module.exports = function (plop) {
   // 设置欢迎语
   plop.setWelcomeMessage('请选择需要创建的模板');
   // 设置选择的生成器模板
   // 第一个参数为对应名称
   // 第二个参数为 prompts 的地址
   plop.setGenerator('components', require('./plop-templates/page/prompt'));
};
```

然后我们在`package.json`中配置一条指令便于我们调用

```json
{
  "scripts": {
      "gen": "plop"
   },
}
```

运行该指令就可以快速生成我们配置好的模板啦😄。

以上内容为一个简单的小示例，plop 还有非常多强大的功能，大家可以前往官方文档探索：[Learning to Plop : PLOP (plopjs.com)](https://plopjs.com/documentation/)

项目里已为大家配置好了各种

## 配置 mock

- 想想我们平时对接接口是怎么做的，首先前后端确定好接口，让后确定好接口文档。如果已经编写好前端代码，就差与后端对接了，只能自己傻傻等待么😴。当然不是，我们可以使用 mock 工具进行数据的模拟，提前编写好数据展示的内容，最后对接的时候关闭 mock 即可。
- mock 实现的方式有很多，我们使用的 vite 就有一个插件满足我们的需求：`vite-plugin-mock`

### 安装依赖

```bash
pnpm install -D mockjs vite-plugin-mock
```

### 返回内容配置

mock 的编写方式非常非常简单，只需要一个数组即可。

我们在项目根目录下新建一个`mock`文件夹，并在其中新建一个`user.ts`用于用户登录的数据模拟。

配置方式也是非常的简单

- url：配置接口URL地址
- method：配置接口的请求方式
- response：编写一个函数，编写处理逻辑，并返回响应的内容。

```ts
import { MockMethod } from 'vite-plugin-mock';
export default [
   {
      // 前面的 /mock 为 mock 生效需要配置的根路径 后面会提到
      url: '/mock/api/login',
      method: 'post',
      // 使用 body 可以获取请求体
      response: ({ body }) => {
         // 简单编写一个逻辑
         // 用户名不等于密码就是密码错误
         if (body.username !== body.password) {
            // 返回JSON信息
            return {
               code: 1,
               message: '密码错误',
               data: {
                  username: '',
                  roles: [],
                  accessToken: '',
               },
            };
         }
         // 其余的则显示登录成功
         if (body.username === 'admin') {
            return {
               code: 0,
               message: '登录成功',
               data: {
                  username: 'admin',
                  roles: ['admin'],
                  accessToken: 'admin',
               },
            };
         } else {
            return {
               code: 0,
               message: '登录成功',
               data: {
                  username: 'common',
                  roles: ['common'],
                  accessToken: 'common',
               },
            };
         }
      },
   },
] as MockMethod[];

```

### 启用 mock

启动 mock 需要我们配置一下 vite

```js
// 在 plugins 数组中加入如下配置
[
      viteMockServe({
         // 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
         mockPath: 'mock', // 数据模拟需要拦截的请求起始 URL
         localEnabled: true, // 本地开发是否启用
         prodEnabled: false, // 生产模式是否启用
      }),
]
```

然后我们所有以 mock 开头的接口都会成为我们使用 mock 模拟的返回数据

### 关闭 mock

- 如果后端同学接口测试完毕，需要我们正式对接了，我们不想启用 mock 了该怎么办，可以在 vite 配置中关闭，但我喜欢使用**环境变量**配置mock的开关

编写`.env`

```
// 后端接口的根路径
VITE_APP_API_BASEURL = /api
// 需要模拟的请求根路径
VITE_APP_MOCK_BASEURL = /mock/api
```

编写`.env.development`

```
// 选择 development 模式下是否开启 mock
VITE_APP_USE_MOCK = true
```

编写`.env.production`

```
// 选择 production 模式下是否开启 mock
VITE_APP_USE_MOCK = true
```

**配置 axios 全局请求路径**

之前我们已经将 axios 封装在 `src/utils/http/index.ts` 中，我们可以在此根据环境变量配置 axios 的请求路径

```js
const service: AxiosInstance = axios.create({
   // 启用 mock 就请求 mock 路径
   // 不启用 mock 就请求 正常后端路径
   baseURL: Boolean(import.meta.env.VITE_APP_USE_MOCK)
      ? import.meta.env.VITE_APP_MOCK_BASEURL
      : import.meta.env.VITE_APP_API_BASEURL,
   timeout: 15000,
});
```

**注意**：这里我们并不需配置后端地址，统一请求 LocalHost。我们只需要开启本地代理在 vite proxy 中配置后端地址即可，这样方便一些。

**这样我们就可以轻松的选择开关 mock 啦**😀

## 结语

每个人的使用习惯不同，这里提供了我常用的方法供大家参考，如有其他使用方法欢迎大家讨论😄。

终于把第四节更新完啦，一个最基础的 Vue3+Vite+TS 前端开发脚手架就搭建完成了，日后技术栈更新会帮助大家提供更改好的方案，大家对该项目的意见也请及时指出，我会汲取大家的意见不断学习并更新。

**系列文章**：

- [【从零到一手撕脚手架 | 第一节】配置基础项目结构 Vite + TypeScrpit + Vue3 初始化项目](https://juejin.cn/post/7207615983950987320)
- [【从零到一手撕脚手架 | 第二节】模块化封装 降低耦合度 封装 axios pinia router](https://juejin.cn/post/7209542304863649852)
- [【从零到一手撕脚手架 | 第三节】项目集成CommitLInt+ESLint+Prettier+StyleLint+LintStaged](https://juejin.cn/post/7213310111623725117)
- **提高开发效率**：Mock.js进行数据模拟，告别后端摆烂。Plop快速生成模板文件！

**参考学习项目**：

- [fast-vue3](https://github.com/tobe-fe-dalao/fast-vue3)
- [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)

> 如果有任何不正确的地方请指正，我会及时更改。
>
> 更文不易，如果对你有帮助的话，请给我点个赞吧👍
>
> 关注我，后续文章不迷路⛄