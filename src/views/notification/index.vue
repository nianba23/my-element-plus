<template>
    <div class="flex">
        <div>
            <m-notification
                :value="50"
            ></m-notification>
        </div>
        
        <div>
            <m-notification
                :value="50"
                :max="30"
            ></m-notification>
        </div>
        
        <div>
            <m-notification is-dot></m-notification>
        </div>
        
        <div>
            <m-notification icon="ChatRound"
                :value="50"
            ></m-notification>
        </div>

        <div>
            <m-notification
                :value="50"
                :popoverDisabled="false"
            >
                <template #default>
                    <m-list
                        :list="list"
                        :actions="actions"
                        @click-item="clickItem"
                        @click-action="clickAction"
                    ></m-list>
                </template>
            </m-notification>
        </div>
    </div>
</template>

<script setup lang="ts">
import { list, actions } from './ts/data';

const clickItem = (item: any) => {
    console.log(item);
};
const clickAction = (action: any) => {
    console.log(action);
};
</script>

<style scoped lang="less">
.flex {
    display: flex;

    & > div {
        margin-right: 40px;
    }
}
</style>