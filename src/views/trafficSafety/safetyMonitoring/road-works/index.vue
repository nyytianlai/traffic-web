<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-11 09:49:53
 * @LastEditTime: 2022-11-22 09:24:25
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\road-works\index.vue
 * @Description: FilePath
-->
<template>
  <div class="road-works-wrapper">
    <div class="top-map">
      <map-view :data="sgdwxqData" />
    </div>
    <div class="bottom">
      <div class="road-works">
        <base-panel title="道路施工">
          <road-works :data="byjtsgJtwzData" />
        </base-panel>
      </div>
      <div class="point-count">
        <base-panel title="施工点位统计">
          <work-point :data="gqjtaqData" />
        </base-panel>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import RoadWorks from './components/road-works.vue'
  import WorkPoint from './components/work-point.vue'
  import MapView from './components/map.vue'
  defineProps({
    byjtsgJtwzData: {
      type: Array,
      default: () => ([])
    },
    gqjtaqData: {
      type: Array,
      default: () => ([])
    },
    sgdwxqData: {
      type: Array,
      default: () => ([])
    }
  })
</script>

<style lang="less" scoped>
.road-works-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: 1fr 3.32rem;
  row-gap: .24rem;

  .top-map {
    min-height: 0;
  }

  .bottom {
    display: grid;

    column-gap: .24rem;
    grid-template-columns: 2.24rem 1fr;

     > div {
      min-width: 0;
      min-height: 0;
    }
  }
}
</style>
