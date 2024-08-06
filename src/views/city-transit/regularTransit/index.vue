<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:53
 * @LastEditTime: 2022-12-07 15:10:50
 * @FilePath: \traffic-web\src\views\city-transit\regularTransit\index.vue
 * @Description: FilePath
-->
<template>
  <div class="regular-wrapper">
    <div class="left">
      <base-panel
        title="基础资源"
      >
        <base-resource :data="jczyxlyyData" />
      </base-panel>
    </div>
    <div class="center">
      <map-view
        :data="{
          gjzd: gjzdxqData,
          gjzydCdz: gjzydhcdzfbData
        }"
      />
    </div>
    <div class="right">
      <div class="right-top">
        <base-panel
          title="线路运营"
        >
          <road-operation :data="jczyxlyyData" />
        </base-panel>
      </div>
      <div class="right-bottom">
        <base-panel
          title="当日客运量趋势变化"
        >
          <passenger-trend :data="gdjtSskylbhqsData" />
        </base-panel>
      </div>
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
  import BaseResource from './components/base-resource.vue'
  import RoadOperation from './components/road-operation.vue'
  import PassengerTrend from './components/passenger-trend.vue'
  import MapView from './components/map'
  import { jczyxlyy, gjzdxq, gjzydhcdzfb, gjxlqk } from '@/api/modules/city-transit/regularTransit'
  import { gdjtgjczcsskylbhqs } from '@/api/modules/city-transit/cityTrack'
  // 基础资源、线路运营
  const jczyxlyyData = ref([])
  const getJczyxlyy = () => {
    jczyxlyy().then(res => {
      jczyxlyyData.value = res || []
    })
  }

  // 实时客运量变化趋势
  const gdjtSskylbhqsData = ref([])
  const getGdjtgjczcsskylbhqs = () => {
    gdjtgjczcsskylbhqs('gj').then(res => {
      gdjtSskylbhqsData.value = res || []
    })
  }

  // 公交线路情况
  // const gjxlqkData = ref([])
  // const getgjxlqk = () => {
  //   gjxlqk().then(res => {
  //     gjxlqkData.value = res || []
  //   })
  // }

  // 公交站点详情
  const gjzdxqData = ref([])
  const getgjzdxq = () => {
    gjzdxq().then(res => {
      gjzdxqData.value = (res || []).map(item => ({ ...item, legendType: '站点' }))
    })
  }

  // 公交专用道和充电桩分布
  const gjzydhcdzfbData = ref([])
  const getgjzydhcdzfb = () => {
    gjzydhcdzfb().then(res => {
      gjzydhcdzfbData.value = (res || []).map(item => ({ ...item, legendType: item.lx }))
    })
  }

  onMounted(() => {
    getJczyxlyy()
    getGdjtgjczcsskylbhqs()

    // getgjxlqk()
    getgjzdxq()
    getgjzydhcdzfb()

    gjxlqk()
  })
</script>

<style lang="less" scoped>
.regular-wrapper {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 4.32rem 1fr 4.32rem;

   > div {
    min-height: 0;
  }

  .right {
    display: grid;

    grid-template-rows: 4.97rem 1fr;
    row-gap: .24rem;

     > div {
      min-height: 0;
    }
  }
  .data-from {
    position: fixed;
    bottom: .28rem;
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
