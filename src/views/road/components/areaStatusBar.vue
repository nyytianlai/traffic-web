<template>
  <div class="wrapper">
    <div class="unit">
      平均速度：公里/小时
    </div>
    <div
      v-for="item in data"
      :key="item.xzqh"
      class="bar-item"
    >
      <div class="area-name">
        {{ item.xzqh }}
      </div>
      <div
        class="bar"
      >
        <bar-item
          direction="to right"
          :width="`${getStatus(item)?.width}%`"
          :color="getStatus(item)?.barColor"
        />
        <div class="data">
          {{ item.pjsd }}
        </div>
      </div>
      <div
        class="status"
        :class="getStatus(item)?.class"
      >
        {{ getStatus(item)?.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { status } from '../config'
  import BarItem from '@/components/bar-3d-item'
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const min = ref(10)
  const max = ref(0)

  watch(() => props.data, () => {
    props.data.forEach(item => {
      if (item.jtzs < min.value) {
        min.value = item.jtzs
      }

      if (item.jtzs > max.value) {
        max.value = item.jtzs
      }
    })
  }, {
    immediate: true,
    deep: true
  })
  const getStatus = data => {
    const fd = status.find(item => item.name === data.yddj)
    const width = (min.value ? 1 / (data.jtzs / min.value) : 0) * 100
    return { ...fd, width }
  }
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: .24rem;

  .unit {
    margin-bottom: .12rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }

  .bar-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: .22rem;
    margin-bottom: .08rem;

    &:last-of-type {
      margin-bottom: 0;
    }

    .area-name {
      flex: 0 0 .66rem;
      margin-right: .07rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      white-space: nowrap;
    }

    .bar {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      margin-right: .08rem;

      .horizon-bar {
        height: .16rem;
        margin-right: .08rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .data {
        margin-left: .1rem;
        color: #fff;
        font-family: DINCondensed-Bold;
        font-size: .14rem;
        font-weight: 700;
      }
    }

    .status {
      flex: 0 0 .68rem;
      padding: .01rem .1rem;
      margin-left: .18rem;
      font-family: "PingFang SC";
      font-size: .12rem;
      font-weight: 400;
      line-height: .16rem;
      text-align: center;
      white-space: nowrap;
      border: solid 1px;
      border-radius: .25rem;

      &.goodTraffic {
        color: #1ec817;
        background-color: rgba(#1ec817, .23);
        border-color: rgba(#1ec817, .8);
      }

      &.normalTraffic {
        color: #00ff92;
        background-color: rgba(#00ff92, .23);
        border-color: rgba(#00ff92, .8);
      }

      &.slowTraffic {
        color: #f9e900;
        background-color: rgba(#f9e900, .23);
        border-color: rgba(#f9e900, .8);
      }

      &.littleBusyTraffic {
        color: #ffb713;
        background-color: rgba(#ffb713, .23);
        border-color: rgba(#ffb713, .8);
      }

      &.busyTraffic {
        color: #ff4d21;
        background-color: rgba(#ff4d21, .23);
        border-color: rgba(#ff4d21, .8);
      }
    }
  }
}
</style>
