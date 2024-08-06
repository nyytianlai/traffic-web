<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-12 11:30:08
 * @LastEditTime: 2022-12-28 16:45:28
 * @FilePath: \traffic-web\src\views\overview\components\road.vue
 * @Description: FilePath
-->
<template>
  <div class="road-wrapper">
    <div
      v-for="item in config"
      :key="item.name"
      class="info-item"
    >
      <div class="info-title">
        {{ item.name }}
      </div>
      <div class="info-data">
        <div class="num">
          {{ formatData(item.name, item.dataName) }}
        </div>
        <div class="unit">
          {{ item.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const config = [
    {
      name: '全市平均时速',
      dataName: '平均时速',
      unit: '公里/小时'
    },
    {
      name: '交通指数',
      dataName: '交通指数',
      unit: ''
    }
  ]
  const formatData = (name, dataName) => {
    const fd = props.data.find(item => item.zbmc === name || item.zbmc === dataName)
    return formatNumStr(fd?.zbz) || '-'
  }
</script>

<style lang="less" scoped>
.road-wrapper {
  .info-item {
    margin-bottom: .4rem;

    &:last-of-type {
      margin-bottom: 0;
    }
    .info-title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      overflow: hidden;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .18rem;
      font-weight: 400;
      line-height: .22rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .info-data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      .num {
        color: #0ff;
        font-family: DINCondensed-Bold;
        font-size: .32rem;
        font-weight: 700;
        line-height: .38rem;
      }

      .unit {
        margin-left: .04rem;
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }
    }
  }
}
</style>
