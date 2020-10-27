<template>
  <div class="goods-edit-page">
    <Detail :info="goodsInfo" type="edit" @on-save="updateGoods"></Detail>
    <Spin size="large" fix v-if="showSpin"></Spin>
  </div>
</template>

<script>
import Detail from "./components/goodsDetail";
import { getGoodsInfo, updateGoods } from "@/api/goods";
export default {
  name: "goods-edit",
  components: { Detail },
  data () {
    return {
      goodsInfo: null,
      showSpin: false
    }
  },
  created() {
    console.log(123, "create");
    this.getGoodsInfo();
  },
  activated() {
    console.log(234, "activated");
    this.getGoodsInfo();
  },
  deactivated() {
    console.log(342, "deactivated");
  },
  beforeDestroy() {
    console.log(333, "beforeDestroy");
  },
  methods: {
    getGoodsInfo() {
      let query = this.$route.query
      if (query && query.id) {
        this.showSpin = true
        getGoodsInfo({
          id: query.id,
        }).then((res) => {
          if (res.errno === 0) {
            this.goodsInfo = res.data || {}
          } else {
            this.$Message.error(res.errmsg)
          }
          this.showSpin = false
        }).catch(err => {
          console.log('err: ', err)
        })
      }
    },
    updateGoods (data) {
      console.log(222, data)
      updateGoods(data).then(res => {
        console.log(333, res)
        this.$Message.success(res.errmsg)
      }).catch(err => {
        console.log('err: '. err)
      })
    }
  },
};
</script>

<style lang="less" scoped>
.goods-edit-page {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  overflow-y: auto;
}
</style>