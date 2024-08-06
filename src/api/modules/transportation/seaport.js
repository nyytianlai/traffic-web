/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-13 11:30:28
 * @LastEditTime: 2022-12-15 09:47:15
 * @FilePath: \traffic-web\src\api\modules\transportation\seaport.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-客货运输-海港-机场和港区吞吐量
export const jchgqttl = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/hg/jchgqttl`,
    method: 'post',
    data: { type }
  })
}

// 交通运行专题-客货运输-港口吞吐量和火车站客运量月度排名
export const gkttlhhczkylydpm = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/gkttlhhczkylydpm`,
    method: 'post',
    data: { type }
  })
}

// 交通运行专题-客货运输-港口吞吐量和火车站客运量月度排名
export const ljhtbqnsj = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/ljhtbqnsj`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-客货运输-集装箱吞吐量曲线图
export const jzxttlqxt = (name) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/hg/jzxttlqxt`,
    method: 'post',
    data: { name }
  })
}

// 交通运行专题-客货运输-集装箱吞吐量曲线图
export const khyzydbh = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/khyzydbh`,
    method: 'post',
    data: {}
  })
}

// 2023-10-08 数据接入
// 客货运输-海港-港口客货运指标月度情况
export const portPassengerAndFreightIndexMonthly = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/port/portPassengerAndFreightIndexMonthly`,
    method: 'post',
    data: { type }
  })
}

// 客货运输-海港-客货运指标月度变化
export const passengerAndFreightIndexMonthlyChange = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/port/passengerAndFreightIndexMonthlyChange`,
    method: 'post',
    data: { type }
  })
}

// 客货运输-海港-集装箱吞吐量月度变化同比
export const containerThroughputMonthlyChangeYearOnYear = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/port/containerThroughputMonthlyChangeYearOnYear`,
    method: 'post',
    data: { type }
  })
}

// 交通运行专题-客货运输-海港-港口集装箱右侧吞吐量
export const portContainerMonthThroughput = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/port/portContainerMonthThroughput`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-客货运输-海港-国际集装箱班轮航线
export const transportStaticsByType = (data) => {
  return axios({
    url: `${BASE_URL}/v1/dp/trffic/mobile/cargoTransportation/transportStaticsByType`,
    method: 'post',
    data
  })
}
export const maxYearAndMonth = (type) => {
  // 出行客流-最大年月
  return axios({
    url: `${BASE_URL}/v1/dp/trffic/mobile/cargoTransportation/queryMaxYearAndMonth`,
    method: 'post',
    data: { type }
  })
}
export const portContainerYearThroughput = () => {
  // 港口集装箱右侧当年累计集装箱吞吐量
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/port/portContainerYearThroughput`,
    method: 'post',
    data: {}
  })
}
export const portBerths = () => {
  // 交通运行专题-客货运输-海港-港口码头泊位情况
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/khys/port/portBerths`,
    method: 'post',
    data: {}
  })
}
