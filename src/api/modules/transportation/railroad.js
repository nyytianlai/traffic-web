/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-16 14:20:29
 * @LastEditTime: 2022-12-16 14:21:00
 * @FilePath: \traffic-web\src\api\modules\transportation\railroad.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-客货运输-海港-机场和港区吞吐量
export const hczxq = (station) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/tl/hczxq`,
    method: 'post',
    data: { station }
  })
}

// 2023-10-08 数据接入
// 客货运输-铁路-客运指标月度变化
export const passengerMetricsMonthly = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/railway/passengerMetricsMonthly`,
    method: 'post',
    data: { type }
  })
}
// 客货运输-铁路-历年客货运指标变化
export const historicalFreightPassengerMetrics = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/railway/historicalFreightPassengerMetrics`,
    method: 'post',
    data: { type }
  })
}
// 客货运输-铁路-月客货运输量
export const monthlyPassengerAndFreightVolume = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/railway/monthlyPassengerAndFreightVolume`,
    method: 'post',
    data: { type }
  })
}
