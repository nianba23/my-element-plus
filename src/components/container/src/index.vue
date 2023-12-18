<template>
    <el-container>
        <el-aside width="auto">
            <nav-side
                :collapse="isCollapse"
            ></nav-side>
        </el-aside>

        <el-container>
            <el-header>
                <nav-header
                    v-model:collapse="isCollapse"
                ></nav-header>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>

            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavHeader from './navHeader/index.vue';
import NavSide from './navSide/index.vue';

// 菜单折叠
const isCollapse = ref<boolean>(false);

</script>

<style lang="less" scoped>
.el-header {
    padding: 0;
    border-bottom: 1px solid #eee;
}
</style>