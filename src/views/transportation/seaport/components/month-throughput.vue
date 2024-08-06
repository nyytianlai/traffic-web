<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-07 16:43:56
 * @LastEditTime: 2022-12-13 14:07:10
 * @FilePath: \traffic-web\src\views\transportation\seaport\components\month-throughput.vue
 * @Description: FilePath
-->
<template>
  <div class="throughput-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="月"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="total-info">
      <div class="icon-wrapper">
        <img :src="require('@/assets/images/data.png')">
      </div>
      <div class="total-data">
        <div class="total-name">
          今年总计
        </div>
        <div class="total-num">
          <div class="num">
            {{ formatNumStr(totalData?.sum_numerical) }}
          </div>
          <div class="unit">
            万标准箱
          </div>
          <div class="compare">
            同比去年 {{ Math.abs(totalData?.increase_percentage?.toFixed(2)) || '-' }}%
            <svg-icon
              v-if="
                Number(
                  totalData?.increase_percentage
                ) &&
                  !Number.isNaN(totalData?.increase_percentage)
              "
              :icon-class="
                Number(
                  totalData?.increase_percentage
                ) < 0
                  ? 'drop'
                  : 'rise'
              "
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

  import { portContainerYearThroughput } from '@/api/modules/transportation/seaport.js'
  const formatNumStr = utils.formatNumStr
  defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const date = ref('-')
  // const config = reactive([
  //   {
  //     name: '进港',
  //     unit: '万标准箱',
  //     compareName: '进港同比去年'
  //   },
  //   {
  //     name: '出港',
  //     unit: '万标准箱',
  //     compareName: '出港同比去年'
  //   }
  // ])

  const totalData = ref()
  const getData = async () => {
    const res = await portContainerYearThroughput() || []
    const data = (res.flat())[0]
    totalData.value = data
    date.value = data?.max_report_date
    // config.forEach((item, i) => {
    //   item.value = res[i + 1].value && res[i + 1].value[0]?.sum_numerical
    //   item.compareValue = res[i + 1].value && res[i + 1].value[0]?.increase_percentage?.toFixed(2)
    // })
  }
  getData()
</script>

<style lang="less" scoped>
.throughput-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .2rem .12rem .08rem;

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

  .total-data {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    margin-left: .16rem;
  }

  .total-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .12rem;

    .icon-wrapper {
      flex: 0 0 .8rem;

      img {
        width: 100%;
      }
    }

    .total-name {
      color: #fff;
      font-size: .18rem;
      font-weight: 500;
    }

    .total-num {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      white-space: nowrap;

      .num {
        color: #00fff9;
        font-family: "DINCondensed-Bold";
        font-size: .32rem;
        font-weight: 700;
        line-height: .4rem;
      }

      .unit {
        margin-left: .08rem;
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }

      .compare {
        margin-left: .08rem;
        color: #fff;
        font-size: .16rem;
        font-weight: 400;
      }
    }
  }

  .card-wrapper {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    min-width: 0;

    column-gap: .12rem;

    .card {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      flex: 1;
      min-width: 0;
      padding: .08rem .24rem;
      background: rgba(55, 97, 232, .12);
      box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
      border: 1.4px solid rgba(#0085ff, .2);

      .card-name {
        margin-bottom: .06rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .2rem;
        font-weight: 500;
        line-height: .18rem;
      }

      .card-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;

        .data {
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .26rem;
          font-weight: 700;
          line-height: .26rem;
        }

        .unit {
          margin-left: .04rem;
          color: #0ff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .16rem;
          white-space: nowrap;
        }
      }

      .compare-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }
    }
  }
}
</style>
