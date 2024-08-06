<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-16 16:54:04
 * @LastEditTime: 2023-01-03 11:25:51
 * @FilePath: \traffic-web\src\views\transportation-means\facilities-maintain\components\affair-change.vue
 * @Description: FilePath
-->
<template>
  <stack-bar
    :config="config"
    :date="date"
  />
</template>

<script setup>
  import StackBar from './stack-bar.vue'
  import moment from 'moment'
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const date = computed(() =>
    props.data[0]?.report_date || '-'
  )
  const config = computed(() => {
    const data2 = [...props.data]
    data2.sort((a, b) => Number(a.year) - Number(b.year))
    return [
      {
        name: '养护事件',
        colorArray: [
          'rgba(84, 181, 255, 0.2)',
          'rgba(84, 181, 255, 0.4)',
          'rgba(84, 181, 255, 0.9)',
          '#54B5FF'
        ],
        unit: '件',
        data: data2.map((item) => [item.year, item.total])
      }
    ]
  })
</script>
