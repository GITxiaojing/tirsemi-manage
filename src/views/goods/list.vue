<template>
    <div class="good-list-page">
        <div class="filter-box">
            <Input class="filter-item input-size" placeholder="请输入商品ID" v-model="goodsId"/>
            <Input class="filter-item input-size" placeholder="请输入商品编号" v-model="goodsSn"/>
            <Input class="filter-item input-size" placeholder="请输入商品名称" v-model="goodsName"/>
            <Button class="filter-item" icon="md-search" type="primary" @click="getGoodsList">查找</Button>
            <Button class="filter-item" icon="md-create" type="primary" @click="addGoods">添加</Button>
            <Button class="filter-item" icon="ios-cloud-download-outline" type="primary" @click="exportExcel">导出</Button>
        </div>
        <div class="margin-top-20 table-wrap" ref="tableWrap">
            <Table ref="table" :height="tableHeight" border :data="tbData" :columns="tbCols" :loading="tbLoading">
                <template type="expand" slot="expandRow" slot-scope="{ row }">
                    <Row>
                        <span>商品编号</span>
                        <span>{{row.goodsSn}}</span>
                    </Row>
                    <!-- <Form :model="row" :label-width="100">
                        <FormItem label="商品编号">
                            <span>{{row.goodsSn}}</span>
                        </FormItem>
                        <FormItem label="宣传画廊">
                            <img v-for="item in row.gallery" :src="{item}" :key="item" class="gallery">
                        </FormItem>
                        <FormItem label="商品介绍">
                            <span>{{row.brief}}</span>
                        </FormItem>
                        <FormItem label="商品单位">
                            <span>{{row.unit}}</span>
                        </FormItem>
                        <FormItem label="关键字">
                            <span>{{row.keywords}}</span>
                        </FormItem>
                        <FormItem label="类目ID">
                            <span>{{row.categoryId}}</span>
                        </FormItem>
                        <FormItem label="品牌商ID">
                            <span>{{row.brandId}}</span>
                        </FormItem>
                    </Form> -->
                </template>
                <template slot="img" slot-scope="{row}">
                    <img width="40" :src="row.picUrl">
                </template>
                <template slot="shareUrl" slot-scope="{row}">
                    <img width="40" :src="row.shareUrl">
                </template>
                <template slot="detail" slot-scope="{ row }">
                    <Button type="primary" @click="lookDetail(row)">查看</Button>
                </template>
                <template slot="isNew" slot-scope="{ row }">
                    <Tag :color="row.isNew ? 'green' : 'blue'">{{row.isNew ? '新品' : '非新品'}}</Tag>
                </template>
                <template slot="isHot" slot-scope="{ row }">
                    <Tag :color="row.isHot ? 'green' : 'blue'">{{row.isHot ? '热品' : '非热品'}}</Tag>
                </template>
                <template slot="saleStatus" slot-scope="{ row }">
                    <Tag :color="row.saleStatus ? 'green' : 'blue'">{{row.saleStatus ? '在售' : '非在售'}}</Tag>
                </template>
                <template slot="operate" slot-scope="{ row }">
                    <div class="tb-btns">
                        <Button type="primary" @click="editGoods(row)">编辑</Button>
                        <Button type="error" @click="openDelModal(row)">删除</Button>
                    </div>
                </template>
            </Table>
        </div>
        <div class="pagination-wrap margin-top-10">
            <Page size="small" :total="total" show-total show-sizer show-elevator :page-size="pageSize" :current="pageNum" @on-change="onChangePage" @on-page-size-change="onChangePageSize"></Page>
        </div>
        <Modal v-model="showDetail" :footer-hide="true" :scrollable="true">
            <div slot="header">商品详情</div>
            <div class="detail-img" v-html="goodsDetail"></div>
        </Modal>
    </div>
</template>

