<template>
  <div class="panel-wrapper">
    <div class="top">
      <span class="time">
        {{ config.date }}
        <DataTypeBtn
          type="日"
          :date="config.date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="total-info">
      <img :src="config.icon">
      <div class="right-info">
        <div
          class="info-item"
          style="margin-bottom: 0.08rem"
        >
          <div class="name">
            本月数
          </div>
          <div class="card-data">
            <span class="data">{{ formatNumStr(config.monthData) }}</span>
            <span class="unit">{{ config.unit }}</span>
            <div class="compare-info">
              同比 {{ formatNumStr(config.monthCompare) }}%
              <svg-icon
                v-if="
                  Number(formatNumStr(config.monthCompare)) &&
                    !Number.isNaN(Number(formatNumStr(config.monthCompare)))
                "
                :icon-class="Number(formatNumStr(config.monthCompare)) < 0 ? 'drop' : 'rise'"
                style="font-size: 0.12rem; width: 0.12rem"
              />
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="name">
            自本年初累计
          </div>
          <div class="card-data">
            <span class="data">{{ formatNumStr(config.yearData) }}</span>
            <span class="unit">{{ config.unit }}</span>
            <div class="compare-info">
              同比 {{ formatNumStr(config.yearCompare) }}%
              <svg-icon
                v-if="
                  Number(formatNumStr(config.yearCompare)) &&
                    !Number.isNaN(Number(formatNumStr(config.yearCompare)))
                "
                :icon-class="Number(formatNumStr(config.yearCompare)) < 0 ? 'drop' : 'rise'"
                style="font-size: 0.12rem; width: 0.12rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="total">
        <div class="total-data">
          {{ formatNumStr(config.total) }}
        </div>
        <div class="total-unit">
          {{ config.unit }}
        </div>
      </div>
      <base-chart
        ref="chartRef"
        :option="options"
        @echartsHover="echartsHover"
        @echartsOut="echartsOut"
      />
    </div>
  </div>
</template>

<script setup>
  import BaseChart from '@/components/base-echarts'
  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  import * as echarts from 'echarts/lib/echarts'
  import { useStore } from 'vuex'
  import { nextTick } from 'vue'
  const store = useStore()
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({
        chartConfig: []
      })
    },
    data: {
      type: Array,
      default: () => []
    }
  })
  const chartRef = ref()
  const timer = ref()
  const options = computed(() => {
    const pieConfig = props.config.chartConfig.map((item) => {
      const fontSize = store.getters.rootFontSize
      const scale = n => n / 100 * fontSize
      const percent = item.pct
      return {
        name: item.name,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: utils.hex2Rgba(item.color, 0.7)
            },
            {
              offset: 0,
              color: utils.hex2Rgba(item.color, 0.0001)
            }
          ]),
          borderColor: utils.hex2Rgba(item.color, 1),
          borderWidth: 1
        },
        label: {
          show: false,
          alignTo: 'edge',
          formatter: `{name|{b}}\n{value|{c}}\n{value|${percent}%}`,
          // formatter: `{name|{b}}\n{value|{c} ${unit}}\n{value|${percent}%}`,
          minMargin: scale(5),
          edgeDistance: scale(10),
          lineHeight: scale(16),
          rich: {
            name: {
              fontSize: scale(14),
              color: '#fff',
              padding: [scale(20), 0, scale(7), 0]
            },
            value: {
              fontSize: scale(14),
              color: item.color,
              padding: [scale(26), 0, 0, 0]
            }
          }
        },
        labelLine: {
          length: 10,
          length2: 0,
          maxSurfaceAngle: 60,
          lineStyle: {
            color: item.color,
            cap: 'square'
          }
        },
        value: item.value,
        percentVl: item.pct,
        emphasis: {
          label: {
            show: true
          },
          labelLine: {
            lineStyle: {
              color: item.color
            }
          }
        }
      }
    })
    return {
      series: [
        {
          type: 'pie',
          startAngle: 20,
          radius: ['60%', '80%'],
          center: ['50%', '50%'],
          data: pieConfig,
          labelLayout: function (params) {
            const isLeft = params.labelRect.x < chartRef.value.chartInstance.getWidth() / 2
            const points = params.labelLinePoints
            if (!points) return
            points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
            return {
              labelLinePoints: points
            }
          }
        }
      ]
    }
  })

  const action = (next, prev) => {
    const chartInts = chartRef.value?.chartInstance
    if (!chartInts) return
    chartInts.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: prev
    })
    chartInts.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: next
    })
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      const newNext = next === props.config.chartConfig.length - 1 ? 0 : next + 1
      action(newNext, next)
    }, 2000)
  }

  const echartsHover = (param) => {
    clearTimeout(timer.value)
    const chartInts = chartRef.value?.chartInstance
    if (!chartInts) return
    chartInts.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: new Array(props.config.chartConfig.length).fill(1).map((i, n) => n)
    })
    chartInts.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: param.dataIndex
    })
  }

  const echartsOut = (param) => {
    clearTimeout(timer.value)
    const chartInts = chartRef.value?.chartInstance
    if (!chartInts) return
    chartInts.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: new Array(props.config.chartConfig.length).fill(1).map((i, n) => n)
    })
    // const newNext = param.dataIndex === props.config.chartConfig.length - 1 ? 0 : param.dataIndex + 1
    action(param.dataIndex, 0)
  }

  watch(
    () => options.value,
    () => {
      nextTick(() => {
        action(0, 0)
      })
    },
    {
      deep: true,
      immediate: true
    }
  )
</script>

<style lang="less" scoped>
.panel-wrapper {
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
    margin-bottom: .24rem;
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
      line-height: .22rem;
      letter-spacing: 0;

       > div {
        margin-left: .04rem;
      }
    }
  }

  .total-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .08rem;

    img {
      flex: 0 0 .8rem;
      height: .64rem;
      margin-right: .16rem;
    }

    .right-info {
      flex: 1;
      min-width: 0;

      .name {
        margin-bottom: .02rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 500;
        line-height: .22rem;
      }

      .card-data {
        display: flex;
        align-items: baseline;

        .data {
          margin-right: .08rem;
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .24rem;
          font-weight: @bold;
          line-height: .28rem;
          letter-spacing: 0;
        }

        .unit {
          color: #0ff;
          font-family: PingFang SC;
          font-size: .16rem;
          font-weight: @regular;
          letter-spacing: 0;
        }
      }

      .compare-info {
        margin-left: .08rem;
        color: #fff;
        font-family: PingFang SC;
        font-size: .16rem;
        font-weight: @regular;
        letter-spacing: 0;
        white-space: nowrap;
      }
    }
  }

  .chart-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;

    .total {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .total-data {
        color: #fff;
        font-family: DINCondensed-Bold;
        font-size: .3rem;
        font-weight: 700;
        line-height: .38rem;
        text-align: center;
      }

      .total-unit {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .12rem;
        font-weight: 400;
        line-height: .18rem;
        text-align: center;
      }
    }
  }
}
</style>
