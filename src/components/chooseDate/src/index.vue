<template>
    <div class="date-select">
        <div>
            <el-date-picker
                v-model="startDate"
                type="date"
                :placeholder="startPlaceholder"
                :disabled-date="startDisabledDate"
                v-bind="$attrs.startOptions"
            />
        </div>
        <div class="date-select-divider">
            <span>{{ divider }}</span>
        </div>
        <div>
            <el-date-picker
                v-model="endDate"
                type="date"
                :placeholder="endPlaceholder"
                :disabled="endDateDisabled"
                :disabled-date="endDisabledDate"
                v-bind="$attrs.endOptions"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    startPlaceholder: {
        type: String,
        default: '请选择开始日期',
    },
    endPlaceholder: {
        type: String,
        default: '请选择结束日期',
    },
    disabledBeforeToday: {
        type: Boolean,
        default: true,
    },
    divider: {
        type: String,
        default: '-',
    },
});

const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const startDisabledDate = (time: Date) => {
    if (props.disabledBeforeToday) {
        return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
    }
};
const endDateDisabled = ref(true);
const endDisabledDate = (time: Date) => {
    if (startDate.value) {
        return time.getTime() < startDate.value.getTime();
    }
};

const emits = defineEmits(['change']);
watch(() => startDate.value, (value: Date | null) => {
    if (!value) {
        if (!endDate.value) {
            emits('change', {
                startDate: value,
                endDate: endDate.value,
            });
        } else {
            endDate.value = null;
        }
        endDateDisabled.value = true;
    } else {
        endDateDisabled.value = false;
        emits('change', {
            startDate: value,
            endDate: endDate.value,
        });
    }
});
watch(() => endDate.value, (value: Date | null) => {
    emits('change', {
        startTime: startDate.value,
        endTime: value,
    });
});
</script>

<style scoped lang="less">
.date-select {
    display: flex;
    align-items: center;

    .date-select-divider {
        margin: 0 10px;
        color: #ccc;
        max-width: 32px;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>
