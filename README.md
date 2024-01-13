# Vue 3 + TypeScript + Vite + element-plus

## 打包组件

参考`command/build.js`文件，需要支持全局打包和单独组件打包，便于全局引入或按需引入。以及支持不同模块系统。

这里只是简单示例，需要手动将 components 下的文件都复制到入口 packages 目录下，然后新建一个 vue.d.ts 文件，用于描述组件的类型。同时手动修改文件内的引入路径。

```
/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
```

## 发布组件

打出包后，创建 `package.json` 文件并配置

```json
{
    "name": "nianba-element-components",
    "version": "1.0.0",
    "main": "index.mjs",
    "module": "index.mjs",
    "types": "index.d.ts",
    "author": "nianba",
    "keywords": "vue,element-plus,components",
}
```

注意：types 是告知使用者这个组件库是一个 vue 组件库，每个组件目录内也需要创建一个 `index.d.ts` 文件，用于描述组件的类型。
```
import { App } from 'vue';
declare const _default: {
    install(app: App): void;
}
export default _default;
```

在打出的包目录，`npm login` 登录 npm 账号，然后执行 `npm publish`。发布成功后可以进入 npm 官网查看。

要更新发布的组件库版本，修改代码后重新打包，包的 package.json 中的 version 版本升级，再执行 `npm publish`。

## 部署到 GitHub

执行 `npm run build`，打包组件库（注意：需要修改路由模式，这样在 GitHub 上才能正常显示）。提交到 GitHub 仓库后，在仓库的 settings 中开启 pages 功能。
