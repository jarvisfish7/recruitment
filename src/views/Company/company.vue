// 公司信息
<template>
  <div class="w company-session">
    <el-container>
      <el-main>
        <!-- 公司信息导航栏 -->
        <div class="company-info">
          <ul>
            <li v-for="a in info" :key="a.id">
              <div class="info-title">{{ a.value }}：</div>
              <div class="into-select">
                <div v-for="b in a.box" :key="b.id">
                  <span
                    @click="stylechange(a.id, b.value),addCondition(b.value)"
                    :class="[active_id[a.id]==b.value ? 'addClass':'']"
                  >
                    <a>{{ b.value }}</a>
                  </span>
                  <span v-if="(!a.id&&b.id==9)">
                    <el-popover placement="bottom" width="550" trigger="hover">
                      <div class="more">
                        <div v-for="pa in placeBox" :key="pa.id">
                          <p>{{ pa.avalue }}</p>
                          <p>
                            <span
                              v-for="n in pa.bvalue"
                              :key="n.id"
                              @click="stylechange(a.id,n.value),addCondition(n.value)"
                              :class="[active_id[a.id]==n.value ? 'addClass':'']"
                            >
                              <a>{{ n.value }}</a>
                            </span>
                          </p>
                        </div>
                      </div>
                      <div slot="reference" @click="flag=ture">
                        <a href="javascript:;">
                          其他
                          <i class="el-icon-caret-bottom"></i>
                        </a>
                      </div>
                    </el-popover>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 公司信息列表 -->
        <el-card shadow="hover" class="company-card">
          <div v-if="showcard">没有搜索到匹配结果</div>
          <div v-else v-for="w in companyBox" :key="w.companyId" @click="companyJum(w.companyId)">
            <div class="cm-card">
              <a href="javascript:;">
                <img :src="imgbase + w.avatar" class="cm-logo" alt="logo"/>
                <div class="cm-x">
                  <p class="cm-x-one">{{ w.name }}</p>
                  <p class="cm-x-two">
                    <span>{{ w.stage }}</span>
                    <span>|</span>
                    <span>{{ w.kind }}</span>
                    <span>|</span>
                    <span>{{ w.scale }}</span>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </el-card>
        <el-footer class="page">
          <!-- 分页栏 -->
          <el-pagination
            :hide-on-single-page="value"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="currentPage"
            :page-size.sync="pageSize"
            layout="prev, pager, next"
            :total="total"
            v-model="companyBox"
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
      showcard: false,
      value: false,
      companyBox: [],
      pageSize: 10, //每页的数据
      currentPage: 1, //初始页
      pageNo: 1, //当前页数
      placeBox: [
        {
          id: 0,
          avalue: 'ABCDEF',
          bvalue: [
            {
              id: 0,
              value: '北京'
            },
            {
              id: 1,
              value: '长春'
            },
            {
              id: 2,
              value: '成都'
            },
            {
              id: 3,
              value: '重庆'
            },
            {
              id: 4,
              value: '长沙'
            },
            {
              id: 5,
              value: '常州'
            },
            {
              id: 6,
              value: '东莞'
            },
            {
              id: 7,
              value: '大连'
            },
            {
              id: 8,
              value: '佛山'
            },
            {
              id: 9,
              value: '福州'
            }
          ]
        },
        {
          id: 1,
          avalue: 'GHIJ',
          bvalue: [
            {
              id: 0,
              value: '贵阳'
            },
            {
              id: 1,
              value: '广州'
            },
            {
              id: 2,
              value: '哈尔滨'
            },
            {
              id: 3,
              value: '合肥'
            },
            {
              id: 4,
              value: '海口'
            },
            {
              id: 5,
              value: '杭州'
            },
            {
              id: 6,
              value: '惠州'
            },
            {
              id: 7,
              value: '金华'
            },
            {
              id: 8,
              value: '济南'
            },
            {
              id: 9,
              value: '嘉兴'
            }
          ]
        },
        {
          id: 2,
          avalue: 'KLMN',
          bvalue: [
            {
              id: 0,
              value: '昆明'
            },
            {
              id: 1,
              value: '廊坊'
            },
            {
              id: 2,
              value: '宁波'
            },
            {
              id: 3,
              value: '南昌'
            },
            {
              id: 4,
              value: '南京'
            },
            {
              id: 5,
              value: '南宁'
            },
            {
              id: 6,
              value: '南通'
            }
          ]
        },
        {
          id: 3,
          avalue: 'OPQR',
          bvalue: [
            {
              id: 0,
              value: '青岛'
            },
            {
              id: 1,
              value: '泉州'
            }
          ]
        },
        {
          id: 4,
          avalue: 'STUV',
          bvalue: [
            {
              id: 0,
              value: '上海'
            },
            {
              id: 1,
              value: '石家庄'
            },
            {
              id: 2,
              value: '绍兴'
            },
            {
              id: 3,
              value: '沈阳'
            },
            {
              id: 4,
              value: '深圳'
            },
            {
              id: 5,
              value: '苏州'
            },
            {
              id: 6,
              value: '天津'
            },
            {
              id: 7,
              value: '太原'
            },
            {
              id: 8,
              value: '台州'
            }
          ]
        },
        {
          id: 5,
          avalue: 'WXYZ',
          bvalue: [
            {
              id: 0,
              value: '武汉'
            },
            {
              id: 1,
              value: '无锡'
            },
            {
              id: 2,
              value: '温州'
            },
            {
              id: 3,
              value: '西安'
            },
            {
              id: 4,
              value: '厦门'
            },
            {
              id: 5,
              value: '烟台'
            },
            {
              id: 6,
              value: '珠海'
            },
            {
              id: 7,
              value: '中山'
            },
            {
              id: 8,
              value: '郑州'
            }
          ]
        }
      ],
      active_id: ['全国', '不限', '不限', '不限'],

      info: [
        {
          id: 0,
          value: '公司地点',
          box: [
            {
              id: 0,
              value: '全国'
            },
            {
              id: 1,
              value: '北京'
            },
            {
              id: 2,
              value: '上海'
            },
            {
              id: 3,
              value: '杭州'
            },
            {
              id: 4,
              value: '广东'
            },
            {
              id: 5,
              value: '深圳'
            },
            {
              id: 6,
              value: '南京'
            },
            {
              id: 7,
              value: '天津'
            },
            {
              id: 8,
              value: '重庆'
            },
            {
              id: 9,
              value: '长沙'
            }
          ]
        },

        {
          id: 1,
          value: '融资阶段',
          box: [
            {
              id: 0,
              value: '不限'
            },
            {
              id: 1,
              value: '未融资'
            },
            {
              id: 2,
              value: '天使轮'
            },
            {
              id: 3,
              value: 'A轮'
            },
            {
              id: 4,
              value: 'B轮'
            },
            {
              id: 5,
              value: 'C轮'
            },
            {
              id: 6,
              value: 'D轮及以上'
            },
            {
              id: 7,
              value: '已上市'
            },
            {
              id: 8,
              value: '不需要融资'
            }
          ]
        },
        {
          id: 2,
          value: '公司规模',
          box: [
            {
              id: 0,
              value: '不限'
            },
            {
              id: 1,
              value: '0-20人'
            },
            {
              id: 2,
              value: '20-99人'
            },
            {
              id: 3,
              value: '100-499人'
            },
            {
              id: 4,
              value: '500-999人'
            },
            {
              id: 5,
              value: '1000-9999人'
            },
            {
              id: 6,
              value: '10000人'
            }
          ]
        },
        {
          id: 3,
          value: '公司领域',
          box: [
            {
              id: 0,
              value: '不限'
            },
            {
              id: 1,
              value: '移动互联网'
            },
            {
              id: 2,
              value: '电商'
            },
            {
              id: 3,
              value: '金融'
            },
            {
              id: 4,
              value: '企业服务'
            },
            {
              id: 5,
              value: '教育'
            },
            {
              id: 6,
              value: '文娱 | 内容'
            },
            {
              id: 7,
              value: '游戏'
            },
            {
              id: 8,
              value: '消费生活'
            },
            {
              id: 9,
              value: '硬件'
            }
          ]
        }
      ],
      keyword: ''
    }
  },
  created () {
    postRequest('/company/search', {
      keyword: this.keyword,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      condition: {
        place: this.active_id[0],
        stage: this.active_id[1],
        scale: this.active_id[2],
        kind: this.active_id[3]
      }
    }).then(res => {
      if (res.data.status === 200) {
        this.companyBox = res.data.data.records
      }
      this.total = res.data.data.total
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
      postRequest('/company/search', {
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        condition: {
          place: this.active_id[0],
          stage: this.active_id[1],
          scale: this.active_id[2],
          kind: this.active_id[3]
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.companyBox = res.data.data.records
        }
        this.total = res.data.data.total
      })
        .catch(err => {
          console.log(err)
        })
    },
    stylechange (a, b) {
      this.active_id.splice(a, 1, b)
      console.log(a, this.active_id)
    },
    addCondition (label) {
      postRequest('/company/search', {
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        condition: {
          place: this.active_id[0],
          stage: this.active_id[1],
          scale: this.active_id[2],
          kind: this.active_id[3]
        }
      }).then(res => {
        if (res.data.status === 200) {
          this.companyBox = res.data.data.records
        }
        this.total = res.data.data.total
      })
        .catch(err => {
          console.log(err)
        })
    },
    companyJum (id) {
      this.$router.push({
        name: '/companylist',
        query: { companyId: id }
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.addClass {
  background-color: red;
  color: white !important;
}

.company-session {
  position: relative;
  min-height: calc(100vh - 60px - 60px);
}

.company-info {
  background-color: #fafafa;
  padding: 10px 10px 10px 20px;
}

.company-info ul li {
  position: relative;
  margin: 20px 14px;
  overflow: hidden;
}

.company-info .info-title {
  float: left;
  color: #555;
  font-weight: 600;
  margin: 2px 7px;
  padding: 2px;
}

/* .company-info div {
  display: inline-block;
} */
.company-info .info-select {
  width: 940px;
}

.company-info span {
  float: left;
  margin: 1px 7px;
  padding: 2px;
}

/* 下拉地区 */
.more p {
  margin: 7px;
}

.more p span {
  margin: 0 7px;
  font-size: 14px;
  color: #333;
}

/* 公司卡片 */
.company-card {
  position: relative;
  padding: 1px 1px 20px 1px;
  margin: 20px 0;
  overflow: hidden;
}

.cm-card {
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

.cm-logo {
  left: 20px;
  width: 70px;
  height: 70px;
  margin: 10px 20px;
  float: left;
}

.cm-x {
  position: relative;
  margin: 5px 6px;
  width: 230px;
  height: 90px;
  float: left;
}

.cm-x-one {
  position: absolute;
  height: 50px;
  width: 130px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  float: left;
  top: 5px;
  left: 0;
  margin: 2px 5px;
  color: #0f0f0f;
}

.cm-x-two {
  position: absolute;
  width: 200px;
  height: 40px;
  bottom: 5px;
  right: 10px;
  display: inline-block;
}

.cm-x-two span {
  margin: 0 2px;
  line-height: 40px;
  float: left;
  font-size: 14px;
}
</style>
