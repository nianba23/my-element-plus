<template>
    <div>
        <m-choose-time
            :startOptions="attrsOptions"
            :endOptions="attrsOptions"
            @change="onChange"
        ></m-choose-time>
    </div>
</template>

<script setup lang="ts">
const onChange = (data: string) => {
    console.log(data)
}
const attrsOptions = {
    size: 'small'
};
</script>

<style scoped>

</style>