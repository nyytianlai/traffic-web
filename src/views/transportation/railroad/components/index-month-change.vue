<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="年"
          :show-drop="false"
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

    <div class="radio-wrapper">
      <RadioGroup
        v-model:value="selectRadio"
        :color-full="false"
        :radio-list="radioList"
      />
    </div>
    <div class="chart-wrapper">
      <div
        v-show="unit"
        class="unit"
      >
        单位：{{ unit }}
      </div>
      <base-echart :option="option" />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import BaseEchart from '@/components/base-echarts'
  import RadioGroup from '@/components/radio-list'
  import { passengerMetricsMonthly } from '@/api/modules/transportation/railroad.js'
  import { useStore } from 'vuex'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const date = ref('-')
  const radioList = [
    {
      name: '客运',
      value: '1',
      unit: '万人次'
    },
    {
      name: '货运',
      value: '0',
      unit: '万吨'
    }
  ]

  const selectRadio = ref(radioList[0].value)

  const unit = computed(() => radioList.find(item => item.value == selectRadio.value)?.unit || '')

  const getData = async () => {
    const res = await passengerMetricsMonthly(Number(selectRadio.value))
    date.value = res[0]?.report_date
    newData.value = res
      .sort((a, b) =>
        moment(`${a.year}-${a.month}`).isAfter(moment(`${b.year}-${b.month}`)) ? 1 : -1
      )
      .map((item) => [`${item.year}-${item.month}`, item.numerical])
    getOption()
  }

  const newData = ref([])

  const option = ref({})
  const getOption = () => {
    const fontSize = store.getters.rootFontSize
    const name = radioList.find((item) => item.value === selectRadio.value)?.name || ''
    option.value = {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        trigger: 'axis',
        formatter (p) {
          const param = Array.isArray(p) ? p : [p]
          let str = ''
          param.forEach((item) => {
            str += `
            <div class="tip-data">
              <span>${item.name}：</span>
              <span>${formatNumStr(item.value[1])}${unit.value}</span>
            </div>
          `
          })
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <div class="tool-tip-title">${name}</div>
            ${str}
          </div>
        `
        }
      },
      grid: {
        top: 0.4 * fontSize,
        left: 0.1 * fontSize,
        right: 0.1 * fontSize,
        bottom: 0,
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
        boundaryGap: false,
        axisLabel: {
          color: '#fff',
          fontSize: 0.16 * fontSize,
          interval: 1,
          formatter: (vl, index) => {
            const arr = vl.split('-')
            return !index ? vl : arr[1]
          }
        }
      },
      yAxis: {
        type: 'value',
        // nameTextStyle: {
        //   color: '#fff',
        //   fontSize: 0.16 * fontSize,
        //   padding: [0.02 * fontSize, 4, 0.02 * fontSize, 0.5 * fontSize]
        // },
        // name: '单位：万人次',
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
        splitNumber: 2
      },
      series: [
        {
          color: '#54B5FF',
          type: 'line',
          smooth: 0.5,
          data: newData.value,
          symbol: 'none',
          lineStyle: {
            color: '#54B5FF'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(84, 181, 255, 0)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(84, 181, 255, 0.6)' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
  }

  watch(
    () => selectRadio.value,
    () => {
      getData()
    },
    {
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
  padding: 0.24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.12rem;
    .more {
      width: 0.16rem;
      height: 0.16rem;
      font-size: 0.16rem;
      cursor: pointer;
    }

    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: 0.16rem;
      font-weight: @regular;
      letter-spacing: 0;

      > div {
        margin-left: 0.04rem;
      }
    }
  }

  .radio-wrapper {
    height: 0.3rem;
  }

  .chart-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;

    .unit {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      font-family: 'PingFang SC';
      font-size: 0.16rem;
      font-style: normal;
      font-weight: 400;
      line-height: 0.22rem;
    }

    :deep(.tool-tip) {
      position: relative;
      padding: 0.12rem;
      background: rgba(0, 9, 45, 0.9);
      border: 1px solid rgba(84, 181, 255, 0.5);

      .dot {
        position: absolute;
        width: 0.06rem;
        height: 0.06rem;
        background: rgba(84, 181, 255, 0.5);

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

      .tool-tip-title {
        color: #54b5ff;
        font-family: 'PingFang SC';
        font-size: 0.16rem;
        font-weight: 400;
        line-height: 0.22rem;
      }

      .tip-data {
        color: #fff;
        font-family: 'PingFang SC';
        font-size: 0.16rem;
        font-weight: 400;
        line-height: 0.22rem;
      }
    }
  }
}
</style>
