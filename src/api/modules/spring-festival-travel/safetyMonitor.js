/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-22 17:05:44
 * @LastEditTime: 2022-11-30 17:52:26
 * @FilePath: \traffic-web\src\api\modules\spring-festival-travel\safetyMonitor.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
    // 春运总览-春运出行情况
export const cycxqk = (data) => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/cybz/cyzl/cycxqk`,
        method: 'post',
        data
    })
}

// 春运总览-春运路段拥堵等级明细
export const cyldyddjmx = (data) => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/cybz/cyzl/cyldyddjmx`,
        method: 'post',
        data
    })
}

// 春运保障-春运总览-口岸机场车站港口坐标
export const kajcczgkzb = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/cybz/cyzl/kajcczgkzb`,
        method: 'post',
        data: {}
    })
}

// 春运总览-春运历年每日趋势
export const cylnmrqs = (data) => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/cybz/cyzl/cylnmrqs`,
        method: 'post',
        data
    })
}

// 春运总览-春运站点客流
export const cyzdkl = (data) => {
        return axios({
            url: `${BASE_URL}/v1/dp/jiaotong/cybz/cyzl/cyzdkl`,
            method: 'post',
            data
        })
    }
    // 春运总览-非春运期间-春运出行情况
export const fcyqjcycxqk = (data) => {
        return axios({
            url: `${BASE_URL}/v1/dp/jiaotong/cybz/cyzl/fcyqjcycxqk`,
            method: 'post',
            data
        })
    }
    // 历年最高/最低的发送/到达量
export const lnzghzd = (data) => {
        return axios({
            url: `${BASE_URL}/v1/dp/jiaotong/cybz/lnzghzd`,
            method: 'post',
            data: data
        })
    }
    // 主要枢纽站综合指标概览
export const zysnzzhzbgl = (data) => {
        return axios({
            url: `${BASE_URL}/v1/dp/jiaotong/cybz/zysnzzhzbgl`,
            method: 'post',
            data: data
        })
    }
    // 分方式当日旅客发送量到达量趋势变化图
export const ffsdrlkfslddlqsbh = (data) => {
        return axios({
            url: `${BASE_URL}/v1/dp/jiaotong/cybz/ffsdrlkfslddlqsbh`,
            method: 'post',
            data: data
        })
    }
    // 分方式当日旅客发送量到达量
export const fssdrlkfslddl = (data) => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/cybz/fssdrlkfslddl`,
        method: 'post',
        data: data
    })
}

// 非春运期间-分方式当日旅客发送量到达量
export const fcyqjfssdrlkfslddl = (data) => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/cybz/fcyqjfssdrlkfslddl`,
        method: 'post',
        data: data
    })
}

// 春运期间-最大数据日期
export const cycxqkMaxYear = () => {
    return axios({
        url: `${BASE_URL}/v1/dp/jiaotong/cybz/cyzl/cycxqkMaxYear`,
        method: 'post',
        data: {}
    })
}