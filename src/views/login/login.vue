<template>
  <div class="login-page">
    <div class="from-box">
      <div class="form-header">欢迎登录</div>
      <div class="form-body">
        <Form
          ref="loginForm"
          :model="loginForm"
          :rules="formValid"
          @keyup.enter.native="submitForm"
        >
          <FormItem prop="username">
            <Input type="text" placeholder="账户" v-model="loginForm.username">
              <Icon size="18" slot="prepend" type="md-person"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            >
              <Icon size="18" slot="prepend" type="md-lock"></Icon>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div class="form-footer">
        <Button
          type="primary"
          :loading="loading"
          class="login-btn"
          @click="submitForm"
          >登录</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/auth'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      formValid: {
        username: [
          { required: true, message: '账户不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
      loading: false,
    }
  },
  methods: {
    /**
     * 提交表单
     */
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.reqLogin()
        }
      })
    },

    /**
     * 请求登录
     */
    reqLogin() {
      login(this.loginForm)
        .then((res) => {
          if (res.errno === 0) {
            const data = res.data || {}
            this.$store.commit('SET_TOKEN', data.token)
            this.$router.push({
              name: this.$config.homeName,
            })
          } else {
            this.$Message.error(res.errmsg)
          }
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background: #263649;
  position: relative;
  .from-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: auto;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }
  .form-header {
    font-size: 18px;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #e8eaec;
    text-align: center;
  }
  .form-body {
    padding: 30px 20px 0;
  }
  .form-footer {
    padding: 0 20px 30px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
