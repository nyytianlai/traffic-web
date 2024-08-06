<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-03 16:40:13
 * @LastEditTime: 2022-12-08 12:25:41
 * @FilePath: \traffic-web\src\views\road\components\busyPie.vue
 * @Description: FilePath
-->
<template>
  <div class="busy-wrapper">
    <div class="left-pie">
      <BaseEchart :option="option" />
    </div>
    <div class="right-legend">
      <div
        v-for="item in config"
        :key="item.name"
        class="legend-item"
      >
        <div class="left-icon">
          <svg-icon
            :icon-class="item.icon"
          />
        </div>
        <div class="legend-info">
          <div class="long">
            {{ formatNumStr(item.value) }}<span>公里</span>
          </div>
          <div class="percent">
            {{ item.name }}：{{ item.percentVl }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import { reactive, watch } from '@vue/runtime-core'
  import 'echarts-gl'
  import utils from '@/hooks/utils'
  import { getPie3D } from '@/hooks/chart'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const config = reactive([
    {
      name: '主干路',
      icon: 'main-road',
      itemStyle: {
        opacity: 0.5,
        color: '#0053FF'
      }
    },
    {
      name: '次干路',
      icon: 'sub-road',
      itemStyle: {
        opacity: 0.5,
        color: '#00FF92'
      }
    },
    {
      name: '高速公路',
      otherName: '高速路',
      icon: 'high-speed',
      itemStyle: {
        opacity: 0.5,
        color: '#00FFF9'
      }
    },
    {
      name: '快速路',
      icon: 'speed',
      itemStyle: {
        opacity: 0.5,
        color: '#F9E900'
      }
    }
  ])
  const option = ref({})
  watch(() => props.data, () => {
    config.forEach(item => {
      const fd = props.data.find(obj => obj.zbmc === item.name || obj.zbmc === item.otherName)
      const fdZb = props.data.find(obj => obj.zbmc === `${item.name}占比` || obj.zbmc === `${item.otherName}占比`)
      item.value = Number(fd?.zbz || 0)
      item.percentVl = fdZb?.zbz
    })
  }, {
    deep: true,
    immediate: true
  })

  watch(() => config, () => {
    nextTick(() => {
      if (props.data.length) {
        option.value = getPie3D(config, 2)
      }
    })
  }, {
    deep: true
  })

</script>

<style lang="less" scoped>
.busy-wrapper {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;

  .right-legend {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    flex: 0 0 2.27rem;
    margin-left: .24rem;

    .legend-item {
      display: flex;
      flex-flow: row nowrap;
      .left-icon {
        flex: 0 0 .24rem;
        height: .24rem;
        font-size: .2rem;
      }

      .legend-info {
        .long {
          color: #00fff9;
          font-family: PingFang SC;
          font-size: .2rem;
          font-weight: @semibold;
          letter-spacing: 0;

          span {
            color: #00fff9;
            font-family: PingFang SC;
            font-size: .16rem;
            font-weight: @regular;
            letter-spacing: 0;
          }
        }

        .percent {
          color: #fff;
          font-family: PingFang SC;
          font-size: .16rem;
          font-weight: @medium;
          letter-spacing: 0;
        }
      }
    }
  }

  .left-pie {
    flex: 1;
    min-width: 0;
  }
}
</style>
