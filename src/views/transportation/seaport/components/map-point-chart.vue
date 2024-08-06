<template>
  <div class="map-point-wrapper">
    <div class="corner left-top" />
    <div class="corner right-top" />
    <div class="corner left-bottom" />
    <div class="corner right-bottom" />
    <div class="title">
      {{ station || '-' }}
    </div>
    <div class="sub-title">
      <div class="sub-left">
        集装箱吞吐量
      </div>
      <div class="sub-right">
        {{ date }}
        <DataTypeBtn
          :show-drop="false"
          type="日"
          :date="date"
          style="margin-left: 0.04rem"
        />
      </div>
    </div>
    <div class="total-info">
      {{ totalTime }}累计
      <div class="total">
        {{ formatData('海港集装箱吞吐量') }}万标准箱
      </div>
      同比去年
      <div class="compare-data">
        {{ formatData('海港集装箱吞吐量同比去年') }}
      </div>
      <svg-icon
        v-if="
          Number(formatData('海港集装箱吞吐量同比去年')) &&
            !Number.isNaN(Number(formatData('海港集装箱吞吐量同比去年')))
        "
        :icon-class="Number(formatData('海港集装箱吞吐量同比去年')) < 0 ? 'drop' : 'rise'"
        style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem"
      />
    </div>
    <div class="chart-wrapper">
      <div class="unit">
        单位：标准箱
      </div>
      <BaseEcharts :option="option" />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import BaseEcharts from '@/components/base-echarts'
  import { jzxttlqxt } from '@/api/modules/transportation/seaport'
  import { useStore } from 'vuex'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    station: {
      type: String,
      default: ''
    },
    compareData: {
      type: Array,
      default: () => []
    }
  })

  const store = useStore()
  const date = computed(() =>
    jzxttlqxtData.value[0]?.ywsj ? jzxttlqxtData.value[0]?.ywsj : '-'
  )

  const totalTime = computed(() => {
    if (jzxttlqxtData.value[0]?.ywsj) {
      return `${moment(jzxttlqxtData.value[0].ywsj).format('YYYY')}年1-${moment(
        jzxttlqxtData.value[0]?.ywsj
      ).format('M')}月`
    } else {
      return '-'
    }
  })
  const config = reactive([
    {
      name: '今年',
      color: '#54B5FF',
      data: []
    },
    {
      name: '去年',
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
        symbol: 'none',
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
          param.forEach((item) => {
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
            <div class="tip-title">${title || ''}月</div>
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

          interval: 1,
          fontSize: 0.16 * fontSize
        }
      },
      yAxis: {
        type: 'value',
        // nameTextStyle: {
        //   color: '#fff',
        //   fontSize: 0.16 * fontSize,
        //   padding: [0.08 * fontSize, 4, 0.02 * fontSize, 0.8 * fontSize]
        // },
        // name: '单位：标准箱',
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

  const jzxttlqxtData = ref([])
  const getjzxttlqxt = () => {
    jzxttlqxt(props.station).then((res) => {
      jzxttlqxtData.value = res || []
    })
  }
  const formatData = (name) => {
    const fd = props.compareData.find((item) => item.zbmc === name)
    return jzxttlqxtData.value.length ? formatNumStr(fd?.zbz) || '-' : '-'
  }
  watch(
    () => props.station,
    () => {
      if (props.station) {
        getjzxttlqxt()
      } else {
        jzxttlqxtData.value = []
      }
    },
    {
      immediate: true
    }
  )

  watch(
    () => jzxttlqxtData.value,
    () => {
      config.forEach((item, i) => {
        item.data = []
        jzxttlqxtData.value.forEach((obj) => {
          if (!i && obj.sjwd.includes('2022')) {
            item.data.push([obj.sjwd.split('-')[1], obj.zbz])
          } else if (i && obj.sjwd.includes('2021')) {
            item.data.push([obj.sjwd.split('-')[1], obj.zbz])
          }
        })
      })
    },
    {
      deep: true,
      immediate: true
    }
  )
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
  .total-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: .4rem;
    padding: 0 .1rem;
    margin-top: .06rem;
    margin-bottom: .08rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .14rem;
    font-weight: 400;
    white-space: nowrap;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px rgba(#294cb3, .79);
    border: 1.4px solid rgba(0, 133, 255, .78);
    border-radius: 74px;
    .total {
      flex: 1;
      min-width: 0;
      color: #00fff9;
      text-align: center;
    }

    .compare-data {
      margin-left: .08rem;
      color: #ff4d21;
    }
  }
  .chart-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;

    .unit {
      position: absolute;
      top: .1rem;
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
