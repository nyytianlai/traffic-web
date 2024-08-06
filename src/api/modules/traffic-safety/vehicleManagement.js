/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-13 10:23:12
 * @LastEditTime: 2022-12-13 10:26:22
 * @FilePath: \traffic-web\src\api\modules\traffic-safety\vehicleManagement.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'

// 交通运行专题-交通安全-驾驶员保有量
export const jsybylYear = () => {
  return axios({
    url: `${BASE_URL}//v1/dp/jiaotong/jtaq/new/jsybylYear`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-交通安全-交通事故年度统计
export const jtsgndtj = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/new/jtsgndtj`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-交通安全-驾驶员保有量
export const jsybyl = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/new/jsybyl`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-交通安全-交通事故数
export const jtsgs = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/new/jtsgs`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通安全-交通事故直接财产损失情况
export const ccssYear = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/new/ccssYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通安全-交通事故
export const jtsglYear = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/new/jtsglYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通安全-财产损失
export const ccss = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/new/ccss`,
    method: 'post',
    data: {}
  })
}
