<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-12-15 11:31:26
 * @FilePath: \traffic-web\src\views\transportation\railroad\index.vue
 * @Description: FilePath
-->
<template>
  <div class="logistics-wrapper">
    <div class="left">
      <div>
        <base-panel title="月客货运输量">
          <month-count />
        </base-panel>
      </div>
      <!-- <div>
        <base-panel title="铁路资源">
          <railway-resource :data="khysgkData" />
        </base-panel>
      </div> -->
      <div>
        <base-panel title="客运指标月度变化">
          <index-month-change />
        </base-panel>
      </div>
    </div>
    <div class="map-wrapper">
      <map-view :data="jtsnData" />
    </div>
    <div class="right">
      <base-panel title="历年客货运运输量变化">
        <RightInfo />
      </base-panel>
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
  import MapView from './components/map'
  import MonthCount from './components/month-count.vue'
  // import RailwayResource from './components/railway-resource.vue'
  import IndexMonthChange from './components/index-month-change.vue'
  // import IndexChange from './components/index-change.vue'
  import RightInfo from './components/right-info.vue'
  // import TopRank from './components/top-rank.vue'
  import { khysgk } from '@/api/modules/transportation/logistics'
  import { gkttlhhczkylydpm } from '@/api/modules/transportation/seaport'
  import { gpsLocation } from '@/api/modules/transportation/overview.js'

  // 客货运输概况
  const khysgkData = ref([])
  const getKhysgk = () => {
    khysgk().then((res) => {
      khysgkData.value = res || []
    })
  }

  // 港口吞吐量和火车站客运量月度排名
  const gkttlhhczkylydpmData = ref([])
  const getgkttlhhczkylydpm = () => {
    gkttlhhczkylydpm('tl').then((res) => {
      gkttlhhczkylydpmData.value = (res || []).map((item, i) => ({
      ...item,
      index: i + 1
      }))
    })
  }

  // 铁路站点坐标
  const jtsnData = ref([])
  const getkajcczgkzbData = () => {
    gpsLocation('火车站').then((res) => {
      jtsnData.value = (res || []).map(item => ({
        ...item,
        jd: item.lon,
        wd: item.lat
      }))
    })
  }

  onMounted(() => {
    // getKhysgk()
    // getgkttlhhczkylydpm()
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

    grid-template-rows: auto 1fr;
    row-gap: .2rem;

     > div {
      min-height: 0;
    }
  }

  .right {
    width: 100%;
    height: 100%;
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
