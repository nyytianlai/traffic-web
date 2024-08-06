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
    <div class="top">
      <span class="time">
        <DataTypeBtn type="实时" />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>

    <div class="yycl card">
      <div class="left-icon">
        <img :src="config[0].icon">
      </div>
      <div class="right-info">
        <div class="top-title">
          <div class="title">
            {{ config[0].name }}
          </div>
          <div class="extra">
            入网率{{ formatData(config[0].compareName) }}%
          </div>
        </div>
        <div class="data">
          <div class="num">
            {{ formatData(config[0].name, config[0].dataName) }}
          </div>
          <div class="unit">
            辆
          </div>
        </div>
      </div>
    </div>

    <div class="cardWrapper card">
      <div class="left-icon">
        <img :src="config[1].icon">
      </div>
      <div class="right-info">
        <div class="top-title">
          <div class="title">
            {{ config[1].name }}
          </div>
        </div>
        <div class="data">
          <div class="num">
            {{ formatData(config[1].name, config[1].dataName) }}
          </div>
          <div class="unit">
            辆
          </div>
          <div class="compareName">
            上周同期 {{ formatData(config[1].compareName) }}%
            <svg-icon
              v-if="Number(formatData(config[1].compareName)) && !Number.isNaN(Number(formatData(config[1].compareName)))"
              :icon-class="Number(formatData(config[1].compareName)) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="cardWrapper bottomWrapper">
      <div
        v-for="item in config.slice(2)"
        :key="item.name"
        class="card"
      >
        <div class="left-icon">
          <img :src="item.icon">
        </div>
        <div class="right-info">
          <div class="top-title">
            <div class="title">
              {{ item.name }}
            </div>
          </div>
          <div class="data">
            <div class="num">
              {{ formatData(item.name, item.dataName) }}
            </div>
            <div class="unit">
              辆
            </div>
            <div class="compareName">
              上周同期 {{ formatData(item.compareName) }}%
              <svg-icon
                v-if="Number(formatData(item.compareName)) && !Number.isNaN(Number(formatData(item.compareName)))"
                :icon-class="Number(formatData(item.compareName)) < 0 ? 'drop' : 'rise'"
                style="font-size: 0.12rem; width: 0.12rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import yycl from '@/assets/images/yycl.png'
  import drsxcl from '@/assets/images/drsxcl.png'
  import lybc from '@/assets/images/lybc.png'
  import kybc from '@/assets/images/kybc.png'
  import wxpc from '@/assets/images/wxpc.png'
  import zxhc from '@/assets/images/zxhc.png'

  import utils from '@/hooks/utils'
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const formatNumStr = utils.formatNumStr

  const formatData = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === name || item.zbmc === dataName))
    return formatNumStr(fd?.zbz).trim()
  }
  const config = [
    {
      name: '运营车辆',
      compareName: '入网率',
      icon: yycl
    },
    {
      name: '当日上线车辆',
      compareName: '当日上线车辆上周同期',
      icon: drsxcl
    },
    {
      name: '旅游包车车辆',
      dataName: '旅游包车',
      compareName: '旅游包车上周同期',
      icon: lybc
    },
    {
      name: '客运班车车辆',
      dataName: '客运班车',
      compareName: '客运班车上周同期',
      icon: kybc
    },
    {
      name: '危险品车车辆',
      dataName: '危险品车',
      compareName: '危险品车上周同期',
      icon: wxpc
    },
    {
      name: '重型货车车辆',
      dataName: '重型货车',
      compareName: '重型货车上周同期',
      icon: zxhc
    }
  ]

</script>

<style lang="less" scoped>
.wrapper {
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
    margin-bottom: .48rem;
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

  .card {
    display: flex;
    flex-flow: row nowrap;
    .left-icon {
      flex: 0 0 .96rem;
      margin-right: .24rem;

      img {
        width: 100%;
      }
    }

    .right-info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      .top-title {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        margin-bottom: .08rem;

        .title {
          color: #fff;
          font-family: "PingFang SC";
          font-size: .2rem;
          font-weight: 400;
          line-height: .2rem;
        }

        .extra {
          padding: .02rem .04rem;
          margin-left: .12rem;
          color: #fff;
          font-family: "PingFang SC";
          font-size: .12rem;
          font-weight: 400;
          background: rgba(84, 181, 255, .27);
          border: 1px solid #54b5ff;
          border-radius: 2px;
        }
      }

      .data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;

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
  }

  .yycl {
    height: .75rem;
    margin-bottom: .4rem;
  }

  .cardWrapper {
    padding: .32rem .24rem;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
    border: 1.4px solid rgba(#0085ff, .2);

    .left-icon {
      flex: 0 0 .64rem;
      margin-right: .08rem;
    }
  }

  .bottomWrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1;
    min-height: 0;
    padding: .34rem .32rem;
    margin-top: .16rem;

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
