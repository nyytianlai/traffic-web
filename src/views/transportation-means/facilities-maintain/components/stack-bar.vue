<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          :type="dateType"
          :show-drop="showDrop"
          :drop-info="date"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-wrapper">
      <base-echart :option="option" />
      <div class="legend-wrapper">
        <div class="unit">
          单位：{{ newConfig[0]?.unit || '' }}
        </div>
        <div
          v-show="legend.length > 1 && showLegend"
          class="legend"
        >
          <div
            v-for="item in legend"
            :key="item.name"
            class="legend-item"
            :class="{ deselect: item.deselect }"
            @click="item.deselect = !item.deselect"
          >
            <div
              class="legend-rect"
              :style="{ backgroundColor: item.color }"
            />
            <div class="legend-name">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import BaseEchart from '@/components/base-echarts'

  import { useStore } from 'vuex'
  import utils from '@/hooks/utils'
  import { computed } from '@vue/runtime-core'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  const props = defineProps({
    date: {
      type: String,
      default: '-'
    },
    dateType: {
      type: String,
      default: '年'
    },
    showDrop: {
      type: Boolean,
      default: false
    },
    config: {
      type: Array,
      default: () => []
    },
    showLegend: {
      type: Boolean,
      default: true
    }
  })

  const legend = ref([])

  const newConfig = computed(() => {
    return props.config.filter((item) => {
      const fd = legend.value.find((obj) => obj.name === item.name)
      return fd && !fd.deselect
    })
  })

  const getEndData = (i, n) => {
    let data = 0
    for (let k = 0; k < i; k++) {
      data += Number((newConfig.value[k]?.data[n] && newConfig.value[k]?.data[n][1]) || 0)
    }
    return data
  }

  const option = computed(() => {
    const fontSize = store.getters.rootFontSize
    let series = []
    const barWidth = 0.22 * fontSize
    let unit = ''
    // const unit = newConfig.value[0]?.unit || ''
    newConfig.value.forEach((item, i) => {
      const colorArr = item.colorArray
      unit = item.unit
      const color = {
        type: 'linear',
        x: 0,
        x2: 0,
        y: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: colorArr[0]
          },
          {
            offset: 0.1,
            color: colorArr[0]
          },
          {
            offset: 0.5,
            color: colorArr[1]
          },
          {
            offset: 1,
            color: colorArr[2]
          }
        ]
      }
      console.log(item)
      series = [
        ...series,
        {
          z: 1,
          name: `${item.name || ''}_bar`,
          type: 'bar',
          stack: 'body',
          barWidth: barWidth,
          barGap: '-100%',
          data: item.data,
          itemStyle: {
            color: color
          }
        },
        {
          z: 4,
          name: `${item.name || ''}_line`,
          type: 'bar',
          stack: 'line',
          barWidth: barWidth,
          barGap: '-100%',
          data: item.data,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              x2: 1,
              y: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: colorArr[0]
                },
                {
                  offset: 0.45,
                  color: colorArr[0]
                },
                {
                  offset: 0.5,
                  color: colorArr[colorArr.length - 1]
                },
                {
                  offset: 0.55,
                  color: colorArr[0]
                },
                {
                  offset: 1,
                  color: colorArr[0]
                }
              ]
            }
          }
        },
        {
          z: 2,
          name: item.name || '',
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: item.data.map((obj, n) => {
            return {
              value: [obj[0], Number([obj[1] || 0]) + getEndData(i, n)],
              itemStyle: Number(obj[1])
                ? {
                  borderWidth: 2,
                  color: colorArr[colorArr.length - 2]
                }
                : {
                  color: 'transparent'
                },
              symbol: Number(obj[1]) ? 'diamond' : 'none'
            }
          }),
          symbolOffset: [0, '-50%'],
          symbolSize: [barWidth, 0.08 * fontSize],
          tooltip: {
            show: false
          }
        },
        {
          z: 5,
          name: item.name || '',
          type: 'pictorialBar',
          symbolPosition: i ? 'end' : 'start',
          data: item.data.map((obj, n) => {
            return {
              value: [obj[0], getEndData(i, n), i],
              itemStyle: Number(obj[1])
                ? {
                  borderWidth: 2,
                  color: colorArr[colorArr.length - 2]
                }
                : {
                  color: 'transparent'
                },
              symbol: Number(obj[1]) ? 'diamond' : 'none'
            }
          }),
          symbolOffset: [0, i ? '-50%' : '50%'],
          symbolSize: [barWidth, 0.08 * fontSize],
          tooltip: {
            show: false
          }
        }
      ]
    })
    return {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        trigger: 'axis',
        formatter (p) {
          const arr = Array.isArray(p) ? p : [p]
          const name = (p[0] && p[0].name) || ''
          let str = ''
          arr.forEach((item) => {
            if (item.seriesType === 'bar' && item.seriesName.includes('_bar')) {
              str += `
            <div class="tip-row">
              <span class="tip-title">${item.seriesName.split('_bar')[0]}：</span>
              <span class="tip-data">${formatNumStr(item.data[1]) || '-'}${unit}</span>   
            </div> 
          `
            }
          })
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <div class="area-name">${name}</div>
            ${str}
          </div>
        `
        }
      },
      grid: {
        top: 0.4 * fontSize,
        left: 0.1 * fontSize,
        right: 0.1 * fontSize,
        bottom: 0.1 * fontSize,
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
          fontSize: 0.14 * fontSize,
          interval: 0
        }
      },
      yAxis: {
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
          fontSize: 0.16 * fontSize
        },
        minInterval: 1,
        splitNumber: 4
      },
      legend: {
        show: false
      },
      series: series
    }
  })

  watch(
    () => props.config,
    () => {
      legend.value = props.config.map((item, i) => {
        const colorArr = item.colorArray
        return {
          name: item.name,
          icon: 'rect',
          color: colorArr[colorArr.length - 1],
          itemStyle: {
            color: colorArr[colorArr.length - 1]
          }
        }
      })
    },
    {
      deep: true,
      immediate: true
    }
  )
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .24rem .24rem .1rem;

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

  .chart-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;

    .legend-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .legend {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }

      .legend-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-right: .2rem;
        cursor: pointer;

        &:last-of-type {
          margin-right: 0;
        }

        &.deselect {
          .legend-rect {
            background-color: rgba(255,255,255,.6) !important;
          }

          .legend-name {
            color: rgba(255,255,255,.6);
          }
        }

        .legend-rect {
          width: .08rem;
          height: .08rem;
          margin-right: .08rem;
        }

        .legend-name {
          color: #fff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .22rem;
        }
      }

      .unit {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-style: normal;
        font-weight: 400;
        line-height: .22rem;
      }
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

      .area-name {
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }

      .tip-row {
        display: flex;
        align-items: center;
        height: .22rem;
      }

      .tip-title {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }

      .tip-data {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }
    }
  }
}
</style>
