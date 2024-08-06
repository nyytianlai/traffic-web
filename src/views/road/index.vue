<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-01 11:14:27
 * @LastEditTime: 2022-11-24 10:22:31
 * @FilePath: \traffic-web\src\views\road\index.vue
 * @Description: FilePath
-->
<template>
  <div class="road-wrapper">
    <div class="left-wrapper">
      <base-panel
        title="实时交通"
      >
        <real-traffic :data="ssjtYdlc" />
      </base-panel>
      <base-panel title="拥堵里程及占比">
        <busy-pie :data="ssjtYdlc" />
      </base-panel>
      <base-panel title="全市和中心城区平均车速">
        <car-speed :data="pjcs" />
      </base-panel>
    </div>
    <div class="map-wrapper">
      <map-view
        :video-point="jksp"
        :jtzs="jtzs"
      />
    </div>
    <div class="right-wrapper">
      <base-panel title="行政区实时运行指标">
        <area-status-bar :data="jtzs" />
      </base-panel>
      <base-panel title="各等级道路拥堵排名">
        <busy-rank
          :data="yddj"
          @change="changeType"
        />
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
  import RealTraffic from './components/realTraffic.vue'
  import BusyPie from './components/busyPie.vue'
  import CarSpeed from './components/carSpeed.vue'
  import AreaStatusBar from './components/areaStatusBar.vue'
  import BusyRank from './components/busyRank.vue'
  import MapView from './components/map.vue'
  import { jtydlcjzb, qshzxcqpjcs, xzqhjdjtzs, ldyddjmx, jkspfb } from '@/api/modules/road'
  // 实时交通 && 拥堵里程
  const ssjtYdlc = ref([])
  //  全市和中心城区平均车速
  const pjcs = ref([])
  //  行政区和街道交通指数
  const jtzs = ref([])
  // 路段拥堵等级明细
  const yddj = ref([])
  // 监控视频分布
  const jksp = ref([])
  const getJtydlcjzb = () => {
    jtydlcjzb().then(res => {
      ssjtYdlc.value = res || []
    })
  }

  const getQshzxcqpjcs = () => {
    qshzxcqpjcs().then(res => {
      pjcs.value = res || []
    })
  }

  const getXzqhjdjtzs = () => {
    xzqhjdjtzs().then(res => {
      jtzs.value = res || []
    })
  }
  const getLdyddjmx = (type = '') => {
    yddj.value = []
    ldyddjmx({ type }).then(res => {
      yddj.value = res || []
    })
  }
  const getJkspfb = () => {
    jkspfb().then(res => {
      jksp.value = res || []
    })
  }

  const changeType = type => {
    getLdyddjmx(type)
  }
  // onActivated(() => {
  //   getJtydlcjzb()
  //   getQshzxcqpjcs()
  //   getXzqhjdjtzs()
  //   getLdyddjmx()
  //   getJkspfb()
  // })

  onMounted(() => {
    getJtydlcjzb()
    getQshzxcqpjcs()
    getXzqhjdjtzs()
    getLdyddjmx()
    getJkspfb()
  })
</script>

<style lang="less" scoped>
.road-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 4.32rem 1fr 4.32rem;

  .left-wrapper {
    display: grid;
    min-height: 0;

    grid-template-rows: 2.05rem 1fr 2.71rem;
    row-gap: .24rem;

     > div {
      min-height: 0;
    }
  }

  .map-wrapper {
    min-height: 0;
  }

  .right-wrapper {
    display: grid;
    min-height: 0;

    grid-template-rows: 1fr 4.14rem;
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
