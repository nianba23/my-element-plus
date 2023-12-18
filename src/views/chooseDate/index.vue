<template>
    <div>
        <m-choose-date
            @change="onChange"
            :startOptions="attrsOptions"
            :endOptions="attrsOptions"
        ></m-choose-date>
    </div>
</template>

<script setup lang="ts">
const onChange = (date: any) => {
    console.log(date);
};
const attrsOptions = {
    size: 'small'
};
</script>

<style scoped>

</style>