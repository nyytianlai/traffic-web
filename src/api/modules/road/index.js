/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-08 17:22:21
 * @LastEditTime: 2022-11-15 10:58:32
 * @FilePath: \traffic-web\src\api\modules\road\index.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-道路交通-实时交通、交通拥堵里程及占比
export const jtydlcjzb = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/dljt/jtydlcjzb`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-道路交通-全市和中心城区平均车速
export const qshzxcqpjcs = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/dljt/qshzxcqpjcs`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-道路交通-行政区和街道交通指数
export const xzqhjdjtzs = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/dljt/xzqhjdjtzs`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-道路交通-路段拥堵等级明细
export const ldyddjmx = (data) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/dljt/ldyddjmx`,
    method: 'post',
    data
  })
}

// 交通运行专题-道路交通-监控视频分布
export const jkspfb = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/dljt/jkspfb`,
    method: 'post',
    data: {}
  })
}
