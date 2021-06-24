import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import store from '../store'
import { MessageBox} from 'element-ui'

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

// response interceptor
axios.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200 && res.status !== 400) {
      console.log(res)
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 502 || res.status === 501 || res.status === 500) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

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
