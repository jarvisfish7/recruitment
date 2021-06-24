<template>
  <div class="home-session" style="margin: 20px 110px 5px;">
    <div class="logo-content" style="display: flex;flex-direction:row;align-items: center;">
      <img style="height: 50px;width: 50px" src="../../../public/data/images/Eagle-Logo-Vector.png">
      <span style="padding-bottom: 10px;">猎鹰招聘，找到自己的好鹰爪！</span>

    </div>
    <div class="form-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="padding-right:100px;"
               class="demo-ruleForm">
        <el-form-item label="工作名称" prop="job_name">
          <el-input v-model.trim="ruleForm.job_name" class="input"></el-input>
        </el-form-item>

        <el-form-item label="工作职位" prop="cascaderValue">
          <el-cascader
            v-model="ruleForm.cascaderValue"
            :options="position_options"
            :props="{ expandTrigger: 'hover',value:'id',label:'name' }"
            @change="PositionChange">
          </el-cascader>
        </el-form-item>

        <el-form-item label="公司Id" prop="job_company_id">
          <el-input v-model="ruleForm.job_company_id" class="input" placeholder="10000" disabled></el-input>
        </el-form-item>


        <el-form-item label="工作要求" prop="require_tech">
          <el-input v-model="ruleForm.require_tech" class="input" placeholder="测试的，随便" disabled></el-input>
        </el-form-item>

        <el-form-item label="工作位置" prop="job_location">
          <!--        <v-region v-model="ruleForm.job_location" @values="regionChange" style="height: 40px"></v-region>-->
          <v-region v-model="ruleForm.job_location" @values="regionChange" type="group" :town="false">
          </v-region>
          <!--          <v-region v-model="ruleForm.job_location" style="line-height: 40px" @values="regionChange"></v-region>-->
        </el-form-item>

        <el-form-item label="工作薪资" prop="job_salary">
          <!--      <el-input v-model="ruleForm.job_salary" class="input">-->
          <div class="block">
            <el-slider
              v-model="ruleForm.job_salary"
              :max="50000"
              :min="0"
              :step="100"
              show-input>
            </el-slider>
          </div>
          <el-input v-model="ruleForm.job_salary" @blur="BlurMoney($event)" disabled class="input"
                    prefix-icon="iconfont al-iconic_money_enter24px">
            <template slot="append">RMB/月</template>
          </el-input>
        </el-form-item>

        <el-form-item label="要求学历" prop="job_education">
          <el-select v-model="ruleForm.job_education" placeholder="请选择学历要求">
            <el-option label="不限学历" value="不限学历"></el-option>
            <el-option label="大专" value="大专"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系电话" prop="job_phone">
          <el-input v-model="ruleForm.job_phone" @blur="BlurPhone($event)" class="input" placeholder="8517171"
                    disabled></el-input>
        </el-form-item>

        <el-form-item label="联系邮箱" prop="job_email">
          <el-input v-model="ruleForm.job_email" @blur="BlurEmail($event)" class="input" placeholder="1666053505@qq.com"
                    disabled></el-input>
        </el-form-item>

        <el-form-item label="发布者id" prop="cuser">
          <el-input v-model="ruleForm.cuser" class="input" placeholder="10000" disabled></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发布<i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </el-form-item>

      </el-form>


    </div>
  </div>

</template>


<script>
import { getRequest, postRequest } from '../../util/api'

export default {

  name: 'addjob',
  data () {
    return {

      position_options: [{
        value: '',
        label: '',
        children: [{
          value: '',
          label: '',
          children: [{
            value: '',
            label: '',
          }],
        }]
      }],

      ruleForm: {
        job_name: '',
        cuser: '10000',

        //地区字符串
        region: '',
        // 级联数据
        cascaderValue: [],
        first_value: '',
        second_value: '',
        position_value: '',

        job_company_id: '10000',
        require_tech: '测试的，随便',
        job_location: {},
        job_salary: 0,
        job_education: '',
        job_phone: '8517171',
        job_email: '1666053505@qq.com',
      },
      rules: {
        job_name: [
          {
            required: true,
            message: '请输入工作名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 100,
            message: '长度在 3 到 100 个字符',
            trigger: 'blur'
          }
        ],

        job_company_id: {
          required: true,
          message: '请输入公司id',
          trigger: 'blur'
        },
        cascaderValue: [
          {
            required: true,
            message: '请选择相关职位',
            trigger: 'blur'
          }
        ],
        require_tech: {
          required: true,
          message: '请输入工作要求',
          trigger: 'blur'
        },
        job_location: {
          // type: 'array',
          required: true,
          message: '请选择地址',
          trigger: 'change'
        },
        job_salary: [
          {
            required: true,
            message: '请输入薪资',
            trigger: 'blur'
          },
        ],
        job_education: [{
          // type: 'array',
          required: true,
          message: '请选择学历要求',
          trigger: 'change'
        },],
        job_phone: [
          {
            required: true,
            message: '请输入联系电话号码',
            trigger: 'blur'
          },
        ],
        job_email: [
          {
            required: true,
            message: '请输入联系邮箱',
            trigger: 'blur'
          },
        ],
        cuser: [{
          required: true,
          message: '请输入发布人的id',
          trigger: 'blur'
        },],
      }
    }
  },
  methods: {
    // handleAdd(){
    //   const form = Object.assign({},this.ruleForm)
    //   form.
    //   api(this.addJobForm).then(
    //     res =>{
    //
    //     }
    //   )
    // },
    //receive selected region entries
    regionChange (data) {
      console.log('数据')
      console.log(data)
      if (data.province.value !== null) {
        this.ruleForm.region = data.province.value
        if (data.city.value !== null) {
          this.ruleForm.region = data.province.value + data.city.value
          if (data.area.value !== null) {
            this.ruleForm.region = data.province.value + data.city.value + data.area.value
          }
        }

      }
      console.log(this.ruleForm.region)
    },
    PositionChange (value) {
      this.ruleForm.first_value = String(value[0])
      this.ruleForm.second_value = String(value[1])
      this.ruleForm.position_value = String(value[2])
    },
    BlurMoney (e) {
      alert(this.ruleForm.job_salary)
      let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
      if (!boolean) {
        this.$message.warning('薪资请输入正整数')
        if (e.target.value <= 0) {
          this.$message.warning('薪资请输入正整数')
        }
        e.target.value = ''
      }
    },
    BlurPhone (e) {
      let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
      if (!boolean) {
        this.$message.warning('输入正确的电话号码')
        e.target.value = ''
      }
    },
    BlurEmail (e) {

      let boolean = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$').test(e.target.value)
      if (!boolean) {
        this.$message.warning('输入正确的邮箱')
      }
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('验证通过!')
          const form = Object.assign({}, this.ruleForm)
          // //转地区为字符串
          // const regiondata = Object.assign({},this.ruleForm.job_location)
          // form.job_location = regiondata.province.value+regiondata.city.value+regiondata.area.value+regiondata.town.value

          console.log('总数据')
          //去掉多余的职位选择
          delete form.cascaderValue
          delete form.job_location

          console.log(form)
          postRequest('/job/add', form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    getRequest('/position/allData').then(res => {
      this.position_options = res.data.data
    })
  }
}
</script>


<style scoped>
.input {
  width: 220px
}

.form-content {
  margin: 0 auto;
  width: 500px;
}

.logo-content {
  margin: 0 auto;
  width: 500px;
}
</style>
