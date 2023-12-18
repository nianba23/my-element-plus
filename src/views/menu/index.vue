<template>
    <div>
        <m-menu style="width: 200px;"
            :data="menus"
            defaultActive="1"
        ></m-menu>
    </div>
    <br />
    <div>
        <m-infinite-menu style="width: 200px;"
            :data="menus2"
            defaultActive="2"
            background-color="#e9e9eb"
        ></m-infinite-menu>
    </div>
</template>

<script setup lang="ts">
import { menus, menus2 } from './ts/index';
</script>

<style scoped>

</style>