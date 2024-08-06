<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-11 13:03:18
 * @LastEditTime: 2022-11-21 18:25:19
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\traffic-accident\components\accident-level.vue
 * @Description: FilePath
-->
<template>
  <base-pie
    total-name="本月交通事故数"
    :config="config"
    :data="data"
  />
</template>

<script setup>
  import * as echarts from 'echarts/lib/echarts'
  import BasePie from '../../components/base-pie.vue'
  import blueArc from '@/assets/images/blue-arc.png'
  import greenArc1 from '@/assets/images/green-arc1.png'
  import greenArc2 from '@/assets/images/green-arc2.png'
  import yellowArc from '@/assets/images/yellow-arc.png'
  defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const config = [
    {
      name: '轻微事故',
      dataIndex: 0,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: 'rgba(0, 83, 255, 0.7)'
          },
          {
            offset: 0,
            color: 'rgba(0, 83, 255, 0.0001)'
          }
        ]),
        borderColor: 'rgba(0, 83, 255, 1)',
        borderWidth: 1
      },
      value: '',
      icon: blueArc,
      percentVl: '',
      unit: '件'
    },
    {
      name: '一般事故',
      dataIndex: 1,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: 'rgba(0, 255, 249, 0.7)'
          },
          {
            offset: 0,
            color: 'rgba(0, 255, 249, 0.0001)'
          }
        ]),
        borderColor: 'rgba(0, 255, 249, 1)',
        borderWidth: 1
      },
      value: '',
      icon: greenArc1,
      percentVl: '',
      unit: '件'
    },
    {
      name: '特大事故',
      dataIndex: 2,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: 'rgba(0, 255, 146, 0.7)'
          },
          {
            offset: 0,
            color: 'rgba(0, 255, 146, 0.0001)'
          }
        ]),
        borderColor: 'rgba(0, 255, 146, 1)',
        borderWidth: 1
      },
      value: '',
      icon: greenArc2,
      percentVl: '',
      unit: '件'
    },
    {
      name: '重大事故',
      dataIndex: 3,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: 'rgba(249, 233, 0, 0.7)'
          },
          {
            offset: 0,
            color: 'rgba(249, 233, 0, 0.0001)'
          }
        ]),
        borderColor: 'rgba(249, 233, 0, 1)',
        borderWidth: 1
      },
      value: '',
      icon: yellowArc,
      percentVl: '',
      unit: '件'
    }
  ]
</script>
