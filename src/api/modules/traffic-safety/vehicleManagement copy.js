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

// 交通运行专题-交通安全-车辆管理-车辆管理
export const clgl = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/clgl/clgl`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-交通安全-车辆管理-车辆来源top
export const cllytop = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/clgl/cllytop`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-交通安全-车辆管理-出入深车辆统计
export const crscltj = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/clgl/crscltj`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-交通安全-车辆管理-历年机动车变化趋势
export const lnjdcbhqs = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/clgl/lnjdcbhqs`,
    method: 'post',
    data: {}
  })
}
