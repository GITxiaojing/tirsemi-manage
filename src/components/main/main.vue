<template>
    <div class="main-page">
        <aside class="sider-layout">

        </aside>
        <div class="content-layout">
            <header class="header-con">
                <span class="slider-trigger">
                    <Icon type="md-menu" size="26" />
                </span>
            </header>
            <div class="main-content">
                <nav class="tag-nav-wrapper">
                </nav>
                <div class="content-wrapper">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data () {
        return {

        }
    },
    mounted () {
    }
}
</script>

<style lang="less" scoped>
    @import url('./main.less');
</style>