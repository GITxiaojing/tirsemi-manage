<template>
  <div class="side-menu-comp">
    <slot></slot>
    <Menu
      ref="menu"
      v-show="!collapsed"
      :theme="theme"
      width="auto"
      :active-name="activeName"
      :open-names="openNames"
      :accordion="accordion"
      @on-select="menuSelect"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <sub-menu
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
            :icon-size="iconSize"
          ></sub-menu>
          <menu-item
            v-else
            :name="getNameOrHref(item, true)"
            :key="`menu-${item.children[0].name}`"
          >
            <common-icon
              :size="iconSize"
              :type="item.children[0].icon"
            ></common-icon>
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>
        <template v-else>
          <sub-menu
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
            :icon-size="iconSize"
          ></sub-menu>
          <menu-item
            v-else
            :key="`menu-${item.name}`"
            :name="getNameOrHref(item)"
          >
            <common-icon :size="iconSize" :type="item.icon"></common-icon>
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div v-show="collapsed">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :menu="item"
          :icon-size="iconSize"
          @on-click="menuSelect"
        ></collapsed-menu>
        <Tooltip
          transfer
          :theme="theme"
          :content="
            showTitle(
              item.children && item.children.length > 0
                ? item.children[0]
                : item
            )
          "
          v-else
          :key="`drop-menu-${item.name}`"
          placement="right"
        >
          <span
            class="drop-menu-single"
            @click="menuSelect(getNameOrHref(item, true))"
            ><common-icon
              :size="iconSize"
              :type="item.children[0].icon"
            ></common-icon
          ></span>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script>
import { getUnion } from '@/utils/util'
import SubMenu from './sub-menu'
import mixin from './mixin'
import collapsedMenu from './collapsed-menu'

export default {
  name: 'SideMenu',
  components: { SubMenu, collapsedMenu },
  mixins: [mixin],
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    theme: {
      type: String,
      default: 'dark',
    },
    collapsed: Boolean,
    activeName: String,
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openNames: [],
    }
  },
  watch: {
    openNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    },
  },
  mounted() {
    this.openNames = getUnion(this.openNames, this.activeName)
  },
  methods: {
    menuSelect(name) {
      this.$emit('on-select', name)
    },
    updateOpenNames(name) {
      if (name === this.$config.homeName) {
        this.openNames = []
      } else {
        this.openNames = this.getOpenNamesByActiveName(name)
      }
    },
    getOpenNamesByActiveName(name) {
      return this.$route.matched
        .map((item) => item.name)
        .filter((item) => item !== name)
    },
  },
}
</script>

<style lang="less">
@import url("./side-menu.less");
</style>
