<template>
    <el-form ref="form"
        v-if="model"
        v-bind="$attrs"
        :model="model"
        :rules="rules"
        :validate-on-rule-change="false"
    >
        <template v-for="(item, index) in options" :key="index">
            <el-form-item
                v-if="!item.children || !item.children!.length"
                :label="item.label"
                :prop="item.prop"
            >
                <component
                    v-if="item.type !== 'upload' && item.type !== 'editor'"
                    :is="`el-${item.type}`"
                    v-bind="item.attrs"
                    v-model="model[item.prop!]"
                ></component>

                <el-upload
                    v-if="item.type === 'upload'"
                    v-bind="item.uploadAttrs"
                    :on-preview="onPreview"
                    :on-remove="onRemove"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :on-progress="onProgress"
                    :on-change="onChange"
                    :before-upload="beforeUpload"
                    :before-remove="beforeRemove"
                    :on-exceed="onExceed"
                >
                    <slot name="uploadArea"></slot>
                    <template #tip><slot name="uploadTip"></slot></template>
                </el-upload>

                <div v-if="item.type === 'editor'" id="editor"></div>
            </el-form-item>

            <el-form-item
                v-if="item.children && item.children.length"
                :label="item.label"
                :prop="item.prop"
            >
                <component
                    :is="`el-${item.type}`"
                    v-bind="item.attrs"
                    v-model="model[item.prop!]"
                >
                    <component
                        v-for="(child, i) in item.children"
                        :key="i"
                        :is="`el-${child.type}`"
                        v-bind="child.attrs"
                        :label="child.label"
                        :value="child.value"
                    ></component>
                </component>
            </el-form-item>
        </template>

        <el-form-item>
            <slot name="action"
                :form="form"
                :model="model"
            ></slot>
        </el-form-item>
     </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps, onMounted, watch, defineEmits, nextTick, defineExpose } from 'vue';
import { FormOptions, FormInstance } from '../types/index';
import cloneDeep from 'lodash/cloneDeep';
import E from 'wangeditor';

const props = defineProps({
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    httpRequest: {
        type: Function,
    },
});

const emits = defineEmits([
    'on-preview',
    'on-remove',
    'on-success',
    'on-error',
    'on-progress',
    'on-change',
    'on-before-upload',
    'on-before-remove',
    'http-request',
    'onExceed'
]);

const form = ref<FormInstance | null>(null);
const edit = ref();

const model = ref<any>(null);
const rules = ref<any>(null);

const initForm = () => {
    if (props.options && props.options.length) {
        let m: any = {};
        let r: any = {};
        props.options.map((item: FormOptions) => {
            m[item.prop!] = item.value;
            r[item.prop!] = item.rules;

            if (item.type === 'editor') {
                nextTick(() => {
                    const editor = new E('#editor');
                    editor.config.placeholder = item.placeholder || '';
                    editor.create();
                    editor.txt.html(item.value);
                    editor.config.onchange = (html: string) => {
                        model.value[item.prop!] = html;
                    };
                    edit.value = editor;
                });
            }
        });
        model.value = cloneDeep(m);
        rules.value = cloneDeep(r);
    }
};

const resetFields = () => {
    form.value!.resetFields();
    if (props.options && props.options.length) {
        const editorItem = props.options.find(item => item.type === 'editor');
        if (editorItem) {
            edit.value.txt.html(editorItem.value);
        }
    }
};
const validate = () => {
    return form.value!.validate;
};
const getFormData = () => {
    return model.value;
};

// 分发方法
defineExpose({
    resetFields,
    validate,
    getFormData,
});

onMounted(() => {
    initForm();
});

watch(() => props.options, () => {
    initForm();
}, { deep: true });

// 上传组件所有方法
const onPreview = (file: File) => {
    emits('on-preview', file);
};
const onRemove = (file: File, fileList: FileList) => {
    emits('on-remove', { file, fileList });
};
const onSuccess = (response: any, file: File, fileList: FileList) => {
    let uploadItem = props.options.find(item => item.type === 'upload');
    model.value[uploadItem!.prop!] = { response, file, fileList };
    emits('on-success', { response, file, fileList });
};
const onError = (err: any, file: File, fileList: FileList) => {
    emits('on-error', { err, file, fileList });
};
const onProgress = (event: any, file: File, fileList: FileList) => {
    emits('on-progress', { event, file, fileList });
};
const onChange = (file: File, fileList: FileList) => {
    emits('on-change', { file, fileList });
};
const beforeUpload = (file: File) => {
    emits('on-before-upload', file);
};
const beforeRemove = (file: File, fileList: FileList) => {
    emits('on-before-remove', { file, fileList });
};
const onExceed = (files: File[], fileList: FileList) => {
    emits('onExceed', { files, fileList });
};
</script>

<style scoped>

</style>