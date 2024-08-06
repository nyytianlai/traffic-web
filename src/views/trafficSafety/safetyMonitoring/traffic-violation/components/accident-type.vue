<template>
  <base-pie
    total-name="本月交通违章"
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
  import orangeArc from '@/assets/images/orange-arc.png'
  import redArc from '@/assets/images/red-arc.png'
  defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const config = [
    {
      name: '闯红灯',
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
      name: '超速',
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
      name: '无证驾驶',
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
      name: '酒驾',
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
    },
    {
      name: '超载',
      dataIndex: 4,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: 'rgba(255, 183, 19, 0.7)'
          },
          {
            offset: 0,
            color: 'rgba(255, 183, 19, 0.0001)'
          }
        ]),
        borderColor: 'rgba(255, 183, 19, 1)',
        borderWidth: 1
      },
      value: '',
      icon: orangeArc,
      percentVl: '',
      unit: '件'
    },
    {
      name: '其他',
      dataName: '其他交通违章',
      dataIndex: 5,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 1,
            color: 'rgba(255, 77, 33, 0.7)'
          },
          {
            offset: 0,
            color: 'rgba(255, 77, 33, 0.0001)'
          }
        ]),
        borderColor: 'rgba(255, 77, 33, 1)',
        borderWidth: 1
      },
      value: '',
      icon: redArc,
      percentVl: '',
      unit: '件'
    }
  ]
</script>
