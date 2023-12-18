<template>
    <m-menu
        :data="menuItems"
        :defaultActive="$route.path"
        :collapse="collapse"
        router
    ></m-menu>
</template>

<script setup lang="ts">
import { menuItems } from './menus/index';

defineProps<{
  collapse: boolean
}>();
</script>

<style scoped lang="less">

</style>