<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-08 11:03:21
 * @LastEditTime: 2022-12-09 16:52:36
 * @FilePath: \traffic-web\src\views\transportation-means\parking-resources\components\useinfo-3d-pie.vue
 * @Description: FilePath
-->
<template>
  <div class="pie-wrapper">
    <div class="chart-wrapper">
      <BaseEchart :option="option" />
    </div>
    <div class="legend-wrapper">
      <div
        v-for="item in config"
        :key="item.name"
        class="legend-item"
      >
        <div class="legend-icon">
          <img
            :src="require(`@/assets/images/${item.icon}`)"
            :draggable="false"
          >
        </div>
        <div class="legend-data">
          <div class="legend-cound">
            <div class="num">
              {{ item.percentVl }}
            </div>
            <div class="unit">
              %
            </div>
          </div>
          <div class="legend-percent">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import { getPie3D } from '@/hooks/chart'
  const props = defineProps({
    isActive: {
      type: Boolean,
      default: false
    }
  })
  const config = [
    {
      name: '30分钟以内',
      value: 75,
      percentVl: '72.80',
      itemStyle: {
        opacity: 0.5,
        color: '#0053FF'
      },
      icon: 'blue-arc.png'
    },
    {
      name: '30-60分钟',
      value: 47,
      percentVl: '11.42',
      itemStyle: {
        opacity: 0.5,
        color: '#00FF92'
      },
      icon: 'green-arc1.png'
    },
    {
      name: '1-2小时',
      value: 26,
      percentVl: '10.71',
      itemStyle: {
        opacity: 0.5,
        color: '#00FFF9'
      },
      icon: 'green-arc2.png'
    },
    {
      name: '2小时以上',
      value: 15,
      percentVl: '1.72',
      itemStyle: {
        opacity: 0.5,
        color: '#F9E900'
      },
      icon: 'yellow-arc.png'
    }
  ]
  // .sort((a, b) => a.value - b.value).map(item => ({
  //   ...item,
  //   value: Number(item.value) || 0
  // }))
  const option = ref({})
  watch(() => props.isActive, () => {
    if (props.isActive) {
      nextTick(() => {
        option.value = getPie3D(config, 0)
      })
    }
  }, {
    immediate: true
  })

</script>

<style lang="less" scoped>
.pie-wrapper {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;

  .chart-wrapper {
    flex: 1;
    min-width: 0;
  }

  .legend-wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    flex: 0 0 2rem;

    .legend-item {
      display: flex;
      flex-flow: row nowrap;
      margin-bottom: .08rem;

      &:last-of-type {
        margin-bottom: 0;
      }

      .legend-icon {
        flex: 0 0 .18rem;
        margin-right: .2rem;

        img {
          width: .18rem;
        }
      }
    }

    .legend-data {
      margin-bottom: .02rem;
      .legend-cound {
        display: flex;
        align-items: center;

        .num {
          margin-right: .04rem;
          color: #00fff9;
          font-family: "PingFang SC";
          font-size: .2rem;
          font-weight: 400;
          line-height: .28rem;
        }

        .unit {
          margin-right: .04rem;
          color: #00fff9;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .22rem;
        }
      }

      .legend-percent {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .14rem;
        font-weight: 500;
        line-height: .2rem;
      }
    }
  }
}
</style>
