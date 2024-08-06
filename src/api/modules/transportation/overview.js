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
// 交通运行专题-客货运输-客货总览
export const indexStatistics = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/indexStatistics`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-货运量-饼图百分比
export const pieChartPercentage = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/freightVolume/pieChartPercentage `,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-货运量-本月同比
export const currentMonthYearOnYear = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/freightVolume/currentMonthYearOnYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-货运量-累计同比
export const cumulativeYearOnYear = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/freightVolume/cumulativeYearOnYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-货物周转量-饼图百分比
export const pieChartPercentage2 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/cargoTurnoverVolume/pieChartPercentage`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-货物周转量-本月同比
export const currentMonthYearOnYear2 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/cargoTurnoverVolume/currentMonthYearOnYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-货物周转量-累计同比
export const cumulativeYearOnYear2 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/cargoTurnoverVolume/cumulativeYearOnYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-客运量-饼图百分比
export const pieChartPercentage3 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/passengerVolume/pieChartPercentage`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-客运量-本月同比
export const currentMonthYearOnYear3 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/passengerVolume/currentMonthYearOnYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-客运量-累计同比
export const cumulativeYearOnYear3 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/passengerVolume/cumulativeYearOnYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-旅客周转量-饼图百分比
export const pieChartPercentage4 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/passengerTurnoverVolume/pieChartPercentage`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-旅客周转量-本月同比
export const currentMonthYearOnYear4 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/passengerTurnoverVolume/cumulativeYearOnYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-旅客周转量-累计同比
export const cumulativeYearOnYear4 = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/passengerAndFreightOverview/passengerTurnoverVolume/currentMonthYearOnYear`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-落点
export const gpsLocation = (lx) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/cybz/gpsLocation`,
    method: 'post',
    data: { lx }
  })
}
