<template>
  <div class="line-trend-wrapper">
    <base-echart :option="option" />
    <div class="unit">
      单位：万人次
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import { useStore } from 'vuex'
  import { SPRING_DATE } from '@/utils/constants.js'
  const store = useStore()
  const colorList = ['#F9E900', '#54B5FF', '#6362FF', '#00FFF9']
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const option = computed(() => {
    // const length = Math.max(...props.data.map(item => item.length)) - 1
    const series = props.data.map((item, i) => {
      return {
        color: colorList[i],
        type: 'line',
        smooth: false,
        symbol: 'none',
        lineStyle: {
          color: colorList[i]
        },
        name: item[0] && item[0].nf,
        data: item.map(obj => [obj.cyts, obj.zbz && Number(obj.zbz).toFixed(2), obj.nf])
      }
    })
    const fontSize = store.getters.rootFontSize

    return {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        trigger: 'axis',
        formatter (p) {
          const param = Array.isArray(p) ? p : [p]
          const title = param[0].axisValueLabel
          const date = SPRING_DATE[param[0].axisValue - 1] || ''
          let str = ''
          param.forEach(item => {
            str += `
            <div class="tip-data">
              <span>${item.seriesName}：</span>
              <span>${item.value[1]}万人次</span>
            </div>
          `
          })
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <div class="tip-title">春运第${title || ''}天（${date}）</div>
            ${str}
          </div>
        `
        }
      },
      grid: {
        top: 0.8 * fontSize,
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
          fontSize: 0.16 * fontSize,
          formatter: (p, index) => {
            const date = SPRING_DATE[index] || ''
            return `${date.slice(0, 2)}
${date.slice(2)}`
          },
          interval: 5
          // interval: (index, value) => {
          //   console.log(index, length, (!index || index === length) ? true : !(index % 5))
          //   return (!index || index === length) ? true : !(index % 5)
          // }
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
        right: 0.1 * fontSize,
        top: 0.05 * fontSize,
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
.line-trend-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .unit {
    position: absolute;
    top: .35rem;
    left: 0;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
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
