<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-16 14:59:22
 * @LastEditTime: 2023-01-03 11:18:57
 * @FilePath: \traffic-web\src\views\transportation-means\facilities-maintain\index.vue
 * @Description: FilePath
-->
<template>
  <div class="facilities-maintain-wrapper">
    <div class="top">
      <div><Map :data="qspgjczxqData" /></div>
      <div>
        <base-panel title="今年养护类型分布">
          <FacilityDistribute />
        </base-panel>
      </div>
    </div>
    <div class="bottom">
      <div>
        <base-panel title="养护事件年变化趋势">
          <affair-change :data="chartData.yhsjbhqs" />
        </base-panel>
      </div>
      <div>
        <base-panel title="养护类型分布年变化趋势">
          <type-change :data="chartData.yhlxfbbhqs" />
        </base-panel>
      </div>
      <!-- <div>
        <base-panel title="养护规模分布年变化趋势">
          <distribute-change :data="lnssyhmxData" />
        </base-panel>
      </div> -->
    </div>
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        交通运输
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  // import CardInfo from './components/card-info.vue'
  import FacilityDistribute from './components/facility-distribute.vue'
  import AffairChange from './components/affair-change.vue'
  import TypeChange from './components/type-change.vue'
  import Map from './components/map.vue'
  import {
    maintenanceEventAnnualVariationTrend,
    maintenanceTypeDistributionAnnualVariationTrend
  } from '@/api/modules/transportation-means/facilities-maintain'
  import {
    gpsLocation
  } from '@/api/modules/transportation-means'
  const chartData = reactive({
    yhsjbhqs: [],
    yhlxfbbhqs: []
  })
  const getData = async () => {
    const res = await Promise.allSettled([
      maintenanceEventAnnualVariationTrend(),
      maintenanceTypeDistributionAnnualVariationTrend()
    ])
    chartData.yhsjbhqs = res[0].value
    chartData.yhlxfbbhqs = res[1].value
  }
  const qspgjczxqData = ref([])
  const getqspgjczxq = () => {
    gpsLocation().then((res) => {
      qspgjczxqData.value = (res || []).map((item) => ({
      ...item,
      jd: +item.lon,
      wd: +item.lat,
      fl: item.des,
      mc: item.name
      }))
    })
  }
  getData()
  getqspgjczxq()
</script>

<style lang="less" scoped>
.facilities-maintain-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: 1fr 2.6rem;
  row-gap: .24rem;

   > div {
    min-width: 0;
    min-height: 0;
  }

  .top {
    display: grid;

    column-gap: .24rem;
    grid-template-columns: 2fr 1fr;

     > div {
      min-width: 0;
      min-height: 0;
    }
  }

  .bottom {
    display: grid;

    column-gap: .24rem;
    grid-template-columns: repeat(2, 1fr);

     > div {
      min-width: 0;
      min-height: 0;
    }
  }
  .data-from {position: absolute;
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
}
</style>
