<template>
  <div class="main-page">
    <aside :class="'sider-layout' + (collapsed ? ' collapsed' : '')"></aside>
    <div class="content-layout">
      <header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="changeCollapsed">
          <full-screen v-model="isFullscreen"></full-screen>
          <!-- <language></language> -->
          <user></user>
        </header-bar>
      </header>
      <div class="main-content">
        <nav class="tag-nav-wrapper">
          <tag-nav></tag-nav>
        </nav>
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "./components/headerBar"
import FullScreen from './components/fullscreen'
import User from './components/user'
import Language from './components/language'
import TagNav from './components/tagNav'

export default {
  name: "Main",
  components: { HeaderBar, FullScreen, User, Language, TagNav },
  data() {
    return {
      collapsed: false,
      isFullscreen: false
    }
  },
  mounted() {

  },
  methods: {
    changeCollapsed (status) {
      this.collapsed = status
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./main.less");
</style>