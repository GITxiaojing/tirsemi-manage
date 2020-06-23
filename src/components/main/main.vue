<template>
  <div class="main-page">
    <aside :class="'sider-layout' + (collapsed ? ' collapsed' : '')">
      <side-menu :collapsed="collapsed" :menuList="menuList"></side-menu>
    </aside>
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
          <tag-nav :collapsed="collapsed"></tag-nav>
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
import SideMenu from './components/sideMenu'

export default {
  name: "Main",
  components: { HeaderBar, FullScreen, User, Language, TagNav, SideMenu },
  data() {
    return {
      collapsed: false,
      isFullscreen: false
    }
  },
  computed: {
    menuList () {
      return [{
        name: 'home',
        title: '首页'
      }, {
        name: 'components',
        title: '组件'
      }]
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