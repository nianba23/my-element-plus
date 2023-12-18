<template>
    <div>
        <m-choose-city
            @change="onChange"
        ></m-choose-city>
    </div>
</template>

<script setup lang="ts">
const onChange = (data: string) => {
    console.log(data);
};
</script>

<style scoped>

</style>