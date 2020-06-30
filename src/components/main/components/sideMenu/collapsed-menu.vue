<template>
     <Dropdown transfer placement="right-start" class="collapsed-drop-down">
        <span class="drop-menu-single">
            <common-icon :size="iconSize" :type="menu.icon"></common-icon>
        </span>
        <DropdownMenu slot="list" @on-click="handleClick">
            <template v-for="item in menu.children">
                <collapsed-menu v-if="showChildren(item)" :key="`drop-menu-${item.name}`"></collapsed-menu>
                <DropdownItem v-else :key="`drop-menu-${item.name}`" :name="item.name">
                    <common-icon :size="iconSize" :type="item.icon"></common-icon>
                    <span>{{showTitle(item)}}</span>
                </DropdownItem>
            </template>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
import mixin from './mixin'
export default {
    name: 'collapsed-menu',
    mixins: [mixin],
    props: {
        menu: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        handleClick (name) {
            console.log('name: ', name)
            this.$emit('on-click', name)
        }
    }
}
</script>

<style lang="less">
    .drop-menu-single {
        width: 100%;
        text-align: center;
        padding: 6px 15px;
        display: block;
    }
</style>