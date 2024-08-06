<template>
  <div class="year-accident-wrapper">
    <div class="card-top">
      <div class="title">
        交通事故年度统计<span class="date">{{ date }}</span>
        <DataTypeBtn type="月" :date="date" />
      </div>
    </div>
    <div class="card-bottom">
      <div
        v-for="item in config"
        :key="item.name"
        class="data-item"
      >
        <div class="data-name">
          {{ item.name }}
        </div>
        <div class="data-item-data">
          {{ formatNumStr(item.value) }}<span class="unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  import DataTypeBtn from '@/components/data-type-btn'
  import { jtsgndtj } from '@/api/modules/traffic-safety/vehicleManagement'
  const formatNumStr = utils.formatNumStr
  const date = ref('-')
  const config = [
    {
      name: '本年度累计事故数',
      unit: '起',
      code: 'shigushuliang',
      value: ''
    },
    {
      name: '本年度累计受伤人数',
      unit: '人',
      code: 'shoushangrenshu',
      value: ''
    },
    {
      name: '本年度累计死亡人数',
      unit: '人',
      code: 'siwangrenshu',
      value: ''
    },
    {
      name: '本年度累计直接经济损失',
      unit: '万元',
      code: 'caichansunshi',
      value: ''
    }
  ]

  const getData = async () => {
    const res = await jtsgndtj()
    const data = res[0] || {}
    config.forEach(item => {
      item.value = data[item.code]
    })
    date.value = data.report_date || '-'
  }

  getData()
</script>

<style lang="less" scoped>
.year-accident-wrapper {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: .24rem;
  .card-top {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-size: .2rem;

      span.date {
        margin-right: .08rem;
        margin-left: .12rem;
        color: #fff;
        font-size: 16px;
      }
    }
  }

  .card-bottom {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    .data-item {
      flex: 0 0 50%;
      min-width: 0;
    }

    .data-name {
      color: #fff;
      font-family: PingFang SC;
      font-size: .16rem;
    }

    .data-item-data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      color: #00fff9;
      font-family: "DIN Condensed";
      font-size: .32rem;
      font-weight: 700;
      text-shadow: 0 2px 10px rgba(75, 222, 255, .50);

      .unit {
        margin-left: .08rem;
        color: #00fff9;
        font-family: PingFang SC;
        font-size: .16rem;
        font-weight: 400;
      }
    }
  }
}
</style>
