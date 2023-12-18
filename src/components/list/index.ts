import { App } from 'vue';
import mList from './src/index.vue';

export default {
    install(app: App) {
        app.component('m-list', mList);
    }
}
