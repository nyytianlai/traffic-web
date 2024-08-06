<template>
  <base-echart :option="option" />
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import { useStore } from 'vuex'
  const store = useStore()
  const colorList = ['#F9E900', '#54B5FF', '#6362FF', '#00FFF9']
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const option = computed(() => {
    const config = {}
    let length = 0
    props.data.forEach((item, i) => {
      config[item.year] = config[item.year] || {}
      config[item.year].name = item.year
      config[item.year].data = config[item.year].data || []
      config[item.year].data[i] = [item.day, item.zbz, item.zbdw]
    })
    const series = []
    const fontSize = store.getters.rootFontSize
    Object.keys(config).forEach((key, i) => {
      length = config[key].data.length - 1
      series.push({
      ...config[key],
      color: colorList[i],
      type: 'line',
      smooth: false,
      symbol: 'none',
      lineStyle: {
        color: colorList[i]
      }
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
              <span>${item.seriesName}：</span>
              <span>${item.value[1]}${item.value[2]}</span>
            </div>
          `
          })
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <div class="tip-title">春运第${title || ''}天</div>
            ${str}
          </div>
        `
        }
      },
      grid: {
        top: 0.4 * fontSize,
        left: 0.3 * fontSize,
        right: 0.2 * fontSize,
        bottom: 0.2 * fontSize,
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
          interval: (index, value) => {
            return (!index || index === length) ? true : !((index) % 3)
          }
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
        show: true,
        right: 0.2 * fontSize,
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
</script>

<style lang="less" scoped>
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
</style>
