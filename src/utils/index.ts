/**
 * element 图标标签驼峰转为下划线
 * @param value 
 * @returns 
 */
export const elIconToLine = (value: string) => {
    return value.replace(/([A-Z])/g, '-$1').toLowerCase();
};
