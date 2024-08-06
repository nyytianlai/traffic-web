<template>
  <div class="map-point-wrapper">
    <div class="corner left-top" />
    <div class="corner right-top" />
    <div class="corner left-bottom" />
    <div class="corner right-top" />
    <div class="title">
      {{ station }}
      <DataTypeBtn
        :show-drop="false"
        type="实时"
        style="margin-left: 0.04rem;"
      />
    </div>
    <div class="sub-title">
      <div class="sub-left">
        实时客流
      </div>
      <div class="sub-right">
        2022-08-17
        <DataTypeBtn
          :show-drop="false"
          type="日"
          style="margin-left: 0.04rem;"
        />
      </div>
    </div>
    <div class="chart-wrapper">
      <BaseEcharts :option="option" />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import BaseEcharts from '@/components/base-echarts'
  import { sszdkl } from '@/api/modules/city-transit/cityTrack'
  import { useStore } from 'vuex'
  const props = defineProps({
    station: {
      type: String,
      default: ''
    }
  })

  const store = useStore()
  const config = reactive([
    {
      name: '客流量',
      color: '#F9E900',
      data: []
    }
  ])

  const option = computed(() => {
    const fontSize = store.getters.rootFontSize
    const series = []
    config.forEach((item, i) => {
      const serie = {
        name: item.name,
        color: item.color,
        type: 'line',
        smooth: 0.5,
        data: item.data,
        symbol: 'circle',
        lineStyle: {
          color: item.color
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
              <span>${item.seriesName}</span>
              <span}">：${item.value[1]}</span>
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
            return (!index || index === length - 1) ? true : !((index - 23) % 24)
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
        nameTextStyle: {
          color: '#fff',
          fontSize: 0.16 * fontSize,
          padding: [0.08 * fontSize, 4, 0.02 * fontSize, 0.8 * fontSize]
        },
        name: '单位：人次',
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
        splitNumber: 4
      },
      legend: {
        show: true,
        right: 0,
        top: 0.1 * fontSize,
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

  // 交通运行专题-城市公交-城市轨道-实时站点客流
  const sszdklData = ref([])
  const getSszdkl = () => {
    sszdkl(props.station).then(res => {
      sszdklData.value = res || []
    })
  }

  watch(() => props.station, () => {
    if (props.station) {
      getSszdkl()
    } else {
      sszdklData.value = []
    }
  }, {
    immediate: true
  })

  watch(() => sszdklData.value, () => {
    config.forEach((item, i) => {
      item.data = []
      sszdklData.value.forEach(obj => {
        if (obj.zbmc === item.name) {
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
.map-point-wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .12rem;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .5);

  .corner {
    position: absolute;
    width: .06rem;
    height: .06rem;
    background: rgba(84, 181, 255, .5);

    &.left-top {
      top: 0;
      left: 0;
    }

    &.left-bottom {
      bottom: 0;
      left: 0;
    }

    &.right-top {
      top: 0;
      right: 0;
    }

    &.right-bottom {
      right: 0;
      bottom: 0;
    }
  }

  .title {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .08rem;
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 500;
  }

  .sub-title {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    &::after {
      content: "";
      position: absolute;
      bottom: -.08rem;
      left: 0;
      width: 100%;
      height: .01rem;
      background-color: rgba(#fff, .2);
    }

    .sub-left {
      color: #fff;
      font-family: "PingFang SC";
      font-size: .14rem;
      font-weight: 400;
      line-height: .2rem;
    }

    .sub-right {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      line-height: .22rem;
    }
  }

  .chart-wrapper {
    flex: 1;
    min-height: 0;
  }
}
</style>
