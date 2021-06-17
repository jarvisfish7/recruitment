import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken ,getUserName,setUserName} from '../util/auth'
import { removeAll } from '../util/auth'
import api, { postRequest } from '../util/api'
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    username:getUserName(),
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
    reset: (state) => {
      removeAll()
      state.token = ''
      state.username = ''
    }
  },
  actions: {
     login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        postRequest(
          '/user/login',
          data)
          .then((response) => {
            console.log(response)
            if(response.data.status === 200){
              const { data } = response
              commit('setToken', data.data)
              commit('setUserName',data.username)
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
          '/companyuser/login',
          data)
          .then((response) => {
            console.log(response)
            if(response.status === '200'){
              const { data } = response
              commit('setToken', data.data)
              commit('setUserName',data.username)
              resolve(response)
            }
            else
              reject()
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
