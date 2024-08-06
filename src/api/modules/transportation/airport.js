/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-14 17:53:55
 * @LastEditTime: 2022-12-14 17:54:22
 * @FilePath: \traffic-web\src\api\modules\transportation\airport.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-客货运输-道路运输-重点车辆
export const gjgnthgk = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/kg/gjgnthgk`,
    method: 'post',
    data: {}
  })
}

// 2023-10-08 数据接入
// 客货运输-空港-历年客货运指标变化
export const historicalPassengerAndFreightIndexChange = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/airport/historicalPassengerAndFreightIndexChange`,
    method: 'post',
    data: {}
  })
}
// 客货运输-空港-月度变化曲线
export const monthlyChangeCurve = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/airport/monthlyChangeCurve`,
    method: 'post',
    data: { type }
  })
}

// 客货运输-空港-月度变化曲线-增长率同比
export const rowthRateYearOnYear = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/airport/rowthRateYearOnYear`,
    method: 'post',
    data: { type }
  })
}
// 客货运输-空港-空港运营指标月度概况
export const airportOperationIndexMonthlyOverview = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/airport/airportOperationIndexMonthlyOverview`,
    method: 'post',
    data: { type }
  })
}
// 客货运输-空港-通航国家和城市个数
export const airportCityOrCountryNumber = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/airport/airportCityOrCountryNumber`,
    method: 'post',
    data: {}
  })
}
