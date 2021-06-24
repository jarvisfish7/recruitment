import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'assets/css/base.css'
import 'assets/css/reset.css'
import echarts from 'echarts'
import vRegion from 'v-region';
import './assets/al-icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vRegion, global)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

new Vue({
  vRegion,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
