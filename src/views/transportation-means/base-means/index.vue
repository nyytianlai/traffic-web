<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-12-29 14:14:46
 * @FilePath: \traffic-web\src\views\transportation-means\base-means\index.vue
 * @Description: FilePath
-->
<template>
  <div class="transportation-means-wrapper">
    <div class="left">
      <div class="map-wrapper">
        <map-view
          :data="qspgjczxqData"
        />
      </div>
      <div class="base-means-distributed">
        <base-panel title="区域基础设施分布">
          <base-means-distributed />
        </base-panel>
      </div>
    </div>
    <div class="right">
      <base-panel title="基础设施">
        <base-means />
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
  import BaseMeans from './components/base-means.vue'
  import BaseMeansDistributed from './components/base-means-distributed.vue'
  import MapView from './components/map'
  import {
    jtssgk,
    tbsj,
    gpsLocation
  } from '@/api/modules/transportation-means'

  // 交通设施概况
  const jtssgkData = ref([])
  const getJssgk = () => {
    jtssgk().then((res) => {
      jtssgkData.value = res || []
    })
  }
  // 交通设施概况
  const tbsjData = ref([])
  const gettbsj = () => {
    tbsj().then((res) => {
      tbsjData.value = res || []
    })
  }

  // 桥隧坡公交场站详情
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

  onMounted(() => {
    getJssgk()
    gettbsj()
    // getgqjtssfb()
    // getqlsdgjcztj()
    getqspgjczxq()
  })
</script>

<style lang="less" scoped>
.transportation-means-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 1fr 7.84rem;

   > div {
    min-height: 0;
  }

  .left {
    display: grid;

    grid-template-rows: 1fr 3.32rem;
    row-gap: .24rem;

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
