<template>
    <div class="goods-create-page">
        <Card class="card-box">
            <h3 class="header-box">商品介绍</h3>
            <Form :label-width="100" :model="formData" :rules="validateRules">
                <FormItem label="商品编号" prop="num">
                    <Input v-model="formData.num"/>
                </FormItem>
                <FormItem label="商品名称" prop="name">
                    <Input v-model="formData.name"/>
                </FormItem>
                <FormItem label="市场售价">
                    <Input v-model="formData.price">
                        <p slot="append">元</p>
                    </Input>
                </FormItem>
                <FormItem label="是否是新品">
                    <RadioGroup v-model="formData.isNew">
                        <Radio label="新品"></Radio>
                        <Radio label="非新品"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否热卖">
                    <RadioGroup v-model="formData.isHot">
                      <Radio label="普通"></Radio>
                      <Radio label="热卖"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否在售">
                    <RadioGroup v-model="formData.isSale">
                      <Radio label="在售"></Radio>
                      <Radio label="未售"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="商品图片">
                    <div class="imgs-wrap">
                        <div class="img-item" v-for="item in goodsImgs" :key="item.key">
                            <img :src="item.src" alt="">
                            <p class="img-mask">    
                                <Icon type="md-trash" @click="handleDelImg(1)"></Icon>
                            </p>
                        </div>
                        <Upload action="https://www.iviewui.com/components/upload/jsonplaceholder.typicode.com/posts/"
                        :show-upload-list="false"
                        @on-success="handleUploadSuccess"
                        @on-error="handleUploadErr">
                            <div class="img-item">
                                <Icon type="md-add" size="40"></Icon>
                            </div>
                        </Upload>
                    </div>
                </FormItem>
                <FormItem label="宣传画廊">
                    <div class="imgs-wrap">
                        <div class="img-item" v-for="item in goodsImgs" :key="item.key">
                            <img :src="item.src" alt="">
                            <p class="img-mask">    
                                <Icon type="md-trash" @click="handleDelImg(1)"></Icon>
                            </p>
                        </div>
                        <Upload action="https://www.iviewui.com/components/upload/jsonplaceholder.typicode.com/posts/"
                        :show-upload-list="false"
                        @on-success="handleUploadSuccess"
                        @on-error="handleUploadErr">
                            <div class="img-item">
                                <Icon type="md-add" size="40"></Icon>
                            </div>
                        </Upload>
                    </div>
                </FormItem>
                <FormItem label="商品单位">
                    <Input v-model="formData.unit" placeholder="个/件/盒"/>
                </FormItem>
                <FormItem label="关键字">
                    <Button icon="md-add" type="primary">增加</Button>
                </FormItem>
                <FormItem label="所属分类">
                    <Select v-model="formData.type">
                        <Option value="1">内衣</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属品牌商">
                    <Select v-model="formData.brand">
                        <Option value="1">蒂娅之谜</Option>
                    </Select>
                </FormItem>
                <FormItem label="商品简介">
                    <Input v-model="formData.remark" type="textarea"/>
                </FormItem>
                <FormItem label="商品详细介绍">
                    <Input v-model="formData.detail" type="textarea"/>
                </FormItem>
            </Form>
        </Card>
        <Card class="card-box">
            <h3 class="header-box">商品规格</h3>
            <p class="switch-tabs">
                <span :class="{active: item.value === curSpecificType}"
                 v-for="item in specificType" :key="item.value"
                 @click="switchSpecificType(item.value)">{{item.name}}</span>
            </p>
            <div>
                <Button type="primary">添加</Button>
                <Table :data="tableData" :columns="tableColumns">
                    <template slot="img">

                    </template>
                    <template slot="operate">
                        <Button type="danger">删除</Button>
                    </template>
                </Table>
            </div>
        </Card>
        <Card class="card-box">
            <h3 class="header-box">商品库存</h3>
        </Card>
        <Card class="card-box">
            <h3 class="header-box">商品参数</h3>
        </Card>
        <div class="btn-groups">
            <Button>取消</Button>
            <Button type="primary">上传</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'goods-create',
    data () {
        return {
            formData: {},
            goodsImgs: [],
            tableData: [],
            specificType: [{
                name: '默认标准规格',
                value: 0
            }, {
                name: '多规格支持',
                value: 1
            }],
            curSpecificType: 0,
            tableColumns: [
                {
                    title: '规格名',
                    key: '',
                    align: 'center'
                },
                {
                    title: '规格值',
                    key: '',
                    align: 'center'
                },
                {
                    title: '规格图片',
                    key: '',
                    align: 'center',
                    slot: 'img'
                },
                {
                    title: '操作',
                    align: 'center',
                    slot: 'operate'
                }
            ],
            validateRules: {
                name: [
                    {required: true, message: '商品名称不能为空', trigger: 'blur'}
                ],
                num: [
                    {required: true, message: '商品编号不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        /**
         * 删除图片的操作，type：1是商品图片，type：2是画廊图片
         */
        handleDelImg (type) {

        },

        // 修改规格类型 
        switchSpecificType (val) {
            this.curSpecificType = val
        },

        // 上传成功
        handleUploadSuccess (res, file) {
            console.log(111111111)
        },

        // 上传失败
        handleUploadErr (res, file) {
            console.log(222222222222)
        }
    }
}
</script>

<style lang="less">
.goods-create-page {
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
    .header-box {
        width: 100%;
        padding: 20px 0;
    }
    .card-box {
        margin-top: 20px;
        &:first-child {
            margin-top: 0;
        }
        .imgs-wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .img-item {
                width: 100px;
                height: 120px;
                border: 1px solid #CCCCCC;
                border-radius: 10px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 100%;
                    height: 100%;
                };
                .img-mask {
                    top: 0;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        .switch-tabs {
            span {
                user-select: none;
                display: inline-block;
                text-align: center;
                width: 120px;
                height: 40px;
                line-height: 40px;
                background: #FFF;
                border: 1px solid #CCC;
                cursor: pointer;
                &:first-child {
                    border-radius: 10px 0 0 10px;
                }
                &:last-child {
                    border-radius: 0 10px 10px 0;
                    border-left: none;
                }
                &.active {
                    color: #FFF;
                    background: #2d8cf0;
                    border-color: #2d8cf0;
                }
            }
        }
    }
}
</style>