<script>
import { getGoodsList, delGoods } from '@/api/goods'
import exportExcel from '@/utils/exportExcel'
var changePageSize = false
export default {
    name: 'goods-list',
    data () {
        return {
            tbLoading: false,
            tbData: [],
            tbCols: [
                {
                    type: 'expand',
                    width: 50,
                    slot: 'expandRow'
                },
                {
                    key: 'id',
                    align: 'center',
                    title: '商品ID',
                    minWidth: 100
                },
                {
                    key: 'name',
                    align: 'center',
                    title: '名称',
                    minWidth: 200
                },
                {
                    key: 'picUrl',
                    align: 'center',
                    title: '图片',
                    slot: 'img',
                    minWidth: 100
                },
                {
                    key: 'shareUrl',
                    align: 'center',
                    title: '分享图',
                    slot: 'shareUrl',
                    minWidth: 100
                },
                {
                    key: 'detail',
                    align: 'center',
                    title: '详情',
                    slot: 'detail',
                    minWidth: 100
                },
                {
                    key: 'counterPrice',
                    align: 'center',
                    title: '市场售价',
                    minWidth: 100
                },
                {
                    key: 'retailPrice',
                    align: 'center',
                    title: '当前价格',
                    minWidth: 100
                },
                {
                    key: 'isNew',
                    align: 'center',
                    title: '是否新品',
                    slot: 'isNew',
                    minWidth: 100
                },
                {
                    key: 'isHot',
                    align: 'center',
                    title: '是否热品',
                    slot: 'isHot',
                    minWidth: 100
                },
                {
                    key: 'saleStatus',
                    align: 'center',
                    title: '是否在售',
                    slot: 'saleStatus',
                    minWidth: 100
                },
                {
                    key: '',
                    align: 'center',
                    title: '操作',
                    slot: 'operate',
                    width: 200
                }
            ],
            goodsId: '', // 商品ID
            goodsSn: '', // 商品编号
            goodsName: '', // 商品名称
            tableHeight: 0,
            total: 0,
            pageNum: 1,
            pageSize: 10,
            showDetail: false,
            goodsDetail: ''
        }
    },
    mounted () {
        this.resizeTable()
        window.addEventListener('resize', this.resizeTable)
        this.getGoodsList()
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.resizeTable)
    },
    methods: {
        resizeTable () {
            let tableWrap = this.$refs.tableWrap
            if (tableWrap) {
                this.tableHeight = tableWrap.offsetHeight
            }
        },
        //  获取列表
        getGoodsList () {
            this.tbLoading = true
            let params = {
                goodsId: this.goodsId,
                goodsSn: this.goodsSn,
                name: this.goodsName,
                page: this.pageNum,
                limit: this.pageSize
            }
            getGoodsList(params).then(res => {
                if (res.errno === 0) {
                    let data = res.data || {}
                    this.total = data.total || 0
                    this.tbData = data.list || []
                } else {
                    this.total = 0
                    this.tbData = []
                }
                this.tbLoading = false
            }).catch(err => {
                console.log('err: ', err)
            })
        },
        // 添加
        addGoods () {
            this.$router.push({
                name: 'goods-create'
            })
        },
        // 导出Excel
        exportExcel () {
            console.log(this.$refs.table)
            exportExcel(this.$refs.table.columns, this.tbData, 'text.xlsx')
        },
        // 查看详情
        lookDetail (row) {
            this.showDetail = true
            this.goodsDetail = row.detail
        },
        // 修改页码
        onChangePage (pageNum) {
            this.pageNum = pageNum
            if (changePageSize) { // changePageSize会触发这个方法
                changePageSize = false
                return
            }
            this.pageNum = pageNum
            this.getGoodsList()
        },
        // 修改每页条数
        onChangePageSize (pageSize) {
            this.pageSize = pageSize
            changePageSize = true
            this.onChangePage(1)
        },
        //  编辑商品
        editGoods (row) {
            this.$router.push({
                name: 'goods-edit',
                query: {
                    id: row.id
                }
            })
        },
        // 打开删除提示框
        openDelModal (row) {
            this.$Modal.confirm({
                title: '提示',
                content: '是否删除该条数据',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.onDel(row)
                }
            })
        },
        // 进行数据的删除操作
        onDel (row) {
            delGoods({id: row.id}).then(res => {
                if(res.errno === 0) {
                    // this.$Message.success(res.data)
                    this.pageNum = 1
                    this.getGoodsList()
                } else {

                }
            }).catch(err => {
                console.log('err: ', err)
            })
        }
    }
}
</script>

<style lang="less">
.good-list-page {
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .filter-box {
    .input-size {
        width: 160px;
    }
    .filter-item {
        .margin-x(bottom, 10px);
        .margin-x(right, 10px);
        &:last-child {
            .margin-x(right, 0px);
        }
    }
  }
  .table-wrap {
      flex: 1;
      .gallery {
          width: 80px;
          .margin-x(right, 10px);
      }
  }
  .pagination-wrap {
    text-align: right;
  }
}
.detail-img {
    width: 100%;
    img {
        width: 100%;
        height: auto;
    }
}
</style>