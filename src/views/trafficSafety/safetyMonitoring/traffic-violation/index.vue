<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-11 09:49:53
 * @LastEditTime: 2022-11-22 09:02:06
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\traffic-violation\index.vue
 * @Description: FilePath
-->
<template>
  <div class="traffic-violation-wrapper">
    <div class="left">
      <div class="map-wrapper">
        <base-map
          :data="gqjtaqData"
          data-code="jtwzs"
          legend-name="交通违章数"
        />
      </div>
      <div class="trend">
        <base-panel title="案件趋势">
          <template #extra-title>
            <div
              class="history"
              @click="visible=true"
            >
              历年趋势
              <svg-icon
                icon-class="arrow-right"
                style="margin-left: 0.12rem; font-size: 0.12rem"
              />
            </div>
          </template>
          <accident-trend :data="ajqsData" />
        </base-panel>
      </div>
    </div>
    <div class="right">
      <div class="accident-count">
        <traffic-count :data="byjtsgJtwzData" />
      </div>
      <div class="accident-level">
        <base-panel title="案件来源">
          <accident-source :data="byjtsgJtwzData" />
        </base-panel>
      </div>
      <div class="accident-type">
        <base-panel title="违章行为分类">
          <accident-type :data="byjtsgJtwzData" />
        </base-panel>
      </div>
    </div>
  </div>
  <pop-ups
    v-model:value="visible"
    title="历年案件趋势"
    height="5.4rem"
  >
    <pop-history
      :ia-active="visible"
      data-code="jtwz"
    />
  </pop-ups>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import TrafficCount from './components/accident-count.vue'
  import AccidentTrend from './components/accident-trend.vue'
  import AccidentSource from './components/accident-source'
  import AccidentType from './components/accident-type.vue'
  import BaseMap from '../components/base-map.vue'
  import PopHistory from '../components/history.vue'
  import PopUps from '@/components/popUps'
  const visible = ref(false)
  defineProps({
    byjtsgJtwzData: {
      type: Array,
      default: () => ([])
    },
    ajqsData: {
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
.traffic-violation-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 1fr 5.84rem;

  .left {
    display: grid;
    min-height: 0;

    grid-template-rows: 1fr 3.32rem;
    row-gap: .24rem;

     > div {
      min-height: 0;
    }
  }

  .right {
    display: grid;
    min-height: 0;

    grid-template-rows: 1.32rem 2.98rem 1fr;
    row-gap: .24rem;

     > div {
      min-height: 0;
    }
  }
  .history {
    display: flex;
    align-items: center;
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    cursor: pointer;
  }
}
</style>
