<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-07 16:43:56
 * @LastEditTime: 2022-12-15 09:39:49
 * @FilePath: \traffic-web\src\views\transportation\airport\components\aerobat-month-change.vue
 * @Description: FilePath
-->
<template>
  <div class="aerobat-wrapper">
    <div class="top">
      <span class="time">
        {{ data.compareData?.date || '-' }}
        <DataTypeBtn
          type="日"
          :date="data.compareData?.date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="total-info">
      {{ formatNumStr(data.compareData?.time) }}累计
      <div class="total">
        {{ data.compareData?.data }}{{ unit }}
      </div>
      同比去年
      <div class="compare-data">
        {{ data.compareData?.compare || '-' }}%
      </div>
      <svg-icon
        v-if="Number(data.compareData?.compare) && !Number.isNaN(Number(data.compareData?.compare))"
        :icon-class="Number(data.compareData?.compare) < 0 ? 'drop' : 'rise'"
        style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem"
      />
    </div>
    <div class="chart-wrapper">
      <div
        v-show="unit"
        class="unit"
      >
        单位：{{ unit || '-' }}
      </div>
      <base-echart :option="option" />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import BaseEchart from '@/components/base-echarts'
  import { useStore } from 'vuex'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({})
    },
    unit: {
      type: String,
      default: ''
    },
    dataName: {
      type: String,
      default: ''
    },
    compareName: {
      type: String,
      default: ''
    }
  })

  const newData = computed(() => {
    const dt = props.data.data
    dt.sort((a, b) => (moment(new Date(a.month)).isAfter(moment(new Date(b.month))) ? 1 : -1))
    return dt.map((item) => [`${item.year}-${item.month}`, item.sum_numerical])
  })

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
          let str = ''
          param.forEach((item) => {
            str += `
            <div class="tip-data">
              <span>${item.name}：</span>
              <span>${formatNumStr(item.value[1])}${props.unit}</span>
            </div>
          `
          })
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            ${str}
          </div>
        `
        }
      },
      grid: {
        top: 0.5 * fontSize,
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
        boundaryGap: false,
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
        // name: props.unit ? `单位：${props.unit}` : '',
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
        // minInterval: 2,
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
  })
</script>

<style lang="less" scoped>
.aerobat-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 0.2rem;

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

  .total-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 0.28rem;
    color: #fff;
    font-family: 'PingFang SC';
    font-size: 0.14rem;
    font-weight: 400;
    background: rgba(55, 97, 232, 0.12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, 0.195203), inset 0 0 35px rgba(#294cb3, 0.79);
    border: 1.4px solid rgba(0, 133, 255, 0.78);
    border-radius: 74px;
    .total {
      margin: 0 0.2rem 0 0.08rem;
      color: #00fff9;
    }

    .compare-data {
      margin-left: 0.08rem;
      color: #ff4d21;
    }
  }

  .chart-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;

    .unit {
      position: absolute;
      top: 0.1rem;
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

      .tip-title {
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
