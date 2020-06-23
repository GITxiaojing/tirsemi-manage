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
          size="large"
          type="dot"
          :color="isCurrentTag(item) ? 'primary' : 'default'"
          :closable="item.name !== $config.homeName"
          @on-close="handleClose"
          @click="changeTag"
        >{{item.name}}</Tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tag-nav",
  props: {
    collapsed: Boolean
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "首页"
        },
        {
          id: 2,
          name: "组件"
        },
        {
          id: 3,
          name: "页面"
        },
        {
          id: 4,
          name: "页面"
        },
        {
          id: 5,
          name: "页面"
        },
        {
          id: 6,
          name: "页面"
        },
        {
          id: 7,
          name: "页面"
        },
        {
          id: 8,
          name: "页面"
        },
        {
          id: 9,
          name: "页面"
        },
        {
          id: 10,
          name: "页面"
        },
        {
          id: 11,
          name: "页面"
        },
        {
          id: 12,
          name: "页面"
        }
      ],
      scrollLeft: 0
    };
  },
  watch: {
    collapsed (cur) {
      setTimeout(() => {
        this.scrollToLeft(0)
      }, 200)
    }
  },
  methods: {
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
      console.log(outerWidth, bodyWidth)
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
    handleTagOption(name) {},

    /**
     * 判断是否是当前路由
     */
    isCurrentTag(name) {
      return false;
    },

    /**
     * 处理tag关闭事件
     */
    handleClose(event, name) {},

    /**
     * 切换tag
     */
    changeTag() {},

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