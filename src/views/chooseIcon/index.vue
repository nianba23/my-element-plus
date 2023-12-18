<template>
    <div>
        <m-choose-icon
            title="选择图标"
            v-model:visible="visible"
        >
            点击选择图标
        </m-choose-icon>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// dialog 组件显示隐藏
const visible = ref<boolean>(false);
</script>

<style scoped lang="less">

</style>