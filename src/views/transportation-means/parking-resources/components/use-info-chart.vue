<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-08 11:16:30
 * @LastEditTime: 2023-01-03 14:43:33
 * @FilePath: \traffic-web\src\views\transportation-means\parking-resources\components\use-info-chart.vue
 * @Description: FilePath
-->
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
      <div
        class="unit"
      >
        单位：%
      </div>
      <base-echart
        :option="option"
      />
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import { useStore } from 'vuex'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    isActive: {
      type: Boolean,
      default: false
    }
  })
  const store = useStore()

  const seriesData = ref([])

  const option = computed(() => {
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
          const title = p[0].axisValueLabel
          let str = ''
          param.forEach(item => {
            str += `
            <div class="tip-data">
              <span>${item.seriesName}</span>
              <span}">：${formatNumStr(item.value[1])}%</span>
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
          color: '#fff',
          interval: index => {
            return (!index || index === length - 1) ? true : !((index - 7) % 8)
          },
          fontSize: 0.16 * fontSize,
          formatter: v => {
            const arr = v.split('-')
            const arr2 = arr[1].split(':')
            return Number(arr2[0])
          }
        },
        showMinLabel: true,
        showMaxLabel: true,
        splitNumber: 13
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
        minInterval: 1,
        splitNumber: 2
      },
      legend: {
        show: false
      },
      series: props.isActive ? [
        {
          name: '饱和度',
          color: '#54B5FF',
          type: 'line',
          smooth: 0.5,
          data: seriesData.value,
          symbol: 'none',
          lineStyle: {
            color: '#54B5FF'
          }
        }
      ] : []
    }
  })

  watch(() => props.data, () => {
    const data = []
    props.data.forEach(obj => {
      data.push([obj.sjwd, obj.zbz * 100])
    })
    seriesData.value = data
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
    position: relative;
    flex: 1;
    min-height: 0;
    .unit {
      position: absolute;
      top: .06rem;
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
}
</style>
