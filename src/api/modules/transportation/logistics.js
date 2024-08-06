/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-25 15:42:12
 * @LastEditTime: 2022-12-15 09:26:08
 * @FilePath: \traffic-web\src\api\modules\transportation\logistics.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
    // 交通运行专题-客货运输-道路运输-重点车辆
export const zdcl = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/dlys/zdcl`,
        method: 'post',
        data: {}
    })
}

// 交通运行专题-客货运输-道路运输-各类型车辆分布
export const glxclfb = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/dlys/glxclfb`,
        method: 'post',
        data: {}
    })
}

// 交通运行专题-客货运输-道路运输-两客一危车辆监管
export const lkywcljg = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/dlys/lkywcljg`,
        method: 'post',
        data: {}
    })
}

// 交通运行专题-客货运输-道路运输-客货运输月度变化
export const khyzydbh = (type = '') => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/khyzndbh`,
        method: 'post',
        data: { type }
    })
}

// 交通运行专题-客货运输-道路运输-车辆详情
export const clxq = (cph) => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/dlys/clxq`,
        method: 'post',
        data: { cph }
    })
}

// 交通运行专题-客货运输-道路运输-客货运输概况
export const khysgk = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/khysgk`,
        method: 'post',
        data: {}
    })
}

// 交通运行专题-客货运输-道路运输-口岸机场车站港口坐标
export const kajcczgkzb = (type = '') => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/kajcczgkzb`,
        method: 'post',
        data: { type }
    })
}

// 交通运行专题-客货运输-道路运输-机场和港区吞吐量
export const jchgqttl = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/hg/jchgqttl`,
        method: 'post',
        data: {}
    })
}

// 交通运行专题-客货运输-道路运输-港口吞吐量和火车站客运量月度排名
export const gkttlhhczkylydpm = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/gkttlhhczkylydpm`,
        method: 'post',
        data: {}
    })
}

// 交通运行专题-客货运输-道路运输-国际国内通航概况
export const gjgnthgk = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/kg/gjgnthgk`,
        method: 'post',
        data: {}
    })
}

// 2023-10-08 数据接入

// 交通运行专题-客货运输-道路运输-月客货运输量
export const monthlyPassengerAndFreightVolumeByType = (type) => {
        return axios({
            url: `${BASE_URL}/v1/dp/jiaotong/khys/roadTransport/monthlyPassengerAndFreightVolumeByType`,
            method: 'post',
            data: { type }
        })
    }
    // 交通运行专题-客货运输-道路运输-历年货运指标变化
export const historicalFreightIndexChange = (type) => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/roadTransport/historicalFreightIndexChange`,
        method: 'post',
        data: { type }
    })
}

// 交通运行专题-客货运输-道路运输-历年货运指标变化
export const passengerIndexChange = (type) => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/roadTransport/passengerIndexChange`,
        method: 'post',
        data: { type }
    })
}

// 交通运行专题-客货运输-道路运输-“两客一危”车辆监管
export const keyVehicleNubmer = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/khys/roadTransport/keyVehicleNubmer`,
        method: 'post',
        data: {}
    })
}