<template>
    <div>
        <div class="flex">
            <m-trend text="销售额"></m-trend>
            <m-trend text="营业额" type="down"></m-trend>
        </div>
        <div class="flex">
            <m-trend text="销售额" upIconColor="blue"></m-trend>
            <m-trend text="营业额" type="down" downIconColor="red"></m-trend>
        </div>
        <div class="flex">
            <m-trend text="销售额">销售业绩</m-trend>
            <m-trend text="营业额" type="down">营收情况</m-trend>
        </div>
        <div class="flex">
            <m-trend text="销售额" reverseColor></m-trend>
            <m-trend text="营业额" type="down" reverseColor></m-trend>
        </div>
        <div class="flex">
            <m-trend text="销售额" ></m-trend>
            <m-trend text="营业额" type="down"></m-trend>
        </div>
        <div class="flex">
            <m-trend text="销售额" upIcon="Avatar"></m-trend>
            <m-trend text="营业额" type="down" downIcon="HelpFilled"></m-trend>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.flex {
    display: flex;
    margin-bottom: 10px;

    > .trend:not(:last-child) {
        margin-right: 16px;
    }
}
</style>