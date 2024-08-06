<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-11 13:03:18
 * @LastEditTime: 2022-11-23 16:59:09
 * @FilePath: \traffic-web\src\views\spring-festival-travel\safetyMonitor\components\pie-trend.vue
 * @Description: FilePath
-->
<template>
  <div class="chart-wrapper">
    <div class="chart">
      <base-echart
        ref="chart"
        :option="option"
      />
      <div class="center-info">
        <div class="data">
          {{ centerData }}
        </div>
        <div class="unit">
          万人次
        </div>
      </div>
    </div>
    <div class="right-legend">
      <div
        v-for="item in config"
        :key="item.name"
        class="legend-item"
        @mouseover="handleHover(item)"
        @mouseout="handleOut(item)"
      >
        <div class="legend-icon">
          <img :src="item.icon">
        </div>
        <div class="percent">
          {{ item.name }}
        </div>
        <div class="data">
          <span>{{ formatNumStr(item.value) }}</span>
          <span>{{ item.unit }}</span>
        </div>
        <div class="percent">
          {{ item.percentVl }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts/lib/echarts'
  import BaseEchart from '@/components/base-echarts'
  import blueArc from '@/assets/images/blue-arc.png'
  import greenArc1 from '@/assets/images/green-arc1.png'
  import greenArc2 from '@/assets/images/green-arc2.png'
  import yellowArc from '@/assets/images/yellow-arc.png'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    centerData: {
      type: String,
      default: '发送'
    }
  })
  const chart = ref()
  const config = reactive(
    [
      {
        name: '铁路',
        dataName: 'tl',
        dataIndex: 2,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'rgba(0, 83, 255, 0.7)'
            },
            {
              offset: 0,
              color: 'rgba(0, 83, 255, 0.0001)'
            }
          ]),
          borderColor: 'rgba(0, 83, 255, 1)',
          borderWidth: 1
        },
        value: '',
        icon: blueArc,
        percentVl: '',
        unit: '万人次'
      },
      {
        name: '航空',
        dataName: 'jc',
        dataIndex: 0,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'rgba(0, 255, 249, 0.7)'
            },
            {
              offset: 0,
              color: 'rgba(0, 255, 249, 0.0001)'
            }
          ]),
          borderColor: 'rgba(0, 255, 249, 1)',
          borderWidth: 1
        },
        value: '',
        icon: greenArc1,
        percentVl: '',
        unit: '万人次'
      },
      {
        name: '公路',
        dataName: 'gl',
        dataIndex: 1,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'rgba(0, 255, 146, 0.7)'
            },
            {
              offset: 0,
              color: 'rgba(0, 255, 146, 0.0001)'
            }
          ]),
          borderColor: 'rgba(0, 255, 146, 1)',
          borderWidth: 1
        },
        value: '',
        icon: greenArc2,
        percentVl: '',
        unit: '万人次'
      },
      {
        name: '水路',
        dataName: 'sy',
        dataIndex: 3,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'rgba(249, 233, 0, 0.7)'
            },
            {
              offset: 0,
              color: 'rgba(249, 233, 0, 0.0001)'
            }
          ]),
          borderColor: 'rgba(249, 233, 0, 1)',
          borderWidth: 1
        },
        value: '',
        icon: yellowArc,
        percentVl: '',
        unit: '万人次'
      }
    ]
  )

  const option = computed(() => {
    return {
      series: [
        {
          type: 'pie',
          startAngle: 200,
          radius: ['65%', '85%'],
          center: ['50%', '50%'],
          // 取消显示饼图自带数据线条
          labelLine: {
            show: false
          },
          label: {
            show: false,
            position: 'center'
          },
          // 增加阴影效果
          itemStyle: {},
          data: config
        }
      ]
    }
  })

  const handleHover = item => {
    if (chart.value?.chartInstance) {
      chart.value.chartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: item.dataIndex
      })
    }
  }

  const handleOut = item => {
    if (chart.value?.chartInstance) {
      chart.value.chartInstance.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: item.dataIndex
      })
    }
  }

  watch(() => props.data, () => {
    nextTick(() => {
      const fd = props.data[0] || {}
      config.forEach(item => {
        item.value = Number(Number(fd[item.dataName]) && Number(fd[item.dataName]).toFixed(2)) || 0
        item.percentVl = (fd[`${item.dataName}zb`] && Number(fd[`${item.dataName}zb`]).toFixed(2)) || '0'
      })
    })
  }, {
    deep: true,
    immediate: true
  })
</script>

<style lang="less" scoped>
.chart-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 0;

  .chart {
    position: relative;
    flex: 1;
    min-width: 0;
    height: 100%;

    .center-info {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      transform: translate(-50%, -50%);

      .data {
        color: #fff;
        font-family: DINCondensed-Bold;
        font-size: .26rem;
        font-weight: @bold;
        line-height: .32rem;
        letter-spacing: 0;
      }

      .unit {
        color: #fff;
        font-family: PingFang SC;
        font-size: .1rem;
        font-weight: @regular;
        letter-spacing: 0;
      }
    }
  }

  .right-legend {
    flex: 0 0 2.4rem;
    padding: .1rem 0;

    .legend-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      overflow: hidden;
      padding: .05rem 0;

      .legend-icon {
        flex: 0 0 .12rem;
        margin-right: .1rem;

        img {
          width: .12rem;
          height: .12rem;
        }
      }

      .data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        flex: 0 0 .9rem;
        margin: 0 .24rem;
        white-space: nowrap;

        span:first-of-type {
          margin-right: .04rem;
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .18rem;
          font-weight: 500;
          line-height: .22rem;
        }

        span:last-of-type {
          margin-left: .04rem;
          color: #00fff9;
          font-family: "PingFang SC";
          font-size: .12rem;
          font-weight: 400;
        }
      }

      .percent {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .12rem;
        font-weight: 400;
        line-height: 17px;
        white-space: nowrap;
      }
    }
  }
}
</style>
