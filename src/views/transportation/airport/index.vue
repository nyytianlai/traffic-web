<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-12-15 10:52:03
 * @FilePath: \traffic-web\src\views\transportation\airport\index.vue
 * @Description: FilePath
-->
<template>
  <div class="logistics-wrapper">
    <div class="left">
      <div>
        <base-panel title="空港运营指标月度概况">
          <month-info :data="khysgkData" />
        </base-panel>
      </div>
      <div>
        <base-panel title="历年客货运指标变化">
          <index-change />
        </base-panel>
      </div>
    </div>
    <div class="map-wrapper">
      <map-view />
    </div>
    <div class="right">
      <div>
        <base-panel title="航空器起降架次月度变化">
          <aerobat-month-change
            unit="万架次"
            :data="hkqData"
            data-name="货邮吞吐量"
            compare-name="货邮吞吐量同比去年"
          />
        </base-panel>
      </div>
      <div>
        <base-panel title="旅客吞吐量月度变化">
          <aerobat-month-change
            unit="万人次"
            :data="lvketuntuData"
            data-name="旅客吞吐量"
            compare-name="旅客吞吐量同比去年"
          />
        </base-panel>
      </div>
      <div>
        <base-panel title="货邮吞吐量月度变化">
          <aerobat-month-change
            unit="万吨"
            :data="huoyoutuntuData"
            data-name="货邮吞吐量"
            compare-name="货邮吞吐量同比去年"
          />
        </base-panel>
      </div>
    </div>
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        市交通运输局
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import MonthInfo from './components/month-info.vue'
  import IndexChange from './components/index-change.vue'
  import AerobatMonthChange from './components/aerobat-month-change.vue'
  import MapView from './components/map.vue'
  import {
    monthlyChangeCurve,
    rowthRateYearOnYear,
    airportOperationIndexMonthlyOverview
  } from '@/api/modules/transportation/airport'

  // 客货运输概况
  const khysgkData = ref([])
  const getKhysgk = () => {
    airportOperationIndexMonthlyOverview().then((res) => {
      khysgkData.value = res || []
    })
  }

  const hkqData = reactive({
    compareData: {},
    data: []
  })
  const lvketuntuData = reactive({
    compareData: {},
    data: []
  })
  const huoyoutuntuData = reactive({
    compareData: {},
    data: []
  })
  const getChangeData = async (type, data) => {
    const res = await Promise.allSettled([rowthRateYearOnYear(type), monthlyChangeCurve(type)])
    const arr = res[0].value && res[0].value[0]?.report_date?.split('-')
    data.compareData = {
      date: res[0].value && res[0].value[0]?.report_date,
      data: res[0].value && res[0].value[0]?.sum_numerical,
      compare: res[0].value && res[0].value[0]?.increase_percentage?.toFixed(2),
      time: arr.length && `${arr[0]}年1-${Number(arr[1])}月`
    }
    data.data = res[1].value
  }

  onMounted(() => {
    getKhysgk()
    getChangeData(0, hkqData)
    getChangeData(1, lvketuntuData)
    getChangeData(2, huoyoutuntuData)
  })
</script>

<style lang="less" scoped>
.logistics-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 4.32rem 1fr 4.32rem;

   > div {
    min-height: 0;
  }

  .left {
    display: grid;

    grid-template-rows: 1fr 4rem;
    row-gap: .2rem;

     > div {
      min-height: 0;
    }
  }

  .right {
    display: grid;

    grid-template-rows: repeat(3, 1fr);
    row-gap: .2rem;

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
