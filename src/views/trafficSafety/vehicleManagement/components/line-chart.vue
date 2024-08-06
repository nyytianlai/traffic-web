<template>
  <div class="content-wrapper">
    <div class="sub-info">
      {{ config[0]?.date || '-' }}
      <DataTypeBtn
        :show-drop="false"
        type="月"
        :date="config[0]?.date"
        style="margin-left: 0.04rem;"
      />
    </div>

    <div class="chart-wrapper">
      <div
        class="unit"
      >
        单位：{{ config[0]?.unit || '' }}
      </div>
      <BaseEcharts :option="options" />
    </div>
  </div>
</template>

<script setup>
  import moment from 'moment'
  import BaseEcharts from '@/components/base-echarts/index.vue'
  import DataTypeBtn from '@/components/data-type-btn'
  import { useStore } from 'vuex'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  const props = defineProps({

    config: {
      type: Array,
      default: () => []
    }
  })

  const getMin = (num) => {
    const lgNum = Math.log(num) / Math.log(10)
    const floatNum = lgNum % 1
    const preFix = Math.trunc(Math.pow(10, floatNum))
    const un = Math.floor(lgNum)
    return preFix * Math.pow(10, un)
  }

  const getMax = (num) => {
    const lgNum = Math.log(num) / Math.log(10)
    const floatNum = lgNum % 1
    const preFix = Math.trunc(Math.pow(10, floatNum)) + 1
    const un = Math.floor(lgNum)
    return preFix * Math.pow(10, un)
  }

  const options = computed(() => {
    const fontSize = store.getters.rootFontSize
    const arr = []
    const series = []
    let max = 0;
    let min = 0;
    (props.config || []).forEach(item => {
      series.push({
        type: 'line',
        name: item.name,
        smooth: 0.5,
        itemStyle: {
          color: item.color
        },
        symbol: 'none',
        data: item.data
      })
      max = Math.max(...item.data.map(arr => +arr[1]), max)
      min = Math.min(...item.data.map(arr => +arr[1]))
      arr.push(item.data[1])
    })
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
          const unit = props.config[0]?.unit || ''
          let str = ''
          param.forEach(item => {
            str += `
            <div class="tip-data">
              <span>${item.seriesName}</span>
              <span}">：${formatNumStr(item.value[1])}${unit}</span>
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
        left: 0.46 * fontSize,
        right: 0.24 * fontSize,
        bottom: 0.24 * fontSize,
        containLabel: true
      },
      legend: {
        show: true,
        right: 0.24 * fontSize,
        itemStyle: {
          color: 'transparent',
          borderWidth: 0.17 * fontSize
        },
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
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#283946',
            type: 'dashed'
          }
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
          fontSize: 0.16 * fontSize,
          formatter: (v, i) => {
            return moment(v).format('YYYY-MM')
          }
        }
        // showMinLabel: true,
        // showMaxLabel: true
        // splitNumber: 13
      },
      yAxis: {
        type: 'value',
        // nameTextStyle: {
        //   color: '#fff',
        //   fontSize: 0.16 * fontSize,
        //   padding: [4, 4, 0.1 * fontSize, 0.6 * fontSize]
        // },
        // name: '单位：%',
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
        splitNumber: 4,
        // min: getMin(Math.min(...arr)),
        max: max / min > 5 ? getMax(max * 2) : undefined
      },
      series
    }
  })

</script>

<style lang="less" scoped>
.content-wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .sub-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding-left: .24rem;
    margin-top: 20px;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }

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
