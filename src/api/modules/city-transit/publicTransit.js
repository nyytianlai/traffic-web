import axios from '@/hooks/axios'
const BASE_URL = '/api-proxy/dc/api'
export default {
  flow: (reportDate) => {
    // 今日客流
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/flow`,
      method: 'post',
      data: { report_date: reportDate }
    })
  },

  flowPercentage: (data) => {
    // 出行占比
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/flowPercentageOfDay`,
      method: 'post',
      data
    })
  },

  monthTrend: (data) => {
    // 月度日期趋势
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/monthTrend`,
      method: 'post',
      data
    })
  },

  staticsOfMonth: (data) => {
    // 月度日期趋势
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/staticsOfMonth`,
      method: 'post',
      data
    })
  },

  maxYearAndMonth: () => {
    // 出行客流-最大年月
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/maxReportDate`,
      method: 'post',
      data: {}
    })
  },

  monthIncrease: () => {
    // 出行客流-客运方式分布
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/monthIncreaseNew`,
      method: 'post',
      data: {}
    })
  },

  dayOfMonthTrend: () => {
    // 大屏-公共交通-日客流趋势
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/dayOfMonthTrend`,
      method: 'post',
      data: {}
    })
  },

  monthOfYearTrend: () => {
    // 大屏-公共交通-月客流趋势
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/monthOfYearTrend`,
      method: 'post',
      data: {}
    })
  },

  taxiDailyPassengerNumber: (data) => {
    // 交通运行专题-城市公交--巡游出租车单车每日平均载客次数（日）
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/bigScreen/taxiDailyPassengerNumber`,
      method: 'post',
      data
    })
  },

  taxiDailyNumber: (data) => {
    // 交通运行专题-城市公交-巡游出租车车辆数（日）
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/bigScreen/taxiDailyNumber`,
      method: 'post',
      data
    })
  },

  metroDailyPassengerNumber: (data) => {
    // 交通运行专题-城市公交--地铁线路客运量（日）
    return axios({
      url: `${BASE_URL}/v1/dp/trffic/mobile/publictransport/bigScreen/metroDailyPassengerNumber`,
      method: 'post',
      data
    })
  }
}
