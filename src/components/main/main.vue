<template>
  <div class="main-page">
    <div :class="'sider-layout' + (collapsed ? ' collapsed' : '')">
      <side-menu ref="sideMenu" :collapsed="collapsed" :menu-list="menuList" :icon-size="20" @on-select="turnToPage" :active-name="$route.name"></side-menu>
    </div >
    <div class="content-layout">
      <header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="changeCollapsed">
          <full-screen v-model="isFullscreen"></full-screen>
          <!-- <language></language> -->
          <user @on-logout="onLogout"></user>
        </header-bar>
      </header>
      <div class="main-content">
        <nav class="tag-nav-wrapper">
          <tag-nav :collapsed="collapsed" :list="tagNavList" :value="$route" @on-click="handleClickTag" @on-close="handleTagClose"></tag-nav>
        </nav>
        <div class="content-wrapper">
          <keep-alive v-if="$route.meta.keepAlive">
            <router-view></router-view>
          </keep-alive>
          <router-view v-else></router-view>
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
import { mapMutations } from 'vuex'
import routeUtil from '@/utils/routeUtil'
import mixin from './components/sideMenu/mixin'
import routers from '@/router/routes'

export default {
  name: "Main",
  components: { HeaderBar, FullScreen, User, Language, TagNav, SideMenu },
  mixins: [mixin],
  data() {
    return {
      collapsed: false,
      isFullscreen: false
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    },
    tagNavList () {
      return this.$store.state.app.tagNavList
    }
  },
  watch: {
    '$route'(cur) {
      console.log(11111111, cur)
      let {name, meta, query, params} = cur
      this.addTag({
        route: {name, meta, query, params},
        type: 'push'
      })
      this.setBreadcrumb(cur)
      this.setTagNavList(routeUtil.calcTagNavList(this.tagNavList, cur))
      this.$refs.sideMenu.updateOpenNames(name)
    }
  },
  mounted() {
    this.setHomeRoute(routers)
    this.setTagNavList()
    let {name, meta, query, params} = this.$route
    this.addTag({
      route: {name, meta, query, params}
    })
    this.setBreadcrumb(this.$route)
    if (!this.tagNavList.find(item => routeUtil.routeEqual(item, this.$route))) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    this.$refs.sideMenu.updateOpenNames(name)
  },
  methods: {
    ...mapMutations([
      'setBreadcrumb',
      'setTagNavList',
      'closeTag',
      'setHomeRoute',
      'addTag'
    ]),
    /**
     * 改变菜单折叠状态
     */
    changeCollapsed (status) {
      this.collapsed = status
    },
    /**
     * 菜单选择
     */
    turnToPage (name) {
     this.$router.push({
       name: name
     })
    },
    /**
     * 点击标签
     */
    handleClickTag (item) {
      let { name, query, params} = item
      this.$router.push({
        name,
        query,
        params
      })
    },

    /**
     * 关闭标签
     */
    handleTagClose (result, type, route) {
      if (type !== 'other') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeUtil.routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(result)
    },
    // 登出系统
    onLogout () {
      this.$store.dispatch('logout').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style lang="less">
@import "./main.less";
</style>