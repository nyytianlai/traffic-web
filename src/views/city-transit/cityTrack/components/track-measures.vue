<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-08 10:01:03
 * @LastEditTime: 2023-01-05 10:49:07
 * @FilePath: \traffic-web\src\views\city-transit\cityTrack\components\track-measures.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="head">
      <div class="date">
        <span>{{ date }}</span>
        <span>{{ '年' }}</span>
      </div>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="info-wrapper">
      <div
        v-for="item in config"
        :key="item.code"
        class="info-card"
      >
        <div class="top-card">
          <div class="top-left">
            <img
              :src="item.icon"
              :draggable="false"
            >
          </div>
          <div class="top-right">
            <div class="card-name">
              {{ item.name }}
            </div>
            <div class="card-data">
              <span class="data">{{ formatData(item.name) }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
        <div
          v-show="item.compareName"
          class="compare-info"
        >
          同比去年 {{ formatData(item.compareName) }}%
          <svg-icon
            v-if="Number(formatData(item.compareName)) && !Number.isNaN(Number(formatData(item.compareName)))"
            :icon-class="Number(formatData(item.compareName)) < 0 ? 'drop' : 'rise'"
            style="font-size: 0.12rem; width: 0.12rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import railway from '@/assets/images/railway-icon.png'
  import mileage from '@/assets/images/operate-mileage.png'
  import sites from '@/assets/images/operate-sites.png'
  import exchange from '@/assets/images/exchange-sites.png'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const date = computed(() => props.data[0]?.sbsj || '-')
  const config = [
    {
      name: '运营线路',
      code: 'lines',
      icon: railway,
      compareCode: '',
      unit: '条'
    },
    {
      name: '运营里程',
      code: 'mileage',
      icon: mileage,
      compareName: '运营里程同比去年',
      unit: '条'
    },
    {
      name: '运营站点',
      code: 'sites',
      icon: sites,
      compareName: '运营站点同比去年',
      unit: '个'
    },
    {
      name: '换乘站点',
      code: 'exchange',
      icon: exchange,
      compareName: '换乘站点同比去年',
      unit: '个'
    }
  ]

  const formatData = (name) => {
    const fd = props.data.find(item => item.zbmc === name)
    return formatNumStr(fd?.zbz)
  }
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: .24rem;

  .head {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .12rem;

    .date {
      display: flex;
      align-items: center;

      span:first-of-type {
        margin-right: .08rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }

      span:last-of-type {
        padding: .01rem .03rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .12rem;
        font-weight: 600;
        background: #1e9b1c;
        border-radius: 1px;
      }
    }

    .more {
      width: .16rem;
      height: .16rem;
      font-size: .16rem;
      cursor: pointer;
    }
  }

  .info-wrapper {
    display: grid;

    column-gap: .12rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    row-gap: .12rem;

    .info-card {
      overflow: hidden;
      padding: .16rem .16rem .08rem;
      background: rgba(#3761e8, .12);
      box-shadow: 0 1px 14px 0 rgba(#000, .2),inset 0 0 35px 0 rgba(#294cb3, .2);
      border: 1.4px solid rgba(#0085ff, .2);

      .top-card {
        display: flex;
        align-items: center;

        .top-left {
          width: .56rem;
          height: .56rem;
          margin-right: .12rem;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .top-right {
          .card-name {
            color: #fff;
            font-family: "PingFang SC";
            font-size: .16rem;
            font-weight: 400;
            line-height: .22rem;
            white-space: nowrap;
          }

          .card-data {
            display: flex;
            flex-flow: row nowrap;
            align-items: baseline;

            .data {
              margin-right: .08rem;
              color: #00fff9;
              font-family: DINCondensed-Bold;
              font-size: .36rem;
              font-weight: 700;
              line-height: .4rem;
              text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
            }

            .unit {
              color: #00fff9;
              font-family: "PingFang SC";
              font-size: .16rem;
              font-weight: 400;
            }
          }
        }
      }

      .compare-info {
        color: #fff;
        font-family: PingFang SC;
        font-size: 16px;
        font-weight: @regular;
        letter-spacing: 0;
        white-space: nowrap;
      }
    }
  }
}
</style>
