/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-23 16:47:00
 * @LastEditTime: 2022-12-28 16:39:26
 * @FilePath: \traffic-web\src\api\modules\overview\index.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-交通总览-交通总览概况
export const jtzlgk = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtzl/jtzlgk`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-城市轨道-客流量等级热力图
export const klldjrlt = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/csgd/klldjrlt`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-各轨道站点客流量月度变化
export const ggdzdkllydbh = (data = {}) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtzl/csgj/ggdzdkllydbh`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-交通总览-同比环比数据
export const tbhbsj = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtzl/tbhbsj`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-交通总览-道路运输数字
export const daoluyunshu = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtzl/daoluyunshu`,
    method: 'post',
    data: {}
  })
}
