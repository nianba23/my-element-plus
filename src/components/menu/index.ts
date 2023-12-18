import mMenu from './src/index.vue';
import mInfiniteMenu from './src/menu';
import { App } from 'vue';

export default {
    install(app: App) {
        app.component('m-menu', mMenu);
        app.component('m-infinite-menu', mInfiniteMenu);
    }
}
