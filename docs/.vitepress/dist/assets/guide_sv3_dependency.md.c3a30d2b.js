import{_ as t,o as i,c as l,d as s}from"./app.a4c01adc.js";const m=JSON.parse('{"title":"项目依赖介绍","description":"","frontmatter":{},"headers":[{"level":2,"title":"🚗Vue3全家桶","slug":"🚗vue3全家桶","link":"#🚗vue3全家桶","children":[]},{"level":2,"title":"🚕CSS预处理","slug":"🚕css预处理","link":"#🚕css预处理","children":[]},{"level":2,"title":"🚜数据模拟","slug":"🚜数据模拟","link":"#🚜数据模拟","children":[]},{"level":2,"title":"🚓协作规范","slug":"🚓协作规范","link":"#🚓协作规范","children":[]},{"level":2,"title":"🚌项目构建","slug":"🚌项目构建","link":"#🚌项目构建","children":[]},{"level":2,"title":"🚐TypeScript","slug":"🚐typescript","link":"#🚐typescript","children":[]}],"relativePath":"guide/sv3/dependency.md","lastUpdated":1699846681000}'),e={name:"guide/sv3/dependency.md"},n=s('<h1 id="项目依赖介绍" tabindex="-1">项目依赖介绍 <a class="header-anchor" href="#项目依赖介绍" aria-hidden="true">#</a></h1><ul><li>这里罗列了项目中用到的依赖以及简短的介绍，具体使用方式请查阅对应的文档。</li></ul><h2 id="🚗vue3全家桶" tabindex="-1">🚗Vue3全家桶 <a class="header-anchor" href="#🚗vue3全家桶" aria-hidden="true">#</a></h2><ul><li><strong>状态管理工具</strong>： <ul><li><strong>pinia</strong>：Vue3官方推荐的状态管理工具</li><li><strong>pinia-plugin-persistedstate</strong>：pinia数据持久化插件</li></ul></li><li><strong>路由</strong>： <ul><li><strong>vue-router</strong>：Vue官方推荐路由管理工具</li></ul></li><li><strong>Http请求</strong>： <ul><li><strong>axios</strong>：Vue官方推荐Http请求库</li></ul></li><li><strong>组件库</strong>： <ul><li><strong>element-plus</strong>：老牌亲民组件库</li></ul></li></ul><h2 id="🚕css预处理" tabindex="-1">🚕CSS预处理 <a class="header-anchor" href="#🚕css预处理" aria-hidden="true">#</a></h2><ul><li><strong>sass</strong>：经典的CSS预处理工具</li></ul><h2 id="🚜数据模拟" tabindex="-1">🚜数据模拟 <a class="header-anchor" href="#🚜数据模拟" aria-hidden="true">#</a></h2><ul><li><strong>mock.js</strong>：模拟数据生成器 <ul><li><strong>vite-plugin-mock</strong>：vite进行数据模拟的插件</li></ul></li></ul><h2 id="🚓协作规范" tabindex="-1">🚓协作规范 <a class="header-anchor" href="#🚓协作规范" aria-hidden="true">#</a></h2><ul><li><strong>eslint</strong>：对代码风格与质量进行校验 <ul><li><strong>@eslint/create-config</strong>：创建eslint基础配置模板工具</li><li><strong>eslint-config-plugn-vue</strong>：eslint vue 推荐配置</li></ul></li><li><strong>prettier</strong>：对代码风格进行校验 <ul><li><strong>eslint-config-prettier</strong>：关闭eslint中与prettier相互冲突的规则</li><li><strong>eslint-plugin-prettier</strong>：赋予eslint用prettier格式化代码的能力</li></ul></li><li><strong>stylelint</strong>：对样式代码风格进行校验 <ul><li><strong>stylelint-config-standard</strong>：stylelint推荐配置</li><li><strong>stylelint-config-prettier</strong>：关闭stylelint中与prettier相互冲突的规则</li><li><strong>stylelint-config-html</strong>：支持规范html</li><li><strong>stylelint-config-recommended-scss</strong>：scss推荐规范规则</li><li><strong>stylelint-config-standard-vue</strong>：vue推荐规范规则</li><li><strong>stylelint-order</strong>：规定样式代码顺序</li><li><strong>postcss</strong>：规范CSS代码</li><li><strong>postcss-sass</strong>：规范Sass代码</li><li><strong>postcss-html</strong>：规范Html代码</li></ul></li><li><strong>commitlint</strong>：对 git commit 进行规范 <ul><li><strong>@commitlint/cli</strong>：commitlint执行代码</li><li><strong>@commitlint/config-conventional</strong>：commitlint配置支持</li></ul></li><li><strong>lint-staged</strong>：可以在 git 缓存中进行代码校验</li><li><strong>husky</strong>：向项目中添加 git hooks</li></ul><h2 id="🚌项目构建" tabindex="-1">🚌项目构建 <a class="header-anchor" href="#🚌项目构建" aria-hidden="true">#</a></h2><ul><li><strong>vite</strong>：新时代构建工具</li></ul><h2 id="🚐typescript" tabindex="-1">🚐TypeScript <a class="header-anchor" href="#🚐typescript" aria-hidden="true">#</a></h2><ul><li><strong>TypeScript</strong>：提供超强的类型校验 <ul><li><strong>@typescript-eslint/eslint-plugin</strong>：eslint 推荐规则</li><li><strong>@typescript-eslint/parser</strong>：eslint ts 支持</li><li><strong>@types/node</strong>：node ts 支持</li></ul></li></ul>',14),r=[n];function o(g,a,c,u,d,h){return i(),l("div",null,r)}const _=t(e,[["render",o]]);export{m as __pageData,_ as default};