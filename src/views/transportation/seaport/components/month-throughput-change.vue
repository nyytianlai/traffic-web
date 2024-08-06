<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-07 16:43:56
 * @LastEditTime: 2022-12-15 09:49:36
 * @FilePath: \traffic-web\src\views\transportation\seaport\components\month-throughput-change.vue
 * @Description: FilePath
-->
<template>
  <div class="throughput-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn type="日" style="margin-left: 0.08rem" :date="date" />
      </span>
      <!-- <svg-icon icon-class="more" class="more" /> -->
    </div>
    <!-- <div class="total-info">
      {{ totalData.time }}累计
      <div class="total">{{ formatNumStr(totalData.data) }}万标准箱</div>
      同比去年
      <div class="compare-data">
        {{ formatNumStr(totalData.compare) }}
      </div>
      <svg-icon
        v-if="
          Number(formatNumStr(totalData.compare)) &&
          !Number.isNaN(Number(formatNumStr(totalData.compare)))
        "
        :icon-class="Number(formatNumStr(totalData.compare)) < 0 ? 'drop' : 'rise'"
        style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem"
      />
    </div> -->
    <div class="chart-wrapper">
      <div class="unit">单位：万标准箱</div>
      <base-echart :option="option" />
    </div>
    <div class="cate-info">
      <div class="cate-top">
        <CardItem :config="config" />
      </div>
      <div class="cate-left">
        <div
          class="card"
        >
          <div class="card-name">
            {{ config2[0].name }}
          </div>
          <div class="card-data">
            <div class="data">
              {{ formatNumStr(config2[0].value) }}
            </div>
            <div class="unit">
              {{ config2[0].unit }}
            </div>
          </div>
          <div class="compare-data">
            同比去年
            {{ config2[0].compareValue || '-' }}%
            <svg-icon
              v-if="Number(config2[0].compareValue) && !Number.isNaN(Number(config2[0].compareValue))"
              :icon-class="Number(config2[0].compareValue) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem"
            />
          </div>
        </div>

      </div>
      <div class="cate-right">
        <div
          class="card"
        >
          <div class="card-name">
            {{ config2[1].name }}
          </div>
          <div class="card-data">
            <div class="data">
              {{ formatNumStr(config2[1].value) }}
            </div>
            <div class="unit">
              {{ config2[1].unit }}
            </div>
          </div>
          <div class="compare-data">
            同比去年
            {{ config2[1].compareValue || '-' }}%
            <svg-icon
              v-if="Number(config2[1].compareValue) && !Number.isNaN(Number(config2[1].compareValue))"
              :icon-class="Number(config2[1].compareValue) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import DataTypeBtn from '@/components/data-type-btn'
import BaseEchart from '@/components/base-echarts'
import CardItem from './card-item.vue'
import { useStore } from 'vuex'
import {
  passengerAndFreightIndexMonthlyChange,
  containerThroughputMonthlyChangeYearOnYear,
  portContainerMonthThroughput
} from '@/api/modules/transportation/seaport.js'
import utils from '@/hooks/utils'
import moment from 'moment'
const formatNumStr = utils.formatNumStr
const store = useStore()

const config = reactive({
  name: '当月集装箱吞吐量',
    icon: require('@/assets/images/gangkoujizhuangxiang.png'),
    unit: '万标准箱',
    dataName: '',
    compareName: '',
    compareDataName: '',
    showDetail: false,
    dataInConfig: true
})
  const config2 = reactive([
    {
      name: '进港',
      unit: '万标准箱',
      compareName: '进港同比去年',
      dataInConfig: true
    },
    {
      name: '出港',
      unit: '万标准箱',
      compareName: '出港同比去年',
      dataInConfig: true
    }
  ])

const date = ref('-')

const totalData = reactive({
  data: '',
  compare: '',
  time: ''
})
const getData = async () => {
  const res = await Promise.allSettled([
    containerThroughputMonthlyChangeYearOnYear(2),
    passengerAndFreightIndexMonthlyChange(2)
  ])
  date.value = res[0].value && res[0].value[0]?.report_date
  const arr = date.value?.split('-') || []
  totalData.data = res[0].value && res[0].value[0]?.sum_numerical
  totalData.compare = res[0].value && res[0].value[0]?.increase_percentage?.toFixed(2)
  totalData.time = arr.length && `${arr[0]}年1-${Number(arr[1])}月`
  newData.value = res[1].value?.map((item) => [`${item.year}-${item.month}`, item.sum_numerical])
}

