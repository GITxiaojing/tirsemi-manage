<template>
  <Upload
    :action="uploadUrl"
    :headers="headers"
    :show-upload-list="false"
    :on-success="handleUploadSuccess"
    :on-error="handleUploadErr"
  >
    <slot></slot>
  </Upload>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    headers: Object,
    actions: String,
    multiple: Boolean,
    paste: Boolean,
    webkitdirectory: Boolean,
    disabled: Boolean,
    data: Object,
    name: String,
    widthCredentials: Boolean,
    showUploadList: Boolean,
    type: String,
    accept: String,
    format: Array,
    maxSize: Number,
    beforeUpload: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    onPreview: Function,
    onRemove: Function,
    onFormatError: Function,
    onExceededSize: Function,
    defaultFileList: Array,
  },
  computed: {
    uploadUrl() {
      return this.$store.state.uploadFileUrl
    },
    defaultHeaders() {
      return {
        [this.$config.TOKENKEY]: this.$store.state.token,
      }
    },
  },
  methods: {
    // 上传成功
    handleUploadSuccess(res, file) {
      if (res.errno === 0) {
        this.$emit('on-success', res, file)
      } else if (res.errno === 10011001) {
        this.$router.push({
          name: 'login',
        })
      } else {
        this.$emit('on-error', res, file)
      }
    },

    // 上传失败
    handleUploadErr(res, file) {
      this.$emit('on-error', res, file)
    },
  },
}
</script>
