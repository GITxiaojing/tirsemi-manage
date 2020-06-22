<template>
    <div class="tag-nav-comp">
        <div class="tag-scroll-btn left-btn">
            <Icon type="ios-arrow-back" size="18" />
        </div>
        <div class="tag-scroll-btn right-btn">
            <Icon type="ios-arrow-forward" size=18 />
        </div>
        <div class="tag-close-btn">
            <Icon type="ios-close-circle-outline" size="18" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'tag-nav'
}
</script>

<style lang="less" scoped>
    @import url('./tag-nav.less');
</style>