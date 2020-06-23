<template>
    <div class="side-menu-comp">
        <slot></slot>
        <Menu v-show="!collapsed" theme="dark">
            <template v-for="item in menuList">
                <MenuItem :name="item.name" :key="`menu-${item.name}`"></MenuItem>
                <!-- <sub-menu :key="`menu-${item.name}`"></sub-menu> -->
            </template>
        </Menu>
        <div v-show="collapsed">
            <template v-for="item in menuList">
                <Dropdown :key="item.name">
                    {{item.title}}
                </Dropdown>
            </template>
        </div>
    </div>
</template>

<script>
import SubMenu from './sub-menu.vue'

export default {
    name: 'side-menu',
    components: { SubMenu },
    props: {
        menuList: {
            type: Array,
            default: []
        },
        collapsed: Boolean
    }
}
</script>

<style lang="less" scoped>
    @import url('./side-menu.less');
</style>