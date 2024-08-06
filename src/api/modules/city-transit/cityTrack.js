/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-14 15:57:26
 * @LastEditTime: 2022-12-13 15:42:40
 * @FilePath: \traffic-web\src\api\modules\city-transit\cityTrack.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-城市公交-轨道设施、客运情况
export const gdsskyqk = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/csgd/gdsskyqk`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-道路交通-实时客运量变化趋势
export const gdjtgjczcsskylbhqs = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/gdjtgjczcsskylbhqs`,
    method: 'post',
    data: { type }
  })
}

// 交通运行专题-城市轨道-实时站点客流TOP
export const getTop10 = (type = '') => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/csgd/sszdkl/top`,
    method: 'post',
    data: { type }
  })
}

// 交通运行专题-道路交通-各区轨道公交出租车情况
export const gqgdgjczcqk = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/gqgdgjczcqk`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-城市轨道-实时站点客流
export const sszdkl = (station) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/csgd/sszdkl`,
    method: 'post',
    data: { station }
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

// 交通运行专题-城市公交-城市轨道-各线路客运情况
export const gxlkyqk = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/csgd/gxlkyqk`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-城市轨道-轨道站点明细
export const gdzdmx = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/csgd/gdzdmx`,
    method: 'post',
    data: {}
  })
}
