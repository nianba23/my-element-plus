<template>
    <div class="list-tabs__item">
        <el-tabs
            v-model="activeTabName"
            @tab-click="changeTab"
        >
            <el-tab-pane
                v-for="(tab, index) in list"
                :key="index"
                :label="tab.title"    
                :name="tab.title"
            >
                <el-scrollbar max-height="200px">
                    <div class="container"
                        v-for="(item, index2) in tab.content"
                        :key="index2"
                        @click="clickItem(tab.title, index, item, index2)"
                    >
                        <div class="avatar"
                            v-if="item.avatar"
                        >
                            <el-avatar
                                size="small"
                                :src="item.avatar"
                            />
                        </div>
                        <div class="content">
                            <div class="title">
                                <div class="title-text"
                                    :title="item.title"
                                    v-if="item.title"
                                >
                                    {{ item.title }}{{ item.title }}{{ item.title }}
                                </div>
                                <div class="title-tag">
                                    <el-tag
                                        :type="item.tagType"
                                        v-if="item.tag"
                                    >{{ item.tag }}</el-tag>
                                </div>
                            </div>
                            <div v-if="item.desc" class="desc">{{ item.desc }}</div>
                            <div v-if="item.time" class="time">{{ item.time }}</div>
                        </div>
                    </div>
                </el-scrollbar>
                <div class="actions">
                    <div text class="action-item"
                        v-for="(action, index3) in actions"
                        :key="index3"
                        @click="clickAction(tab.title, index, action, index3)"
                    >
                        <div class="icon"
                            v-if="action.icon"
                        >
                            <component :is="`el-icon${elIconToLine(action.icon)}`"></component>
                        </div>
                        <div class="text">{{ action.text }}</div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { IListOptions, IListActions, IListItem } from '../types/index';
import { elIconToLine } from '../../../utils/index';

const props = defineProps({
    list: {
        type: Array as PropType<IListOptions[]>,
        required: true,
    },
    actions: {
        type: Array as PropType<IListActions[]>,
        default: () => [],
    },
});

const activeTabName = ref(props.list[0].title);
const changeTab = (tabName: string) => {
    console.log(tabName);
};

const emits = defineEmits(['click-item', 'click-action']);

const clickItem = (tabTitle: string, tabIndex: number, item: IListItem, index: number) => {
    emits('click-item', { tabTitle, tabIndex, item, index });
};
const clickAction = (tabTitle: string, tabIndex: number, action: IListActions, index: number) => {
    emits('click-action', { tabTitle, tabIndex, action, index });
};
</script>

<style scoped lang="less">
.container {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    margin-right: 8px;
    cursor: pointer;

    &:hover {
        background-color: #e6f6ff;
    }

    .avatar {
        flex: 1;
    }

    .content {
        flex: 3;
        max-width: 100%;

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title-text {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 0; /* 或者使用 min-width: 0; */
            }
            
            .title-tag {
                margin-left: 4px;
            }
        }

        .desc, .time {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}

.actions {
    display: flex;
    align-items: center;
    border-top: 1px solid #eee;
    height: 40px;
    box-sizing: border-box;
    padding-top: var(--el-popover-padding);

    .action-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        height: 100%;
        border-radius: 8px;

        .icon {
            margin-right: 4px;
            position: relative;
            top: 2px;
        }

        &:hover {
            background-color: #f5f7fa;
        }
    }

    .action-item:not(:last-child) {
        border-right: 1px solid #eee;
    }
}
</style>