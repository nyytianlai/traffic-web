<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-12-13 11:16:21
 * @FilePath: \traffic-web\src\views\trafficSafety\vehicleManagement\index.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="left">
      <div
        v-for="item in cardConfigList"
        :key="item.name"
        class="left-s"
      >
        <LeftCardS>
          <BaseCardS :config="item" />
        </LeftCardS>
      </div>
      <div class="left-m">
        <LeftCardS>
          <YearAccident />
        </LeftCardS>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div class="right-top-1">
          <base-panel title="驾驶员保有量月度趋势">
            <LineChart :config="config" />
          </base-panel>
        </div>
        <div class="right-top-2">
          <base-panel title="交通事故直接财产损失情况">
            <LineChart :config="config1" />
          </base-panel>
        </div>
      </div>
      <div class="right-bottom">
        <base-panel title="交通事故情况">
          <BarChart :config="config2" :maxDate="maxDate" />
        </base-panel>
      </div>
    </div>
    <div class="data-from">
      <div>数据来源：深圳交警</div>
      <div>
        <svg-icon icon-class="datasources" />
        数据来源：深圳交警
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import LeftCardS from './components/left-card-s.vue'
  import BaseCardS from './components/base-card-s.vue'
  import YearAccident from './components/year-accident.vue'
  import LineChart from './components/line-chart.vue'
  import BarChart from './components/bar-chart.vue'
  import { jsybyl, jtsgs, ccss, jsybylYear, ccssYear, jtsglYear } from '@/api/modules/traffic-safety/vehicleManagement'

  const cardConfigList = reactive([
    {
      name: '当月驾驶员保有量',
      dateType: '月',
      date: '-',
      icon: 'jiashiyuan2.png',
      value: '-',
      unit: '万人',
      compareValue: '-',
      api: jsybyl
    },
    {
      name: '当月道路交通事故数量',
      dateType: '月',
      date: '-',
      icon: 'jiaotongshigu.png',
      value: '-',
      unit: '起',
      compareValue: '-',
      api: jtsgs
    },
    {
      name: '当月道路交通事故直接财产损失',
      dateType: '月',
      date: '-',
      icon: 'jiaotongshigusunshi.png',
      value: '-',
      unit: '万元',
      compareValue: '-',
      api: ccss
    }
  ])

  const config = reactive([
    {
      name: '驾驶员保有量',
      color: '#54B5FF',
      unit: '万人',
      data: [],
      date: '-',
      api: jsybylYear
    }
  ])
  const config1 = reactive([
    {
      name: '直接财产损失',
      color: '#54B5FF',
      data: [],
      unit: '万元',
      date: '-',
      api: ccssYear
    }
  ])
  const config2 = reactive([
    {
      name: '交通事故数量',
      color: ['rgba(84, 181, 255, 0.00)', '#54B5FF'],
      data: [],
      code: 'shigushuliang',
      yAxisIndex: 0,
      unit: '起'
    },
    {
      name: '交通事故死亡人数',
      color: ['rgba(0, 255, 249, 0.00)', '#00FFF9'],
      data: [],
      code: 'siwangrenshu',
      yAxisIndex: 1,
      unit: '人'
    },
    {
      name: '交通事故受伤人数',
      color: ['rgba(249, 233, 0, 0.00)', '#F9E900'],
      data: [],
      code: 'shoushangrenshu',
      yAxisIndex: 1,
      unit: '人'
    }
  ])

  const maxDate = ref('-')

  const getCardData = async () => {
    const pArr = []
    cardConfigList.forEach((item) => {
      pArr.push(item.api())
    })
    const resAll = await Promise.allSettled(pArr)
    resAll.forEach((item, i) => {
      const data = item.value && item.value[0]
      cardConfigList[i].value = data?.cur_month
      cardConfigList[i].compareValue = data?.cur_month && data?.last ? ((data?.cur_month - data?.last) / data?.last * 100).toFixed(2) : '-'
      cardConfigList[i].date = data?.report_date || '-'
    })
  }

  const getConfigData = async (config, code) => {
    const res = await config.api()
  //   const res = [
  //     {
  //           "nianfen": "2023",
  //           "caichansunshi": "23.07",
  //           "yuefen": "2",
  //           "report_date": "2024-01"
  //       },
  //       {
  //           "nianfen": "2023",
  //           "caichansunshi": "43.9",
  //           "yuefen": "3",
  //           "report_date": "2024-01"
  //       },
  //       {
  //           "nianfen": "2023",
  //           "caichansunshi": "41.2",
  //           "yuefen": "4",
  //           "report_date": "2024-01"
  //       },
  //       {
  //           "nianfen": "2023",
  //           "caichansunshi": "36.23",
  //           "yuefen": "5",
  //           "report_date": "2024-01"
  //     },
  //        {
  //           "nianfen": "2023",
  //           "caichansunshi": "230.51",
  //           "yuefen": "6",
  //           "report_date": "2024-01"
  //     },
  //       {
  //           "nianfen": "2023",
  //           "caichansunshi": "36.24",
  //           "yuefen": "7",
  //           "report_date": "2024-01"
  //     },
  //       {
  //           "nianfen": "2023",
  //           "caichansunshi": "30.22",
  //           "yuefen": "8",
  //           "report_date": "2024-01"
  //     },
  //        {
  //           "nianfen": "2023",
  //           "caichansunshi": "30.65",
  //           "yuefen": "9",
  //           "report_date": "2024-01"
  //     },
  //        {
  //           "nianfen": "2023",
  //           "caichansunshi": "29.48",
  //           "yuefen": "10",
  //           "report_date": "2024-01"
  //     },
  //        {
  //           "nianfen": "2023",
  //           "caichansunshi": "49.34",
  //           "yuefen": "11",
  //           "report_date": "2024-01"
  //       },
  // ]
   
    config.data = res?.map(item => {
      return [`${item.nianfen}-${item.yuefen > 9 ? item.yuefen : `0${item.yuefen}`}`, item[code]]
    })
    config.date = res[0] && res[0].report_date
}