const getCardData = async () => {
  const data = await portContainerMonthThroughput() || [];
  const res = data.flat()
  const gk = res.find(item => item.category?.includes('港口'))
  config.value = gk?.sum_numerical
  config.compareValue = gk?.increase_percentage
  config2.forEach(item => {
    const fd = res.find(o => o.category?.includes(item.name))
    item.value = fd?.sum_numerical
    item.compareValue = fd?.increase_percentage?.toFixed(2)
  })
}

getData()
getCardData()
const newData = ref([])

const option = computed(() => {
  const fontSize = store.getters.rootFontSize
  return {
    tooltip: {
      show: true,
      backgroundColor: 'transparent',
      padding: 0,
      borderWidth: 0,
      trigger: 'axis',
      formatter(p) {
        const param = Array.isArray(p) ? p : [p]
        let str = ''
        param.forEach((item) => {
          str += `
            <div class="tip-data">
              <span>${item.name}：</span>
              <span>${formatNumStr(item.value[1])}万标准箱</span>
            </div>
          `
        })
        return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            ${str}
          </div>
        `
      }
    },
    grid: {
      top: 0.5 * fontSize,
      left: 0.1 * fontSize,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#283946'
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize: 0.16 * fontSize,
        // interval: 1,
        formatter: (vl, index) => {
          const arr = vl.split('-')
          return !index ? vl : arr[1]
        }
      }
    },
    yAxis: {
      type: 'value',
      // nameTextStyle: {
      //   color: '#fff',
      //   fontSize: 0.16 * fontSize,
      //   padding: [0.02 * fontSize, 4, 0.02 * fontSize, 0.5 * fontSize]
      // },
      // name: '单位：万标准箱',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#283946',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#fff',
        fontSize: 0.16 * fontSize
      },
      splitNumber: 2
    },
    series: [
      {
        color: '#F9E900',
        type: 'line',
        smooth: 0.5,
        data: newData.value,
        symbol: 'none',
        lineStyle: {
          color: '#F9E900'
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.throughput-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .2rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .12rem;
    .more {
      width: .16rem;
      height: .16rem;
      font-size: .16rem;
      cursor: pointer;
    }

    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: .16rem;
      font-weight: @regular;
      letter-spacing: 0;

       > div {
        margin-left: .04rem;
      }
    }
  }

  .total-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: .28rem;
    padding: 0 .1rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .14rem;
    font-weight: 400;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px rgba(#294cb3, .79);
    border: 1.4px solid rgba(0, 133, 255, .78);
    border-radius: 74px;
    .total {
      flex: 1;
      min-width: 0;
      color: #00fff9;
      text-align: center;
    }

    .compare-data {
      margin-left: .08rem;
      color: #ff4d21;
    }
  }

  .chart-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;

    .unit {
      position: absolute;
      top: .1rem;
      left: 0;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-style: normal;
      font-weight: 400;
      line-height: .22rem;
    }

    :deep(.tool-tip) {
      position: relative;
      padding: .12rem;
      background: rgba(0, 9, 45, .9);
      border: 1px solid rgba(84, 181, 255, .5);

      .dot {
        position: absolute;
        width: .06rem;
        height: .06rem;
        background: rgba(84, 181, 255, .5);

        &.left-top {
          top: 0;
          left: 0;
        }

        &.right-top {
          top: 0;
          right: 0;
        }

        &.left-bottom {
          bottom: 0;
          left: 0;
        }

        &.right-bottom {
          right: 0;
          bottom: 0;
        }
      }

      .tip-title {
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }

      .tip-data {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }
    }
  }

  .cate-info {
    display: grid;
    flex: 0 0 2rem;
    padding: .16rem .2rem;
    background: rgba(55, 97, 232, .02);
    box-shadow: 0 1px 14px 0 rgba(0, 0, 0, .040), 0 0 35px 0 rgba(#294cb3, .2) inset;
    border: 1.4px solid rgba(#0085ff, .2);

    gap: 12px 24px;
    grid-template-areas: "a a"
    "b c";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);

    .cate-top {
      position: relative;
      min-width: 0;
      min-height: 0;

      grid-area: a;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        border-top: dashed 1px rgba(0, 133, 255, .30);
      }
    }
    .cate-left {
      position: relative;
      min-width: 0;
      min-height: 0;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: -.12rem;
        width: 1px;
        height: 100%;
        border-right: dashed 1px rgba(0, 133, 255, .30);
      }
    }
    .card {
      .card-name {
        margin-bottom: .06rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .2rem;
        font-weight: 500;
        line-height: .18rem;
      }

      .card-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;

        .data {
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .26rem;
          font-weight: 700;
          line-height: .26rem;
        }

        .unit {
          margin-left: .04rem;
          color: #0ff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .16rem;
          white-space: nowrap;
        }
      }

      .compare-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }
    }
  }
}
</style>
