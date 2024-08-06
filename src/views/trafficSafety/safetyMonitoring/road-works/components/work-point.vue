<template>
  <div class="trend-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="年"
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
      <div class="unit">
        单位：个
      </div>
      <base-echart :option="option" />
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import DataTypeBtn from '@/components/data-type-btn'
  import { useStore } from 'vuex'
  import moment from 'moment'
  const store = useStore()
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const areaList = ['福田区', '罗湖区', '盐田区', '南山区', '宝安区', '龙岗区', '坪山区', '光明区', '大鹏区', '前海合作区', '深汕合作区']

  const data = computed(() => {
    return areaList.map(item => {
      const fd = props.data.find(obj => obj.xzqh.includes(item))
      return fd?.dlsgs
    })
  })

  const date = computed(() => props.data[0]?.sbsj ? moment(props.data[0]?.sbsj).format('YYYY-MM-DD') : '')

  const option = computed(() => {
    const fontSize = store.getters.rootFontSize
    const colorArr = ['rgba(84, 181, 255, 0.2)', 'rgba(84, 181, 255, 0.4)', 'rgba(84, 181, 255, 0.9)']
    const triangle = ['#54B5FF', 'rgba(84, 181, 255, 0.5)']
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
        // {
        //   offset: 0.5,
        //   color: colorArr[0]
        // },
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
            <span class="tip-data">${p?.value}个</span>  
          </div>
        `
        }
      },
      grid: {
        top: 0.4 * fontSize,
        left: 0.3 * fontSize,
        right: 0.2 * fontSize,
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
          fontSize: 0.16 * fontSize
        },
        data: areaList
      },
      yAxis: {
        type: 'value',
        // nameTextStyle: {
        //   color: '#fff',
        //   fontSize: 0.16 * fontSize,
        //   padding: [0.02 * fontSize, 4, 0.02 * fontSize, 0.26 * fontSize]
        // },
        // name: '单位：个',
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
      series: [
        {
          z: 1,
          name: 'body',
          type: 'bar',
          barWidth: barWidth,
          barGap: '-100%',
          data: data.value,
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
          data: data.value,
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
              ]
            }
          }
        },
        {
          z: 2,
          name: 'end',
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: data.value.map((item, i) => {
            return {
              value: item,
              name: areaList[i],
              itemStyle: Number(item) ? {
                borderWidth: 2,
                color: colorArr[colorArr.length - 1]
              } : {
                color: 'transparent'
              },
              symbol: Number(item) ? 'diamond' : 'none'
            }
          }),
          symbolOffset: [0, '-50%'],
          symbolSize: [barWidth, 0.08 * fontSize],
          tooltip: {
            show: false
          }
        },
        {
          z: 3,
          name: 'start',
          type: 'pictorialBar',
          symbolPosition: 'start',
          data: data.value.map((item, i) => {
            return {
              value: 0,
              name: areaList[i],
              itemStyle: Number(item) ? {
                borderWidth: 2,
                color: triangle[0]
              } : {
                color: 'transparent'
              },
              symbol: Number(item) ? 'diamond' : 'none'
            }
          }),
          symbolOffset: [0, '65%'],
          symbolSize: [barWidth, 0.08 * fontSize],
          tooltip: {
            show: false
          }
        }
      ]
    }
  })
</script>

<style lang="less" scoped>
.trend-wrapper {
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
    .unit {
      position: absolute;
      top: 0;
      left: .24rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-style: normal;
      font-weight: 400;
      line-height: .22rem;
    }
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
