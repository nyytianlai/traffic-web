/**
 * https://github.com/axios/axios
 * @desc:   网络请求封装
 * @author: liaowanquan<10720>
 * @create: 2021-07-29 14:41:03
 */

import axios from 'axios'
import { message } from 'ant-design-vue'
import * as Cookie from '@/utils/cookie.js'
import { getQueryString, getSearchParam } from '@/utils/common'
// 创建axios实例
const http = axios.create({
  // 允许携带cookie
  withCredentials: true
})

// 默认请求地址前缀
http.defaults.baseURL = ''
const adrLoginInfo = JSON.parse(sessionStorage.getItem('adrLoginInfo')||'{}')
const loginUrl = adrLoginInfo?.loginUrl
// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // const token = getQueryString('token') || getSearchParam('token') || Cookie.getCookie('token') || Cookie.getCookie('x-szh-token')
    // if (token) {
    //   Cookie.setCookie('token', token, 2 * 60 * 60)
        // Cookie.setCookie('token', token, 2 * 60 * 60)
        // Cookie.setCookie('x-szh-token', token, 2 * 60 * 60)
    // } else {
    //   Cookie.removeCookie('token')
    //   // 退出到登录页
    //   message.destroy()
    //   message.error('登录已过期，请重新登录！')
    //   loginUrl && window.location.replace(loginUrl)
    //   // return;
    //   // window.location.href = '/login'
    // }
    // config.headers.Authorization = token
    // config.headers.token = token
    if (config.methods === 'get') {
      config.params = config.data
      delete config.data
    }
    if (config.url.includes('guoxin')) {
      // 旧罗马配置
    } else {
      // 新罗马配置-headers两个新属性
      config.headers['x-hw-id'] = 'de712255-9e37-4544-931f-68016062dfa4'
      config.headers['x-hw-appkey'] =
        'ccce26b143c32ebe8bdd2a094942fd0f2ab0b93cb0b25b1869fb5e38c11ccdc0'
    }
    config.headers.Authorization = 'ANejK5DxW3SVJsjBz07GhhFASXmCK89B'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  // 请求成功
  (res) => {
    if (res.data) {
      if (res.data.success || res.data.code) {
        return Promise.resolve(res.data.data)
      } else if (res.config && res.config.responseType && res.config.responseType === 'blob') {
        return Promise.resolve(res.data)
      } else {
        message.destroy()
        message.error(res.data.message || '网络异常')
        return Promise.reject(res)
      }
    } else {
      message.destroy()
      message.error(res.data.message || '网络异常')
      return Promise.reject(res)
    }
  },
  (error) => {
    const { response } = error
    if (response) {
      errorHandler(response)
      return Promise.reject(response)
    } else {
      // 处理断网的状态
      if (!window.navigator.onLine) {
        message.destroy()
        message.error('网络异常')
      } else {
        return Promise.reject(error)
      }
    }
  }
)

// 错误处理
const errorHandler = (response) => {
  const { data, status, statusText } = response
  switch (status) {
    case 401:
      message.destroy()
      message.error('未授权，请重新登录')
      loginUrl && window.location.replace(loginUrl)
      break
    case 403:
      message.destroy()
      message.error('拒绝访问')
      break
    case 404:
      message.destroy()
      message.error('资源未找到')
      break
    default:
      message.destroy()
      message.error(data.message || statusText)
  }
}

export default http
