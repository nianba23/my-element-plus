<template>
    <div>
        <el-select class="mr-1" placeholder="请选择省份"
            v-model="province"
            clearable
        >
            <el-option
                v-for="item in provinceOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
            />
        </el-select>
        <el-select class="mr-1" placeholder="请选择城市"
            v-model="city"
            clearable
            :disabled="!province"
        >
            <el-option
                v-for="item in cityOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
            />
        </el-select>
        <el-select class="mr-1" placeholder="请选择区域"
            v-model="area"
            clearable
            :disabled="!province || !city"
        >
            <el-option
                v-for="item in areaOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
            />
        </el-select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
import allAreas from '../lib/pca-code.json';
import { IAreaItem, IAreaData, IResData } from '../types/index';

const provinceOptions = ref<IAreaItem[]>(allAreas);
const cityOptions = ref<IAreaItem[]>([]);
const areaOptions = ref<IAreaItem[]>([]);
const province = ref<string>('');
const city = ref<string>('');
const area = ref<string>('');
watch(() => province.value, (value: string) => {
    if (value) {
        let cities = provinceOptions.value.find((item: IAreaItem) => item.code === value)!.children;
        cityOptions.value = cities || [];
    }
    city.value = '';
    area.value = '';
});
watch(() => city.value, (value) => {
    if (value) {
        let areas = cityOptions.value.find((item: IAreaItem) => item.code === value)!.children;
        areaOptions.value = areas || [];
    }
    area.value = '';
});

const emits = defineEmits(['change']);
watch(() => area.value, (value: string) => {
    let resData: IResData | {} = {};
    if (value) {
        const provinceData: IAreaData = {
            code: province.value,
            name: provinceOptions.value.find((item: IAreaItem) => item.code === province.value)!.name,
        };
        const cityData: IAreaData = {
            code: city.value,
            name: cityOptions.value.find((item: IAreaItem) => item.code === city.value)!.name,
        };
        const areaData: IAreaData = {
            code: value,
            name: areaOptions.value.find((item: IAreaItem) => item.code === value)!.name,
        };
        resData = {
            province: provinceData,
            city: cityData,
            area: areaData,
        };
    }
    emits('change', resData);
});
</script>

<style scoped lang="less">
.mr-1 {
    margin-right: 10px;
}
</style>