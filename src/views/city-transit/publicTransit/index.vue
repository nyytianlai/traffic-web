<template>
  <div class="public-transit-wrapper">
    <div class="content-item">
      <base-panel title="日客流趋势">
        <DayTransitTrend
          :max-date="maxDate"
          :last-date="lastDate"
        />
      </base-panel>
    </div>
    <div class="content-item">
      <base-panel title="客流统计">
        <TransitStatic
          :max-date="maxDate"
          :last-date="lastDate"
        />
      </base-panel>
    </div>
    <div class="content-item">
      <base-panel title="月客流趋势">
        <MonthTransitTrend
          :max-date="maxDate"
          :last-date="lastDate"
        />
      </base-panel>
    </div>
    <div class="content-item">
      <base-panel title="客流占比">
        <TransitRate
          :max-date="maxDate"
          :last-date="lastDate"
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
  import DayTransitTrend from './components/day-transit-trend.vue'
  import TransitStatic from './components/transit-static.vue'
  import MonthTransitTrend from './components/month-transit-trend.vue'
  import TransitRate from './components/transit-rate.vue'
  import Api from '@/api/modules/city-transit/publicTransit.js'
  const maxDate = ref()
  const lastDate = ref()
  const getMaxDate = async () => {
    const res = await Api.maxYearAndMonth()
    if (res && res[0]) {
      maxDate.value = res[0].max_report_date
      lastDate.value = res[0].last_report_date
    }
  }
  onMounted(() => {
    getMaxDate()
  })
</script>

<style lang="less" scoped>
.public-transit-wrapper {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;

  gap: .24rem;
  grid-template-columns: 1fr 6.16rem;
  grid-template-rows: 4.72rem 1fr;

  .content-item {
    min-width: 0;
    min-height: 0;
  }

  .data-from {
    position: absolute;
    width: 100%;
    bottom: -0.36rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    // padding: 0 .6rem;
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
