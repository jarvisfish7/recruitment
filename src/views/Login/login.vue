<template>
  <div class="login-body">
    <el-container class="loginw">
      <div class="login">
        <!--        左边的-->
        <div class="login-left">
          <router-link to="/mainhome" class="l-logo">
            <img src="../../../public/data/images/Eagle-Logo-Vector.png"/>
            <div>
              <p>IT行业</p>
              <p>找工作</p>
            </div>
          </router-link>
          <!-- 左侧列单显示 -->
          <div class="tab">
            <ul v-if="flag==='0'">
              <li>
                <i class="el-icon-message-solid"></i>
                <p>任性选</p>
                <p>各大行业任你选</p>
              </li>
              <li>
                <i class="el-icon-s-flag"></i>
                <p>突破自我</p>
                <p>迎接新的挑战</p>
              </li>
              <li>
                <i class="el-icon-s-promotion"></i>
                <p>抓住机遇</p>
                <p>实现自我价值</p>
              </li>
            </ul>
            <ul v-else>
              <li>
                <i class="el-icon-notebook-2"></i>
                <p>招聘效果好</p>
                <p>与职场牛人在线开聊</p>
              </li>
              <li>
                <i class="el-icon-collection"></i>
                <p>更多在线牛人</p>
                <p>入职速度快</p>
              </li>
              <li>
                <i class="el-icon-goblet-square-full"></i>
                <p>人才匹配度高</p>
                <p>获取更精准的牛人</p>
              </li>
            </ul>
          </div>
        </div>
        <!--        右边的-->
        <div class="login-right">
          <!-- :default-active="activeIndex" -->
          <!--点击切换标识符来识别登录方法-->
          <el-menu
            class="el-menu-demo login-menu"
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="0" class="on">求职者登录</el-menu-item>
            <el-menu-item index="1">BOSS登录</el-menu-item>
            <!-- <el-menu-item index="3">管理员登录</el-menu-item> -->
          </el-menu>

          <div class="l-r-inner">
            <el-form
              :model="loginForm"
              status-icon
              :rules="rules"
              ref="loginForm"
              label-width="100px"
            >
              <el-form-item label="账 号：" prop="username">
                <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密 码：" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  width="400px"
                  style="background-color:black;color:white"
                  @click="login('ruleForm')"
                >登 录
                </el-button>
              </el-form-item>
            </el-form>
            <p class="login-r">
              没有账号
              <router-link to="/regist" style="color:red">立即注册</router-link>
            </p>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>

import { postRequest } from '../../util/api'

export default {
  name: 'newLogin',
  data () {
    var userCheck = (rule, value, callback) => {
      var reg = /^[a-z0-9]{3,8}$/i
      if (value === '') {
        callback(new Error('请输入账户'))
      } else {
        if (!reg.test(value)) {
          //提示信息
          callback(new Error('用户名格式不正确,请输入3-8位字母或者数字'))
        }
        callback()
      }
    }
    var passCheck = (rule, value, callback) => {
      var reg = /^[a-z0-9]{3,8}$/i
      if (value == '') {
        callback(new Error('请输入密码'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('密码格式不正确,请输入3-8位字母或数字'))
        }
        callback()
      }
    }
    return {
      activeIndex: '0',
      flag: '0',
      loginForm: {
        username: '',
        password: '',
      },
      token: '',
      rules: {
        username: [{
          required: true,
          validator: userCheck,
          trigger: 'blur'
        }],
        password: [{
          required: true,
          validator: passCheck,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.flag = key
      console.log(this.flag, key, keyPath)
    },
    login () {
      this.$refs.loginForm.validate(valid => {
          if (valid) {
            if (this.flag === '0') {
             this.$store.dispatch("login",this.loginForm)
              .then(response=>{
                this.$router.push('/mainhome');
              }).catch(err=>{
              console.log(err);
            })
          }
            if (this.flag === '1') {
              this.$store.dispatch("companylogin",this.loginForm)
                .then(response=>{
                  this.$router.push('/mainhome');
                }).catch(err=>{
                console.log(err);
              })
            }
        }

      })
    }
  },
}
</script>

<style scoped>
.login-body {
  width: 100%;
  height: 1000px;
  /*background: url("../../../public/data/images/loginbg.jpg") no-repeat;*/
  background: url("../../../public/data/images/loginviewBg1.png");
  background-size: cover;
}

.login {
  position: absolute;
  width: 740px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  border: 1px dotted black;
  box-shadow: -7px -6px 100px white;
}

.login-title {
  align-content: center;
  font-size: 20px;
}

.login-left {
  float: left;
  width: 240px;
  height: 500px;
  color: #000;
  border-radius: 10px 0 0 10px;
  box-sizing: border-box;
  background-color: #fff;
}

.login-left img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}

.l-logo {
  float: none;
  display: block;
  width: auto;
  height: 50px;
  margin: 88px 0 0 40px;
  padding: 0;
}

.l-logo div {
  float: right;
  position: relative;
  bottom: -1px;
  right: 50px;
}

.l-logo div p {
  line-height: 40px;
}

.login-left ul {
  margin: 50px 0 0 40px;
}

.login-left li {
  margin-bottom: 50px;
}

.login-left li i {
  float: left;
  width: 25px;
  height: 42px;
  background-size: 100% auto;
}

.login-left li > p:first-of-type {
  line-height: 22px;
  color: #8d92a1;
  font-size: 16px;
  font-weight: 700;
}

.login-leftli > p:last-of-type {
  margin-top: 2px;
  line-height: 18px;
  color: #b0b4c1;
  font-size: 13px;
}

.login-right {
  float: left;
  width: 500px;
  height: 500px;
  color: #000;
  background-color: #fff;
  border-radius: 0px 10px 10px 0;
  box-sizing: border-box;
}

.login-menu {
  float: left;
  width: 500px;
  height: 60px;
  margin: 40px 0 0;
  padding: 0 10px;
  box-sizing: border-box;
}

.login-menu .el-menu-item {
  /*加上管理员登录后的样式
  margin: 0 15px;
  line-height: 60px;
  font-size: 18px;*/
  padding: 0 76px;
  float: left;
  color: #909399;
  line-height: 60px;
  font-size: 18px;
  box-sizing: inherit;
  border-bottom: 2px solid red;
}

.login-menu .el-menu-item.is-active {
  color: black;
}

.l-r-inner {
  position: relative;
  width: 324px;
  top: 70px;
  margin: 70px auto;
}

.l-r-inner .el-form-item {
  margin: 50px auto;
}

.login-r {
  position: absolute;
  width: 200px;
  float: right;
  right: 20px;
  font-size: 14px;
  margin-top: 30px;
}

/* 左侧栏 */
.tab ul {
  margin: 50px 0 0 40px;
}

.tab li {
  margin-bottom: 50px;
}

.tab li i {
  float: left;
  width: 25px;
  height: 42px;
  color: #8d92a1;
  background-size: 100% auto;
}

.tab li > p:first-of-type {
  line-height: 22px;
  color: #8d92a1;
  font-size: 16px;
  font-weight: 700;
}

.tab li > p:last-of-type {
  margin-top: 2px;
  line-height: 18px;
  color: #b0b4c1;
  font-size: 13px;
}
</style>
