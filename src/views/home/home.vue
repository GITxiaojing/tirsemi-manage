<template>
  <div class="home-page">
    <Row class-name="row-box" :gutter="10">
      <Col class-name="col-box" :xs="24" :md="12" :xl="6">
        <Card>
          <div class="left-box people-icon">
            <Icon type="md-people" size="60"></Icon>
          </div>
          <div class="right-box">
            <p>用户数量</p>
            <p>{{ dashboardInfo.userTotal }}</p>
          </div>
        </Card>
      </Col>
      <Col class-name="col-box" :xs="24" :md="12" :xl="6">
        <Card>
          <div class="left-box goods-icon">
            <Icon type="md-text" size="60"></Icon>
          </div>
          <div class="right-box">
            <p>商品数量</p>
            <p>{{ dashboardInfo.goodsTotal }}</p>
          </div>
        </Card>
      </Col>
      <Col class-name="col-box" :xs="24" :md="12" :xl="6">
        <Card>
          <div class="left-box product-icon">
            <Icon type="md-text" size="60"></Icon>
          </div>
          <div class="right-box">
            <p>货品数量</p>
            <p>{{ dashboardInfo.productTotal }}</p>
          </div>
        </Card>
      </Col>
      <Col class-name="col-box" :xs="24" :md="12" :xl="6">
        <Card>
          <div class="left-box order-icon">
            <Icon type="logo-yen" size="60"></Icon>
          </div>
          <div class="right-box">
            <p>订单数量</p>
            <p>{{ dashboardInfo.orderTotal }}</p>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getDashboard } from '@/api/home'

export default {
  name: "home",
  data() {
    return {
        dashboardInfo: {}
    };
  },
  created () {
      this.getDashboard()
  },
  methods: {
      getDashboard () {
          getDashboard().then(res => {
              if (res.errno === 0) {
                  let data = res.data || {}
                  this.dashboardInfo = {
                      goodsTotal: data.goodsTotal,
                      orderTotal: data.orderTotal,
                      productTotal: data.productTotal,
                      userTotal: data.userTotal
                  }
              } else {
                  this.dashboardInfo = {
                      goodsTotal: 0,
                      orderTotal: 0,
                      productTotal: 0,
                      userTotal: 0
                  }
              }
          }).catch(err => {
              console.log('err: ', err)
          })
      }
  }
};
</script>

<style lang="less" scoped>
@colors: {
  people-icon: #40c9c6;
  goods-icon: #36a3f7;
  product-icon: #f4516c;
  order-icon: #34bfa3;
};
.home-page {
  width: 100%;
  height: 100%;
  padding: 0 20px 20px;
  .col-box {
    .margin-x(top, 20px);
    each(@colors, {
        .@{key} {
            color: @value;
        }
        .@{key}:hover {
            background-color: @value;
            color: #FFFFFF;
        }
    });
  }
  .left-box {
    cursor: pointer;
    width: 100px;
    height: 100px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right-box {
    text-align: left;
    p {
      font-size: 16px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.45);
    }
    p:last-child {
      margin-top: 12px;
      font-size: 20px;
      color: #666;
    }
  }
}
</style>


<style lang="less">
.home-page {
  .ivu-card-body {
    display: flex;
    justify-content: space-between;
  }
}
</style>