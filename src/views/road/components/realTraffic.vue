<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-03 15:40:17
 * @LastEditTime: 2022-11-24 11:28:55
 * @FilePath: \traffic-web\src\views\road\components\realTraffic.vue
 * @Description: FilePath
-->
<template>
  <div class="real-traffic-wrapper">
    <div class="data-type">
      <div>实时</div>
    </div>
    <div class="card-wrapper">
      <div
        v-for="item in cardList"
        :key="item.name"
        class="info-card"
      >
        <div class="card-title">
          <div class="title">
            {{ item.name }}
          </div>
          <div
            v-show="item.statusName"
            class="status"
          >
            {{ formatData(item.statusName) }}
          </div>
        </div>
        <div class="card-data">
          <div class="num">
            {{ formatData(item.name) }}
          </div>
          <div class="unit">
            {{ item.unit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const cardList = [
    {
      name: '平均速度',
      code: 'speed',
      unit: '公里/小时',
      statusName: '拥堵等级'
    },
    {
      name: '拥堵里程',
      code: 'busyWay',
      unit: '公里',
      statusName: ''
    }
  ]
  const formatData = name => {
    const fd = props.data.find(item => item.zbmc === name)
    return fd?.zbz || '-'
  }
</script>

<style lang="less" scoped>
.real-traffic-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .2rem .2rem .2rem .24rem;
  .data-type {
    flex: 0 0 .2rem;
     > div {
      display: inline-block;
      height: .2rem;
      padding: 0 .04rem;
      color: #fff;
      line-height: .2rem;
      background: #1e9b1c;
      border-radius: 2px;
    }
  }

  .card-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    flex: 1;
    min-height: 0;
    margin-top: .1rem;

    .info-card {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      flex: 0 0 calc(50% - .12rem);
      padding: 0 .2rem;
      background: rgba(55, 97, 232, .12);
      box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
      border: 1.4px solid rgba(#0085ff, .2);

      .card-title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: .04rem;

        .title {
          margin-right: .2rem;
          color: #fff;
          font-size: .16rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .status {
          padding: .02rem .04rem;
          color: #1e9b1c;
          white-space: nowrap;
          border: solid 2px #1e9b1c;
          border-radius: 4px;
        }
      }

      .card-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;

        .num {
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .36rem;
          font-weight: 700;
          line-height: .4rem;
        }

        .unit {
          margin-left: .08rem;
          color: #fff;
          font-family: "PingFang SC";
          font-size: .12rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
