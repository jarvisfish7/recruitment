<template>
  <div class="w candidates-session">
    <el-container>
      <!-- 搜索栏 -->
      <el-header height="70px">
        <div class="search">
          <el-input placeholder="请输入内容" v-model.trim="keyword" class="input-with-select">
            <el-button
              type="info"
              icon="el-icon-search"
              size="medium"
              slot="append"
              @click="jobSearch"
            >搜索
            </el-button>
          </el-input>
        </div>
      </el-header>
      <el-main>
        <!-- 导航栏 -->
        <div class="candidates-info">
          <ul>
            <li v-for="a in info" :key="a.id">
              <div class="info-title">{{ a.value }}：</div>
              <div class="info-select">
                <div v-for="b in a.box" :key="b.id">
                  <span
                    @click="stylechange(a.id, b.value),addCondition()"
                    :class="[active_id[a.id]==b.value ? 'addClass':'']"
                  >
                    <a>{{ b.value }}</a>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 应聘者列表 -->
        <el-card shadow="hover" class="candidates-card">
          <div v-if="showcard">没有搜索到匹配结果</div>
          <div v-else v-for="w in showCanBox" :key="w.userId" @click="candidatesJum(w.userId)">
            <!-- <router-link :to="{name:'/candidateslist',query:{id:index}}"> -->
            <div class="cand-card">
              <a href="javascript:;">
                <img :src="imgbase+w.avatar" class="cand-logo" alt="头像"/>
                <div class="cand-x">
                  <p class="cand-x-one">
                    <span>{{ w.name }}</span>
                    <span class="c-x-o-j">{{ w.desiredjob }}</span>
                  </p>
                  <p class="cand-x-two">
                    <span>{{ w.sex }}</span>
                    <span>|</span>
                    <span>{{ w.experience }}</span>
                    <span>|</span>
                    <span>{{ w.academic }}</span>
                    <span>|</span>
                    <span>{{ w.salary }}</span>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </el-card>

        <!-- 分页栏 -->
        <el-footer class="page">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size.sync="pageSize"
            layout="prev, pager, next"
            :total="this.total"
          ></el-pagination>
        </el-footer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { imgbase, postRequest } from '../../util/api'

