import { App } from 'vue';
import form from './src/index.vue';

// 注册全局组件
export default {
    install(app: App) {
        app.component('m-form', form);
    },
}
