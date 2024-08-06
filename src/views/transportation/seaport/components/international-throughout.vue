<template>
  <div class="throughout-wrapper">
    <div class="top">
      <span class="time">
        {{ dateVl || '-' }}
        <DataTypeBtn
          type="月"
          :date="dateVl"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <CardItem :config="config" />
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import CardItem from './card-item.vue'
  import { transportStaticsByType, maxYearAndMonth } from '@/api/modules/transportation/seaport.js'
  import moment from 'moment'
  const config = reactive({
    name: '本季度国际集装箱班轮航线',
    icon: require('@/assets/images/guoji.png'),
    unit: '条',
    dataName: '',
    compareName: '较上月同期',
    compareDataName: '',
    showDetail: false,
    dataInConfig: true
  })
  const dateVl = ref()
  const getData = async () => {
    const vl = (await maxYearAndMonth(4))[0]
    dateVl.value = `${vl?.year}-${vl?.month}`
    const date = moment(`${vl?.year}-${vl?.month}`)
      .subtract(1, 'months')
      .format('YYYY-MM')
      .split('-')
    const vl2 = (
      await transportStaticsByType({
        year: vl?.year,
        month: vl?.month,
        type: 4
      })
    )[0]
    const vl3 = (
      await transportStaticsByType({
        year: date[0],
        month: date[1],
        type: 4
      })
    )[0]
    config.value = vl2?.total_numerical
    config.month = vl?.month || '-'
    if (vl2?.total_numerical && vl3?.total_numerical) {
      config.compareValue = (
        ((vl2.total_numerical - vl3.total_numerical) * 100) /
        vl3.total_numerical
      ).toFixed(2)
    }
  }
  getData()
</script>

<style lang="less" scoped>
.throughout-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .2rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
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
}
</style>
