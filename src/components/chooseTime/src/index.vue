<template>
    <div class="time-select">
        <div>
            <el-time-select
                v-model="startTime"
                :max-time="endTime"
                :placeholder="startTimePlaceholder"
                :start="startTimeStart"
                :step="startTimeStep"
                :end="startTimeEnd"
                v-bind="$attrs.startOptions"
            />
        </div>
        <div class="time-select-divider">
            <span>{{ divider }}</span>
        </div>
        <div>
            <el-time-select
                v-model="endTime"
                :min-time="startTime"
                :placeholder="endTimePlaceholder"
                :start="endTimeStart"
                :step="endTimeStep"
                :end="endTimeEnd"
                :disabled="endTimeDisabled"
                v-bind="$attrs.endOptions"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

defineProps({
    startTimePlaceholder: {
        type: String,
        default: '请选择开始时间',
    },
    startTimeStart: {
        type: String,
        default: '06:00',
    },
    startTimeStep: {
        type: String,
        default: '00:30',
    },
    startTimeEnd: {
        type: String,
        default: '18:00',
    },
    endTimePlaceholder: {
        type: String,
        default: '请选择结束时间',
    },
    endTimeStart: {
        type: String,
        default: '06:00',
    },
    endTimeStep: {
        type: String,
        default: '00:30',
    },
    endTimeEnd: {
        type: String,
        default: '18:00',
    },
    divider: {
        type: String,
        default: '-',
    },
});

const startTime = ref('');
const endTime = ref('');
const endTimeDisabled = ref(true);

const emits = defineEmits(['change']);

watch(() => startTime.value, (val: string) => {
    if (!val) {
        if (!endTime.value) {
            emits('change', {
                startTime: val,
                endTime: endTime.value,
            });
        } else {
            endTime.value = '';
        }
        endTimeDisabled.value = true;
    } else {
        endTimeDisabled.value = false;
        emits('change', {
            startTime: val,
            endTime: endTime.value,
        });
    }
});
watch(() => endTime.value, (val: string) => {
    emits('change', {
        startTime: startTime.value,
        endTime: val,
    });
});
</script>

<style scoped lang="less">
.time-select {
    display: flex;
    align-items: center;

    .time-select-divider {
        margin: 0 10px;
        color: #ccc;
        max-width: 32px;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>
