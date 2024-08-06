<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-12-15 09:47:55
 * @FilePath: \traffic-web\src\views\transportation\seaport\index.vue
 * @Description: FilePath
-->
<template>
  <div class="logistics-wrapper">
    <div class="left">
      <div>
        <base-panel title="港口客货运指标月度情况">
          <freight-month-info />
        </base-panel>
      </div>
      <div>
        <base-panel title="港口码头泊位情况">
          <dusk-info />
        </base-panel>
      </div>
      <div>
        <base-panel title="客货运指标月度变化">
          <index-month-change />
        </base-panel>
      </div>
    </div>
    <div class="map-wrapper">
      <map-view
        :data="hgzbData"
      />
    </div>
    <div class="right">
      <div>
        <base-panel title="港口集装箱吞吐量">
          <month-throughput />
        </base-panel>
      </div>
      <div>
        <base-panel title="吞吐量月度趋势">
          <month-throughput-change />
        </base-panel>
      </div>
      <div>
        <base-panel title="国际集装箱班轮航线">
          <InternationalThroughout />
        </base-panel>
      </div>
    </div>
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        市交通运输局
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import FreightMonthInfo from './components/freight-month-info.vue'
  import DuskInfo from './components/dusk-info.vue'
  import IndexMonthChange from './components/index-month-change.vue'
  import MonthThroughput from './components/month-throughput.vue'
  import MonthThroughputChange from './components/month-throughput-change.vue'
  // import MonthThroughputRank from './components/month-throughput-rank.vue'
  import MapView from './components/map'
  import InternationalThroughout from './components/international-throughout.vue'
  // import { kajcczgkzb } from '@/api/modules/transportation/logistics'
  import { gpsLocation } from '@/api/modules/transportation/overview.js'

  // 港口坐标
  const hgzbData = ref([])
  const getkajcczgkzbData = (type) => {
    gpsLocation('港口').then((res) => {
      hgzbData.value = (res || []).map(item => ({
        ...item,
        jd: item.lon,
        wd: item.lat
      }))
    })
  }

  onMounted(() => {
    getkajcczgkzbData()
  })
</script>

<style lang="less" scoped>
.logistics-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 4.32rem 1fr 4.32rem;

   > div {
    min-height: 0;
  }

  .left {
    display: grid;

    grid-template-rows: 2.38rem auto 1fr;
    row-gap: .2rem;

     > div {
      min-height: 0;
    }
  }

  .right {
    display: grid;

    grid-template-rows: auto 1fr auto;
    row-gap: .2rem;

     > div {
      min-height: 0;
    }
  }
}
.data-from {
  position: absolute;
    bottom: 0.2rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.6rem;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 .6rem;
   > div {
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .14rem;
    font-weight: 400;
    line-height: .2rem;
    text-transform: uppercase;
  }
}
</style>
