import Vue from 'vue'
import VueRouter from 'vue-router'
import mainhome from '../views/mainhome/mainhome'
import newLogin from '../views/Login/login'
import showchildren from '../views/learn/childrenrouter/showchildren'
import showchildren2 from '../views/learn/childrenrouter/showchildren2'
import showmain from '../views/learn/childrenrouter/showmain'
import tabletest from '../views/learn/childrenrouter/tabletest'
import store from "../store"
import regist from '../views/Regist/regist'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'  // 默认的是home
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
    component: regist,
    meta: {
      showHeaderGuide: false,
      showFooter: false,
    },
  },
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
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==="/mainhome"){
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
