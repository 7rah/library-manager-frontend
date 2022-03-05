<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">图书管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="姓名"
          name="username"
          type="text"
          maxlength="10"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="sid">
        <span class="svg-container">
          <svg-icon icon-class="guide" />
        </span>
        <el-input
          ref="sid"
          v-model="registerForm.sid"
          placeholder="学号"
          name="sid"
          type="number"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="introduction">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-input
          ref="introduction"
          v-model="registerForm.introduction"
          placeholder="个人介绍（可选，200字以内）"
          name="introduction"
          type="text"
          maxlength="200"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="age">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-input
          ref="age"
          v-model="registerForm.age"
          placeholder="年龄（可选）"
          name="age"
          type="number"
          min="0"
          max="100"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-select v-model="registerForm.sex" placeholder="性别（可选）">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <div style="margin: 12px" />

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleRegister"
      >注册</el-button>

      <div class="tips">
        <a href="#/login">已有账号？快速登录</a>
      </div>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'
export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validateSid = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入学号'))
      } else if (value.length !== 12) {
        callback(new Error('学号应为 12 位数字'))
      } else {
        callback()
      }
    }
    const validateIntroduction = (rule, value, callback) => {
      if (value.length > 200) {
        callback(new Error('超出字数限制'))
      } else {
        callback()
      }
    }
    const validateAge = (rule, value, callback) => {
      var age = Number(value)
      if (age < 0 | age > 100) {
        callback(new Error('年龄为 0~100 之间的整数'))
      }
      callback()
    }
    const validateSex = (rule, value, callback) => {
      callback()
    }
    const validateEmail = (rule, value, callback) => {
      var isvalid = String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      if (!isvalid) {
        callback(new Error('邮箱格式不正确'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if ((value.length < 8) | (value.length > 16)) {
        callback(new Error('密码长度为8~16位'))
      } else {
        var exp = new RegExp(
          '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}'
        )
        if (!exp.test(value)) {
          callback(new Error('密码为 8~16 位大小写字母加数字的组合'))
        }
      }
      callback()
    }

    return {
      registerForm: {
        username: '11',
        password: 'asdc1234ASD',
        sid: '111111111111',
        email: '2@g.com',
        introduction: '1',
        age: '1',
        sex: 'unknown'
      },
      registerRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        sid: [
          { required: true, trigger: 'blur', validator: validateSid }
        ],
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        introduction: [
          { required: false, trigger: 'blur', validator: validateIntroduction }
        ],
        age: [
          { required: false, trigger: 'blur', validator: validateAge }
        ],
        sex: [
          { required: false, trigger: 'blur', validator: validateSex }
        ]
      },
      options: [
        {
          value: 'male',
          label: '男'
        },
        {
          value: 'female',
          label: '女'
        },
        {
          value: 'unknown',
          label: '性别（不愿透露）'
        }
      ],
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      console.log(this.registerForm)
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          register(this.registerForm).then(() => {
            this.$router.push({ path: this.redirect || '/login' })
            this.loading = false
          }).catch(() => (this.loading = false))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  el-small-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
