<template>
    <div class="header-bar">
        <span class="slider-trigger" @click="handleCollapsedChange" :class="collapsed ? 'collapsed' : ''">
            <Icon type="md-menu" size="26"></Icon>
        </span>
        <div class="cus-bread-crumb">
            <Breadcrumb>
                <BreadcrumbItem v-for="item in breadcrumbList" :to="item.to" :key="`bread-item-${item.name}`">
                    <common-icon :type="item.icon" :size="14"></common-icon>
                    {{showTitle(item)}}
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="cus-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import routeUtil from '@/utils/routeUtil'

export default {
  name: 'HeaderBar',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    breadcrumbList() {
      return this.$store.state.app.breadcrumbList
    },
  },
  data() {
    return {

    }
  },
  methods: {
    handleCollapsedChange() {
      this.$emit('on-coll-change', !this.collapsed)
    },
    showTitle(item) {
      return routeUtil.showTitle(item)
    },
  },
}
</script>

<style lang="less" scoped>
    @import url('./header-bar.less');
</style>
