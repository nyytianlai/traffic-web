<template>
  <div class="wrapper">
    <div class="sub-info">
      {{ maxDate || '-' }}
      <DataTypeBtn
        :show-drop="false"
        type="日"
        :date="maxDate"
        style="margin-left: 0.04rem;"
      />
    </div>
    <div class="chart-wrapper">
      <div class="chart">
        <base-echart
          ref="chart"
          :option="option"
        />
        <div class="center-info">
          <div class="data">
            {{ formatNumStr(centerData) }}
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
            <span>{{ formatNumStr(item.percentVl) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import * as echarts from 'echarts/lib/echarts'
  import BaseEchart from '@/components/base-echarts'
  import blueArc from '@/assets/images/blue-arc.png'
  import greenArc1 from '@/assets/images/green-arc1.png'
  import greenArc2 from '@/assets/images/green-arc2.png'
  import yellowArc from '@/assets/images/yellow-arc.png'
  import utils from '@/hooks/utils'
  import Api from '@/api/modules/city-transit/publicTransit.js'
  const props = defineProps({
    maxDate: {
      type: String,
      default: ''
    },
    lastDate: {
      type: String,
      default: ''
    }
  })
  const formatNumStr = utils.formatNumStr
  const chart = ref()
  const centerData = ref('-')
  const config = reactive(
    [
      {
        name: '地铁客流',
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
        name: '常规公交客流',
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
        name: '巡游车客流',
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
        name: '网约车客流',
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
          radius: ['60%', '80%'],
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

  const getConfigData = async () => {
    const res = await Api.flowPercentage({
      report_date: props.maxDate
    })

    config.forEach(item => {
      const fd = res?.find(obj => item.name.includes(obj.category))
      item.value = fd?.sum_numerical || fd?.sum_numerical === 0 ? fd?.sum_numerical.toFixed(2) : null
      item.percentVl = fd?.percentage || fd?.percentage === 0 ? fd?.percentage.toFixed(2) : fd?.percentage
    })
    centerData.value = res[0]?.total_sum_numerical
  }

  watch(() => [props.maxDate, props.lastDate], () => {
    if (props.maxDate && props.lastDate) {
      getConfigData()
    }
  }, {
    immediate: true
  })

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: .2rem;
  .sub-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .12rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }
}
.chart-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  flex: 1;
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
        font-size: .52rem;
        font-weight: @bold;
        line-height: .32rem;
        letter-spacing: 0;
      }

      .unit {
        color: #fff;
        font-family: PingFang SC;
        font-size: .18rem;
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
        flex: 0 0 .15rem;
        margin-right: .1rem;

        img {
          width: .15rem;
          height: .15rem;
        }
      }

      .data {
        display: flex;
        flex-flow: row nowrap;
        align-items: end;
        flex: 0 0 .9rem;
        margin: 0 .24rem;
        white-space: nowrap;

        span:first-of-type {
          margin-right: .04rem;
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .18rem;
          font-weight: 700;
        }
      }

      .percent {
        flex: 0 0 1.1rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: 17px;
        white-space: nowrap;
      }
    }
  }
}
</style>
