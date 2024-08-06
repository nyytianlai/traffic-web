<template>
  <div class="accident-type-wrapper">
    <div class="chart-wrapper">
      <div class="chart">
        <base-echart
          ref="chart"
          :option="option"
        />
        <div class="center-info">
          <div class="data">
            {{ formatNumStr(total) || '-' }}
          </div>
          <div class="unit">
            件
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
              <span>{{ formatNumStr(item.value) || '-' }}</span>
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
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    total: {
      type: Number,
      default: undefined
    },
    config: {
      type: Array,
      default: () => ([])
    },
    totalName: {
      type: String,
      default: ''
    }
  })

  const chart = ref()

  const option = computed(() => {
    return {
      series: [
        {
          type: 'pie',
          startAngle: 200,
          radius: ['40%', '65%'],
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
          data: props.config
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
          font-size: .28rem;
          font-weight: @bold;
          line-height: .32rem;
          letter-spacing: 0;
        }

        .unit {
          color: #fff;
          font-family: PingFang SC;
          font-size: .16rem;
          font-weight: @regular;
          letter-spacing: 0;
        }
      }
    }

    .right-legend {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
      flex: 0 0 3.6rem;
      height: fit-content;

      row-gap: .12rem;

      .legend-item {
        display: flex;
        flex-flow: row nowrap;
        flex: 0 0 50%;
        overflow: hidden;
        padding-right: .2rem;

        .legend-icon {
          flex: 0 0 .18rem;
          margin-right: .12rem;

          img {
            width: .18rem;
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
              font-size: .24rem;
              font-weight: 500;
              line-height: .34rem;
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
            font-size: .16rem;
            font-weight: 500;
            line-height: 22px;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
