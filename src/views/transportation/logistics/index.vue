<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-11-25 17:52:48
 * @FilePath: \traffic-web\src\views\transportation\logistics\index.vue
 * @Description: FilePath
-->
<template>
  <div class="logistics-wrapper">
    <div class="left">
      <div>
        <base-panel title="月客货运输量">
          <month-transportation />
        </base-panel>
      </div>
      <div class="index-change">
        <base-panel title="客货车辆情况">
          <car-monitor />
        </base-panel>
      </div>
    </div>
    <div class="map-wrapper">
      <map-view />
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
        道路交通运行指挥系统
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import MonthTransportation from './components/month-transportation.vue'
  import CarMonitor from './components/car-monitor.vue'
  import MapView from './components/map.vue'
  import RightInfo from './components/right-info.vue'

  onMounted(() => {
  })
</script>

<style lang="less" scoped>
.logistics-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 4.32rem 1fr 4.32rem;

  .left {
    display: grid;
    min-height: 0;

    grid-template-rows: auto 1fr;
    row-gap: .2rem;

     > div {
      min-height: 0;
    }
  }

  .right {
    min-height: 0;
  }

  .map-wrapper {
    min-height: 0;
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
