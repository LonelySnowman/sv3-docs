# 快速开始

## 📕克隆项目

- 使用 git 下载项目模板

```bash
# 下载包含简单示例的版本
git clone git@github.com:LonelySnowman/sv3-template.git

# 下载除去示例用于快速开始项目的 thin 版本
git clone -b thin git@github.com:LonelySnowman/sv3-template.git
```

- 项目包含命令行cli下载工具

```bash
# 下载工具包
npm install arceus-cli -g

# 选择模板创建项目
arceus create
```

## 🚗安装依赖

```bash
# 进入项目根目录
cd sv3-template

# 本项目推荐使用pnpm进行依赖管理
pnpm install
```

## 🚀启动项目

```bash
pnpm run dev
```

<br/>

- 默认在 3000 端口启动
- 点击访问：http://localhost:3000
