<template>
    <div>
        <el-button type="primary" @click="open">Open</el-button>
        <m-modal-form
            v-model:visible="visible"
            title="编辑用户"
            width="60%"
            :options="options"
            :on-close="close"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :before-remove="beforeRemove"
            :on-exceed="onExceed"
            :on-success="onSuccess"
        >
            <template #uploadArea>
                <div><el-button type="primary">Click to upload</el-button></div>
            </template>
            <template #uploadTip>
                <div style="color: #ccc;font-size: 12px;">
                    jpg/png files with a size less than 500KB.
                </div>
            </template>
            <template #footer="scope">
                <el-button @click="cancel(scope.form)">取消</el-button>
                <el-button type="primary" @click="confirm(scope.form)">确定</el-button>
            </template>
        </m-modal-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormInstance, FormOptions } from '../../components/form/types';
import { ElMessage, ElMessageBox } from 'element-plus';

const visible = ref(false);

const open = () => {
    visible.value = true;
}
const close = () => {
    visible.value = false;
}

const cancel = (form: any) => {
    form.resetFields();
    close();
};
const confirm = (form: any) => {
    const validate = form.validate();
    const model = form.getFormData();
    validate((valid: boolean) => {
        if (valid) {
            console.log(model);
            ElMessage.success('提交成功');
        } else {
            ElMessage.error('表单填写有误');
        }
    });
    close();
};

// 上传回调
const onSuccess = (val: any) => {
  console.log(val.res, val.file, val.fileList)
}
const onRemove = (val: any) => {
  console.log(val.file, val.fileList)
}
const onPreview = (file: any) => {
  console.log(file)
}
const onExceed = (val: any) => {
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
</script>

<style scoped>

</style>