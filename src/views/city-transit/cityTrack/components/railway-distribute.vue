<template>
  <div class="wrapper">
    <div class="top">
      <span>实时</span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="unit">
      单位：条
    </div>
    <div class="chart-wrapper">
      <div
        class="echart"
        :style="{height: `${0.5 * areas.length}rem`}"
      >
        <base-echart :option="option" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import { useStore } from 'vuex'
  const store = useStore()
  const areas = ['罗湖', '龙岗', '盐田', '光明', '南山', '福田', '坪山', '大鹏', '龙华', '宝安']
  const newData = ref([])
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const option = computed(() => {
    const colorArr = ['rgba(84, 181, 255, 0.9)', 'rgba(84, 181, 255, 0.4)', 'rgba(84, 181, 255, 0)']
    const triangle = ['#54B5FF', 'rgba(84, 181, 255, 0.5)']
    const fontSize = store.getters.rootFontSize
    const color = {
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
    const triangleColor = {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: triangle[0]
        },
        {
          offset: 1,
          color: triangle[1]
        }
      ]
    }
    const barWidth = 0.22 * fontSize
    return {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        formatter (p) {
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <span class="tip-title">${p?.name || ''}：</span>
            <span class="tip-data">${p?.value}条</span>  
          </div>
        `
        }
      },
      grid: {
        x: 0.6 * fontSize,
        x2: 0.4 * fontSize,
        y: 0.12 * fontSize,
        y2: 0.4 * fontSize
      },
      legend: {
        show: false
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontWeight: 500,
            fontSize: 0.16 * fontSize
          }
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
        }
      },
      yAxis: {
        type: 'category',
        // name: '单位：条',
        nameTextStyle: {
          color: '#fff'
        // fontSize: 0.16 * fontSize
        // padding: [4, 4, 0, 0.26 * fontSize]
        },
        data: areas,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 0.16 * fontSize
          }
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          z: 1,
          name: 'body',
          stack: 'value',
          type: 'bar',
          barWidth: barWidth,
          barGap: '-100%',
          data: newData.value,
          itemStyle: {
            color: color
          }
        },
        {
          z: 1,
          name: 'line',
          type: 'bar',
          barWidth: barWidth,
          barGap: '-100%',
          data: newData.value,
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
                  color: 'rgba(84, 181, 255, 0)'
                },
                {
                  offset: 0.45,
                  color: 'rgba(84, 181, 255, 0)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(84, 181, 255, 1)'
                },
                {
                  offset: 0.55,
                  color: 'rgba(84, 181, 255, 0)'
                },
                {
                  offset: 1,
                  color: 'rgba(84, 181, 255, 0)'
                }
              ],
              global: false
            }
          }
        },
        {
          z: 2,
          name: 'start',
          type: 'pictorialBar',
          data: newData.value.map((item, i) => {
            return {
              value: item,
              name: areas[i],
              itemStyle: Number(item) ? {
                borderWidth: 2,
                color: colorArr[0]
              } : {
                color: 'transparent'
              },
              symbol: Number(item) ? 'diamond' : 'none'
            }
          }),
          symbolOffset: ['-65%', 0],
          symbolSize: [0.08 * fontSize, barWidth],
          tooltip: {
            show: false
          }
        },
        {
          z: 3,
          name: 'end',
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: newData.value.map((item, i) => {
            return {
              value: item,
              name: areas[i],
              itemStyle: Number(item) ? {
                borderWidth: 2,
                color: triangleColor
              } : {
                color: 'transparent'
              },
              symbol: Number(item) ? 'diamond' : 'none'
            }
          }),
          symbolOffset: ['50%', 0],
          symbolSize: [0.08 * fontSize, barWidth],
          tooltip: {
            show: false
          }
        }
      ]
    }
  })

  watch(() => props.data, () => {
    newData.value = []
    areas.forEach(item => {
      const fd = props.data.find(obj => obj.xzqh.includes(item))
      newData.value.push(parseInt(fd?.dtxls))
    })
  }, {
    immediate: true,
    deep: true
  })
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 .24rem;
    margin-top: .24rem;
    margin-bottom: .06rem;
    .more {
      width: .16rem;
      height: .16rem;
      font-size: .16rem;
      cursor: pointer;
    }
    span {
      padding: .02rem .04rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .12rem;
      font-weight: 400;
      line-height: .17rem;
      background: #1e9b1c;
      border-radius: 2px;
    }
  }

  .unit {
    padding-left: .24rem;
    margin-top: .12rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-style: normal;
    font-weight: 400;
  }

  .chart-wrapper {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    padding-right: .24rem;
  }
}
</style>
<style lang="less">
.tool-tip {
  padding: 0.12rem;
  position: relative;
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
    font-family: 'PingFang SC';
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #54B5FF;
  }

  .tip-data {
    font-family: 'PingFang SC';
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #FFFFFF;
  }
}
</style>
