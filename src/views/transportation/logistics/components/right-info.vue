<template>
  <div class="right-info-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="日"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-content">
      <p>旅客</p>
      <div>
        <IndexChange
          :data="lvke"
          :unit="['万人次', '亿人次/公里']"
        />
      </div>
    </div>
    <div class="chart-content">
      <p>货物</p>
      <div>
        <IndexChange
          :data="huowu"
          :unit="['万吨', '亿吨公里']"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import IndexChange from './index-change.vue'
  import { historicalFreightIndexChange, passengerIndexChange } from '@/api/modules/transportation/logistics.js'

  const lvke = ref([])
  const huowu = ref([])
  const date = ref('-')

  const getData = async () => {
    const res = await Promise.allSettled([passengerIndexChange(0), passengerIndexChange(1)])
    res.forEach(item => {
      lvke.value = lvke.value.concat(item.value)
    })
    const res2 = await Promise.allSettled([historicalFreightIndexChange(0), historicalFreightIndexChange(1)])
    res2.forEach(item => {
      huowu.value = huowu.value.concat(item.value)
    })
    date.value = lvke.value[0] && lvke.value[0].report_date
  }
  getData()

</script>

<style lang="less" scoped>
.right-info-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .06rem;
    .more {
      width: .16rem;
      height: .16rem;
      font-size: .16rem;
      cursor: pointer;
    }

    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: .16rem;
      font-weight: @regular;
      letter-spacing: 0;

       > div {
        margin-left: .04rem;
      }
    }
  }

  .chart-content {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    min-height: 0;

    p {
      margin-bottom: .24rem;
      color: #fff;
      font-size: .18rem;
    }
     > div {
      flex: 1;
      min-height: 0;
    }
  }
}

</style>
