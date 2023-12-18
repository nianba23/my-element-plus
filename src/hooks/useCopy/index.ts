import { ElMessage } from 'element-plus';

/**
 * 复制文本
 * 使用`document.createElement`创建一个`input`元素，
 * 并将`text`赋值给`input`的`value`属性
 * 然后将`input`元素添加到`document.body`中
 * 使用`input.select()`方法选中`input`元素中的文本
 * 再使用`document.execCommand('copy')`执行复制操作
 * 最后使用`document.body.removeChild(input)`将`input`元素从`document.body`中移除
 */
export const useCopy = (text: string) => {
    const $input = document.createElement('input');
    $input.value = text;
    document.body.appendChild($input);
    $input.select();
    document.execCommand('copy');
    document.body.removeChild($input);
    ElMessage.success('复制成功');
};
