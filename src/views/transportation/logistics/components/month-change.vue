<template>
  <div class="wrapper">
    <div class="top">
      <span>实时</span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-wrapper">
      <base-echart
        :option="option"
      />
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import { watch } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  const store = useStore()
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const xAxis = new Array(19).fill(1).map((i, n) => 6 + n)
  const config = [
    {
      name: '实时客流',
      color: '#54B5FF',
      data: xAxis.map((i, n) => (Math.random() * 100).toFixed(1))
    },
    {
      name: '上周同期',
      color: '#F9E900',
      data: xAxis.map((i, n) => (Math.random() * 100).toFixed(1))
    }
  ]

  const option = computed(() => {
    const fontSize = store.getters.rootFontSize
    const series = []
    config.forEach((item, i) => {
      const serie = {
        name: item.name,
        color: item.color,
        type: 'line',
        smooth: !i ? 0.5 : false,
        data: item.data,
        symbol: !i ? 'none' : 'circle',
        lineStyle: {
          color: item.color
        },
        areaStyle: i ? undefined : {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(84, 181, 255, 0)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(84, 181, 255, 0.6)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
      series.push(serie)
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
              <span>${item.seriesName}：</span>
              <span>${item.value}</span>
            </div>
          `
          })
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <div class="tip-title">${title || ''}:00</div>
            ${str}
          </div>
        `
        }
      },
      grid: {
        top: 0.5 * fontSize,
        left: 0.1 * fontSize,
        right: 0.1 * fontSize,
        bottom: 0 * fontSize,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        boundaryGap: false,
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
          // color: '#54B5FF',
          color: '#fff',
          interval: 1,
          fontSize: 0.16 * fontSize
        },
        data: xAxis
      },
      yAxis: {
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 0.16 * fontSize,
          padding: [4, 4, 0.1 * fontSize, 0.26 * fontSize]
        },
        name: '单位：万人次',
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
        splitNumber: 3
      },
      legend: {
        show: true,
        right: 0,
        top: 0,
        itemGap: 0.12 * fontSize,
        textStyle: {
          color: '#fff',
          fontSize: 0.16 * fontSize
        },
        borderRadius: 0,
        align: 'left'
      },
      series
    }
  })

  watch(() => props.data, () => {
    console.log(props.data)
  }, {
    deep: true,
    immediate: true
  })

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
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

  .chart-wrapper {
    flex: 1;
    min-height: 0;
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
