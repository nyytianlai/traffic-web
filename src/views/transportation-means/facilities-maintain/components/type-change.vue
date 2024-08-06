<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-16 16:54:04
 * @LastEditTime: 2023-01-03 11:40:00
 * @FilePath: \traffic-web\src\views\transportation-means\facilities-maintain\components\type-change.vue
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

  const dataList = [
    {
      name: '路基路面',
      colorArray: [
        'rgba(84, 181, 255, 0.2)',
        'rgba(84, 181, 255, 0.4)',
        'rgba(84, 181, 255, 0.9)',
        'rgba(84, 181, 255, 1)'
      ],
      unit: '件'
    },
    {
      name: '桥梁',
      colorArray: [
        'rgba(0, 255, 249, 0.2)',
        'rgba(0, 255, 249, 0.4)',
        'rgba(0, 255, 249, 0.9)',
        'rgba(0, 255, 249, 1)'
      ],
      unit: '件'
    },
    {
      name: '隧道',
      colorArray: [
        'rgba(249, 233, 0, 0.2)',
        'rgba(249, 233, 0, 0.4)',
        'rgba(249, 233, 0, 0.9)',
        'rgba(249, 233, 0, 1)'
      ],
      unit: '件'
    },
    {
      name: '边坡挡墙',
      colorArray: [
        'rgba(0, 255, 146, 0.2)',
        'rgba(0, 255, 146, 0.4)',
        'rgba(0, 255, 146, 0.9)',
        'rgba(0, 255, 146, 1)'
      ],
      unit: '件'
    },
    {
      name: '电梯',
      colorArray: [
        'rgba(0, 83, 255, 0.2)',
        'rgba(0, 83, 255, 0.4)',
        'rgba(0, 83, 255, 0.9)',
        'rgba(0, 83, 255, 1)'
      ],
      unit: '件'
    },
    {
      name: '地下通道',
      colorArray: [
        'rgba(255,77,33, 0.2)',
        'rgba(255,77,33, 0.4)',
        'rgba(255,77,33, 0.9)',
        'rgba(255,77,33, 1)'
      ],
      unit: '件'
    }
  ]

  const date = computed(() =>
    props.data[0]?.report_date ? props.data[0].report_date : '-'
  )
  const config = computed(() => {
    const data2 = [...props.data]
    const series = []
    data2.sort((a, b) => Number(a.year) - Number(b.year))
    const dataMap = {}
    const yearList = [...new Set(data2.map((item) => item.year))]
    data2.forEach((item) => {
      dataMap[item.facility_type] = dataMap[item.facility_type] || []
      dataMap[item.facility_type].push(item)
    })
    dataList.forEach((item) => {
      const data = Object.keys(dataMap).find(
        (key) => key.includes(item.name) || key.includes(item.otherName)
      )
      if (data) {
        series.push({
        ...item,
        data: new Array(yearList.length).fill(1).map((i, n) => {
          const fd = dataMap[data]?.find((o) => o.year === yearList[n])
          return [yearList[n], fd?.total]
        })
        })
      }
    })
    return series
  })
</script>
