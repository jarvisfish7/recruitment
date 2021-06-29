<template>
  <div class="joblist-session">
    <el-container>
      <el-header height="200px" class="joblist-header">
        <div class="j-h-left">
          <p class="j-h-jobname">
            <span>{{ jobBox.jobName }}</span>
            <span style="color: red">{{ jobBox.salary }}</span>
          </p>
          <p>
            <span>{{ jobBox.place }}</span>
            <span>*</span>
            <span>{{ jobBox.academic }}</span>
            <span>*</span>
            <span>{{ jobBox.experience }}</span>
          </p>
          <p>
            <span>{{ jobBox.createTime }}</span>
          </p>
        </div>
        <div class="j-h-right">
          <el-button
            icon="el-icon-star-on"
            :class="{collection:iscollection}"
            @click="collection()"
          >{{ !iscollection ? ' 收 藏 ' : '取消搜藏' }}
          </el-button>
          <el-button type="info" @click="deliver">{{ !isdeliver ? '投 简 历' : '已 投 递'}}</el-button>
        </div>
      </el-header>
      <el-container class="cw">
        <el-main class="joblist-main">
          <div class="jm-h">
            <el-avatar :src="imageUrl" :size="60"></el-avatar>
            <li class="jm-hr">{{ jobBox.hr }}</li>
          </div>
          <div>
            <h3>职位描述</h3>
            <p>{{ jobBox.jobdescription }}</p>
          </div>

          <div>
            <h3>职位要求</h3>
            <p>{{ jobBox.jobneed }}</p>
          </div>

          <div>
            <h3>公司介绍</h3>
            <p>{{ companyBox.comintroduce }}</p>
          </div>
          <div>
            <h3>工作地址</h3>
            <p>{{ companyBox.address }}</p>
          </div>
        </el-main>
        <!-- 公司基本信息 -->
        <el-aside class="joblist-aside">
          <el-card shadow="hover">
            <div class="ja-card">
              <a href="https://www.alibabagroup.com">
                <img :src="imageUrl" alt="logo"/>
                <div class="ja-x">
                  <p class="ja-x-one">{{ companyBox.name }}</p>
                  <span>{{ companyBox.stage }}</span>
                  <span>{{ companyBox.kind }}</span>
                  <span>{{ companyBox.scale }}</span>
                </div>
              </a>
            </div>
          </el-card>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getRequest, postRequest,imgbase } from '../../util/api'

export default {
  data () {
    return {
      isdeliver:false,
      resumeId:'',
      userId: '',
      jobId: '',
      companyId: '',
      imageUrl: '',
      iscollection: false,
      jobBox: [],
      companyBox: [],
      username: '',
      token: '',

    }
  },
  created () {
    this.token = this.$store.state.token
    let jid = this.$route.query.jid
    let cid = this.$route.query.cid
    this.userId = this.$store.state.userid
    this.jobId = jid
    this.companyId = cid
    getRequest('/job/getByid', jid)
      .then(res => {
        if (res.data.status === 200) {
          this.jobBox = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })

    getRequest('/company/getByid', cid)
      .then(res => {
        if (res.data.status === 200) {
          this.companyBox = res.data.data
          this.imageUrl = imgbase + this.companyBox.avatar
        }
      })
      .catch(err => {
        console.log(err)
      })

    postRequest('/collection/isExist', {
      userId: this.userId,
      jobId: this.jobId,
    })
      .then(res => {
        if (res.data.status === 200) {
          this.iscollection = res.data.data
        }
      })

    postRequest('/deliver/isExist', {
      applyId: this.userId,
      jobId: this.jobId,
    })
      .then(res => {
        if (res.data.status === 200) {
          this.isdeliver = res.data.data
        }
      })

    getRequest('/resume/getByuid', this.userId)
      .then(res => {
        if (res.data.status === 200) {
          this.resumeId = res.data.data.resumeId
        }
      })
  },
  methods: {
    collection () {
      //如果是已收藏，就是取消收藏
      if (this.iscollection === true) {
        postRequest('/collection/delete', {
          userId: this.userId,
          jobId: this.jobId,
          companyId: this.companyId
        })
          .then(res => {
            if (res.data.status === 200) {
              alert("成功取消收藏！")
              this.iscollection = false
            }
          })
      } else {
        postRequest('/collection/add', {
          userId: this.userId,
          jobId: this.jobId,
        })
          .then(res => {
            if (res.data.status === 200) {
              alert("成功收藏！")
              this.iscollection = true
            }
          })
      }

    },
    deliver () {
      if (this.isdeliver){
        this.$notify({
          title: '你己经投递该工作',
          type: 'warning',
          position: 'bottom-left',
          offset: 100
        })
      }else {
        postRequest("/deliver/add", {
          applyId: Number(this.userId),
          jobId: Number(this.jobId),
          companyId: Number(this.companyId),
          resumeId:this.resumeId+'',
        })
          .then(res => {
            if (res.data.status === 200) {
              this.isdeliver = true
              this.$notify({
                title: '投递成功',
                type: 'success',
                position: 'bottom-left',
                offset: 100
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted () {
    this.username = this.$store.state.username
    this.token = this.$store.state.token
    this.userid = this.$store.state.userid
    // this.cid = this.$cookie.get("cid");
  }
}
</script>

<style scoped>
.cw {
  width: 1200px;
  min-height: calc(100vh - 60px - 60px);
  margin: auto;
}

.joblist-session {
  position: relative;
}

/* header部分信息 */
.joblist-header {
  margin: 0;
  height: 200px;
  width: 100%;
  padding: 0 60px;
  background: #010718e0;
}

.j-h-left {
  width: 800px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  float: left;
}

.j-h-left span {
  margin: 0 5px;
  font-size: 18px;
  color: #fff;
}

.j-h-left .j-h-jobname {
  margin: 35px 50px 20px 50px;
}

.j-h-left .j-h-jobname span {
  font-size: 30px;
  font-weight: 600;
  margin-right: 50px;
  color: #fff;
}

.j-h-left p {
  margin: 20px 10px 10px 60px;
}

.j-h-left p span {
  font-size: 16px;
}

.j-h-right {
  width: 350px;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  float: left;
  margin: 0 5px;
}

.j-h-right .el-button {
  margin: 20px 70px;
  display: block;
}

/* main部分信息 */
.joblist-main {
  padding: 30px 40px;
  background-color: #fff;
  margin-top: 10px;
}

.joblist-main h3 {
  font-size: 18px;
  color: #333;
  font-weight: 600;
  margin: 10px;
}

.joblist-main div {
  margin: 30px 0;
  border-bottom: 1px dotted #9190905b;
  padding-bottom: 10px;
}

.joblist-main p {
  font-size: 16px;
  color: #333;
  margin: 5px 20px;
  line-height: 30px;
}

.jm-h {
  position: relative;
  margin: 20px;
}

.jm-hr {
  position: absolute;
  font-size: 24px;
  margin: 10px 20px;
  display: inline-block;
  width: 100px;
  height: 60px;
  top: 10px;
}

/* aside部分信息 */
.joblist-aside {
  margin-left: 5px;
  padding: 10px;
}

.joblist-aside img {
  left: 20px;
  width: 150px;
  height: 150px;
  margin: 10px 40px;
  border: 1px dotted #333;
}

.ja-x {
  margin: 0 auto;
  width: 220px;
  padding: 5px;
}

.ja-x-one {
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  margin: 0 auto;
  color: #0f0f0f;
}

.ja-x span {
  margin: 5px 3px;
  line-height: 40px;
  text-align: center;
  display: block;
  font-size: 14px;
}

.collection {
  color: red;
}
</style>
