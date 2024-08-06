/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-07 15:45:27
 * @LastEditTime: 2022-12-13 09:02:08
 * @FilePath: \traffic-web\src\api\modules\city-transit\taxi.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-城市公交-车辆统计/运行态势
export const cltjyxts = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/cltjyxts`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-出租车在线率
export const czczxcl = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/czc/czczxcl`,
    method: 'post',
    data: { type }
  })
}

// 交通运行专题-城市公交-各类型车辆分布坐标
export const glxclfbzb = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/glxclfbzb`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-城市公交-网约出租车-网约车平台订单详情
export const wycptddxq = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/csgj/czc/wyczc/wycptddxq`,
    method: 'post',
    data: {}
  })
}
