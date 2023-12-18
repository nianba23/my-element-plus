<template>
    <div class="header">
        <span @click="toggleMenu" class="toggle-menu-icon">
            <el-icon-fold v-show="!collapse" />
            <el-icon-expand v-show="collapse" />
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    collapse: boolean;
}>();
const emits = defineEmits(['update:collapse']);

// 折叠菜单
const toggleMenu = () => {
    emits('update:collapse', !props.collapse);
};
</script>

<style scoped lang="less">
.header {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
};
.toggle-menu-icon {
    margin-right: 10px;
    cursor: pointer;
}
</style>