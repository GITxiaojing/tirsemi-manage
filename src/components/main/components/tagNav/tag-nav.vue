<template>
  <div class="tag-nav-comp">
    <div class="tag-scroll-btn left-btn" @click="scrollToLeft(240)">
      <Icon type="ios-arrow-back" size="18" />
    </div>
    <div class="tag-scroll-btn right-btn" @click="scrollToLeft(-240)">
      <Icon type="ios-arrow-forward" size="18" />
    </div>
    <Dropdown class="tag-close-btn" transfer @on-click="handleTagOption">
      <Icon type="ios-close-circle-outline" size="18" />
      <DropdownMenu slot="list">
        <DropdownItem class="cus-dropdown-item" name="all">关闭所有</DropdownItem>
        <DropdownItem class="cus-dropdown-item" name="other">关闭其他</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div
      class="scroll-outer"
      ref="scrollCon"
      @mousewheel="handleScroll"
      @DOMMouseScroll="handleScroll"
    >
      <div class="scroll-body" ref="scrollBody" :style="'left: ' + scrollLeft + 'px'">
        <Tag
          v-for="item in list"
          :name="item.name"
          :key="item.id"
          checkable
          size="large"
          type="dot"
          :color="isCurrentTag(item) ? 'primary' : 'default'"
          :closable="item.name !== $config.homeName"
          @on-close="handleClose(item)"
          @on-change="changeTag(item)"
        >{{showTitle(item)}}</Tag>
      </div>
    </div>
  </div>
</template>

<script>
import routeUtil from '@/utils/routeUtil'
import beforeClose from '@/router/before-close'

export default {
  name: "tag-nav",
  props: {
    value: Object,
    collapsed: Boolean,
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scrollLeft: 0
    };
  },
  computed: {
    currentRoute () {
      let {name, meta, query, params} = this.value
      return {name, meta, query, params}
    }
  },
  watch: {
    collapsed (cur) {
      setTimeout(() => {
        this.scrollToLeft(0)
      }, 200)
    }
  },
  methods: {
    showTitle (item) {
      return routeUtil.showTitle(item)
    },
    /**
     * 处理滚动事件
     */
    handleScroll(e) {
      e = e || window.event;
      let type = e.type;
      let delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      this.scrollToLeft(delta);
    },

    /**
     * 滚动距离
     */
    scrollToLeft(offset) {
      let outerWidth = this.$refs.scrollCon.offsetWidth;
      let bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.scrollLeft = Math.min(0, this.scrollLeft + offset);
      } else {
        if (bodyWidth > outerWidth) {
          this.scrollLeft = Math.max(
            this.scrollLeft + offset,
            outerWidth - bodyWidth
          );
        } else {
          this.scrollLeft = 0;
        }
      }
    },

    /**
     * 选择关闭所有还是其他标签
     */
    handleTagOption(name) {
      if (name === 'other') {
        let res = this.list.filter(item => {
          return item.name === this.$config.homeName || routeUtil.routeEqual(this.currentRoute, item)
        })
        this.$emit('on-close', res, name)
      } else {
        let res = this.list.filter(item => {return item.name === this.$config.homeName})
        this.$emit('on-close', res, name, this.currentRoute)
      }
    },

    /**
     * 判断是否是当前路由
     */
    isCurrentTag(item) {
      return routeUtil.routeEqual(this.currentRoute, item);
    },

    /**
     * 处理tag关闭事件
     */
    handleClose(item) {
      let flag = true
      if (item.meta && item.meta.beforeCloseName && item.meta.beforeCloseName in beforeClose) {
        beforeClose[item.meta.beforeCloseName].catch(
          flag = false
        )
      }
      if (flag) {
        let res = this.list.filter(route => {
          return !routeUtil.routeEqual(route, item)
        })
        this.$emit('on-close', res, undefined, item)
      }
    },

    /**
     * 切换tag
     */
    changeTag(item) {
      this.$emit('on-click', item)
    },

    /**
     * 移动到可视区域
     */
    moveToView (dom) {

    }
  }
};
</script>

<style lang="less">
@import url("./tag-nav.less");
</style>