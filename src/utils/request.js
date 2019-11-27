import axios from 'axios'
import { Message, MessageBox, Loading } from 'element-ui'
import store from '../store'
import { baseUrl } from './config'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: 60000 // 请求超时时间
})
let loading = null
// request拦截器
service.interceptors.request.use(
  config => {
    loading = Loading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    if (store.getters.token) {
      config.headers['Access-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * resultCode为非 0000000 是抛错 可结合自己业务进行修改
     */
    setTimeout(() => {
      loading.close()
    }, 300)
    const res = response.data
    // console.log(res)
    // if (res.resultCode !== '0000000') {
    //   Message({
    //     message: res.resultDesc,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //  SYS0042 :Token 过期了;
    if (res.resultCode === 'SYS0042') {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else {
      // return Promise.reject('error')
    // }
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '网络错误', // error.message,
      type: 'error',
      duration: 5 * 1000
    })
    loading.close()
    return Promise.reject(error)
  }
)

export default service
