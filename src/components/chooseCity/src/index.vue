<template>
    <el-popover
        v-model:visible="popoverVisible"
        placement="bottom-start"
        :width="400"
        trigger="click"
    >
        <template #reference>
            <el-button plain class="city-select">
                <span class="city-select-text">{{ result || placeholder }}</span>
                <component :is='`el-icon-arrow-down`'></component>
            </el-button>
        </template>
        <div class="container">
            <el-row align="middle">
                <el-col :span="8">
                    <el-radio-group size="small"
                        v-model="radioValue"
                    >
                        <el-radio-button label="按城市" />
                        <el-radio-button label="按省份" />
                    </el-radio-group>
                </el-col>
                <el-col :offset="2" :span="14">
                    <el-select placeholder="请选择城市" size="small" style="margin-top: 3px;"
                        v-model="selectValue"
                        clearable
                        filterable
                        :filter-method="selectFilterMethod"
                        @change="changeSelect"
                    >
                        <el-option
                            v-for="item in selectOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-col>
            </el-row>

            <template v-if="radioValue === '按城市'">
                <div class="city-keys">
                    <div class="city-keys-item"
                        v-for="key in Object.keys(cities)"
                        :key="key"
                        @click="clickKeyItem(key)"
                    >
                        {{ key }}
                    </div>
                </div>
                <el-scrollbar max-height="300px">
                    <template
                        v-for="(value, key) in cities"
                        :key="key"
                    >
                        <el-row class="cities" :id="key">
                            <el-col :span="2">
                                <div class="cities-key">{{ key }} :</div>
                            </el-col>
                            <el-col :span="22" class="city">
                                <div class="city-item"
                                    v-for="item in value"
                                    :key="item.id"
                                    @click="clickCityItem(item)"
                                >
                                    <div>{{ item.name }}</div>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                </el-scrollbar>
            </template>

            <template v-else>
                <div class="province-keys">
                    <div class="province-keys-item"
                        v-for="key in Object.keys(provinceOptions)"
                        :key="key"
                        @click="clickKeyItem(key)"
                    >
                        {{ key }}
                    </div>
                </div>
                <el-scrollbar max-height="300px">
                    <template
                        v-for="(item, index) in Object.values(provinces)"
                        :key="index"
                    >
                        <template
                            v-for="(province, index1) in item"
                            :key="index1"
                        >
                            <el-row class="provinces" :id="province.id">
                                <el-col :span="4">
                                    <div class="provinces-key">{{ province.name }} :</div>
                                </el-col>
                                <el-col :span="20" class="city">
                                    <div class="city-item"
                                        v-for="(city, index2) in province.data"
                                        :key="index2"
                                        @click="clickCityItem(city)"
                                    >
                                        <div>{{ city }}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </template>
                    </template>
                </el-scrollbar>
            </template>
        </div>
    </el-popover>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import cityOptions from '../lib/city';
import { ICityItem } from '../types/index';
import provinceOptions from '../lib/province.json';

defineProps({
    placeholder: {
        type: String,
        default: '请选择',
    },
});

const result = ref('');
const popoverVisible = ref(false);

const radioValue = ref('按城市');
const selectValue = ref('');

const cities = ref(cityOptions.cities);
const provinces = ref(provinceOptions);

const emits = defineEmits(['change']);

const clickKeyItem = (key: string) => {
    const el = document.getElementById(key);
    if (el) {
        el.scrollIntoView();
    }
};
const clickCityItem = (item: ICityItem | string) => {
    if (radioValue.value === '按城市') {
        result.value = (item as ICityItem).name;
    } else {
        result.value = item as string;
    }
    popoverVisible.value = false;
    emits('change', result.value);
};

const selectOptions = ref<ICityItem[]>([]);
const allCity = ref<ICityItem[]>([])
onMounted(() => {
    const values = Object.values(cities.value).flat(2);
    selectOptions.value = values;
    allCity.value = values;
});
const selectFilterMethod = (val: string) => {
    if (val === '') {
        selectOptions.value = allCity.value;
    } else {
        if (radioValue.value === '按城市') {
            // 中文和拼英一起过滤
            selectOptions.value = allCity.value.filter((item) => {
                return item.name.includes(val) || item.spell.includes(val);
            });
        } else {
            // 只中文过滤
            selectOptions.value = allCity.value.filter((item) => {
                return item.name.includes(val);
            });
        }
    }
};
const changeSelect = (val: number) => {
    if (val) {
        const city = allCity.value.find(item => item.id === val)!;
        result.value = city.name;
    } else {
        result.value = '';
    }
    popoverVisible.value = false;
    emits('change', result.value);
};
</script>

<style scoped lang="less">
.city-select {
    .city-select-text {
        margin-right: 6px;
    }

    svg {
        width: 1em;
        height: 2em;
    }
}

.city-keys,
.province-keys {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 8px;

    .city-keys-item,
    .province-keys-item {
        padding: 0 4px;
        margin: 0 8px 8px 0;
        border: 1px solid #eee;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
            background-color: #ecf5ff;
        }
    }
}

.cities,
.provinces {
    margin-bottom: 8px;

    .cities-key,
    .provinces-key {
        position: relative;
        top: 4px;
    }

    .city {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        &-item {
            padding: 4px 6px;
            margin-right: 4px;
            margin-bottom: 2px;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                background-color: #f4f4f5;
            }
        }
    }
}
</style>