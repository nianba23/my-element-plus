<template>
    <el-button @click="handleClick" type="primary">
        <slot>选择图标</slot>
    </el-button>

    <div class="m-choose-icon-dialog-dialog__body">
        <!-- visible 通过父组件 props 传递不可修改，不能直接使用 v-model -->
        <el-dialog
            v-model="dialogVisible"
            :title="title"
        >
            <el-scrollbar height="500px">
                <div class="container">
                    <div class="item"
                        v-for="(item, index) in Object.keys(elementPlusIcons)"
                        :key="index"
                        @click="clickItem(item)"
                    >
                        <div>
                            <component :is='`el-icon${elIconToLine(item)}`'></component>
                        </div>
                        <div class="text">{{ item }}</div>
                    </div>
                </div>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import * as elementPlusIcons from '@element-plus/icons-vue';
import { elIconToLine } from '../../../utils/index';
import { useCopy } from '../../../hooks/useCopy';

const props = defineProps<{
  title: string,
  visible: boolean,
}>();

// dialog 组件显示隐藏
const dialogVisible = ref<boolean>(props.visible);
const handleClick = () => {
    dialogVisible.value = true;
};
const emits = defineEmits(['update:visible']);
watch(() => dialogVisible.value, (val: boolean) => {
    emits('update:visible', val);
});

// 复制图标元素
const clickItem = (item: string) => {
    const text = `<el-icon${elIconToLine(item)} />`;
    useCopy(text);
    dialogVisible.value = false;
};
</script>

<style scoped lang="less">
.container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item {
        width: 20%;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .text {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            margin: 5px 0 20px 0;
        }
    }

    svg {
        width: 2em;
        height: 2em;
    }
}
</style>