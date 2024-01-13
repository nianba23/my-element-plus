const { defineConfig, build } = require('vite');
const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const path = require('path');
const fsExtra = require('fs-extra');

// 打包入口目录
const entryDir = path.resolve(__dirname, '../packages');
// 输出目录
const outDir = path.resolve(__dirname, '../lib');

// vite 配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [
    vue(),
    vueJsx(),
  ],
});

// rollup 配置
const rollupOptions = {
    external: ['vue', 'vue-router'],
    output: {
        globals: {
            vue: 'Vue'
        },
        extend: true
    }
}

// 全量打包组件
const buildAll = async () => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                entry: path.resolve(entryDir, 'index.ts'),
                name: 'nianba-element-components',
                fileName: 'nianba-element-components',
                formats: ['es', 'umd'],
            },
            outDir
        }
    });
};

// 打包单个组件
const buildSingle = async (name) => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                entry: path.resolve(entryDir, name),
                name: 'index',
                fileName: 'index',
                formats: ['es', 'umd'],
            },
            outDir: path.resolve(outDir, name),
        }
    });
}
// 每个组件生成 package.jaon
const createPackageJson = (name) => {
    const fileStr = `
    {
        "name": "${name}",
        "main": "index.umd.js",
        "module": "index.mjs",
        "style": "style.css"
    }
    `;
    fsExtra.outputFile(path.resolve(outDir, `${name}/package.json`), fileStr, 'utf-8');
}

const buildLib = async () => {
    await buildAll();

    // 获取组件名称数组
    const components = fsExtra.readdirSync(entryDir).filter(name => {
        const componentDir = path.resolve(entryDir, name);
        const isDir = fsExtra.lstatSync(componentDir).isDirectory();
        const containsIndexTs = isDir && fsExtra.readdirSync(componentDir).includes('index.ts');
        const containsSrcDir = fsExtra.existsSync(path.resolve(componentDir, 'src'));
        return isDir && containsIndexTs && containsSrcDir;
    });
    // 循环构建
    for (const name of components) {
        await buildSingle(name);
        createPackageJson(name);
    }
}
buildLib();
