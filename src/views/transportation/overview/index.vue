<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-12-15 11:31:26
 * @FilePath: \traffic-web\src\views\transportation\railroad\index.vue
 * @Description: FilePath
-->
<template>
  <div class="logistics-wrapper">
    <base-panel title="货运量">
      <panel :config="huoyunConfig" />
    </base-panel>
    <base-panel title="客运量">
      <panel :config="keyunliang" />
    </base-panel>
    <base-panel title="货物周转量">
      <panel :config="huowuzhouzhuan" />
    </base-panel>
    <div class="map-wrapper">
      <map-center :config="mapBottomConfig" />
    </div>
    <base-panel title="旅客周转量">
      <panel :config="lvkezhouzhuan" />
    </base-panel>
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        交通运输运营指标统计月报
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import panel from './components/panel.vue'
  import { dataConfig, mapBottomConfig } from './config'
  import huoyun from '@/assets/images/huoyun.png'
  import keyun from '@/assets/images/keyun.png'
  import MapCenter from './components/map-center.vue'
  import {
    indexStatistics,
    pieChartPercentage,
    currentMonthYearOnYear,
    cumulativeYearOnYear,
    pieChartPercentage2,
    currentMonthYearOnYear2,
    cumulativeYearOnYear2,
    pieChartPercentage3,
    currentMonthYearOnYear3,
    cumulativeYearOnYear3,
    pieChartPercentage4,
    currentMonthYearOnYear4,
    cumulativeYearOnYear4
  } from '@/api/modules/transportation/overview.js'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const getCardData = async () => {
    const res = await indexStatistics()
    mapBottomConfig.forEach((item) => {
      const fd = res.find((obj) => obj.name === item.name || obj.name === item.otherName)
      item.value = formatNumStr(fd?.numerical)
      item.date = fd?.report_date || '-'
    })
  }
  const huoyunConfig = reactive(dataConfig({ unit: '万吨', icon: huoyun }))
  const keyunliang = reactive(dataConfig({ unit: '万人次', icon: keyun }))
  const huowuzhouzhuan = reactive(dataConfig({ unit: '亿吨公里', icon: huoyun }))
  const lvkezhouzhuan = reactive(dataConfig({ unit: '亿人公里', icon: keyun }))
  const getChartData = async (config, apiList) => {
    const resList = await Promise.allSettled(apiList)
    config.total = resList[0]?.value[0]?.total
    config.date = resList[1]?.value[0]?.report_date
    config.monthData = resList[1]?.value[0]?.sum_numerical
    config.monthCompare = resList[1]?.value[0]?.percentage?.toFixed(2) || 0
    config.yearData = resList[2]?.value[0]?.sum_numerical
    config.yearCompare = resList[2]?.value[0]?.percentage?.toFixed(2) || 0
    config.chartConfig.forEach((item) => {
      const fd = resList[0]?.value?.find(
        (obj) => obj.indicators.includes(item.name) || obj.indicators.includes(item.dataName)
      )
      item.value = fd?.sum_numerical
      item.pct = fd?.pct.toFixed(2)
    })
  }

  getCardData()
  getChartData(huoyunConfig, [pieChartPercentage(), currentMonthYearOnYear(), cumulativeYearOnYear()])
  getChartData(keyunliang, [
    pieChartPercentage3(),
    currentMonthYearOnYear3(),
    cumulativeYearOnYear3()
  ])
  getChartData(huowuzhouzhuan, [
    pieChartPercentage2(),
    currentMonthYearOnYear2(),
    cumulativeYearOnYear2()
  ])
  getChartData(lvkezhouzhuan, [
    pieChartPercentage4(),
    cumulativeYearOnYear4(),
    currentMonthYearOnYear4()
  ])
</script>

<style lang="less" scoped>
.logistics-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  gap: .24rem;
  grid-template-areas: "a b c"
  "d b e";
  grid-template-columns: 4.32rem 1fr 4.32rem;
  grid-template-rows: repeat(2, 1fr);

   > div {
    min-height: 0;
  }

  .map-wrapper {
    // grid-column-end: 3;
    // grid-column-start: 2;
    // grid-row-end: 3;
    // grid-row-start: 1;
    grid-area: b;
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
