<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-25 15:56:56
 * @LastEditTime: 2022-12-01 11:38:31
 * @FilePath: \traffic-web\src\views\transportation\logistics\components\month-transportation.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
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
      class="card-item"
    >
      <div class="left-img">
        <img
          :src="require(`@/assets/images/${item.icon}`)"
          :draggable="false"
        >
      </div>
      <div class="right-info">
        <div class="name">
          {{ item.name }}
        </div>
        <div class="data">
          <div class="count">
            <div class="num">
              {{ formatNumStr(item.value) }}
            </div>
            <div class="unit">
              {{ item.unit }}
            </div>
          </div>
          <div class="compare">
            同比去年：{{ item.percent }}%
            <svg-icon
              v-if="Number(item.percent) && !Number.isNaN(Number(item.percent))"
              :icon-class="Number(item.percent) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  import { monthlyPassengerAndFreightVolumeByType } from '@/api/modules/transportation/logistics.js'

  const date = ref('-')
  const formatNumStr = utils.formatNumStr
  const config = reactive([
    {
      name: '客运量',
      type: '道路',
      unit: '万人次',
      compareName: '客运同比去年',
      icon: 'keyun.png'
    },
    {
      name: '货物运输量',
      type: '道路',
      unit: '万吨',
      compareName: '货运同比去年',
      icon: 'huoyun.png'
    },
    {
      name: '货物周转量',
      type: '道路',
      unit: '亿吨公里',
      compareName: '货物周转量同比去年',
      icon: 'huoyun.png'
    }
  ])
  const getData = async () => {
    const res = await Promise.allSettled([
      monthlyPassengerAndFreightVolumeByType(0),
      monthlyPassengerAndFreightVolumeByType(1),
      monthlyPassengerAndFreightVolumeByType(2)
    ])
    config.forEach((item, i) => {
      date.value = (res[i].value && res[i].value[0].report_date) || '-'
      item.value = res[i].value && res[i].value[0].sum_numerical
      item.percent = res[i].value && res[i].value[0].increase_percentage.toFixed(2)
    })
  }
  getData()
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 0 .24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-top: .24rem;
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

  .card-item {
    display: flex;
    align-items: center;
    padding: .1rem .16rem;
    margin-bottom: .12rem;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
    border: 1.4px solid rgba(#0085ff, .2);

    .left-img {
      flex: 0 0 .5rem;
      height: .4rem;
      margin-right: .16rem;

      img {
        width: .5rem;
        height: .4rem;
      }
    }

    .right-info {
      flex: 1;
      min-width: 0;
      .name {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 500;
        line-height: .22rem;
      }

      .data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        flex: 1;
        min-width: 0;

        .count {
          display: flex;
          flex-flow: row nowrap;
          align-items: baseline;
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          .num {
            margin-right: .08rem;
            color: #00fff9;
            font-family: "DINCondensed-Bold";
            font-size: .3rem;
            font-weight: 700;
            line-height: .34rem;
            text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
          }

          .unit {
            color: #00fff9;
            font-family: "PingFang SC";
            font-size: .16rem;
            font-weight: 400;
          }
        }

        .compare {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          flex: 0 0 1.5rem;
          color: #fff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
