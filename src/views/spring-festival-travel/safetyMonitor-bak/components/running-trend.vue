<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-16 11:08:17
 * @LastEditTime: 2022-11-23 17:20:51
 * @FilePath: \traffic-web\src\views\spring-festival-travel\safetyMonitor\components\running-trend.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        <DataTypeBtn
          type="实时"
          :show-drop="false"
          drop-info="2022-10-31"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-wrapper">
      <line-trend :data="lnqsdbData" />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import LineTrend from './line-trend.vue'
  import { cylnmrqs } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import { onMounted } from '@vue/runtime-core'

  // 历年趋势对比
  const lnqsdbData = ref([])
  const getLndsdbData = () => {
    cylnmrqs({ type: 'yxqs' }).then(res => {
      lnqsdbData.value = res || []
    })
  }

  onMounted(getLndsdbData)
</script>

<style lang="less" scoped>
.wrapper {
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
    margin-top: .24rem;
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

  .chart-wrapper {
    flex: 1;
    min-height: 0;
  }
}
</style>
