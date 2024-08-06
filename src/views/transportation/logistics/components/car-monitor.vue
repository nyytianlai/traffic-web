<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-15 11:39:55
 * @LastEditTime: 2022-11-30 16:08:22
 * @FilePath: \traffic-web\src\views\transportation\logistics\components\car-monitor.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="cardWrapper bottomWrapper">
      <div
        v-for="item in config"
        :key="item.name"
        class="card"
      >
        <div class="title">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="data">
            <div class="num">
              {{ formatData(item.name, item.dataName) }}
            </div>
            <div class="unit">
              辆
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import lybc from '@/assets/images/lybc.png'
  import kybc from '@/assets/images/kybc.png'
  import wxpc from '@/assets/images/wxpc.png'
  import { keyVehicleNubmer } from '@/api/modules/transportation/logistics.js'

  import utils from '@/hooks/utils'
  const data = ref([])
  const formatNumStr = utils.formatNumStr

  const getData = async () => {
    const res = await keyVehicleNubmer()
    data.value = res || []
  }
  getData()
  const formatData = (name, dataName) => {
    const fd = data.value.find(item => item.indicators.includes(name))
    return formatNumStr(fd?.numerical).trim()
  }
  const config = [
    {
      name: '危险货物运输车',
      icon: lybc,
      nextUnit: '辆'
    },
    {
      name: '普通货物运输车',
      icon: kybc,
      nextUnit: '辆'
    },
    {
      name: '泥头车运输车',
      icon: wxpc,
      nextUnit: '辆'
    },
    {
      name: '道路客运车辆',
      icon: lybc,
      nextUnit: '辆'
    },
    {
      name: '重型罐式运输车',
      icon: kybc,
      nextUnit: '辆'
    },
    {
      name: '集装箱运输车',
      icon: wxpc,
      nextUnit: '辆'
    }
  ]

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .12rem;

  .card {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    min-width: 0;
    padding: .12rem .16rem;
    background: rgba(55, 97, 232, .02);
    box-shadow: 0 1px 14px 0 rgba(0, 0, 0, .04), 0 0 35px 0 rgba(#294cb3, .2) inset;
    border: 1.4px solid rgba(#0085ff, .2);

    .name {
      flex: 0 0 1.4rem;
    }

    .title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-size: .16rem;
    }

    .data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      margin-left: 12px;

      .num {
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .36rem;
        font-weight: 700;
        line-height: .42rem;
      }

      .unit {
        margin-left: .08rem;
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }

      .compareName {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-left: .24rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        white-space: nowrap;

        svg {
          margin-left: .04rem;
        }
      }
    }
  }
  .cardWrapper {
    display: flex;
    flex-flow: column nowrap;

    row-gap: .12rem;
    .left-icon {
      flex: 0 0 .64rem;
      margin-right: .08rem;
    }
  }

  .info-column {
    flex: 1;
    min-width: 0;

    column-gap: .24rem;
    p {
      color: #fff;
      font-size: .16rem;
      font-weight: 400;
      white-space: nowrap;
    }
  }

  .bottomWrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1;
    min-height: 0;

    .card {
      .left-icon {
        flex: 0 0 .55rem;
      }

      .data .num {
        font-size: .24rem;
        line-height: .24rem;
      }

      .top-title .title {
        font-size: .18rem;
        font-weight: 400;
      }
    }
  }
}
</style>
