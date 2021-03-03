<template>
  <div class="goods-detail-page" ref="goodsPage">
    <Card class="card-box">
      <h3 class="header-box">商品介绍</h3>
      <Form
        ref="formData"
        :label-width="100"
        :model="formData"
        :rules="validateRules"
      >
        <FormItem label="商品编号" prop="goodsSn">
          <Input v-model="formData.goodsSn" />
        </FormItem>
        <FormItem label="商品名称" prop="name">
          <Input v-model="formData.name" />
        </FormItem>
        <FormItem label="市场售价" prop="counterPrice">
          <Input v-model="formData.counterPrice">
            <p slot="append">元</p>
          </Input>
        </FormItem>
        <FormItem label="是否是新品">
          <RadioGroup v-model="formData.isNew">
            <Radio :label="1" :true-value="1" :false-value="0">新品</Radio>
            <Radio :label="0" :true-value="1" :false-value="0">非新品</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否热卖">
          <RadioGroup v-model="formData.isHot">
            <Radio :label="0" :true-value="1" :false-value="0">普通</Radio>
            <Radio :label="1" :true-value="1" :false-value="0">热卖</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否在售">
          <RadioGroup v-model="formData.saleStatus">
            <Radio :label="1" :true-value="1" :false-value="0">在售</Radio>
            <Radio :label="0" :true-value="1" :false-value="0">未售</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="商品图片" prop="picUrl">
          <div class="imgs-wrap">
            <div
              v-if="formData.picUrl"
              class="img-item"
              @mouseover="onHover(formData.picUrl)"
              @mouseleave="onLeave"
            >
              <img :src="formData.picUrl" />
              <p
                class="img-mask"
                v-show="hoverImg && formData.picUrl === hoverImg"
              >
                <CommonIcon
                  type="ios-trash"
                  @click.native="handleDelImg(1)"
                  :size="30"
                  class="icon-style"
                ></CommonIcon>
              </p>
            </div>
            <Upload
              v-else
              :action="uploadUrl"
              :headers="headers"
              :show-upload-list="false"
              :on-success="uploadGPSuccess"
              :on-error="uploadGPErr"
            >
              <div class="img-item">
                <CommonIcon type="md-add" :size="40"></CommonIcon>
              </div>
            </Upload>
          </div>
        </FormItem>
        <FormItem>
          <div slot="label" prop="gallery">
            宣传画廊
            <Tooltip content="宣传画廊最多上传5张图片!">
              <CommonIcon type="ios-information-circle"></CommonIcon>
            </Tooltip>
          </div>
          <div class="imgs-wrap">
            <div
              class="img-item margin-bottom-10"
              v-for="(item, index) in formData.gallery"
              :key="item"
              @mouseover="onHover(item)"
              @mouseleave="onLeave"
            >
              <img :src="item" />
              <p class="img-mask" v-show="hoverImg && item === hoverImg">
                <CommonIcon
                  type="ios-trash"
                  @click.native="handleDelImg(2, index)"
                  :size="30"
                  class="icon-style"
                ></CommonIcon>
              </p>
            </div>
            <Upload
              :action="uploadUrl"
              :headers="headers"
              :show-upload-list="false"
              multiple
              :before-upload="beforeGalleryUpload"
              :on-success="uploadGallerySuccess"
              :on-error="uploadGalleryErr"
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
              v-for="(item, index) in formData.keywords"
              size="large"
              :key="index"
              closable
              @on-close="onCloseTag(index)"
              >{{ item }}</Tag
            >
            <Input
              v-focus
              class="input-size"
              @keyup.enter.native="addKeyword"
              @on-blur="addKeyword"
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
        <FormItem label="所属分类" prop="categoryId">
          <Cascader
            v-model="formData.categoryId"
            :data="categoryList"
            clearable
          ></Cascader>
        </FormItem>
        <FormItem label="所属品牌商">
          <Select v-model="formData.brandId" clearable>
            <Option
              v-for="item in brandList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="商品简介">
          <Input v-model="formData.brief" type="textarea" />
        </FormItem>
        <FormItem label="商品详细介绍">
          <editor v-model="formData.detail" :init="tinymceInit"></editor>
        </FormItem>
      </Form>
    </Card>
    <Card class="card-box">
      <h3 class="header-box">商品规格</h3>
      <div class="switch-wrapper" v-if="type === 'create'">
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
          <template slot="img" slot-scope="{ row }">
            <img :src="row.picUrl" width="40" />
          </template>
          <template slot="operate" slot-scope="scope">
            <Button type="error" @click="delSpecification(scope)">删除</Button>
          </template>
        </Table>
      </div>
    </Card>
    <Card class="card-box">
      <h3 class="header-box">商品库存</h3>
      <div>
        <Table :data="productTbData" :columns="productTbCol">
          <template slot="specifications" slot-scope="{ row }">
            <Tag
              color="cyan"
              v-for="item in row.specifications"
              :key="item"
              class="tag-cyan"
              >{{ item }}</Tag
            >
          </template>
          <template slot="picUrl" slot-scope="{ row }">
            <img :src="row.picUrl" width="40" />
          </template>
          <template slot="operate" slot-scope="{ row }">
            <Button type="primary" @click="openModal(2, row)">设置</Button>
          </template>
        </Table>
      </div>
    </Card>
    <Card class="card-box">
      <h3 class="header-box">商品参数</h3>
      <div>
        <Button type="primary" @click="openModal(3)">添加</Button>
        <Table class="margin-top-20" :data="attrTbData" :columns="attrTbCol">
          <template slot="operate" slot-scope="scope">
            <Button type="error" @click="delAttr(scope)">删除</Button>
          </template>
        </Table>
      </div>
    </Card>
    <div class="btn-groups">
      <Button class="margin-right-10">取消</Button>
      <Button type="primary" @click="onSave">{{
        type === "edit" ? "更新商品" : "上架"
      }}</Button>
    </div>

    <Modal v-model="showModal" scrollable>
      <div slot="header">{{ modalTitle }}</div>
      <Form
        ref="specifications"
        :model="specifications"
        :label-width="100"
        v-if="modalType === 1"
        :rules="specRules"
      >
        <FormItem label="规格名" prop="specification">
          <Input v-model="specifications.specification" />
        </FormItem>
        <FormItem label="规格值" prop="value">
          <Input v-model="specifications.value" />
        </FormItem>
        <FormItem label="规格图片" prop="picUrl">
          <div class="imgs-wrap">
            <div
              class="img-item"
              v-if="specifications.picUrl"
              @mouseover="onHover(specifications.picUrl)"
              @mouseleave="onLeave"
            >
              <img :src="specifications.picUrl" />
              <p
                class="img-mask"
                v-show="hoverImg && specifications.picUrl === hoverImg"
              >
                <CommonIcon
                  type="ios-trash"
                  @click.native="handleDelImg(3)"
                  :size="30"
                  class="icon-style"
                ></CommonIcon>
              </p>
            </div>
            <Upload
              v-else
              :action="uploadUrl"
              :headers="headers"
              :show-upload-list="false"
              :on-success="uploadSpeSuccess"
              :on-error="uploadSpeErr"
            >
              <div class="img-item">
                <Icon type="md-add" size="40"></Icon>
              </div>
            </Upload>
          </div>
        </FormItem>
      </Form>
      <Form
        ref="productForm"
        :model="products"
        :label-width="100"
        v-else-if="modalType === 2"
        :rules="productRules"
      >
        <FormItem label="货品规格列" prop="specifications">
          <Tag
            color="cyan"
            class="tag-cyan"
            v-for="(item, index) in products.specifications"
            :key="index"
            >{{ item }}</Tag
          >
        </FormItem>
        <FormItem label="货品售价" prop="price">
          <Input v-model.trim="products.price" />
        </FormItem>
        <FormItem label="货品数量" prop="number">
          <Input v-model="products.number" />
        </FormItem>
        <FormItem label="规格图片" prop="picUrl">
          <div class="imgs-wrap">
            <div
              class="img-item"
              v-if="products.picUrl"
              @mouseover="onHover(products.picUrl)"
              @mouseleave="onLeave"
            >
              <img :src="products.picUrl" />
              <p
                class="img-mask"
                v-show="hoverImg && products.picUrl === hoverImg"
              >
                <CommonIcon
                  type="ios-trash"
                  @click.native="handleDelImg(4)"
                  :size="30"
                  class="icon-style"
                ></CommonIcon>
              </p>
            </div>
            <Upload
              v-else
              :action="uploadUrl"
              :headers="headers"
              :show-upload-list="false"
              :on-success="uploadProdSuccess"
              :on-error="uploadProdErr"
            >
              <div class="img-item">
                <Icon type="md-add" size="40"></Icon>
              </div>
            </Upload>
          </div>
        </FormItem>
      </Form>
      <Form
        :model="attributes"
        ref="attributes"
        :label-width="120"
        v-else-if="modalType === 3"
        :rules="attrRules"
      >
        <FormItem label="商品参数名称" prop="attribute">
          <Input v-model="attributes.attribute" />
        </FormItem>
        <FormItem label="商品参数值" prop="value">
          <Input v-model="attributes.value" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelModal">取消</Button>
        <Button type="primary" @click="okModal">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import Editor from '@tinymce/tinymce-vue'
