<template>
    <div class="header-bar">
        <span class="slider-trigger" @click="handleCollapsedChange" :class="collapsed ? 'collapsed' : ''">
            <Icon type="md-menu" size="26"></Icon>
        </span>
        <div class="cus-bread-crumb">
            33
        </div>
        <div class="cus-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'header-bar',
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    },
    methods: {
        handleCollapsedChange () {
            this.$emit('on-coll-change', !this.collapsed)
        }
    }
}
</script>

<style lang="less" scoped>
    @import url('./header-bar.less');
</style>