<template>
  <div class="goods-create-page">
    <Detail @on-save="createGoods"></Detail>
  </div>
</template>

<script>
import Detail from "./components/goodsDetail";
import { createGoods } from "@/api/goods";
export default {
  name: "goods-create",
  components: { Detail },
  methods: {
    createGoods(data) {
      console.log(222, data);
      createGoods(data)
        .then((res) => {
          console.log(333, res);
          this.$Message.success(res.errmsg);
        })
        .catch((err) => {
          console.log("err: ".err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.goods-create-page {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  overflow-y: auto;
}
</style>