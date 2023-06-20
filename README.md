## web

### 命名规范

CamelCase（大驼峰式命名法 —— 首字母大写）
所有文件采用英文命名，遵循语义化

- 1 项目名：全部采用小写方式， 以下划线分隔。例：my_project_name。
- 2 目录名：参照项目命名规则，有复数结构时，要采用复数命名法。例：docs、assets、components。
- 3 图像文件名：全部采用小写方式， 优先选择单个单词命名，多个单词命名以下划线分隔。例：banner_sina.gif。
- 4.基础组件名：作为项目的基础控件，会被大量使用，全部以一个特定的前缀开头比如 —— Base。例：BaseButton.vue，BaseTable.vue。
- 5.业务组件，js 文件：语义化。
- 6.Vue 组件命名：文件扩展名为 .vue 的 single-file components (单文件组件)。除 index.vue 之外，其他.vue 文件统一用 PascalBase 风格。

---

### Git 规范

每天开发前养成先 git pull 的习惯

```
git commit -m [fix](登录按钮多次调用接口)

    name: feat:     新功能
    name: fix:      修复
    name: docs:     文档变更
    name: style:    代码格式(不影响代码运行的变动)
    name: refactor: 重构(既不是增加feature，也不是修复bug),
    name: perf:     性能优化
    name: test:     增加测试
    name: chore:    构建过程或辅助工具的变动
    name: revert:   回退
    name: build:    打包
```

---

### 简介

