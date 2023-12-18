<template>
    <div>
        <m-choose-area
            @change="changeArea"
        ></m-choose-area>
    </div>
</template>

<script setup lang="ts">
import { IResData } from '../../components/chooseArea/types/index';

const changeArea = (data: IResData | {}) => {
    console.log('---',data);
}
</script>

<style scoped lang="less">

</style>