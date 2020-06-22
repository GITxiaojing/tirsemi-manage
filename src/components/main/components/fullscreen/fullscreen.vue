<template>
  <div class="fullscreen-comp" v-if="showFullScreenBtn">
    <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
      <Icon @click="handleChange" :type="isFullScreen ? 'md-contract' : 'md-expand'" size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: "full-screen",
    model: {
      prop: 'isFullScreen'
    },
  props: {
    isFullScreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    showFullScreenBtn() {
      return window.navigator.userAgent.indexOf("MSIE") < 0;
    }
  },
  mounted() {
    let isFull =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullScreenElement ||
      window.fullscreen ||
      document.mozIsFullScreen ||
      document.webkitIsFullScreen;
    isFull = !!isFull;
    window.addEventListener("keydown", e => {
      e = e || window.event || arguments.callee.caller.arguments;
      if (e && e.keyCode == 122) {
        e.preventDefault();
        this.handleFullScreen();
      }
    });
    document.addEventListener("fullscreenchange", () => {
      this.$emit("input", !this.isFullScreen);
      this.$emit("on-change", !this.isFullScreen);
    });
    document.addEventListener("mozfullscreenchange", () => {
      this.$emit("input", !this.isFullScreen);
      this.$emit("on-change", !this.isFullScreen);
    });
    document.addEventListener("webkitfullscreenchange", () => {
      this.$emit("input", !this.isFullScreen);
      this.$emit("on-change", !this.isFullScreen);
    });
    document.addEventListener("msfullscreenchange", () => {
      this.$emit("input", !this.isFullScreen);
      this.$emit("on-change", !this.isFullScreen);
    });
    this.$emit("input", isFull);
  },
  methods: {
    handleChange() {
      this.handleFullScreen();
    },
    handleFullScreen() {
      let body = document.body;
      if (!this.isFullScreen) {
        let requestMethod =
          body.requestFullscreen ||
          body.mozRequestFullScreen ||
          body.webkitRequestFullScreen ||
          body.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(body);
        }
      } else {
        let exitMethod =
          document.exitFullscreen ||
          document.mozCancelFullScreen ||
          document.webkitCancelFullScreen ||
          document.msExitFullScreen;
        if (exitMethod) {
          exitMethod.call(document);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./fullscreen.less");
</style>