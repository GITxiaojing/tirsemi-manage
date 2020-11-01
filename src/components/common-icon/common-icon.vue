<template>
    <component :is="iconType" :type="iconName" :color="color" :size="iconSize"></component>
</template>

<script>
import cuIcon from '_c/cuIcon'

export default {
  name: 'CommonIcon',
  components: { cuIcon },
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    size: Number,
  },
  computed: {
    iconType() {
      return this.type.indexOf('_') === 0 ? 'cuIcon' : 'Icon'
    },
    iconName() {
      return this.iconType === 'cuIcon' ? this.type.slice(1) : this.type
    },
    iconSize() {
      return this.size || (this.iconType === 'cuIcon' ? 12 : undefined)
    },
  },
}
</script>

<style lang="less" scoped>

</style>
