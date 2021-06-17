<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 style="margin: 23.4px auto;text-align: center">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="false" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="false" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" style="width: 70%" v-model="loginForm.code" placeholder="点击图片更换验证码"></el-input>
        <img :src="catpchaUrl" alt="" style="width: 30%">
      </el-form-item>

      <div>
        <el-checkbox v-model="checked">记住我</el-checkbox>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'newLogin',
  data: function () {
    return {
      catpchaUrl: '',
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      checked: true,
      rules: {
        username: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //登录成功的话
          alert('submit!')
          //通过路由跳转过去，编程式导航
          this.$router.push("/mainhome");
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  width: 500px;
  margin: 180px auto;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

</style>
