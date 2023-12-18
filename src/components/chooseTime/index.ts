import { App } from 'vue';
import chooseTime from './src/index.vue';

// 注册全局组件
export default {
    install(app: App) {
        app.component('m-choose-time', chooseTime);
    },
}
