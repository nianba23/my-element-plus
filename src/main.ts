import { createApp } from 'vue';
import App from './App.vue';
import Router from './router/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIcons from '@element-plus/icons-vue';
import { elIconToLine } from './utils/index';
import mUI from './components/index';
// import mUI from '../lib/nianba-element-components.mjs';
// import '../lib/style.css';

const app = createApp(App);
// 全局注册所有 element 图标，el-icon-xxx-yy 使用
// 也可以不全局引入，在需要的组件中按需引入
for (const [key, component] of Object.entries(ElementPlusIcons)) {
    app.component(`el-icon${elIconToLine(key)}`, component);
}
// 全局使用自定义的组件
app.use(Router).use(ElementPlus).use(mUI);
app.mount('#app');
