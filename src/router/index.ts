import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Container from '../components/container/src/index.vue';
import Home from '../views/Home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Container,
        children: [
            {
                path: '/',
                component: Home,
            },
        ],
    },
];
// @ts-ignore
const viewsContext = import.meta.glob('../views/**/*.vue');
const homePath = '../views/Home.vue';
// 处理 src/views 目录下的其他路由
Object.entries(viewsContext).map(([path, component]) => {
    if (path.toLowerCase() !== homePath.toLocaleLowerCase()) {
        routes[0].children?.push({
            path: `/${path.replace(/^\.\.\/views\/(.*\/)?(.*)\/index\.vue$/, '$1$2')}`,
            // 不能直接通过 path 去拼接，否则生产环境找不到
            component,
        });
    }
});

const router = createRouter({
    // 内部提供了 history 模式的实现。简单起见也可以使用 hash 模式
    history: createWebHistory(),
    routes,
});

export default router;
