<template>
  <div class="accident-type-wrapper">
    <div class="top">
      <span class="time">
        {{ total.date }}
        <DataTypeBtn
          type="日"
          :date="total.date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-wrapper">
      <div class="chart">
        <base-echart
          ref="chart"
          :option="option"
        />
        <div class="center-info">
          <div class="data">
            {{ total.value }}
          </div>
          <div class="unit">
            个
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
          <div class="legend-info">
            <div class="data">
              <span>{{ item.value || '-' }}</span>
              <span>{{ item.unit }}</span>
            </div>
            <div class="percent">
              {{ item.name }}：{{ item.percentVl || '-' }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  import { useStore } from 'vuex'

  import blueArc from '@/assets/images/blue-arc.png'
  import greenArc1 from '@/assets/images/green-arc1.png'
  import greenArc2 from '@/assets/images/green-arc2.png'
  import yellowArc from '@/assets/images/yellow-arc.png'
  import * as echarts from 'echarts'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    isActive: {
      type: Boolean,
      default: false
    }
  })

  const config = reactive([
    {
      name: '商业场所',
      dataIndex: 0,
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
      compareValue: '',
      unit: '个'
    },
    {
      name: '写字楼',
      dataIndex: 1,
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
      compareValue: '',
      unit: '个'
    },
    {
      name: '住宅小区',
      dataIndex: 2,
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
      compareValue: '',
      unit: '个'
    },
    {
      name: '其他',
      dataIndex: 2,
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
      compareValue: '',
      unit: '个'
    }
  ])

  const total = computed(() => {
    const fd = props.data.find(item => item.zbmc === '车辆类型')
    return { value: formatNumStr(fd?.zbz), date: fd?.ywsj ? moment(fd?.ywsj).format('YYYY-MM-DD') : '' }
  })
  const chart = ref()

  const option = computed(() => {
    const rootFontSize = store.getters.rootFontSize
    return {
      series: props.isActive ? [
        {
          type: 'pie',
          startAngle: 200,
          radius: [rootFontSize * 0.45, rootFontSize * 0.65],
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
      ] : []
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
    config.forEach(item => {
      const fd = props.data.find(obj => (obj.zbmc === item.name || obj.zbmc === item.dataName))
      const fdPercent = props.data.find(obj => (obj.zbmc === `${item.name}占比` || obj.zbmc === `${item.dataName}占比`))
      const fdCompare = props.data.find(obj => (obj.zbmc === `${item.name}同比去年` || obj.zbmc === `${item.dataName}同比去年`))
      item.value = fd?.zbz
      item.percentVl = fdPercent?.zbz
      item.compareValue = fdCompare?.zbz
    })
  }, {
    deep: true,
    immediate: true
  })
</script>

<style lang="less" scoped>
.accident-type-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 .24rem;
    margin-top: .24rem;
    margin-bottom: .06rem;
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
      letter-spacing: 0;

       > div {
        margin-left: .04rem;
      }
    }
  }

  .chart-wrapper {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    min-height: 0;

    .chart {
      position: relative;
      flex: 1;
      min-width: 0;

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
          font-size: .33rem;
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
      display: flex;
      flex-flow: column nowrap;

// justify-content: space-around;
      flex: 0 0 2.2rem;

      .legend-item {
        display: flex;
        flex-flow: row nowrap;
        overflow: hidden;
        margin-bottom: .1rem;

        &:last-of-type {
          margin-bottom: 0;
        }

        .legend-icon {
          flex: 0 0 .18rem;
          margin-right: .2rem;

          img {
            width: .18rem;
            height: .2rem;
          }
        }

        .legend-info {
          .data {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            span:first-of-type {
              margin-right: .04rem;
              color: #00fff9;
              font-family: "PingFang SC";
              font-size: .2rem;
              font-weight: 500;
              line-height: .28rem;
            }

            span:last-of-type {
              color: #00fff9;
              font-family: "PingFang SC";
              font-size: .16rem;
              font-weight: 400;
            }
          }

          .percent {
            color: #fff;
            font-family: "PingFang SC";
            font-size: .14rem;
            font-weight: 500;
            line-height: .2rem;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
