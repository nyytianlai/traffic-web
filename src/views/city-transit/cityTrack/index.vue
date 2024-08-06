<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:53
 * @LastEditTime: 2022-12-14 09:34:23
 * @FilePath: \traffic-web\src\views\city-transit\cityTrack\index.vue
 * @Description: FilePath
-->
<template>
  <div class="city-track-wrapper">
    <div class="left">
      <div>
        <base-panel title="轨道设施">
          <track-measures :data="gdsskyqkData" />
        </base-panel>
      </div>
      <div class="railway-distribute">
        <base-panel title="各区地铁线路分布">
          <railway-distribute :data="gqgdgjczcqkData" />
        </base-panel>
      </div>
    </div>
    <div class="center">
      <map-view :point-data="gdzdmxData" />
    </div>
    <div class="right">
      <div>
        <base-panel title="今日客运">
          <passenger-transport :data="gdsskyqkData" />
          <template #extra-title>
            <div
              class="history"
              @click="visible=true"
            >
              更多
              <svg-icon
                icon-class="arrow-right"
                style="margin-left: 0.08rem; font-size: 0.12rem"
              />
            </div>
          </template>
        </base-panel>
      </div>
      <div>
        <base-panel title="轨道交通实时客运量趋势变化">
          <real-passenger-trend :data="gdjtSskylbhqsData" />
        </base-panel>
      </div>
      <div>
        <base-panel title="实时站点客流TOP10">
          <sites-rank />
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
    <pop-ups
      v-model:value="visible"
      title="线路客运"
      height="5.4rem"
    >
      <pop-more
        :ia-active="visible"
        :data="gxlkyqkData"
      />
    </pop-ups>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import TrackMeasures from './components/track-measures.vue'
  import RailwayDistribute from './components/railway-distribute.vue'
  import PassengerTransport from './components/passenger-transport.vue'
  import realPassengerTrend from './components/real-passenger-trend.vue'
  import sitesRank from './components/sites-rank.vue'
  import MapView from './components/map.vue'
  import PopMore from './components/pop-more.vue'
  import {
    gdsskyqk,
    gdjtgjczcsskylbhqs,
    gqgdgjczcqk,
    klldjrlt,
    gxlkyqk,
    gdzdmx
  } from '@/api/modules/city-transit/cityTrack'
  import PopUps from '@/components/popUps'
  const visible = ref(false)
  // 交通运行专题-城市公交-轨道设施、客运情况
  const gdsskyqkData = ref([])
  const getGdsskyqkData = () => {
    gdsskyqk().then((res) => {
      gdsskyqkData.value = res || []
    })
  }

  // 实时客运量变化趋势
  const gdjtSskylbhqsData = ref([])
  const getGdjtgjczcsskylbhqs = () => {
    gdjtgjczcsskylbhqs('dt').then((res) => {
      gdjtSskylbhqsData.value = res || []
    })
  }

  // 城市轨道-各区轨道公交出租车情况
  const gqgdgjczcqkData = ref([])
  const getGqgdgjczcqk = () => {
    gqgdgjczcqk().then((res) => {
      gqgdgjczcqkData.value = res || []
    })
  }

  // 交通运行专题-城市公交-城市轨道-客流量等级热力图
  const klldjrltData = ref([])
  const getKlldjrlt = () => {
    klldjrlt().then((res) => {
      klldjrltData.value = res || []
    })
  }

  // 交通运行专题-城市公交-城市轨道-轨道站点明细
  const gdzdmxData = ref([])
  const getgdzdmx = () => {
    gdzdmx().then((res) => {
      gdzdmxData.value = res || []
    })
  }
  // 交通运行专题-城市公交-城市轨道-各线路客运情况
  const gxlkyqkData = ref([])
  const getgxlkyqk = () => {
    gxlkyqk().then((res) => {
      gxlkyqkData.value = res || []
    })
  }

  onMounted(() => {
    getGdsskyqkData()
    getGdjtgjczcsskylbhqs()
    getGqgdgjczcqk()
    getKlldjrlt()
    getgxlkyqk()
    getgdzdmx()
  })
</script>

<style lang="less" scoped>
  .city-track-wrapper {
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;

    column-gap: 0.24rem;
    grid-template-columns: 4.32rem 1fr 4.32rem;

    .left {
      display: grid;
      height: 100%;
      min-height: 0;

      grid-template-rows: 3.5rem 1fr;
      row-gap: 0.24rem;

      .railway-distribute {
        min-height: 0;
      }
    }

    .right {
      display: grid;
      height: 100%;
      min-height: 0;

      grid-template-rows: 3rem auto 2.68rem;
      row-gap: 0.24rem;

      .history {
        display: flex;
        align-items: center;
        color: #54b5ff;
        font-family: 'PingFang SC';
        font-size: 0.16rem;
        font-weight: 400;
        cursor: pointer;
      }
    }

    .center {
      min-height: 0;
    }
    .data-from {
      position: fixed;
      bottom: 0.28rem;
      left: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 0.6rem;
      > div {
        color: #54b5ff;
        font-family: 'PingFang SC';
        font-size: 0.14rem;
        font-weight: 400;
        line-height: 0.2rem;
        text-transform: uppercase;
      }
    }
  }
</style>
