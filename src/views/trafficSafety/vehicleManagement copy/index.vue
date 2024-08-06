<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-12-13 11:16:21
 * @FilePath: \traffic-web\src\views\trafficSafety\vehicleManagement\index.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="left">
      <div><top-card :data="clglData" /></div>
      <div>
        <base-panel title="历年机动车变化趋势">
          <car-count />
        </base-panel>
      </div>
    </div>
    <div class="right">
      <div>
        <base-panel title="车辆类型">
          <car-type :data="clglData" />
        </base-panel>
      </div>
      <div>
        <base-panel title="车辆来源TOP10">
          <car-resource-rank :data="cllytopData" />
        </base-panel>
      </div>
    </div>
    <div class="data-from">
      <div>数据来源：深圳交警</div>
      <div>
        <svg-icon icon-class="datasources" />
        数据来源：深圳交警
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import TopCard from './components/top-card.vue'
  import CarType from './components/car-type.vue'
  import CarCount from './components/car-count.vue'
  import CarResourceRank from './components/car-resource-rank.vue'
  import { clgl, cllytop } from '@/api/modules/traffic-safety/vehicleManagement'
  // 车辆管理
  const clglData = ref([])
  const getclglData = () => {
    clgl().then(res => {
      clglData.value = res || []
    })
  }

  // 车辆来源top
  const cllytopData = ref([])
  const getcllytopData = () => {
    cllytop().then(res => {
      cllytopData.value = res || []
    })
  }

  // // 出入深车辆统计
  // const crscltjData = ref([])
  // const getcrscltjData = () => {
  //   crscltj().then(res => {
  //     crscltjData.value = res || []
  //   })
  // }

  onMounted(() => {
    getclglData()
    getcllytopData()
  // getcrscltjData()
  })
</script>
<style lang="less" scoped>
.wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 1fr 5.84rem;

   > div {
    min-height: 0;
  }

  .left {
    display: grid;

    grid-template-rows: 1.65rem 1fr;
    row-gap: .24rem;

     > div {
      min-height: 0;
    }
  }

  .right {
    display: grid;

    grid-template-rows: repeat(2, 1fr);
    row-gap: .24rem;

     > div {
      min-height: 0;
    }
  }

  .data-from {
    position: absolute;
    bottom: -0.36rem;
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
