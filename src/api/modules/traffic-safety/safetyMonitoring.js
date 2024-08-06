/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-21 14:53:06
 * @LastEditTime: 2022-11-21 16:22:11
 * @FilePath: \traffic-web\src\api\modules\traffic-safety\safetyMonitoring.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'

// 交通运行专题-交通安全-安全监测-本月交通事故 - 交通违章
export const aqjc = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/aqjc/aqjc`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通安全-安全监测-案件趋势
export const ajqs = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/aqjc/ajqs`,
    method: 'post',
    data: { type }
  })
}

// 交通运行专题-交通安全-安全监测-各区交通安全
export const gqjtaq = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/aqjc/gqjtaq`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通安全-安全监测-施工点位详情
export const sgdwxq = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtaq/aqjc/sgdwxq`,
    method: 'post',
    data: {}
  })
}
