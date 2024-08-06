<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-16 16:54:04
 * @LastEditTime: 2023-01-03 11:51:34
 * @FilePath: \traffic-web\src\views\transportation-means\facilities-maintain\components\distribute-change.vue
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
      default: () => ([])
    }
  })
  const date = computed(() => props.data[0]?.sbsj ? moment(props.data[0].sbsj).format('YYYY-MM-DD') : '-')
  const config = computed(() => {
    const data2 = [...props.data]
    data2.sort((a, b) => Number(a.sjwd) - Number(b.sjwd))
    return [
      {
        name: '微小',
        colorArray: ['rgba(84, 181, 255, 0.2)', 'rgba(84, 181, 255, 0.4)', 'rgba(84, 181, 255, 0.9)', 'rgba(84, 181, 255, 1)'],
        unit: '件',
        dataCode: 'wx'
      },
      {
        name: '中等',
        colorArray: ['rgba(0, 255, 249, 0.2)', 'rgba(0, 255, 249, 0.4)', 'rgba(0, 255, 249, 0.9)', 'rgba(0, 255, 249, 1)'],
        unit: '件',
        dataCode: 'zd'
      },
      {
        name: '大型',
        colorArray: ['rgba(249, 233, 0, 0.2)', 'rgba(249, 233, 0, 0.4)', 'rgba(249, 233, 0, 0.9)', 'rgba(249, 233, 0, 1)'],
        unit: '件',
        dataCode: 'dx'
      },
      {
        name: '超大型',
        colorArray: ['rgba(0, 255, 146, 0.2)', 'rgba(0, 255, 146, 0.4)', 'rgba(0, 255, 146, 0.9)', 'rgba(0, 255, 146, 1)'],
        unit: '件',
        dataCode: 'cdx'
      }
    ].map(item => ({
    ...item,
    data: data2.map(obj => [obj.sjwd, obj[item.dataCode]])
    }))
  })
</script>