const getBarConfig = async () => {
  const res = await jtsglYear()
  // const res = [
  //       {
  //           "nianfen": "2023",
  //           "siwangrenshu": "20",
  //           "shoushangrenshu": "114",
  //           "yuefen": "7",
  //           "shigushuliang": "112",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2023",
  //           "siwangrenshu": "23",
  //           "shoushangrenshu": "131",
  //           "yuefen": "8",
  //           "shigushuliang": "125",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2023",
  //           "siwangrenshu": "20",
  //           "shoushangrenshu": "121",
  //           "yuefen": "9",
  //           "shigushuliang": "115",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2023",
  //           "siwangrenshu": "17",
  //           "shoushangrenshu": "114",
  //           "yuefen": "10",
  //           "shigushuliang": "105",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2023",
  //           "siwangrenshu": "15",
  //           "shoushangrenshu": "141",
  //           "yuefen": "11",
  //           "shigushuliang": "130",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2023",
  //           "siwangrenshu": "11",
  //           "shoushangrenshu": "159",
  //           "yuefen": "12",
  //           "shigushuliang": "158",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2024",
  //           "siwangrenshu": "20",
  //           "shoushangrenshu": "164",
  //           "yuefen": "1",
  //           "shigushuliang": "252",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2024",
  //           "siwangrenshu": "6",
  //           "shoushangrenshu": "65",
  //           "yuefen": "2",
  //           "shigushuliang": "108",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2024",
  //           "siwangrenshu": "12",
  //           "shoushangrenshu": "129",
  //           "yuefen": "3",
  //           "shigushuliang": "109",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2024",
  //           "siwangrenshu": "5",
  //           "shoushangrenshu": "111",
  //           "yuefen": "4",
  //           "shigushuliang": "94",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2024",
  //           "siwangrenshu": "14",
  //           "shoushangrenshu": "80",
  //           "yuefen": "5",
  //           "shigushuliang": "82",
  //           "report_date": "2024-06"
  //       },
  //       {
  //           "nianfen": "2024",
  //           "siwangrenshu": "16",
  //           "shoushangrenshu": "89",
  //           "yuefen": "6",
  //           "shigushuliang": "80",
  //           "report_date": "2024-06"
  //       }
  //   ]
  maxDate.value = res && res[0]?.report_date || '-'
  res?.forEach(item => {
    config2.forEach(o => {
      o.data.push([`${item.nianfen}-${item.yuefen > 9 ? item.yuefen : `0${item.yuefen}`}`, item[o.code], o.unit])
    })
  })
  
}

  getCardData()
  getConfigData(config[0], 'jiashiyuanbaoyouliang')
  getConfigData(config1[0], 'caichansunshi')
  getBarConfig()

</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  .left {
    display: flex;
    flex-flow: column nowrap;
    flex: 0 0 4.32rem;

    row-gap: .24rem;

    .left-s {
      flex: 0 0 1.68rem;
    }

    .left-m {
      flex: 1;
      min-height: 0;
    }
  }

  .right {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    min-width: 0;

    row-gap: .24rem;

    .right-top {
      display: flex;
      flex-flow: row nowrap;
      flex: 0 0 3.6rem;

      column-gap: .24rem;
       > div {
        flex: 1;
        min-width: 0;
      }
    }

    .right-bottom {
      flex: 1;
      min-height: 0;
    }
  }

  .data-from {
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.6rem;
     > div {
      color: #54b5ff;
      font-family: "PingFang SC";
      font-size: .14rem;
      font-weight: 400;
      line-height: .2rem;
      text-transform: uppercase;
    }
  }
}
</style>
