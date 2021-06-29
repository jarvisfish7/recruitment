import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, getUserName, setUserName, getUserId,setUserId ,getCompanyId,setCompanyId} from '../util/auth'
import { removeAll } from '../util/auth'
import { postRequest } from '../util/api'
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    username:getUserName(),
    userid:getUserId(),
    companyid:getCompanyId(),
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
      setToken(token)
    },
    setUserName: (state, username) => {
      state.username = username
      setUserName(username)
    },
    setUserId: (state, userid) => {
      state.userid = userid
      setUserId(userid)
    },
    setCompanyId:(state,companyid)=> {
      state.companyid=companyid
      setCompanyId(companyid)
    },
    reset: (state) => {
      removeAll()
      state.token = ''
      state.username = ''
      state.userid = ''
      state.companyid=''
    }
  },
  actions: {
     login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        postRequest(
          '/user/login',
          data)
          .then((response) => {
            if(response.data.status === 200){
              const { data } = response
              commit('setToken', data.data)
              commit('setUserName',data.username)
              commit('setUserId',data.userid)
              resolve(response)
            }
            else{
              reject()
            }
          })
          .catch(() => reject())
      })
    },
    regist ({ commit }, data) {
      return new Promise((resolve, reject) => {
        alert("进入注册体")
        postRequest(
          '/user/regist',
          data)
          .then((response) => {
            if(response.data.status === 200){
              const { data } = response
              console.log(response)
              commit('setUserId',data.user.id)
              resolve(response)
            }
            else
              reject()
          })
          .catch(() => reject())
      })
    },
    bossregist ({ commit }, data) {
      return new Promise((resolve, reject) => {
        postRequest(
          '/company-user/regist',
          data)
          .then((response) => {
            if(response.data.status === 200){
              const { data } = response
              commit('setUserId',data.userid)
              resolve(response)
            }
            else
              reject()
          })
          .catch(() => reject())
      })
    },
    companylogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        postRequest(
          '/company-user/login',
          data)
          .then((response) => {
            console.log("进入成功！")
            if(response.data.status === 200){
              const { data } = response
              commit('setToken', data.data)
              commit('setUserName',data.username)
              commit('setUserId',data.userid)
              commit('setCompanyId',data.companyid)
              resolve(response)
            }
            else{
              reject()
            }
          })
          .catch(() => reject())
      })
    },
    logout ({ commit }) {
      commit('reset')
      router.push({ path: '/mainhome' })
    }
  },
  modules: {}
})
