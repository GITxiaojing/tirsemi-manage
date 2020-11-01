<template>
  <Form :model="row" :label-width="100">
    <FormItem label="商品编号">
      <span>{{ row.goodsSn }}</span>
    </FormItem>
    <FormItem label="宣传画廊">
      <img
        v-for="item in row.gallery"
        :src="{ item }"
        :key="item"
        class="gallery"
      />
    </FormItem>
    <FormItem label="商品介绍">
      <span>{{ row.brief }}</span>
    </FormItem>
    <FormItem label="商品单位">
      <span>{{ row.unit }}</span>
    </FormItem>
    <FormItem label="关键字">
      <span>{{ row.keywords }}</span>
    </FormItem>
    <FormItem label="类目ID">
      <span>{{ row.categoryId }}</span>
    </FormItem>
    <FormItem label="品牌商ID">
      <span>{{ row.brandId }}</span>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'ExpandRow',
  props: {
    row: Object,
  },
}
</script>