[Vue-Vquasar-Admin](https://git.it.hoyuan.com:40443/SJ-00203/vquasar)是一个基于[Vue3.0](https://github.com/vuejs/core)、[quasar 中文](https://www.quasar-cn.cn/start/pick-quasar-flavour)、[TypeScript](https://www.typescriptlang.org/) 的后台解决方案，作为项目的启动模版，以帮助你快速搭建企业级中后台产品原型。

#### 本地运行文档

如需本地运行文档，请拉取代码到本地。

```
# 拉取代码
git clone https://git.it.hoyuan.com:40443/SJ-00203/vquasar

# 安装依赖
yarn
pnpm i

# 运行项目
yarn dev
pnpm run dev
```

#### 浏览器支持

**本地开发**推荐使用 Chrome 最新版浏览器，**不支持**Chrome 80 以下版本。

**生产环境**支持现代浏览器，不支持 IE。

---

### 开始

本文会帮助你从头启动项目

#### 前言

> 关于组件
>
> 项目虽然二次封装了一些组件，但是可能不能满足大部分的要求。所以，如果组件不满足你的要求，完全可以不用甚至删除代码>自己写，不必坚持使用项目自带的组件。

#### 环境准备

本地环境需要安装 pnpm、Node.js 和 Git

#### 工具配置

如果您使用的 IDE 是 vscode(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Iconify 图标插件
- [windicss IntelliSense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - windicss 提示插件
- [I18n-ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) - i18n 插件
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - vue 开发必备 （也可以选择 Volar）
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [Prettier]() - 代码格式化
- [Stylelint]() - css 格式化
- [DotENV]() - .env 文件 高亮

---

### 文件夹结构

```
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── api                  # 接口文件
│   ├── boot                 # 启动文件会在 Vue 根实例创建之前被执行
│   │   ├── i18n             # 国际化配置
│   │   ├── axios            # axios封装
|   │   ├── components       # 可复用公共组件
|   │   ├── hooks               # hooks
│   │   │   ├── component            # 组件相关hook
│   │   │   ├── core                 # 基础hook
│   │   │   ├── event                # 事件相关hook
│   │   │   ├── setting              # 配置相关hook
│   │   │   └── web                  # web相关hook
|   ├── css                  # 公共样式
|   ├── layouts              # 布局文件
│   ├── pages                # 业务页面入口和常用模板
│   ├── router               # 路由
│   └── stores               # 状态管理库
├── src-electron             # 桌面应用配置
├── quasar.config            # 集成配置项
├── README.md
└── package.json
```

UI 选用 [quasar](www.quasar-cn.cn/vue-components) 组件库

### 页面代码结构规范

```
src
├── common
└── pages
    ├── Welcome        // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
    |   ├── Form.tsx
    |   ├── index.tsx  // 页面组件的代码
    |   └── index.less // 页面样式
    ├── User
    |   ├── components // group 下公用的组件集合
    |   ├── Login      // group 下的页面 Login
    |   ├── Register   // group 下的页面 Register
    |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
    └── *              // 其它页面组件代码
```

不要在路由组件内部再嵌套路由组件
尽可能的拆分路由组件为更细粒度的组件，对于多个页面可能会用到的组件放到 common/components 中，对于只是被单个页面依赖的（区块）组件，就近维护到路由组件文件夹下即可。

---

### 配置

#### 环境变量配置

项目的环境变量配置位于项目根目录下的 .env.development、.env.production

具体可以参考 [Vite](https://github.com/vitejs/vite#modes-and-environment-variables) 文档

#### 多语言配置

用于配置多语言信息

在 src/i18n boot/i18n.ts 内配置

```
import enUS from './lang/en';
import zhCn from './lang/zh_CN';
export default {
  'zh-CN': zhCn,
  'en-US': enUS
};

```

---

### quasar 样式

**开发前先读**[文档](https://www.quasar-cn.cn/style/)

> 字体
> Class 类名 | 功能
> -------- | -----
> text-right | 文字靠右对齐
> text-center | 文字居中对齐
> [地址](https://www.quasar-cn.cn/style/typography)

> 调色
> 使用 text- 或者 bg- 当作前缀，然后加上一个预设的颜色的名称，就可以改变文本/背景的颜色
> Class 类名 | 功能
> -------- | -----
> text-primary | changing text color
> bg-positive | changing background color
> [地址](https://www.quasar-cn.cn/style/color-palette)

> 间距
> Quasar 提供了这些 CSS 工具类来帮您在页面布局时调整 DOM 之间的间距。 这些 CSS 类名的命名规则是 q-TD-S,其中 q-是统一前缀，T 是类型表示内/外边距，D 是方向，S 是大小，详情见下表

语法

> q-[p|m][t|r|b|l|a|x|y]-[none|auto|xs|sm|md|lg|xl]
> T D S
> T - 类型
>
> - 可取值: p , m。p 表示 padding（内边距），m 表示 margin（外边距）
>   D - 方向
> - 可取值:

      t (top-上), r (right-右), b (bottom-下), l (left-左),
      a (all-全部方向), x (水平方向即左和右), y (垂直方向即上和下)

> S - 大小
>
> - 可取值:

      none (表示间距等于 0)
      auto (只能用于: q-ml-*, q-mr-*, q-mx-*),
      xs (extra small-很小),
      sm (small-小),
      md (medium-中等),
      lg (large-大),
      xl (extra large-很大)

| Class 类名      | 功能                                                                          |
| --------------- | ----------------------------------------------------------------------------- |
| q-pa-sm         | 在上下左右所有方向上都加一个大小为 small 的内边距 (padding)                   |
| q-mt-md q-mr-sm | 在上方加一个大小为 medium 的外边距 (margin),在右边加一个大小为 small 的外边距 |

[地址](https://www.quasar-cn.cn/style/spacing#%E8%AF%AD%E6%B3%95)

> 开启 flex，布局抽屉等具体查看[文档](https://www.quasar-cn.cn/layout/grid)

---

### 路由

项目路由配置存放于 src/router/routes 下面。 src/router/routes/modules 用于存放路由模块，在该目录下的文件会自动注册。
Meta 配置说明

```
  // 是否缓存
  keepAlive: true,
  // 路由name  一般必填
  name: 'layout.routerName.fastStart.home.name',
  // 路由title  一般必填
  title: 'layout.routerName.fastStart.home.title',
  // 图标
  icon: 'tune',
```

#### 新增路由

在 src/router/routes/modules 内新增一个模块文件。

```
import type { AppRouteModule } from 'src/router/types';
const dashboard: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: () => import('layouts/MainLayout.vue'),
  redirect: '/about/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: 'a',
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      meta: {
        title: 'b',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default dashboard;
```

此时路由已添加完成，不需要手动引入，放在 src/router/routes/modules 内的文件会自动被加载。

### 验证

访问 ip:端口/about/index 出现对应组件内容即代表成功

---

### 权限

路由权限，按钮权限等后端给出规则

---

### 联调

#### 配置

开发环境时候，接口地址在项目根目录下

.env.development 文件配置

```
# vite 本地跨域代理
VITE_PROXY = [["/basic-api","http://localhost:3000"],["/upload","http://localhost:3300/upload"]]
# 接口地址
VITE_GLOB_API_URL=/api
```

#### 跨域处理

配置 quasar.config.js 下 devServer 的 proxy 详见[Vite server options](https://vitejs.dev/config/#server-options)

#### 没有跨域时的配置

如果没有跨域问题，可以直接忽略 VITE_PROXY 配置，直接将接口地址设置在 VITE_GLOB_API_URL

#### 生产环境

生产环境接口地址在项目根目录下 .env.production 文件配置。

生产环境接口地址值需要修改 VITE_GLOB_API_URL，如果出现跨域问题，可以使用 nginx 或者后台开启 cors 进行处理

#### 接口请求

1. 页面交互操作；
2. 调用统一管理的 api 请求函数；
3. 使用封装的 axios.ts 发送请求；
4. 获取服务端返回数据
5. 更新 data；
   接口统一存放于 src/api/ 下面管理

以登陆接口为例:

在 src/api/ 内新建模块文件，其中参数与返回值最好定义一下类型，方便校验。虽然麻烦，但是后续维护字段很方便。

> TIP
> 类型定义文件可以抽取出去统一管理，具体参考项目

```
import { Login } from "./interface";
import qs from "qs";
import { axiosMan } from 'boot/axios'
/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return axiosMan.post<Login.ResLogin>(`/login`, params);
  return axiosMan.post<Login.ResLogin>(`/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  return axiosMan.post<Login.ResLogin>(`/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
  return axiosMan.post<Login.ResLogin>(`/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};


```

#### axios 配置

axios 请求封装存放于 src/boot/axios 文件夹内部

除 axios.ts 文件内容需要根据项目自行修改外，其余文件无需修改

#### Mock 服务

推荐使用 apifox 进行前后端联调，apifox 自带 mock 功能

---

### 组件注册

#### 按需引入

项目目前的组件注册机制是按需注册，是在需要用到的页面才引入。

```
<script setup lang="ts">
import BaseContent from "components/BaseContent/index.vue";
</script>
<template>
	<BaseContent>
		<div>123</div>
	</BaseContent>
</template>

```

BaseContent 组件可自行更改或替换，建议页面引入统一边距背景。

---

### 全局样式

#### 介绍

主要介绍如何在项目中使用和规划样式文件。
src/css/app.scss 配置全局
quasar.variables.scss 配置变量

```
<!-- 注意 lang="sass" -->
<style lang="sass">
div
  color: $red-1
  background-color: $grey-5
</style>

<!-- 注意 lang="scss" -->
<style lang="scss">
div {
  color: $red-1;
  background-color: $grey-5;
}
</style>
```

[地址](https://www.quasar-cn.cn/style/sass-scss-variables)

---

### 构建&部署

#### 构建

项目开发完成之后，执行以下命令进行构建

```
pnpm rub build
```

构建打包成功之后，会在根目录生成 dist 文件夹，里面就是构建打包好的文件

#### 部署

> 发布
> 简单的部署只需要将最终生成的静态文件，dist 文件夹的静态文件发布到你的 cdn 或者静态服务器即可，需要注意的是其中的 index.html 通常会是你后台服务的入口页面，在确定了 js 和 css 的静态之后可能需要改变页面的引入路径。

例如上传到 nginx

/srv/www/project/index.html

```
# nginx配置
location / {
  # 不缓存html，防止程序更新后缓存继续生效
  if ($request_filename ~* .*\.(?:htm|html)$) {
    add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    access_log on;
  }
  # 这里是vue打包文件dist内的文件的存放路径
  root   /srv/www/project/;
  index  index.html index.htm;
}

```

---

### Electron

运行

```
pnpm rub dev:el
```

打包

```
pnpm rub build:el
```
