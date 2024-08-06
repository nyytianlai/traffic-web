<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-08 11:03:21
 * @LastEditTime: 2022-12-14 15:35:54
 * @FilePath: \traffic-web\src\views\transportation\seaport\components\pop-pie.vue
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
              {{ item.value }}
            </div>
            <div class="unit">
              个
            </div>
          </div>
          <div class="legend-percent">
            {{ item.name }}：{{ item.percentVl }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import { getPie3D } from '@/hooks/chart'
  import { khysgk } from '@/api/modules/transportation/logistics'
  const props = defineProps({
    isActive: {
      type: Boolean,
      default: false
    }
  })
  const config = computed(() => {
    return [
      {
        name: '万吨级以上',
        value: 0,
        percentVl: '',
        itemStyle: {
          opacity: 0.5,
          color: '#0053FF'
        },
        icon: 'blue-arc.png'
      },
      {
        name: '集装箱专用',
        value: 0,
        percentVl: '',
        itemStyle: {
          opacity: 0.5,
          color: '#00FF92'
        },
        icon: 'green-arc1.png'
      },
      {
        name: '汽油化工',
        value: 0,
        percentVl: '',
        itemStyle: {
          opacity: 0.5,
          color: '#00FFF9'
        },
        icon: 'green-arc2.png'
      },
      {
        name: '客运',
        dataName: '码头客运',
        value: 0,
        percentVl: '',
        itemStyle: {
          opacity: 0.5,
          color: '#F9E900'
        },
        icon: 'yellow-arc.png'
      }
    ].map(item => {
      const fd = khysgkData.value.find(obj => (obj.zbmc === item.name || obj.zbmc === item.dataName))
      const fd2 = khysgkData.value.find(obj => (obj.zbmc === `${item.name}占比` || obj.zbmc === `${item.dataName}占比`))
      return {
      ...item,
      value: fd?.zbz ? Number(fd?.zbz) : 0,
      percentVl: fd2?.zbz || '-'
      }
    })
  })
  const option = ref({})
  // 客货运输概况
  const khysgkData = ref([])
  const getKhysgk = () => {
    khysgk().then(res => {
      khysgkData.value = res || []
    })
  }
  watch(() => props.isActive, () => {
    if (props.isActive) {
      getKhysgk()
    }
  }, { immediate: true })

  watch(() => config.value, () => {
    nextTick(() => {
      if (props.isActive) {
        option.value = getPie3D(config.value, 0)
      }
    })
  }, {
    deep: true
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
    flex: 0 0 2.9rem;

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
