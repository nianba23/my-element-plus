<template>
    <div v-bind:class="{'m-dialog-body-height': isScroll}">
        <el-dialog
            v-model="dialogVisible"
            v-bind="$attrs"
        >
            <template #default>
                <m-form ref="form"
                    :options="options"
                    label-width="80px"
                    @on-change="onChange"
                    @before-upload="beforeUpload"
                    @on-preview="onPreview"
                    @on-remove="onRemove"
                    @before-remove="beforeRemove"
                    @on-success="onSuccess"
                    @on-exceed="onExceed"
                >
                    <template #uploadArea>
                        <slot name="uploadArea"></slot>
                    </template>
                    <template #uploadTip>
                        <slot name="uploadTip"></slot>
                    </template>
                </m-form>
            </template>

            <template #footer>
                <slot name="footer" :form="form"></slot>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, PropType } from 'vue';
import { FormOptions, FormInstance } from '../../form/types';

const props = defineProps({
    isScroll: {
        type: Boolean,
        default: true,
    },
    visible: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    onChange: {
        type: Function
    },
    beforeUpload: {
        type: Function
    },
    onPreview: {
        type: Function
    },
    onRemove: {
        type: Function
    },
    beforeRemove: {
        type: Function
    },
    onSuccess: {
        type: Function
    },
    onExceed: {
        type: Function
    },
});
const form = ref<FormInstance | null>(null);
const emits = defineEmits(['update:visible']);

const dialogVisible = ref(props.visible);

watch(() => props.visible, (val: boolean) => {
    dialogVisible.value = val;
});
watch(() => dialogVisible.value, (val: boolean) => {
    emits('update:visible', val);
});
</script>

<style scoped>

</style>