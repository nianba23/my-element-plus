import { App } from 'vue';
import mTrend from './src/index.vue';

export default {
    install(app: App) {
        app.component('m-trend', mTrend);
    }
}
