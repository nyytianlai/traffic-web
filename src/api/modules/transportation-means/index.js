/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-08 17:22:21
 * @LastEditTime: 2022-12-29 14:13:40
 * @FilePath: \traffic-web\src\api\modules\transportation-means\index.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-交通设施概况
export const jtssgk = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jtssgk`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通设施-基础设施-同比数据
export const tbsj = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/tbsj`,
    method: 'post',
    data: {}
  })
}
// 交通运行专题-各区交通设施分布
export const gqjtssfb = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/gqjtssfb`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通设施-基础设施-道路明细
export const dlmx = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/dlmx`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通设施-基础设施-桥隧坡明细
export const qspmx = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/qspmx`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通设施-基础设施-桥隧坡公交场站详情
export const qspgjczxq = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/qspgjczxq`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通设施-停车资源-全天路内停车饱和度变化
export const qtlntcbhdbh = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/tczy/qtlntcbhdbh`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通设施-设施养护-历年设施养护明细
export const lnssyhmx = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/ssyh/lnssyhmx`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通设施-基础设施-地图聚合数量数据
export const dtjhslsj = (list = []) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/dtjhslsj`,
    method: 'post',
    data: {
      list
    }
  })
}

// 交通运行专题-交通设施-基础设施-桥梁隧道公交场站统计
export const qlsdgjcztj = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/aqjc/qlsdgjcztj`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-区域基础设施分布
export const regionalInfrastructureDistribution = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/regionalInfrastructureDistribution`,
    method: 'post',
    data: {
      type
    }
  })
}

// 交通运行专题-交通设施-基础设施-右侧各类数量统计
export const staticsByType = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/staticsByType`,
    method: 'post',
    data: {
      type
    }
  })
}

// 交通运行专题-交通设施-基础设施-右侧各类数量统计
export const basicData = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/trffic/mobile/industryReports/basicData`,
    method: 'post',
    data: {}
  })
}

// 交通运行专题-交通设施-基础设施-右侧各类数量统计
export const dataStatistics = (type) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/dataStatistics`,
    method: 'post',
    data: {
      type
    }
  })
}

// 交通运行专题-交通设施-基础设施-地图落点
export const gpsLocation = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/jcss/gpsLocation`,
    method: 'post',
    data: {}
  })
}
// 根据类型（lx）获取行政区划
export const equipmentRegionCount = (lx) => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/cybz/equipmentRegionCount`,
    method: 'post',
    data: { lx }
  })
}
