# 项目依赖介绍

- 这里罗列了项目中用到的依赖以及简短的介绍，具体使用方式请查阅对应的文档。

## 🚗Vue3全家桶

- **状态管理工具**：
  - **pinia**：Vue3官方推荐的状态管理工具
  - **pinia-plugin-persistedstate**：pinia数据持久化插件
- **路由**：
  - **vue-router**：Vue官方推荐路由管理工具
- **Http请求**：
  - **axios**：Vue官方推荐Http请求库
- **组件库**：
  - **element-plus**：老牌亲民组件库

## 🚕CSS预处理

- **sass**：经典的CSS预处理工具

## 🚜数据模拟

- **mock.js**：模拟数据生成器
  - **vite-plugin-mock**：vite进行数据模拟的插件


## 🚓协作规范

- **eslint**：对代码风格与质量进行校验
  - **@eslint/create-config**：创建eslint基础配置模板工具
  - **eslint-config-plugn-vue**：eslint vue 推荐配置
- **prettier**：对代码风格进行校验
  - **eslint-config-prettier**：关闭eslint中与prettier相互冲突的规则
  - **eslint-plugin-prettier**：赋予eslint用prettier格式化代码的能力
- **stylelint**：对样式代码风格进行校验
  - **stylelint-config-standard**：stylelint推荐配置
  - **stylelint-config-prettier**：关闭stylelint中与prettier相互冲突的规则
  - **stylelint-config-html**：支持规范html
  - **stylelint-config-recommended-scss**：scss推荐规范规则
  - **stylelint-config-standard-vue**：vue推荐规范规则
  - **stylelint-order**：规定样式代码顺序
  - **postcss**：规范CSS代码
  - **postcss-sass**：规范Sass代码
  - **postcss-html**：规范Html代码
- **commitlint**：对 git commit 进行规范
  - **@commitlint/cli**：commitlint执行代码
  - **@commitlint/config-conventional**：commitlint配置支持
- **lint-staged**：可以在 git 缓存中进行代码校验
- **husky**：向项目中添加 git hooks

## 🚌项目构建

- **vite**：新时代构建工具

## 🚐TypeScript

- **TypeScript**：提供超强的类型校验
  - **@typescript-eslint/eslint-plugin**：eslint 推荐规则
  - **@typescript-eslint/parser**：eslint ts 支持
  - **@types/node**：node ts 支持