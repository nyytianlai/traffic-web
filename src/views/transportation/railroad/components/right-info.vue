<template>
  <div class="right-info-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="年"
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
      <p>发送量</p>
      <div>
        <IndexChange
          :data="fasong"
          :unit-arr="['万人次', '万吨']"
        />
      </div>
    </div>
    <div class="chart-content">
      <p>周转量</p>
      <div>
        <IndexChange
          :data="zhouzhuan"
          :unit-arr="['亿人公里', '亿吨公里']"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import IndexChange from './index-change.vue'
  import { historicalFreightPassengerMetrics } from '@/api/modules/transportation/railroad.js'
  const date = ref('-')
  const fasong = ref([])
  const zhouzhuan = ref([])

  const getData = async () => {
    const res = await Promise.allSettled([historicalFreightPassengerMetrics(2), historicalFreightPassengerMetrics(3)])
    date.value = res[0].value[0].report_date
    res.forEach(item => {
      fasong.value = fasong.value.concat(item.value)
    })
    const res2 = await Promise.allSettled([historicalFreightPassengerMetrics(0), historicalFreightPassengerMetrics(1)])
    res2.forEach(item => {
      zhouzhuan.value = zhouzhuan.value.concat(item.value)
    })
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

    &:first-of-type {
      margin-bottom: .32rem;
    }

    p {
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
