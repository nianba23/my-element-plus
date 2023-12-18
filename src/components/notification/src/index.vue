<template>
    <el-popover
        placement="bottom"
        :width="300"
        trigger="click"
        :disabled="popoverDisabled"
    >
        <template #default>
            <slot>this is content</slot>
        </template>

        <template #reference>
            <el-badge
                :value="value"
                :max="max"
                :is-dot="isDot"
            >
                <component :is="`el-icon${elIconToLine(icon)}`"></component>
            </el-badge>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import { elIconToLine } from '../../../utils/index';

defineProps({
    icon: {
        type: String,
        default: 'Bell',
    },
    value: {
        type: [Number, String],
        default: '',
    },
    max: {
        type: Number,
    },
    isDot: {
        type: Boolean,
    },
    popoverDisabled: {
        type: Boolean,
        default: true,
    },
});
</script>

<style scoped>
svg {
    width: 1em;
    height: 1em;
}
</style>