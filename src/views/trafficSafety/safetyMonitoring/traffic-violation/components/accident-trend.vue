<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-14 09:03:19
 * @LastEditTime: 2022-11-22 08:52:00
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\traffic-violation\components\accident-trend.vue
 * @Description: FilePath
-->
<template>
  <base-trend-chart
    :data="data"
    data-code="jtwz"
  />
</template>

<script setup>
  import BaseTrendChart from '../../components/base-trend-chart.vue'
  defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
</script>
