<template>
    <el-progress
        :percentage="progress"
        v-bind="$attrs"
    ></el-progress>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
    percentage: {
        type: Number,
        default: 0,
    },
    isAnimation: {
        type: Boolean,
        default: false,
    },
    time: {
        type: Number,
        default: 2000,
    },
});

const progress = ref(0);
onMounted(() => {
    if (props.isAnimation) {
        const t = Math.ceil(props.time / props.percentage);
        const timer = setInterval(() => {
            progress.value += 1;
            if (progress.value >= props.percentage) {
                clearInterval(timer);
            }
        }, t);
    } else {
        progress.value = props.percentage;
    }
});
</script>

<style scoped lang="less">
svg {
    width: auto;
    height: auto;
}
</style>