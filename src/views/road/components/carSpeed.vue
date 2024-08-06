<template>
  <div class="spped-wrapper">
    <div class="chart-wrapper">
      <base-echart
        :option="option"
      />
    </div>
    <div class="info">
      <div>早高峰平均：{{ formatData('平均车速', '早高峰') }}</div>
      <div>晚高峰平均：{{ formatData('平均车速', '晚高峰') }}</div>
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts/index'
  import { computed, watch } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const store = useStore()
  const config = reactive([
    {
      name: '全市',
      otherName: '深圳市',
      color: '#00FFF9',
      data: []
    },
    {
      name: '中心区',
      otherName: '中心城区',
      color: '#1184FF',
      data: []
    }
  ])

  const option = computed(() => {
    const fontSize = store.getters.rootFontSize
    let length = 0
    const series = []
    config.forEach(item => {
      const serie = {
        name: item.name,
        color: item.color,
        type: 'line',
        smooth: 0.5,
        data: item.data,
        lineStyle: {
          color: item.color
        },
        symbol: 'none'
      }
      length = item.data.length
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
            const isQS = item.seriesName === '全市'
            str += `
            <div class="tip-data">
              <span class="${isQS ? 'betweenName' : ''}">${isQS ? '全市' : '中心城区'}</span>
              <span class="${isQS ? 'indentName' : ''}">：${item.value[1]}</span>
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
        left: 0.2 * fontSize,
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
          show: true,
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
        splitNumber: 13
      },
      yAxis: {
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 0.16 * fontSize,
          padding: [4, 4, 0.1 * fontSize, 0.8 * fontSize]
        },
        name: '单位：公里/小时',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 0.18 * fontSize
        },
        minInterval: 1,
        splitNumber: 2
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

  const formatData = (name, type) => {
    const fd = props.data.find(item => type ? (item.zbmc === name && item.sjwd === type) : item.zbmc === name)
    return fd?.zbz || '-'
  }

  watch(() => props.data, () => {
    config.forEach((item, i) => {
      item.data = []
      props.data.forEach(obj => {
        if (obj.kjwd === item.otherName && obj.sjwd !== '早高峰' && obj.sjwd !== '晚高峰') {
          item.data.push([obj.sjwd, obj.zbz])
        }
      })
    })
  }, {
    deep: true,
    immediate: true
  })

</script>

<style lang="less" scoped>
.spped-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .2rem .24rem .12rem .24rem;

  .chart-wrapper {
    flex: 1;
    min-height: 0;
  }

  .info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    flex: 0 0 .17rem;
    margin-top: .02rem;

     > div {
      color: #fff;
      font-family: "PingFang SC";
      font-size: .12rem;
      font-weight: 400;

      &:first-of-type {
        margin-right: .12rem;
      }
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

    .betweenName {
      letter-spacing: 0.34rem;
    }

    .indentName {
      margin-left: -0.34rem;
    }
  }
}
</style>