export default {
  data () {
    return {
      imgbase,
      total: 0,
      token: '',
      username: '',
      userId: '',
      companyId: '',
      showcard: false,
      keyword: '',
      list: [],
      loading: false,
      candidatesBox: [],
      showCanBox: [],
      pageSize: 9, //每页的数据
      currentPage: 1, //初始页
      pageNo: 1, //当前页数

      info: [
        {
          id: 0,
          value: '期望职位',
          box: [
            {
              id: 0,
              value: '不限'
            },
            {
              id: 1,
              value: '后端开发'
            },
            {
              id: 2,
              value: '移动开发'
            },
            {
              id: 3,
              value: '前端开发'
            },
            {
              id: 4,
              value: '测 试'
            },
            {
              id: 5,
              value: '运维/技术支持'
            },
            {
              id: 6,
              value: '数 据'
            },
            {
              id: 7,
              value: '项目'
            },
            {
              id: 8,
              value: '硬件开发'
            },
            {
              id: 9,
              value: '通信'
            },
            {
              id: 10,
              value: '人工智能'
            },
            {
              id: 11,
              value: '高端技术职位'
            },
            {
              id: 12,
              value: '销售技术支持'
            },
            {
              id: 13,
              value: '电子/半导体'
            }
          ]
        },
        {
          id: 1,
          value: '工作经验',
          box: [
            {
              id: 0,
              value: '不限'
            },
            {
              id: 1,
              value: '实习生'
            },
            {
              id: 2,
              value: '应届毕业生'
            },
            {
              id: 3,
              value: '3年以下'
            },
            {
              id: 4,
              value: '3-5年'
            },
            {
              id: 5,
              value: '5-10年'
            },
            {
              id: 6,
              value: '10年以上'
            }
          ]
        },
        {
          id: 2,
          value: '学历要求',
          box: [
            {
              id: 0,
              value: '不限'
            },
            {
              id: 1,
              value: '高中及以下'
            },
            {
              id: 2,
              value: '大专'
            },
            {
              id: 3,
              value: '本科'
            },
            {
              id: 4,
              value: '硕士'
            },
            {
              id: 5,
              value: '博士'
            }
          ]
        }
      ],

      active_id: ['不限', '不限', '不限']
    }
  },
  created () {
    this.companyId = this.$store.state.companyid
    this.userId = this.$store.state.userid
    postRequest('/resume/search', {
      condition: {
        desiredjob: this.active_id[0],
        experience: this.active_id[1],
        academic: this.active_id[2],
      },
      keyword: this.keyword,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    })
      .then(res => {
        if (res.data.status === 200) {
          this.candidatesBox = res.data.data.records
          this.showCanBox = this.candidatesBox
          this.total = res.data.data.total
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleSizeChange (size) {
      this.pageSize = size
    },
    handleCurrentChange (currentPage) {
      //点击页面项 的函数响应
      this.currentPage = currentPage
      postRequest('/resume/search', {
        condition: {
          desiredjob: this.active_id[0],
          experience: this.active_id[1],
          academic: this.active_id[2],
        },
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
        .then(res => {
          if (res.data.status === 200) {
            this.candidatesBox = res.data.data.records
            this.showCanBox = this.candidatesBox
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    stylechange (a, b) {
      this.active_id.splice(a, 1, b)
    },
    addCondition () {
      postRequest('/resume/search', {
        condition: {
          desiredjob: this.active_id[0],
          experience: this.active_id[1],
          academic: this.active_id[2],
        },
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
        .then(res => {
          if (res.data.status === 200) {
            this.candidatesBox = res.data.data.records
            this.showCanBox = this.candidatesBox
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    jobSearch () {
      if (this.keyword == '') {
        this.$message.warning('请输入搜索内容')
        this.showCanBox = this.candidatesBox
        return
      } else {
        postRequest('/resume/search', {
          condition: {
            desiredjob: this.active_id[0],
            experience: this.active_id[1],
            academic: this.active_id[2],
          },
          keyword: this.keyword,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
          .then(res => {
            if (res.data.status === 200) {
              this.candidatesBox = res.data.data.records
              this.showCanBox = this.candidatesBox
              this.total = res.data.data.total
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

    },
    candidatesJum (id) {
      this.$router.push({
        name: '/candidateslist',
        query: { TalentId: id }
      })
    }
  },
  mounted () {
  }
}
</script>

<style>
.addClass {
  background-color: red;
  color: white !important;
}

.candidates-session {
  position: relative;
  min-height: calc(100vh - 60px - 60px);
}

.candidates-info {
  background-color: #fafafa;
  padding: 10px;
}

.candidates-info ul li {
  position: relative;
  margin: 20px 14px;
  overflow: hidden;
}

.candidates-info .info-title {
  float: left;
  color: #555;
  font-weight: 600;
  margin: 2px 7px;
  padding: 2px;
}

.candidates-info div {
  display: inline-block;
}

.candidates-info .info-select {
  width: 940px;
}

.candidates-info span {
  float: left;
  margin: 1.5px 7px;
  padding: 2px;
}

/* 搜索栏 */
.search {
  height: 60px;
  width: 820px;
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  margin: 5px auto;
  line-height: 60px;
}

.search .el-button {
  background-color: black;
  color: #fff !important;
}

.search .el-button:hover {
  background-color: rgb(121, 120, 120);
}

/* 卡片栏 */
.candidates-card {
  position: relative;
  padding: 1px 1px 20px 1px;
  margin: 20px 0;
  overflow: hidden;
  height: 490px;
}

.cand-card {
  border: 1px dotted #c9c6c6ef;
  box-sizing: border-box;
  width: 360px;
  height: 100px;
  margin: 6px;
  float: left;
  line-height: 100px;
  box-shadow: 2px 2px 2px #d8d5d5;
  overflow: hidden;
}

.cand-logo {
  left: 20px;
  width: 70px;
  height: 70px;
  margin: 10px 20px;
  float: left;
}

.cand-x {
  position: relative;
  margin: 5px 6px;
  width: 230px;
  height: 90px;
  float: left;
}

.cand-x-one {
  position: absolute;
  height: 50px;
  width: 220px;
  line-height: 50px;
  text-align: center;
  float: left;
  top: 5px;
  left: 0;
  margin: 2px 5px;
}

.cand-x-one span {
  line-height: 50px;
  float: left;
  font-size: 20px;
  color: #0f0f0f;
}

.cand-x-one .c-x-o-j {
  margin-left: 13px;
  font-size: 16px;
  font-weight: 600;
}

.cand-x-two {
  position: absolute;
  width: 210px;
  height: 40px;
  bottom: 5px;
  right: 10px;
  display: inline-block;
}

.cand-x-two span {
  margin: 0 2px;
  line-height: 40px;
  float: left;
  font-size: 14px;
}
</style>
