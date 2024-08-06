<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-06 17:30:11
 * @LastEditTime: 2022-12-13 11:41:25
 * @FilePath: \traffic-web\src\views\transportation\seaport\components\freight-month-info.vue
 * @Description: FilePath
-->
<template>
  <div class="month-info-wrapper">
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
    <div
      v-for="item in config"
      :key="item.name"
      class="card-wrapper"
    >
      <card-item :config="item" />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import CardItem from './card-item.vue'
  import { portPassengerAndFreightIndexMonthly } from '@/api/modules/transportation/seaport.js'

  const date = ref('-')
  const config = reactive([
    {
      name: '当月旅客吞吐量',
      icon: require('@/assets/images/hangban.png'),
      unit: '万人次',
      dataName: '港口旅客',
      compareName: '同比去年',
      compareDataName: '港口旅客同比去年',
      showDetail: false,
      dataInConfig: true
    },
    {
      name: '当月货物吞吐量',
      icon: require('@/assets/images/huowu.png'),
      unit: '万吨',
      dataName: '港口货物',
      compareName: '同比去年',
      compareDataName: '港口货物同比去年',
      showDetail: false,
      dataInConfig: true
    }
  ])
  const getData = async () => {
    const res = await Promise.allSettled([
      portPassengerAndFreightIndexMonthly(1),
      portPassengerAndFreightIndexMonthly(0)
    ])
    date.value = res[0].value[0]?.report_date
    config.forEach((item, i) => {
      item.value = res[i].value && res[i].value[0]?.sum_numerical
      item.compareValue = res[i].value && res[i].value[0]?.increase_percentage?.toFixed(2)
    })
  }
  getData()
</script>

<style lang="less" scoped>
.month-info-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 .24rem;
    margin-top: .24rem;
    margin-bottom: .12rem;
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

  .card-wrapper {
    padding: 0 .24rem;
    margin-bottom: .12rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
