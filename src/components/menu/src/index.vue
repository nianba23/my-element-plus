<template>
    <!-- 直接绑定父组件其他属性 -->
    <el-menu class="el-menu-vertical-demo"
        :default-active="defaultActive"
        :router="router"
        v-bind="$attrs"
    >
        <template
            v-for="item in data"
            :key="item[index]"
        >
            <el-menu-item
                :index="item[index]"
                v-if="!item[children] || item[children].length === 0"
            >
                <component
                    v-if="item[icon]"
                    :is="`el-icon${elIconToLine(item[icon])}`"
                />
                <span>{{ item[name] }}</span>
            </el-menu-item>

            <el-sub-menu
                :index="item[index]"
                v-if="item[children] && item[children].length > 0"
            >
                <template #title>
                    <component
                        v-if="item[icon]"
                        :is="`el-icon${elIconToLine(item[icon])}`"
                    />
                    <span>{{ item[name] }}</span>
                </template>
                <el-menu-item
                    v-for="subItem in item[children]"
                    :key="subItem[index]"
                    :index="subItem[index]"
                >
                    <component
                        v-if="subItem[icon]"
                        :is="`el-icon${elIconToLine(subItem[icon])}`"
                    />
                    <span>{{ subItem[name] }}</span>
                </el-menu-item>
            </el-sub-menu>
        </template>
    </el-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IMenuItem } from '../types/index';
import { elIconToLine } from '../../../utils';

defineProps({
    data: {
        type: Array as PropType<IMenuItem[]>,
        required: true,
    },
    defaultActive: {
        type: String,
        default: '',
    },
    router: {
        type: Boolean,
        default: false,
    },
    // 组件不一定按照 IMenuItem 属性名进行设置，可以支持自定义属性名
    name: {
        type: String,
        default: 'name',
    },
    icon: {
        type: String,
        default: 'icon',
    },
    index: {
        type: String,
        default: 'index',
    },
    children: {
        type: String,
        default: 'children',
    },
});
</script>

<style scoped lang="less">
svg {
    width: 1em;
    height: 1em;
    margin-right: 4px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style> 