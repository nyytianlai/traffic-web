<template>
  <div class="popup-wrapper">
    <div class="chart-wrapper">
      <div
        class="unit"
      >
        单位：万人次
      </div>
      <BaseEcharts :option="options" />
    </div>
  </div>
</template>

<script setup>
  import BaseEcharts from '@/components/base-echarts/index.vue'
  import { useStore } from 'vuex'
  import utils from '@/hooks/utils'
  import Api from '@/api/modules/city-transit/publicTransit.js'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  const props = defineProps({
    maxDate: {
      type: String,
      default: ''
    },
    lastDate: {
      type: String,
      default: ''
    }
  })
  const config = reactive([
    {
      name: '每日客运',
      color: 'rgba(84, 181, 255,1)',
      stopColor: 'rgba(84, 181, 255,0.01)',
      code: 'mrky',
      type: 'bar',
      unit: '万人次'
    }
    // {
    //   name: '日均客运量强度',
    //   color: '#F9E900',
    //   code: 'rjkyqd',
    //   type: 'line',
    //   unit: '%'
    // }
  ])

  const options = computed(() => {
    const fontSize = store.getters.rootFontSize
    const series = []
    config.forEach(item => {
      const serie = item.type === 'bar' ? {
        type: 'bar',
        name: item.name,
        barWidth: 0.2 * fontSize,
        data: item.data?.map(o => [...o, item.unit]),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            x2: 0,
            y: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: item.color
              },
              {
                offset: 1,
                color: item.stopColor
              }
            ]
          }
        }
      } : {
        type: 'line',
        name: item.name,
        smooth: 0.5,
        itemStyle: {
          color: item.color
        },
        yAxisIndex: 1,
        data: item.data?.map(o => [...o, item.unit])
      }
      series.push(serie)
    })
    console.log(series)
    return {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        trigger: 'axis',
        formatter (p) {
          const param = Array.isArray(p) ? p : [p]
          const title = p[0].axisValueLabel
          let str = ''
          param.forEach(item => {
            str += `
            <div class="tip-data">
              <span>${item.seriesName}</span>
              <span}">：${formatNumStr(item.value[1])}${item.value[2]}</span>
            </div>
          `
          })
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <div class="tip-title">${title || ''}</div>
            ${str}
          </div>
        `
        }
      },
      grid: {
        top: 0.5 * fontSize,
        left: 0.24 * fontSize,
        right: 0.24 * fontSize,
        bottom: 0.24 * fontSize,
        containLabel: true
      },
      legend: {
        show: true,
        right: 0.24 * fontSize,
        top: 0.12 * fontSize,

        textStyle: {
          color: '#fff',
          fontSize: 0.16 * fontSize,
          fontWeight: 400
        }
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#283946',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 0.16 * fontSize
        },
        showMinLabel: true,
        showMaxLabel: true,
        splitNumber: 13
      },
      yAxis: [{
        type: 'value',
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
          fontSize: 0.18 * fontSize
        },
        minInterval: 1,
        splitNumber: 2
      }, {
        type: 'value',
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
          fontSize: 0.18 * fontSize
        },
        minInterval: 1,
        splitNumber: 2
      }],
      series
    }
  })

  const getData = async () => {
    const arr = moment(props.maxDate).format('YYYY-MM').split('-')
    const res = await Promise.allSettled([Api.metroDailyPassengerNumber({
      year: arr[0],
      month: arr[1]
    })])
    config.forEach((item, i) => {
      item.data = item.data || []
      const data = res[i].value || []
      data.forEach((o) => {
        item.data.push([o.report_date, o.sum_numerical])
      })
    })
  }

  watch(() => props.maxDate, () => {
    if (props.maxDate) {
      getData()
    }
  }, {
    immediate: true

  })

</script>

<style lang="less" scoped>
.popup-wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  width: 100%;
  height: 100%;
  height: 100%;

  .chart-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;
  }
  .unit {
    position: absolute;
    top: .06rem;
    left: .24rem;
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
</style>
