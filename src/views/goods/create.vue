<template>
  <Detail @on-save="createGoods"></Detail>
</template>

<script>
import Detail from './components/goodsDetail'
import { createGoods } from '@/api/goods'
export default {
  name: 'goods-create',
  components: { Detail },
  methods: {
    createGoods (data) {
      console.log(222, data)
      createGoods(data).then(res => {
        console.log(333, res)
        this.$Message.success(res.errmsg)
      }).catch(err => {
        console.log('err: '. err)
      })
    }
  }
}
</script>