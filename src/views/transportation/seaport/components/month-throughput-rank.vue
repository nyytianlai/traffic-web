<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-07 16:43:56
 * @LastEditTime: 2022-12-13 14:21:15
 * @FilePath: \traffic-web\src\views\transportation\seaport\components\month-throughput-rank.vue
 * @Description: FilePath
-->
<template>
  <div class="throughput-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="日"
          :date="date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="unit">
      单位：万标准箱
    </div>
    <div class="chart-container">
      <div
        v-for="item in configData"
        :key="item.name"
        class="bar-item"
      >
        <div class="name">
          {{ item.name }}
        </div>
        <bar-3d-item
          direction="to right"
          :color="item.color"
          :width="getWidth(item.count)"
        />
        <div class="data">
          {{ formatNumStr(item.count) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import Bar3dItem from '@/components/bar-3d-item'

  import utils from '@/hooks/utils'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const colorMap = {
    深圳港: ['rgba(249, 233, 0, 0.900295)', 'rgba(249, 233, 0, 0.0001)'],
    default: ['rgba(84, 181, 255, 0.900295)', 'rgba(5, 133, 250, 0.0001)']
  }
  const date = computed(() => props.data[0]?.ywsj ? props.data[0]?.ywsj : '-')

  const configData = computed(() => {
    return props.data.map(item => ({
    ...item,
    name: item.kjwd,
    count: Number(item.zbz) || 0,
    color: colorMap[item.kjwd] || colorMap.default
    }))
  })

  const dataMin = ref(Infinity)
  const dataMax = ref(0)

  watch(() => configData.value, () => {
    (configData.value || []).forEach(item => {
      if (+item.count < +dataMin.value) {
        dataMin.value = item.count
      }

      if (+item.count > +dataMax.value) {
        dataMax.value = item.count
      }
    })
  }, {
    immediate: true,
    deep: true
  })

  const min = 0.2

  const getWidth = data => {
    const newMin = Math.min(dataMin.value, dataMax.value * min)
    const dt = Math.max(data, newMin)
    const width = `${(min + (dt - newMin) / dataMax.value) * (1 - min) * 100}%`
    return width
  }
</script>

<style lang="less" scoped>
.throughput-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 .24rem;
    margin-top: .12rem;
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

  .unit {
    padding-right: .24rem;
    margin-bottom: .12rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .14rem;
    font-weight: 400;
    line-height: .2rem;
    text-align: right;
  }

  .chart-container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    overflow-y: auto;
    min-width: 0;
    padding: 0 .24rem;

    .bar-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: .18rem;
      margin-bottom: .08rem;

      &:last-of-type {
        margin-bottom: 0;
      }

      .name {
        flex: 0 0 .9rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        white-space: nowrap;
      }

      .data {
        margin-left: .1rem;
        color: #fff;
        font-family: DINCondensed-Bold;
        font-size: .14rem;
        font-weight: 700;
      }
    }
  }
}
</style>
