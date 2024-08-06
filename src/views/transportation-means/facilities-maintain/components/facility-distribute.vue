<template>
  <div class="card-info-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="月"
          :show-drop="true"
          :drop-info="date"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="top-card">
      <card-item :config="config[0]" />
    </div>
    <div class="bottom-card-wrapper">
      <FacilitieTypePie />
    </div>
  </div>
</template>

<script setup>
  import CardItem from './card-item.vue'
  import DataTypeBtn from '@/components/data-type-btn'
  import FacilitieTypePie from './facilitie-type-pie.vue'
  import {
    maintenanceCurrent
  } from '@/api/modules/transportation-means/facilities-maintain.js'

  const date = ref('-')
  const config = reactive([
    {
      name: '今年累计养护',
      icon: require('@/assets/images/daolu.png'),
      dataType: '月',
      unit: '件',
      dataName: '',
      compareName: '今年累计养护同比去年'
    }
  ])

  const getData = async () => {
    const res = await maintenanceCurrent()
   
    date.value = res[0] && res[0]?.substring
    config[0].value = res[0] && res[0]?.total
    config[0].date = res[0] && res[0]?.substring
    config[0].percentValue = res[0] && res[0]?.percentage.toFixed(2)
  }
  getData()
</script>

<style lang="less" scoped>
.card-info-wrapper {
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

  .top-card {
    width: 100%;
    height: 1.2rem;
    margin-bottom: .12rem;
  }

  .bottom-card-wrapper {
    flex: 1;
    min-height: 0;
  }
}
</style>
