/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2023-01-03 10:58:12
 * @LastEditTime: 2023-01-03 10:58:48
 * @FilePath: \traffic-web\src\api\modules\transportation-means\facilities-maintain.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-设施养护-历年设施养护明细
export const lnssyhmx = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/ssyh/lnssyhmx`,
    method: 'post',
    data: {}
  })
}

// 交通设施--养护事件年变化趋势
export const maintenanceEventAnnualVariationTrend = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/maintenanceEventAnnualVariationTrend`,
    method: 'post',
    data: {}
  })
}

// 交通设施--养护类型分布年变化趋势
export const maintenanceTypeDistributionAnnualVariationTrend = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/maintenanceTypeDistributionAnnualVariationTrend`,
    method: 'post',
    data: {}
  })
}

// 交通设施--养护事件
export const maintenanceEvenPercentage = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/maintenanceEvenPercentage`,
    method: 'post',
    data: {}
  })
}
// 交通设施--养护事件
export const maintenanceEventCurrentYear = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/maintenanceEventCurrentYear`,
    method: 'post',
    data: {}
  })
}
// 交通设施-养护事件-今年维护总数
export const maintenanceCurrent = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/maintenanceCurrent`,
    method: 'post',
    data: {}
  })
}
// 交通设施-养护事件-今年维护总数分布
export const maintenanceEveryEventPercentage = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/maintenanceEveryEventPercentage`,
    method: 'post',
    data: {}
  })
}
