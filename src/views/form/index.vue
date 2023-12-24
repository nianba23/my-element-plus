<template>
    <div style="width: 100%;border: 1px solid #ccc;padding: 10px;">
        <m-form ref="form"
            :options="options"
            label-width="100px"
            @on-preview="handlePreview"
            @on-remove="handleRemove"
            @before-remove="beforeRemove"
            @on-exceed="handleExceed"
            @on-success="handleSuccess"
        >
            <template #uploadArea>
                <div><el-button type="primary">Click to upload</el-button></div>
            </template>
            <template #uploadTip>
                <div style="color: #ccc;font-size: 12px;">
                    jpg/png files with a size less than 500KB.
                </div>
            </template>
            <template #action="scope">
                <el-button type="primary" @click="handleSubmit(scope)">Submit</el-button>
                <el-button @click="handleReset">Reset</el-button>
            </template>
        </m-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormInstance, FormOptions } from '../../components/form/types';
import { ElMessage, ElMessageBox } from 'element-plus';

interface Scope {
    form: FormInstance,
    model: any;
}

const options: FormOptions[] = [
    {
        type: 'input',
        value: '',
        label: '用户名',
        prop: 'username',
        rules: [{
            required: true,
            message: '请输入用户名',
            trigger: 'change',
        }, {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change',
        }],
    },
    {
        type: 'input',
        value: '',
        label: '密码',
        prop: 'password',
        rules: [{
            required: true,
            message: '请输入密码',
            trigger: 'change',
        }, {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change',
        }],
        attrs: {
            showPassword: true,
            clearable: true,
        }
    },
    {
        type: 'select',
        value: '',
        placeholder: '请选择职位',
        label: '职位',
        prop:'role',
        rules: [{
            required: true,
            message: '请选择职位',
            trigger: 'blur',
        }],
        attrs: {
            clearable: true,
            style: {
                width: '100%',
            },
        },
        children: [{
            type: 'option',
            value: '1',
            label: '管理员',
        }, {
            type: 'option',
            value: '2',
            label: '开发者',
        }, {
            type: 'option',
            value: '3',
            label: '运维',
        }],
    },
    {
        type: 'checkbox-group',
        value: [],
        prop: 'hobbies',
        label: '爱好',
        children: [{
            type: 'checkbox',
            value: '1',
            label: '篮球',
        }, {
            type: 'checkbox',
            value: '2',
            label: '足球',
        }, {
            type: 'checkbox',
            value: '3',
            label: '乒乓球',
        },
        {
            type: 'checkbox',
            value: '4',
            label: '编程',
            attrs: {
                disabled: true,
            }
        }]
    },
    {
        type: 'radio-group',
        value: '',
        prop: 'sex',
        label: '性别',
        children: [{
            type: 'radio',
            value: 'male',
            label: '男',
        }, {
            type: 'radio',
            value: 'female',
            label: '女',
        }, {
            type: 'radio',
            value: 'not',
            label: '保密',
        }]
    },
    {
        type: 'upload',
        label: '上传',
        prop: 'pic',
        rules: [{
            required: false,
            message: '请上传头像',
            trigger: 'blur',
        }],
        uploadAttrs: {
            action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
            multiple: true,
            accept: 'image/png, image/jpeg',
            limit: 3,
        },
    },
    {
        type: 'editor',
        value: '',
        prop: 'desc',
        label: '描述',
        placeholder: '请输入个人描述',
    }
];

const form = ref<FormInstance | null>(null);

const handleSubmit = (scope: Scope) => {
    console.log(scope.model);
    // 也可以使用分发上来的 validate 方法
    if (scope && scope.form) {
        scope.form.validate((valid) => {
            if (valid) {
                ElMessage.success('提交成功');
            } else {
                ElMessage.error('表单填写有误');
            }
        });
    }
}
const handleReset = () => {
    if (form.value) {
        form.value.resetFields();
    }
}

// 上传回调
const handleSuccess = (val: any) => {
  console.log(val.res, val.file, val.fileList)
}
const handleRemove = (val: any) => {
  console.log(val.file, val.fileList)
}
const handlePreview = (file: any) => {
  console.log(file)
}
const handleExceed = (val: any) => {
    ElMessage.warning(
    `The limit is 3, you selected ${val.files.length} files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  )
}
const beforeRemove = (val: any) => {
    return ElMessageBox.confirm(
    `Cancel the transfer of ${val.file.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>

<style scoped>

</style>