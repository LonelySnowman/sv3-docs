# 项目指令使用

## 🚀运行项目

- 默认在3000端口启动，如果端口被占用则向后沿用

```bash
# 本地运行项目
pnpm run dev
```

## 🥂项目打包

```bash
# 打包文件在 /dist 中生成
pnpm run build
```

## 🐷模板生成

使用`plop`快速生成所需要的代码模板

- router 在`/src/router/modules`生成路由模板
- page 在`/src/views`生成页面模板
- store 在`/src/store/modules`生成pinia模板
- mock 在`/mock`生成数据模拟模板

```bash
# 生成项目模板
# 有四种模板供选择
pnpm run gen
```

## ⚓代码规范检查

- 项目配置 lint-stage 对提交的代码自动进行风格校验

```bash
pnpm run lint:eslint
pnpm run lint:prettier
pnpm run lint:stylelint
pnpm run lint:lint-stage

# 初始化 git 钩子
pnpm run prepare
```
