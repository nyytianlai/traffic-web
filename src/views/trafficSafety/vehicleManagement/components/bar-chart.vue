<template>
  <div class="content-wrapper">
    <div class="sub-info">
      {{ maxDate }}
      <DataTypeBtn
        :show-drop="false"
        :date="maxDate"
        type="月"
        style="margin-left: 0.04rem;"
      />
    </div>

    <div class="chart-wrapper">
      <div
        class="unit"
      >
        <span>单位：起</span>
        <span>单位：人</span>
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
    maxDate: {
      type: String,
      default: ''
    },
    config: {
      type: Array,
      default: () => []
    }
  })

  const options = computed(() => {
    const fontSize = store.getters.rootFontSize
    const series = [];
    (props.config || []).forEach(item => {
      const color = {
        type: 'linear',
        x: 0,
        x2: 0,
        y: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: item.color[0]
          },
          {
            offset: 1,
            color: item.color[1]
          }
        ]
      }
      series.push({
        name: item.name,
        type: 'bar',
        barWidth: 0.22 * fontSize,
        itemStyle: {
          color: color
        },
        data: item.data,
        unit: item.unit,
        yAxisIndex: item.yAxisIndex
      })
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
          let str = ''
          param.forEach(item => {
            str += `
            <div class="tip-data">
              <span>${item.seriesName}</span>
              <span}">：${formatNumStr(item.value[1])}${item.value[2] || ''}</span>
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
        right: 'center',
        left: 'center',
        itemWidth: 0.08 * fontSize,
        itemHeight: 0.08 * fontSize,
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
        boundaryGap: true,
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
          formatter: v => {
            return moment(v).format('YYYY-MM')
          }
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
        minInterval: 1
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
        minInterval: 1
      }],
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
    display: flex;
    justify-content: space-between;
    width: 95%;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-style: normal;
    font-weight: 400;
    line-height: .22rem;
    pointer-events: all;
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