import { getCateAndBrand } from '@/api/goods'
import { assetsPath } from '@/config'
import { validNumber } from '@/utils/validators'
import 'tinymce/plugins/media'

export default {
  name: 'GoodsCreate',
  components: { editor: Editor },
  props: {
    type: {
      type: String,
      default: 'create',
    },
    info: {
      type: Object,
    },
  },
  data() {
    return {
      brandList: [], // 品牌商列表
      categoryList: [], // 分类列表
      formData: {
        goodsSn: '',
        name: '',
        counterPrice: 0.0,
        isNew: 1,
        isHot: 0,
        saleStatus: 1,
        picUrl: '',
        gallery: [],
        unit: '',
        keywords: [],
        categoryId: ['0'],
        brandId: '',
        brief: '',
        detail: '',
      }, // 商品介绍表单
      goodsImgs: [], // 商品图片,
      hoverImg: '', // hover的图片
      keyordList: [], // 关键字列表
      keyword: '', // 关键字
      showAddInput: false, // 是否显示增加关键字的input框
      tinymceInit: {
        language: 'zh_CN',
        base_url: '/static/tinymce/',
        language_url: '/static/tinymce/langs/zh_CN.js',
        height: 500,
        theme: 'silver',
        plugins: [
          'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize lineheight formatpainter axupimgs',
        ],
        toolbar: [
          'undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist',
          'styleselect formatselect fontselect fontsizeselect | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
        ],
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        // 图片处理
        images_upload_handler: (blobInfo, success, failure) => {
          const fd = new FormData()
          fd.append('file', blobInfo.blob())
          console.log('图片', fd)
        },
        file_picker_types: 'media',
        vedio_template_callback: (data) => {
          return '<video width="' + data.width + '" height="' + data.height + '"' 
          + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' 
          + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') 
          + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' 
          + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>'
        },
        media_live_embeds: true,
        // 本地上传处理
        file_picker_callback: (cb, value, meta) => {
          if (meta.filetype === 'media') {
            const self = this
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            let file
            let xhr
            input.onchange = function () {
              file = this.files[0]
              xhr = new XMLHttpRequest()
              xhr.open('post', self.uploadUrl)
              xhr.withCredentials = true
              xhr.upload.onprogress = function (e) {
                console.log('onprogress: ', e)
                const percent = e.loaded / e.total * 100
                if (percent < 100) {
                  tinymce.activeEditor.setProgressState(true) // 是否显示loading状态
                } else {
                  tinymce.activeEditor.setProgressState(false)
                }
              }
              xhr.onerror = function () {
                console.log(xhr.status)
                tinymce.activeEditor.setProgressState(false)
                return
              }
              xhr.onload = function () {
                if (xhr.status < 200 || this.status >= 300) {
                  console.log('http error', xhr.status)
                  return
                }
                const json = JSON.parse(xhr.responseText)
                if (json.errno === 0) {
                  const mediaLocation = json.data.url
                  cb(mediaLocation, {title: file.name})
                } else {
                  console.log(json.msg)
                  return
                }
              }
              const formData = new FormData()
              formData.append('file', file)
              xhr.send(formData)
            }
            input.click()
          }
        }
      }, // 初始化tinymce插件的参数
      validateRules: {
        name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' },
        ],
        goodsSn: [
          { required: true, message: '商品编号不能为空', trigger: 'blur' },
        ],
        counterPrice: [
          { required: true, type: 'number',
            transform(value) {
              return Number(value)
            }, 
            validator: (rule, value, callback) => {
              validNumber(rule, value, callback, '市场售价')
            },
            trigger: 'blur' }
        ],
        picUrl: [
          { required: true, message: '商品图片不能为空', trigger: 'blur' }
        ],
        gallery: [
          { required: true, type: 'array', message: '宣传不能为空', trigger: 'change' }
        ],
        categoryId: [
          { required: true, type: 'array', message: "所属分类不能为空", trigger: 'change'}
        ],
      }, // 校验表单
      defaultGoodInfo: {
        specification: '规格',
        value: '标准',
        price: 0,
        number: 0,
        picUrl: '',
      }, // 默认的商品规格
      specifications: {
        goodsId: '',
        id: '',
        picUrl: '',
        specification: '',
        value: '',
      }, // 添加商品规格表单
      specRules: {
        specification: [
          { required: true, message: '规格名不能为空', trigger: 'blur' },
        ],
        value: [{ required: true, message: '规格值不能为空', trigger: 'blur' }],
      }, // 添加商品规格表单校验
      speTbData: [], // 商品规格表格数据
      speTbCol: [
        {
          title: '规格名',
          key: 'specification',
          align: 'center',
        },
        {
          title: '规格值',
          key: 'value',
          align: 'center',
          slot: 'value',
        },
        {
          title: '规格图片',
          key: 'picUrl',
          align: 'center',
          slot: 'img',
        },
        {
          title: '操作',
          align: 'center',
          slot: 'operate',
        },
      ], // 商品规格表格表头
      specificType: [
        {
          name: '默认标准规格',
          value: 0,
        },
        {
          name: '多规格支持',
          value: 1,
        },
      ], // 商品规格模式切换
      curSpecificType: 0, // 当前的商品规格模式
      productTbData: [], // 商品库存表格数据
      productTbCol: [
        {
          align: 'center',
          key: 'specifications',
          title: '货品规格',
          slot: 'specifications',
        },
        {
          align: 'center',
          key: 'price',
          title: '货品售价',
        },
        {
          align: 'center',
          key: 'number',
          title: '货品数量',
        },
        {
          align: 'center',
          key: 'picUrl',
          title: '货品图片',
          slot: 'picUrl',
        },
        {
          align: 'center',
          title: '操作',
          slot: 'operate',
        },
      ], // 商品库存表格的表头
      products: {
        goodsId: '',
        id: '',
        price: 0,
        specifications: [],
        number: 0,
        picUrl: '',
      }, // 商品库存添加货品表单
      productRules: {
        specifications: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value || value.length === 0) {
                callback(new Error('货品规格列不能为空'))
              } else {
                callback()
              }
            },
            trigger: 'change',
          },
        ],
        price: [
          {
            required: true,
            type: 'number',
            transform(value) {
              return Number(value)
            }, 
            validator: (rule, value, callback) => {
              validNumber(rule, value, callback, '货品售价')
            },
            trigger: 'blur',
          },
        ],
        number: [
          {
            required: true,
            type: 'number',
            transform(value) {
              return Number(value)
            }, 
            validator: (rule, value, callback) => {
              if (!value && value != 0) {
                callback(new Error(`货品数量不能为空`))
              }
              if (window.isNaN(value)) {
                callback(new Error('货品数量应为数字'))
              }
              if (value % 1 != 0 || value <= 0) {
                callback(new Error('请输入大于0的整数'))
              }
              callback()
            },
            trigger: 'blur',
          }
        ],
      }, // 商品库存添加货品表单校验
      attrTbData: [], // 商品参数表格数据
      attrTbCol: [
        {
          align: 'center',
          key: 'attribute',
          title: '商品参数名称',
        },
        {
          align: 'center',
          key: 'value',
          title: '商品参数值',
        },
        {
          align: 'center',
          title: '操作',
          slot: 'operate',
        },
      ], // 商品参数表格表头
      attributes: {
        attribute: '',
        value: '',
      }, // 添加商品参数表单
      attrRules: {
        attribute: [
          { required: true, message: '商品参数名称不能为空', trigger: 'blur' },
        ],
        value: [
          { required: true, message: '商品参数值不能为空', trigger: 'blur' },
        ],
      }, // 添加商品参数表单校验
      showModal: false, // 是否显示对话框
      modalTitle: '', // 对话框标题
      modalType: 1, // 对话框类型，1是设置规格，2是添加货品，3是添加参数
    }
  },
  computed: {
    uploadUrl() {
      return this.$store.state.uploadFileUrl
    },
    headers() {
      return {
        [this.$config.TOKENKEY]: this.$store.state.token,
      }
    },
  },
  watch: {
    type(cur) {
      if (cur !== 'create') {
        this.curSpecificType = 1
      }
    },
    info(cur) {
      this.formData = {
        ...this.formData,
        ...cur.goods,
      }
      this.formData.categoryId = cur.categoryIds
      this.formData.keywords = this.formData.keywords ? this.formData.keywords.split(',') : []
      this.productTbData = [...cur.products]
      this.attrTbData = [...cur.attributes]
      this.speTbData = [...cur.specifications]
    },
    curSpecificType(cur) {
      if (cur === 0) {
        this.speTbData = [{ ...this.defaultGoodInfo }]
        this.productTbData = [{ ...this.defaultGoodInfo, specifications: ['规格'] }]
      } else {
        this.speTbData = []
        this.productTbData = []
      }
    },
  },
  created() {
    if (this.type === 'create' && this.curSpecificType === 0) {
      this.speTbData = [{ ...this.defaultGoodInfo }]
      this.productTbData = [{ ...this.defaultGoodInfo, specifications: ['规格'] }]
    }
    this.getCateAndBrand()
  },
  methods: {
    // 获取分类和品牌商
    getCateAndBrand() {
      getCateAndBrand({})
        .then((res) => {
          if (res.errno === 0) {
            const data = res.data || {}
            this.brandList = data.brandList || []
            this.categoryList = data.categoryList || []
          } else {
            this.brandList = []
            this.categoryList = []
          }
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    },
    /**
     * 删除图片的操作，type：1是商品图片，type：2是画廊图片，3是规格图片, index是type为2时的，指的是数组下标
     */
    handleDelImg(type, index) {
      if (type === 1) {
        this.formData.picUrl = ''
      } else if (type === 2) {
        this.formData.gallery.splice(index, 1)
      } else {
        // this.formData.gallery.splice(index, 1)
      }
    },

    // 修改规格类型
    switchSpecificType(val) {
      this.curSpecificType = val
    },

    // 上传成功的统一处理
    commonUpload(res, file, success, error) {
      if (res.errno === 0) {
        success(res)
      } else if (res.errno === 10011001) {
        this.$router.push({
          name: 'login',
        })
      } else {
        error()
      }
    },

    // 上传商品图片成功
    uploadGPSuccess(res, file) {
      this.commonUpload(
        res,
        file,
        () => {
          const data = res.data || {}
          this.formData.picUrl = data.url
        },
        () => {
          this.$Message.error('商品图片上传失败')
        },
      )
    },

    // 上传商品图片失败
    uploadGPErr(res, file) {
      console.log(res, file)
      this.$Message.error('商品图片上传失败')
    },

    // 上传宣传图片前的操作
    beforeGalleryUpload() {
      if (this.formData.gallery && this.formData.gallery.length >= 5) {
        this.$Message.warning('上传文件个数超出限制!最多上传5张图片!')
        return false
      }
      return true
    },

    // 上传宣传图片成功
    uploadGallerySuccess(res, file) {
      this.commonUpload(
        res,
        file,
        () => {
          const data = res.data || {}
          this.formData.gallery.push(data.url)
        },
        () => {
          this.$Message.error('宣传图片上传失败')
        },
      )
    },

    // 上传宣传图片失败
    uploadGalleryErr(res, file) {
      console.log(res, file)
      this.$Message.error('宣传图片上传失败')
    },

    // 上传商品规格的商品图片成功
    uploadSpeSuccess(res, file) {
      this.commonUpload(
        res,
        file,
        () => {
          const data = res.data || {}
          this.specifications.picUrl = data.url
        },
        () => {
          this.$Message.error('规格图片上传失败')
        },
      )
    },

    // 上传商品规格的商品图片失败
    uploadSpeErr(res, file) {
      console.log(res, file)
      this.$Message.error('规格图片上传失败')
    },

    // 商品库存的商品图片上传成功
    uploadProdSuccess(res, file) {
      this.commonUpload(
        res,
        file,
        () => {
          const data = res.data || {}
          this.products.picUrl = data.url
        },
        () => {
          this.$Message.error('货品图片上传失败')
        },
      )
    },

    // 商品库存的商品图片上传失败
    uploadProdErr(res, file) {
      console.log(res, file)
      this.$Message.error('货品图片上传失败')
    },

    onHover(item) {
      this.hoverImg = item
    },

    onLeave() {
      this.hoverImg = ''
    },

    // 显示添加关键字的input
    showInput() {
      this.showAddInput = true
    },

    // 删除关键字
    onCloseTag(index) {
      this.formData.keywords.splice(index, 1)
    },

    // 添加关键字
    addKeyword() {
      if (!this.keyword.length) {
        this.showAddInput = false
        this.keyword = ''
        return
      }
      this.formData.keywords.push(this.keyword)
      this.showAddInput = false
      this.keyword = ''
    },
    // 打开对话框 1是设置规格，2是添加货品，3是添加参数
    openModal(type, row) {
      this.showModal = true
      this.modalType = type
      console.log(11, type, row)
      this.initModal(type, row)
    },
    // 初始化对话框
    initModal(type, row) {
      this.$nextTick(() => {
        switch (type) {
        case 1:
          this.modalTitle = '设置规格'
          this.$refs.specifications.resetFields()
          break
        case 2:
          this.modalTitle = '添加货品'
          this.$refs.productForm.resetFields()
          this.products = { ...(row || this.products) }
          break
        case 3:
          this.modalTitle = '添加商品参数'
          this.$refs.attributes.resetFields()
          break
        default:
          this.modalTitle = ''
        }
      })
    },
    // 删除添加的规格
    delSpecification(scope) {
      this.speTbData.splice(scope.index, 1)
      if (this.speTbData.length > 0) {
        const index = this.productTbData[0].specifications.indexOf(
          scope.row.specification,
        )
        index > -1 && this.productTbData[0].specifications.splice(index, 1)
      } else {
        this.productTbData = []
      }
    },
    // 删除商品参数
    delAttr(scope) {
      this.attrTbData.splice(scope.index, 1)
    },
    // 点击对话框的确认
    okModal() {
      let showModal = false
      switch (this.modalType) {
      case 1:
        this.$refs.specifications.validate((valid) => {
          if (valid) {
            this.speTbData.push({
              ...this.specifications,
            })
            const specifications = []
            this.speTbData.forEach((item) => {
              specifications.push(item.specification)
            })
            if (!this.productTbData.length) {
              this.productTbData.push({
                ...this.products,
                specifications,
              })
            } else {
              this.productTbData[0].specifications = specifications
            }
          } else {
            showModal = true
          }
        })
        break
      case 2:
        this.$refs.productForm.validate((valid) => {
          if (valid) {
            console.log(222222)
          } else {
            showModal = true
          }
        })
        break
      case 3:
        this.$refs.attributes.validate((valid) => {
          if (valid) {
            this.attrTbData.push(this.attributes)
          } else {
            showModal = true
          }
        })
        break
      default: showModal = true
      }
      this.showModal = showModal
    },
    // 点击对话框的取消
    cancelModal() {
      this.showModal = false
    },
    // 点击上架或更新商品
    onSave() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          const formData = { ...this.formData }
          formData.keywords = formData.keywords.join(',')
          formData.categoryId = formData.categoryId[formData.categoryId.length - 1]
          this.$emit('on-save', {
            goods: formData,
            attributes: this.attrTbData,
            products: this.productTbData,
            specifications: this.speTbData,
          })
        } else {
          this.$refs.goodsPage.scrollTop = 0
        }
      })
    },
  },
}
</script>

<style lang="less">
.goods-detail-page {
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
    .margin-x(right, 10px);
    &:hover {
      border-color: #2d8cf0;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .img-mask {
      border-radius: 10px;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-style {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
