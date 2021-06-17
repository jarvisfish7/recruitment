import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import store from '../store'
import { Message as $message } from 'element-ui'

//请求拦截器
axios.interceptors.request.use(request=>{
  const token = store.state.token;
  if(token!=null&&token.length>0){
    request.headers.authorization = token;
  }
  return request;
},error=>{
  return Promise.reject(error);
})


// // response interceptor
// axios.interceptors.response.use(response => {
//   const { status, message } = response.data
//   if (status !== 200) {
//     $message.error(message)
//     const statuses = [
//       495,  // 495: Token Not Found;
//       496,  // 496: Username Not Found;
//       497,  // 497: Illegal Token;
//       498,  // 498: Account Expired;
//       499   // 499: Token Expired;
//     ]
//     if (statuses.indexOf(status) !== -1) {
//       store.dispatch('user/logout').then(() => {
//         setTimeout(() => {
//           location.reload() // refresh page
//         }, 2000)
//       })
//     }
//     const error = new Error(message)
//     return Promise.reject(error)
//   } else {
//     return response.data
//   }
// }, error => {
//   console.error(error)
//   return Promise.reject(error)
// })
let base = 'http://localhost:8181'
//传送json格式的post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
  })
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params,
  })
}
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params,
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
  })
}
