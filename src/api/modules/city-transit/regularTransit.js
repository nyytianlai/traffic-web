/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-07 09:17:38
 * @LastEditTime: 2022-12-07 10:53:00
 * @FilePath: \traffic-web\src\api\modules\city-transit\regularTransit.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-城市公交-基础资源、线路运营
export const jczyxlyy = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/cggj/jczyxlyy`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-基础资源-站点统计
export const zdtj = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/cggj/jczy/zdtj`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-线路运营-实时上周同期曲线图
export const sssztqqxt = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/cggj/xlyy/sssztqqxt`,
    method: 'post',
    data: { type }
  })
}

// 交通运行专题-城市公交-常规公交-公交线路情况
export const gjxlqk = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/cggj/gjxlqk`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-常规公交-公交场站详情
export const gjczxq = (station) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/cggj/gjczxq`,
    method: 'post',
    data: { station }
  })
}

// 交通运行专题-城市公交-常规公交-公交站点详情
export const gjzdxq = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/cggj/gjzdxq`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-常规公交-公交专用道和充电桩分布
export const gjzydhcdzfb = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/cggj/gjzydhcdzfb`,
    method: 'post',
    data: {}
  })
}
