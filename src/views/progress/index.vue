<template>
    <div>
        <m-progress
            isAnimation
            :percentage="60"
        ></m-progress>
        <m-progress
            isAnimation
            :text-inside="true"
            :stroke-width="24"
            :percentage="70"
        ></m-progress>
        <m-progress
            isAnimation
            type="circle"
            :percentage="50"
        ></m-progress>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>