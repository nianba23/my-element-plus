import { PropType, defineComponent, useAttrs } from 'vue';
import { IMenuItem } from '../types/index';
import * as Icons from '@element-plus/icons-vue';
import '../style/index.less';

export default defineComponent({
    name: 'Menu',
    props: {
        data: {
            type: Array as PropType<IMenuItem[]>,
            required: true,
        },
        defaultActive: {
            type: String,
            default: '',
        },
        router: {
            type: Boolean,
            default: false,
        },
        // 组件不一定按照 IMenuItem 属性名进行设置，可以支持自定义属性名
        name: {
            type: String,
            default: 'name',
        },
        icon: {
            type: String,
            default: 'icon',
        },
        index: {
            type: String,
            default: 'index',
        },
        children: {
            type: String,
            default: 'children',
        },
    },

    setup(props) {
        const renderMenu = (data: IMenuItem[]) => {
            return data.map((item: IMenuItem) => {
                // 菜单图标
                // @ts-ignore
                const iconEle = (Icons as any)[item[props.icon]!];
                // 子菜单的插槽
                let slots = {
                    title: () => {
                        return <>
                            <iconEle />
                            <span>{ item[props.name] }</span>
                        </>
                    },
                };
                // 处理子菜单
                if (item[props.children] && item[props.children].length > 0) {
                    return (
                        <el-sub-menu
                            index={ item[props.index] }
                            v-slots={ slots }
                        >
                            { renderMenu(item[props.children]) }
                        </el-sub-menu>
                    );
                }
                // 处理一级菜单
                return (
                    <el-menu-item
                        index={ item[props.index] }
                    >
                        <iconEle />
                        <span>{ item[props.name] }</span>
                    </el-menu-item>
                );
            });
        };

        // 处理其他属性
        const attrs = useAttrs();

        return () => {
            return (
                <el-menu class="menu-icon-svg"
                    default-active={ props.defaultActive }
                    router={ props.router }
                    { ...attrs }
                >
                    { renderMenu(props.data) }
                </el-menu>
            );
        }
    },
});
