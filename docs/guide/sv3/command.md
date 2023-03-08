# 项目指令使用

## 运行项目
```bash
# 本地运行项目
pnpm run dev
```

## 项目打包
```bash
# 打包文件在 /dist 中生成
pnpm run build
```

## 模板生成
- router 生成路由模板
- page 生成页面模板
- store 生成pinia模板
- mock 生成数据模拟模板
```bash
# 生成项目模板
# 有四种模板供选择
pnpm run gen
```

## 代码规范检查
```js
pnpm run lint:eslint
pnpm run lint:prettier
pnpm run lint:stylelint
pnpm run lint:lint-stage
```

## 初始化 husky
```js
pnpm run prepare
```