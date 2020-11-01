<template>
  <Submenu :name="parentName">
    <template slot="title">
      <common-icon :type="parentItem.icon" :size="iconSize"></common-icon>
      <span>{{showTitle(parentItem)}}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
          <sun-menu v-if="showChildren(item)" :parent-item="item" :key="`menu-${item.name}`"></sun-menu>
          <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
            <common-icon :size="iconSize" :type="item.children[0].icon"></common-icon>
            <span>{{showTitle(item.children[0])}}</span>
          </menu-item>
      </template>
      <template v-else>
          <sun-menu v-if="showChildren(item)" :parent-item="item" :key="`menu-${item.name}`"></sun-menu>
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
            <common-icon :size="iconSize" :type="item.icon"></common-icon>
            <span>{{showTitle(item)}}</span>
          </menu-item>
      </template>
    </template>
  </Submenu>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'SubMenu',
  mixins: [mixin],
  mounted() {
  },
}
</script>

<style lang="less">
</style>
