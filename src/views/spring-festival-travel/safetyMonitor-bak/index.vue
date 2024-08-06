<template>
  <div class="spring-wrapper">
    <div class="top-select">
      <RadioList
        v-model:value="selectedRadio"
        :radio-list="radioList"
      />
    </div>
    <div class="content">
      <div class="left-wrapper">
        <div class="map-wrapper">
          <map-view :point-data="kajcczgkzbData" />
        </div>
        <div
          class="left-bottom"
          :class="{notSpring: !isSpring}"
        >
          <div
            v-show="isSpring"
            class="running-trend"
          >
            <base-panel title="站点客流TOP5">
              <passenger-top />
            </base-panel>
          </div>
          <div
            v-show="isSpring"
            class="busy-road-warning"
          >
            <base-panel title="拥堵路段预警">
              <busy-road-warning />
            </base-panel>
          </div>
          <div
            v-show="!isSpring"
            class="busy-road"
          >
            <base-panel title="历年每日高速路况运行趋势">
              <running-trend />
            </base-panel>
          </div>
        </div>
      </div>
      <div class="right-wrapper">
        <div class="spring-travel-info">
          <spring-travel-card
            :data="cycxqkData"
            :is-spring="isSpring"
          />
        </div>
        <div class="right-bottom">
          <send-arrived :data="cycxqkData" />
        </div>
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
  import RadioList from '@/components/radio-list/index'
  import BasePanel from '@/components/base-panel'
  import MapView from './components/map.vue'
  import RunningTrend from './components/running-trend.vue'
  import BusyRoadWarning from './components/busy-road-warning.vue'
  import SpringTravelCard from './components/spring-travel-card.vue'
  import SendArrived from './components/send-arrived.vue'
  import PassengerTop from './components/passenger-top.vue'
  import { cycxqk, kajcczgkzb } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import { onMounted } from '@vue/runtime-core'
  const isSpring = ref(false)
  const radioList = [
    {
      name: '春运总览',
      value: 'cyzl'
    },
    {
      name: '旅客流向',
      value: 'lklx'
    },
    {
      name: '重要枢纽',
      value: 'zysn'
    },
    {
      name: '综合运输',
      value: 'zhys'
    },
    {
      name: '公共交通',
      value: 'ggjt'
    }
  ]
  const selectedRadio = ref(radioList[0].value)
  // 春运出行情况
  const cycxqkData = ref([])
  const getCycxqk = () => {
    cycxqk().then(res => {
      cycxqkData.value = res || []
    })
  }

  // 口岸机场车站港口坐标
  const kajcczgkzbData = ref([])
  const getKajcczgkzb = () => {
    kajcczgkzb().then(res => {
      kajcczgkzbData.value = res || []
    })
  }

  onMounted(() => {
    getCycxqk()
    getKajcczgkzb()
  })
</script>

<style lang="less" scoped>
.spring-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: .22rem 1fr;
  row-gap: .24rem;

  .top-select {
    min-height: 0;
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

  .content {
    display: grid;
    min-height: 0;

    column-gap: .24rem;
    grid-template-columns: 1fr 4.32rem;

     > div {
      min-height: 0;
    }

    .left-wrapper {
      display: grid;

      grid-template-rows: 1fr 3.26rem;
      row-gap: .24rem;

       > div {
        min-height: 0;
      }

      .left-bottom {
        display: grid;

        column-gap: .24rem;
        grid-template-columns: 1fr 8.9rem;

        &.notSpring {
          grid-template-columns: 1fr;
        }

         > div {
          min-height: 0;
        }
      }
    }

    .right-wrapper {
      display: grid;

      grid-template-rows: 2.1rem 1fr;
      row-gap: .24rem;

       > div {
        min-height: 0;
      }
    }
  }
}
</style>
