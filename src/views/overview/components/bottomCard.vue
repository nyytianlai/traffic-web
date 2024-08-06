<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-03 11:30:17
 * @LastEditTime: 2022-11-24 09:18:45
 * @FilePath: \traffic-web\src\views\overview\components\bottomCard.vue
 * @Description: FilePath
-->
<template>
  <div
    class="card-wrapper"
  >
    <div
      class="bg-img"
      :style="{backgroundImage: `url(${config.icon})`,backgroundSize: config.bgSize}"
    />
    <div class="date">
      {{ date }}
      <span v-show="config.dateType">{{ config.dateType }}</span>
    </div>
    <div
      v-for="item in config.dataArr"
      :key="item.name"
      class="info-item"
    >
      <div class="info-title">
        {{ item.name }}
        <div
          v-if="item.extra"
          class="rank"
        >
          <span>全国第</span><span>{{ formatData(item.extra) }}</span>
        </div>
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
    <div class="note">
      数据来源：市交通运输局
    </div>
  </div>
</template>

<script setup>
  import moment from 'moment'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const date = computed(() => props.data[0]?.sbsj || '')

  const formatData = (name, dataName) => {
    const fd = props.data.find(item => item.zbmc === name || item.zbmc === dataName)
    return formatNumStr(fd?.zbz) || '-'
  }
</script>

<style lang="less" scoped>
.card-wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: .24rem .24rem .12rem;
  .bg-img {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: auto;
    opacity: .5;
    pointer-events: none;
  }
  .date {
    display: flex;
    align-items: center;
    margin-bottom: .24rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;

    span {
      padding: .01rem .03rem;
      margin-left: .04rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .12rem;
      font-weight: 600;
      line-height: .18rem;
      text-align: center;
      background: #1e9b1c;
      border-radius: 1px;
    }
  }

  .info-item {
    margin-bottom: .22rem;
    .info-title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      overflow: hidden;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .2rem;
      font-weight: 400;
      line-height: .28rem;
      text-overflow: ellipsis;
      white-space: nowrap;

      .rank {
        display: flex;
        align-items: center;
        padding: .02rem .04rem;
        margin-left: .08rem;
        white-space: nowrap;
        background: rgba(255, 227, 11, .19);
        border: 1px solid rgba(255, 227, 11, .99);
        border-radius: 2px;

        span {
          color: #ffe30b;
          font-family: "PingFang SC";
          font-size: .14rem;
          font-weight: 400;
          line-height: .2rem;
          letter-spacing: 0;
        }
      }
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

  .note {
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .14rem;
    font-weight: 400;
    line-height: .2rem;
    text-transform: uppercase;
  }
}
</style>
