import Vue from 'vue'
import VueRouter from 'vue-router'
import mainhome from '../views/mainhome/mainhome'
import newLogin from '../views/Login/login'
//自我学习
import showchildren from '../views/learn/childrenrouter/showchildren'
import showchildren2 from '../views/learn/childrenrouter/showchildren2'
import showmain from '../views/learn/childrenrouter/showmain'
import tabletest from '../views/learn/childrenrouter/tabletest'


import store from "../store"

//应聘者页面
import regist from '../views/Regist/regist'
import Job from '../views/Job/job'
import Joblist from '../views/Job/joblist'
import company from '../views/Company/company'
import companylist from '../views/Company/companylist'
import PersonalCenter from '../views/PersonalCenter/personalcenter.vue'
import Resumes from '../views/Resumes/resumes.vue'
import Regist from '../views/Regist/regist.vue'

//PersonalCenter子路由
import Mybase from '../components/PersonalCenterList/MyBase'
import Changepassword from '../components/PersonalCenterList/ChangePassword'

//boss页面
import addjob from '../views/Atest/addjob'

//Boss路由
import BossCenter from '../views/Boss/bosscenter.vue'
import Candidates from '../views/Boss/candidates.vue'
import CandidatesList from '../views/Boss/candidateslist.vue'
import Posting from '../views/Boss/posting.vue'

//Posting子路由
import PostJob from '../components/Posting/PostJob.vue'
import EffectiveJob from '../components/Posting/EffectiveJob.vue'
import OfflineJob from '../components/Posting/OfflineJob.vue'

//BossCenter子路由
import BossBase from '../components/BossCenter/BossBase.vue'
import BossChangePass from '../components/BossCenter/BossChangePass.vue'
import Unprocessed from '../components/BossCenter/Unprocessed.vue' //待定简历
import NotifyInterview from '../components/BossCenter/NotifyInterview.vue' //已通知面试简历
import Inappropriate from '../components/BossCenter/InappropriateResume.vue' //不合适简历

// 注册填写信息路由
import CandReg from '../views/Regist/candreg.vue'
import BossReg from '../views/Regist/bossreg.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'  // 默认的是home
  },
  {
    path: '/home',
    redirect: '/mainhome'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/mainhome',
    name: 'mainhome',
    component: mainhome,
    meta: {
      showHeaderGuide: true,
      showFooter: true,
    },
  },
  {
    path: '/addjob',
    name: '/addjob',
    component: addjob,
    meta: {
      showHeaderGuide: true,
      showFooter: true,
    },
  },
  {
    path: '/job',
    name: '/job',
    component: Job,
    meta: {
      showHeaderGuide: true,
      showFooter: true,
    },
  },
  {
    path: '/joblist',
    name: '/joblist',
    component: Joblist,
    meta: {
      showHeaderGuide: true,
      showFooter: true,
    }
  },
  {
    path: '/company',
    name: '/company',
    component: company,
    meta: {
      showHeaderGuide: true,
      showFooter: true,
    }
  },
  {
    path: '/companylist',
    name: '/companylist',
    component: companylist,
    meta: {
      showHeaderGuide: true,
      showFooter: true,
    }
  },
  {
    path: '/personalcenter',
    name: '/personalcenter',
    component: PersonalCenter,
    meta: {
      showHeaderGuide: true,
      showFooter: true,
    },
    children: [
      {
        path: '/',
        redirect: 'mybase',
        meta: {
          keepAlive: true,
          showHeaderGuide: true,
          showFooter: true,
          parentPath: '/personalcenter',
        },
      },
      {
        path: 'mybase',
        name: 'mybase',
        component: Mybase,
        meta: {
          keepAlive: true,
          showHeaderGuide: true,
          showFooter: true,
          parentPath: '/personalcenter',
        },
      },
      {
        path: 'changepass',
        name: 'changepass',
        component: Changepassword,
        meta: {
          keepAlive: true,
          showHeaderGuide: true,
          showFooter: true,
          parentPath: '/personalcenter',
        },
      },
    ],
  },
  {
    path: '/resumes',
    name: '/resumes',
    component: Resumes,
    meta: {
      showHeaderGuide: true,
      showFooter: true,
      // requireAuth: true,//表示进入这个路由需要登录
    }
  },
  {
    path: '/login',
    name: 'newLogin',
    component: newLogin,
    meta: {
      showHeaderGuide: false,
      showFooter: false,
    },
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist,
    meta: {
      showHeaderGuide: false,
      showFooter: false,
    },
  },

  {
    path: '/candreg',
    name: '/candreg',
    component:CandReg,
    meta: {

    }
  },
  // 学习
  {
    path: '/showmain',
    name: 'showmain',
    component: showmain,
    children: [
      {
        path: '/learn/show',
        component: showchildren
      },
      {
        path: '/learn/list/:id',
        name:'showchildren',
        component: showchildren2
      },
      {
        path: '/learn/table1',
        name:'table1',
        component: tabletest
      },
    ],
    meta: {
      showHeaderGuide: false,
      showFooter: false,
    },
  },
  //自我学习end


  //BOSS的页面路由
  {
    path: '/candidates',
    name: '/candidates',
    component: Candidates,
    meta: {
      showBossHeader: true,
      showFooter: true,
      // requireAuth: true,
    },
  },
  {
    path: '/candidateslist',
    name: '/candidateslist',
    component: CandidatesList,
    meta: {
      showBossHeader: true,
      showFooter: true,
      // requireAuth: true,
    },
  },
  {
    path: '/posting',
    name: '/posting',
    component: Posting,
    meta: {
      showBossHeader: true,
      showFooter: true,
      // requireAuth: true,
    },
    children: [
      {
        path: '/',
        redirect: 'postjob',
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/posting',
        },
      },
      {
        path: 'postjob',
        name: 'postjob',
        component: PostJob,
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/posting',
        },
      },
      {
        path: 'effectivejob',
        name: 'effectivejob',
        component: EffectiveJob,
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/posting',
        },
      },
      {
        path: 'offlinejob',
        name: 'offlinejob',
        component: OfflineJob,
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/posting',
        },
      },
    ],
  },

  {
    path: '/bossreg',
    name: '/bossreg',
    component: BossReg,
    meta: {

    }
  },
  {
    path: '/bosscenter',
    name: '/bosscenter',
    component: BossCenter,
    meta: {
      showBossHeader: true,
      showFooter: true,
      // requireAuth: true,
    },
    children: [
      {
        path: '/',
        redirect: 'bossbase',
      },
      {
        path: 'bossbase',
        name: 'bossbase',
        component: BossBase,
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/bosscenter',
        },
      },
      {
        path: 'bosschangepass',
        name: 'bosschangepass',
        component: BossChangePass,
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/bosscenter',
        },
      },
      {
        path: 'unprocessed',
        name: 'unprocessed',
        component: Unprocessed,
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/bosscenter',
        },
      },
      {
        path: 'notifyinterview',
        name: 'notifyinterview',
        component: NotifyInterview,
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/bosscenter',
        },
      },
      {
        path: 'inappropriate',
        name: 'inappropriate',
        component: Inappropriate,
        meta: {
          keepAlive: true,
          showBossHeader: true,
          showFooter: true,
          parentPath: '/bosscenter',
        },
      },


    ],
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==="/mainhome"||to.path==="/candreg"||to.path==="/bossreg"){
    return next();
  }
  if(!store.state.token){
    if(to.path==="/login"||to.path==="/regist"){
      return next();
    }else {
      alert("请先登录！！！")
      return next('/mainhome');
    }

  }
  next();
})

export default router
