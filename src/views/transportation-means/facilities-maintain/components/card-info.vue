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
      <div
        v-for="item in config.slice(1)"
        :key="item.name"
        class="bottom-card-item"
      >
        <card-item :config="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import CardItem from './card-item.vue'
  import DataTypeBtn from '@/components/data-type-btn'
  import {
    maintenanceEvenPercentage,
    maintenanceEventCurrentYear
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
    },
    {
      name: '路基路面',
      icon: require('@/assets/images/daolu.png'),
      dataType: '月',
      unit: '条',
      dataName: '',
      compareName: ''
    },
    {
      name: '桥梁',
      icon: require('@/assets/images/qiaoliang.png'),
      dataType: '月',
      unit: '座',
      dataName: '',
      compareName: ''
    },
    {
      name: '隧道',
      icon: require('@/assets/images/suidao.png'),
      dataType: '月',
      unit: '条',
      dataName: '',
      compareName: ''
    },
    {
      name: '边坡挡墙',
      icon: require('@/assets/images/bianpo.png'),
      dataType: '月',
      unit: '座',
      dataName: '',
      compareName: ''
    },
    {
      name: '地下通道',
      icon: require('@/assets/images/suidao.png'),
      dataType: '月',
      unit: '条',
      dataName: '',
      compareName: ''
    },
    {
      name: '电梯',
      icon: require('@/assets/images/bianpo.png'),
      dataType: '月',
      unit: '座',
      dataName: '',
      compareName: ''
    }
  ])
  const getData = async () => {
    const res = await Promise.allSettled([maintenanceEvenPercentage(), maintenanceEventCurrentYear()])
    date.value = res[0]?.value && res[0]?.value[0]?.report_time
    config[0].value = res[0].value && res[0].value[0]?.total
    config[0].date = res[0].value && res[0].value[0]?.report_time
    config[0].percentValue = res[0].value && res[0].value[0]?.percentage.toFixed(2)

    config.slice(1).forEach((item, i) => {
      const fd = res[1].value?.find(
        (obj) => obj.facility_type.includes(item.name) || obj.facility_type.includes(item.otherName)
      )
      item.value = fd?.total
      item.date = fd?.report_date
    })
  }
  getData()
</script>

<style lang="less" scoped>
.card-info-wrapper {
  width: 100%;
  height: 100%;
  padding: 0.24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.12rem;
    .more {
      width: 0.16rem;
      height: 0.16rem;
      font-size: 0.16rem;
      cursor: pointer;
    }

    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: 0.16rem;
      font-weight: @regular;
      letter-spacing: 0;

      > div {
        margin-left: 0.04rem;
      }
    }
  }

  .top-card {
    width: 100%;
    height: 1.2rem;
    margin-bottom: 0.12rem;
  }

  .bottom-card-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    .bottom-card-item {
      flex: 0 0 calc(50% - 0.06rem);
      width: calc(50% - 0.06rem);
      height: 1rem;
      margin-bottom: 0.12rem;
    }
  }
}
</style>
