<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-11 12:15:24
 * @LastEditTime: 2022-11-25 15:59:27
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\traffic-accident\components\accident-trend.vue
 * @Description: FilePath
-->
<template>
  <BaseTrendChart
    :data="data"
    data-code="jtsg"
  />
</template>

<script setup>
  import BaseTrendChart from '../../components/base-trend-chart'
  defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
</script>
