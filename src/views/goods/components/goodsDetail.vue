<template>
  <div class="goods-create-page">
    <Card class="card-box">
      <h3 class="header-box">商品介绍</h3>
      <Form :label-width="100" :model="formData" :rules="validateRules">
        <FormItem label="商品编号" prop="num">
          <Input v-model="formData.num" />
        </FormItem>
        <FormItem label="商品名称" prop="name">
          <Input v-model="formData.name" />
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
              <img :src="item.src" alt="" />
              <p class="img-mask">
                <Icon type="md-trash" @click="handleDelImg(1)"></Icon>
              </p>
            </div>
            <Upload
              action="https://www.iviewui.com/components/upload/jsonplaceholder.typicode.com/posts/"
              :show-upload-list="false"
              @on-success="handleUploadSuccess"
              @on-error="handleUploadErr"
            >
              <div class="img-item">
                <Icon type="md-add" size="40"></Icon>
              </div>
            </Upload>
          </div>
        </FormItem>
        <FormItem label="宣传画廊">
          <div class="imgs-wrap">
            <div class="img-item" v-for="item in goodsImgs" :key="item.key">
              <img :src="item.src" alt="" />
              <p class="img-mask">
                <Icon type="md-trash" @click="handleDelImg(2)"></Icon>
              </p>
            </div>
            <Upload
              action="https://www.iviewui.com/components/upload/jsonplaceholder.typicode.com/posts/"
              :show-upload-list="false"
              @on-success="handleUploadSuccess"
              @on-error="handleUploadErr"
            >
              <div class="img-item">
                <Icon type="md-add" size="40"></Icon>
              </div>
            </Upload>
          </div>
        </FormItem>
        <FormItem label="商品单位">
          <Input v-model="formData.unit" placeholder="个/件/盒" />
        </FormItem>
        <FormItem label="关键字">
          <div class="flex-box">
            <Tag
              class="margin-right-10 tag-cyan"
              color="cyan"
              v-for="item in keyordList"
              size="large"
              :key="item.id"
              closable
              >{{ item.name }}</Tag
            >
            <Input
              v-focus
              class="input-size"
              @keyup.enter.native="addKeyword"
              focus
              v-model="keyword"
              v-if="showAddInput"
            />
            <div class="primary-btn" v-if="!showAddInput" @click="showInput">
              <Icon type="md-add"></Icon>
              <span>增加</span>
            </div>
          </div>
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
          <Input v-model="formData.remark" type="textarea" />
        </FormItem>
        <FormItem label="商品详细介绍">
          <!-- <Input v-model="formData.detail" type="textarea" /> -->
          <editor v-model="formData.detail" :init="tinymceInit"></editor>
        </FormItem>
      </Form>
    </Card>
    <Card class="card-box">
      <h3 class="header-box">商品规格</h3>
      <div class="switch-wrapper">
        <p class="switch-tabs">
          <span
            :class="{ active: item.value === curSpecificType }"
            v-for="item in specificType"
            :key="item.value"
            @click="switchSpecificType(item.value)"
            >{{ item.name }}</span
          >
        </p>
        <Button
          type="primary"
          ghost
          v-if="curSpecificType === 1"
          class="add-btn"
          @click="openModal(1)"
          >添加</Button
        >
      </div>
      <div class="margin-top-20">
        <Table
          :data="speTbData"
          :columns="curSpecificType == 1 ? speTbCol : speTbCol.slice(0, -1)"
        >
          <template slot="value" slot-scope="{ row }">
            <Tag color="cyan" class="tag-cyan">{{ row.value }}</Tag>
          </template>
          <template slot="img">
            <span></span>
          </template>
          <template slot="operate">
            <Button type="danger">删除</Button>
          </template>
        </Table>
      </div>
    </Card>
    <Card class="card-box">
      <h3 class="header-box">商品库存</h3>
      <div class="margin-top-20">
        <Table :data="stockTbData" :columns="stockTbCol">
          <template slot="operate">
            <Button type="primary" @click="openModal(2)">设置</Button>
          </template>
        </Table>
      </div>
    </Card>
    <Card class="card-box">
      <h3 class="header-box">商品参数</h3>
      <div>
        <Button type="primary" @click="openModal(3)">添加</Button>
        <Table
          class="margin-top-20"
          :data="paramsTbData"
          :columns="paramsTbCol"
        ></Table>
      </div>
    </Card>
    <div class="btn-groups">
      <Button>取消</Button>
      <Button type="primary">上架</Button>
    </div>

    <Modal v-model="showModal" scrollable>
      <div slot="header">{{ modalTitle }}</div>
      <Form :model="speFormData" :label-width="100" v-if="modalType === 1">
        <FormItem label="规格名">
          <Input v-model="speFormData.name" />
        </FormItem>
        <FormItem label="规格值">
          <Input v-model="speFormData.value" />
        </FormItem>
        <FormItem label="规格图片">
          <div class="imgs-wrap">
            <div class="img-item" v-for="item in goodsImgs" :key="item.key">
              <img :src="item.src" alt="" />
              <p class="img-mask">
                <Icon type="md-trash" @click="handleDelImg(3)"></Icon>
              </p>
            </div>
            <Upload
              action="https://www.iviewui.com/components/upload/jsonplaceholder.typicode.com/posts/"
              :show-upload-list="false"
              @on-success="handleUploadSuccess"
              @on-error="handleUploadErr"
            >
              <div class="img-item">
                <Icon type="md-add" size="40"></Icon>
              </div>
            </Upload>
          </div>
        </FormItem>
      </Form>
      <Form :model="speFormData" :label-width="100" v-else-if="modalType === 2">
        <FormItem label="货品规格列">
          <Input v-model="speFormData.name" />
        </FormItem>
        <FormItem label="货品售价">
          <Input v-model="speFormData.price" />
        </FormItem>
        <FormItem label="货品数量">
          <Input v-model="speFormData.num" />
        </FormItem>
        <FormItem label="规格图片">
          <div class="imgs-wrap">
            <div class="img-item" v-for="item in goodsImgs" :key="item.key">
              <img :src="item.src" alt="" />
              <p class="img-mask">
                <Icon type="md-trash" @click="handleDelImg(3)"></Icon>
              </p>
            </div>
            <Upload
              action="https://www.iviewui.com/components/upload/jsonplaceholder.typicode.com/posts/"
              :show-upload-list="false"
              @on-success="handleUploadSuccess"
              @on-error="handleUploadErr"
            >
              <div class="img-item">
                <Icon type="md-add" size="40"></Icon>
              </div>
            </Upload>
          </div>
        </FormItem>
      </Form>
      <Form :model="speFormData" :label-width="120" v-else-if="modalType === 3">
        <FormItem label="商品参数名称">
          <Input v-model="speFormData.name" />
        </FormItem>
        <FormItem label="商品参数值">
          <Input v-model="speFormData.price" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "goods-create",
  components: { editor: Editor },
  data() {
    return {
      formData: {}, // 商品介绍表单
      goodsImgs: [], // 商品图片,
      keyordList: [{ name: "标签" }], // 关键字列表
      keyword: "", // 关键字
      showAddInput: false, // 是否显示增加关键字的input框
      tinymceInit: {
        language: "zh_CN",
        height: 500,
        plugins: [
          "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize lineheight formatpainter axupimgs",
        ],
        toolbar: ['undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist',
         'styleselect formatselect fontselect fontsizeselect | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs'],
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px'
      }, // 初始化tinymce插件的参数
      validateRules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        num: [{ required: true, message: "商品编号不能为空", trigger: "blur" }],
      }, // 校验表单
      defaultGoodInfo: {
        name: "规格",
        value: "标准",
        price: 0,
        num: 0,
        img: "",
      }, // 默认的商品规格
      speFormData: {}, // 添加商品规格表单
      speTbData: [], // 商品规格表格数据
      speTbCol: [
        {
          title: "规格名",
          key: "name",
          align: "center",
        },
        {
          title: "规格值",
          key: "value",
          align: "center",
          slot: "value",
        },
        {
          title: "规格图片",
          key: "img",
          align: "center",
          slot: "img",
        },
        {
          title: "操作",
          align: "center",
          slot: "operate",
        },
      ], // 商品规格表格表头
      specificType: [
        {
          name: "默认标准规格",
          value: 0,
        },
        {
          name: "多规格支持",
          value: 1,
        },
      ], // 商品规格模式切换
      curSpecificType: 0, // 当前的商品规格模式
      stockTbData: [], // 商品库存表格数据
      stockTbCol: [
        {
          align: "center",
          key: "name",
          title: "货品规格",
        },
        {
          align: "center",
          key: "price",
          title: "货品售价",
        },
        {
          align: "center",
          key: "num",
          title: "货品数量",
        },
        {
          align: "center",
          key: "img",
          title: "货品图片",
        },
        {
          align: "center",
          title: "操作",
          slot: "operate",
        },
      ], // 商品库存表格的表头
      stockFormData: {}, // 商品库存添加货品表单
      paramsTbData: [], // 商品参数表格数据
      paramsTbCol: [
        {
          align: "center",
          key: "",
          title: "商品参数名称",
        },
        {
          align: "center",
          key: "",
          title: "商品参数值",
        },
        {
          align: "center",
          title: "操作",
          slot: "operate",
        },
      ], // 商品参数表格表头
      paramFormData: {}, // 添加商品参数表单
      showModal: false, // 是否显示对话框
      modalTitle: "", // 对话框标题
      modalType: 1, // 对话框类型，1是设置规格，2是添加货品，3是添加参数
    };
  },
  watch: {
    curSpecificType(cur) {
      if (cur === 0) {
        this.speTbData = [this.defaultGoodInfo];
        this.stockTbData = [this.defaultGoodInfo];
      } else {
        this.speTbData = [];
        this.stockTbData = [];
      }
    },
  },
  created() {
    if (this.curSpecificType === 0) {
      this.speTbData = [this.defaultGoodInfo];
      this.stockTbData = [this.defaultGoodInfo];
    }
  },
  methods: {
    /**
     * 删除图片的操作，type：1是商品图片，type：2是画廊图片，3是规格图片
     */
    handleDelImg(type) {},

    // 修改规格类型
    switchSpecificType(val) {
      this.curSpecificType = val;
    },

    // 上传成功
    handleUploadSuccess(res, file) {
      console.log(111111111);
    },

    // 上传失败
    handleUploadErr(res, file) {
      console.log(222222222222);
    },

    showInput() {
      this.showAddInput = true;
    },

    // 添加关键字
    addKeyword() {
      this.keyordList.push({
        name: this.keyword,
      });
      this.showAddInput = false;
      this.keyword = "";
    },
    // 打开对话框 1是设置规格，2是添加货品，3是添加参数
    openModal(type) {
      this.showModal = true;
      this.modalType = type;
      this.initModal(type);
    },
    // 初始化对话框
    initModal(type) {
      switch (type) {
        case 1:
          this.modalTitle = "设置规格";
          break;
        case 2:
          this.modalTitle = "添加货品";
          break;
        case 3:
          this.modalTitle = "添加商品参数";
          break;
        default:
          this.modalTitle = "";
      }
    },
  },
};
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
    .switch-wrapper {
      display: flex;
      align-items: center;
      .switch-tabs {
        margin-right: 100px;
        span {
          user-select: none;
          display: inline-block;
          text-align: center;
          width: 120px;
          height: 40px;
          line-height: 40px;
          background: #fff;
          border: 1px solid #ccc;
          cursor: pointer;
          &:first-child {
            border-radius: 10px 0 0 10px;
          }
          &:last-child {
            border-radius: 0 10px 10px 0;
            border-left: none;
          }
          &.active {
            color: #fff;
            background: #2d8cf0;
            border-color: #2d8cf0;
          }
        }
      }
      .add-btn:hover {
        background: #2d8cf0;
        color: #ffffff;
      }
    }
  }
  .btn-groups {
    text-align: right;
    margin-top: 20px;
  }
  .tag-cyan {
    i {
      color: #87e8de !important;
    }
  }
  .input-size {
    width: 82px;
    margin-right: 10px;
  }
}
.imgs-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .img-item {
    width: 140px;
    height: 140px;
    border: 1px dashed #cccccc;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      border-color: #2d8cf0;
    }
    img {
      width: 100%;
      height: 100%;
    }
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
</style>