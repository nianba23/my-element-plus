<template>
    <div class="trend">
        <div class="text"
            :style="{ color: textColor }"
        >
            <slot>{{ text }}</slot>
        </div>
        <div class="icon">
            <component
                :is='`el-icon${elIconToLine(upIcon)}`'
                v-show="type === 'up'"
                :style="{ color: reverseColor ? '#52c41a' : upIconColor }"
            ></component>
            <component
                :is='`el-icon${elIconToLine(downIcon)}`'
                v-show="type === 'down'"
                :style="{ color: reverseColor ? '#f5222d' : downIconColor }"
            ></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { elIconToLine } from '../../../utils/index';

const props = defineProps({
    type: {
        type: String,
        default: 'up',
    },
    text: {
        type: String,
        default: '上升',
    },
    upIconColor: {
        type: String,
        default: '#f5222d',
    },
    downIconColor: {
        type: String,
        default: '#52c41a',
    },
    upTextColor: {
        type: String,
        default: '#f5222d',
    },
    downTextColor: {
        type: String,
        default: '#52c41a',
    },
    upIcon: {
        type: String,
        default: 'ArrowUp',
    },
    downIcon: {
        type: String,
        default: 'ArrowDown',
    },
    reverseColor: {
        type: Boolean,
        default: false,
    },
});

const textColor = computed(() => {
    return props.type === 'up' ? props.upTextColor : props.downTextColor;
});
</script>

<style scoped lang="less">
.trend {
    display: flex;
    align-items: center;

    .text {
        font-size: 12px;
        margin-right: 4px;
    }

    .icon {
        svg {
            width: 0.8em;
            height: 0.8em;
        }
    }
}
</style>
