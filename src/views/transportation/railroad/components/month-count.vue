<template>
  <div class="month-count-wrapper">
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
    <div class="top-card">
      <card-item
        class="no-border"
        :config="topCard"
      />
    </div>
    <div
      v-for="item in topSub"
      :key="item.name"
      class="bottom-card"
    >
      <card-item
        :config="item"
      />
    </div>
  </div>
</template>

<script setup>
  import CardItem from '@/views/transportation/seaport/components/card-item.vue'
  import DataTypeBtn from '@/components/data-type-btn'
  import { monthlyPassengerAndFreightVolume } from '@/api/modules/transportation/railroad.js'

  const date = ref('-')
  // const bottomCard = reactive({
  //   name: '货运',
  //   icon: require('@/assets/images/huoyun2.png'),
  //   unit: '吨',
  //   dataName: '铁路货运',
  //   compareName: '同比去年',
  //   compareDataName: '铁路货运同比去年',
  //   showDetail: false,
  //   dataInConfig: true
  // })

  const topSub = reactive([
    {
      name: '发送客流量',
      icon: require('@/assets/images/fasongkeliulaing.png'),
      unit: '万人次',
      dataName: '铁路发送',
      compareName: '同比去年',
      compareDataName: '铁路发送同比去年',
      dataInConfig: true,
      code: 3

    },
    {
      name: '到达客流量',
      icon: require('@/assets/images/daodakeliuliang.png'),
      unit: '万人次',
      dataName: '铁路到达',
      compareName: '同比去年',
      compareDataName: '铁路到达同比去年',
      dataInConfig: true,
      code: 2
    }, {
      name: '货运发送量',
      icon: require('@/assets/images/huoyun2.png'),
      unit: '万吨',
      dataName: '铁路货运',
      compareName: '同比去年',
      compareDataName: '铁路货运同比去年',
      showDetail: false,
      dataInConfig: true,
      code: 1
    }
  ])

  const topCard = reactive({
    name: '客运量',
    icon: require('@/assets/images/lvke.png'),
    unit: '万人次',
    dataName: '铁路客运',
    compareName: '同比去年',
    compareDataName: '铁路客运同比去年',
    showDetail: false,
    dataInConfig: true
  })

  const getData = async () => {
    const res = await Promise.allSettled([
      monthlyPassengerAndFreightVolume(0)
    ])
    date.value = res[0].value && res[0].value[0]?.report_date
    topCard.value = res[0].value && res[0].value[0]?.sum_numerical
    topCard.compareValue = res[0].value && res[0].value[0]?.percentage?.toFixed(2)
    const arr = []
    topSub.forEach(item => {
      arr.push(monthlyPassengerAndFreightVolume(item.code))
    })
    const resArr = await Promise.allSettled(arr)
    topSub.forEach((item, i) => {
      const data = (resArr[i].value && resArr[i].value[0]) || {}
      item.value = data?.sum_numerical
      item.compareValue = data.percentage?.toFixed(2)
    })
  }
  getData()
</script>

<style lang="less" scoped>
.month-count-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .24rem;

  row-gap: .08rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
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
    .no-border {
      height: .84rem;
    }
    .sub-info {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-top: .08rem;

      &::before {
        content: "";
        position: absolute;
        top: -.02rem;
        left: 0;
        width: 100%;
        height: .01rem;
        border-top: 1px dashed rgba(0, 133, 255, .3);
      }

      .sub-info-item {
        flex: 0 0 calc(50% - .005rem);

        &:last-of-type {
          position: relative;
          padding-left: .16rem;

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: -.005rem;
            width: .01rem;
            height: .72rem;
            border-right: 1px dashed rgba(0, 133, 255, .3);
            transform: translateY(-50%);
          }
        }
      }

      .sub-name {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .18rem;
        font-weight: 500;
      }

      .sub-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;

        .num {
          margin-right: .04rem;
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .24rem;
          font-weight: 700;
          line-height: .26rem;
        }

        .unit {
          color: #0ff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
        }
      }

      .sub-compare-data {
        display: flex;
        align-items: center;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }
    }
  }

  .bottom-card {
    height: .84rem;
  }

  .top-card,
  .bottom-card {
    padding: .12rem .16rem;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px rgba(#294cb3, .2);
    border: 1.4px solid rgba(#0085ff, .2);
    :deep(.card-icon) {
      flex: 0 0 .6rem;
      height: .6rem;
    }
    :deep(.name) {
      font-size: .2rem;
    }
    :deep(.data) {
      .num {
        font-size: .32rem;
      }
    }
  }
}
</style>
