<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-09 15:23:09
 * @LastEditTime: 2023-01-03 14:22:27
 * @FilePath: \traffic-web\src\views\transportation-means\parking-resources\components\saturation-change.vue
 * @Description: FilePath
-->
<template>
  <stack-bar
    :config="config"
    date-type="月"
    :show-legend="false"
    :show-drop="true"
    :date="date"
  />
</template>

<script setup>
  import StackBar from '@/views/transportation-means/facilities-maintain/components/stack-bar.vue'
  import moment from 'moment'
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    ljData: {
      type: Array,
      default: () => ([])
    },
    isActive: {
      type: Boolean,
      default: false
    }
  })

  const date = computed(() => props.data[0]?.sbsj ? props.data[0].sbsj : '-')
  const areaList = ['福田区', '罗湖区', '盐田区', '南山区', '宝安区', '龙岗区', '坪山区', '光明区', '大鹏区', '前海合作区', '深汕合作区']

  // const data = computed(() => {
  //   return areaList.map(item => {
  //     const fd = props.data.find(obj => obj.xzqh === item)
  //     return fd ? fd[selectRadio.value] : null
  //   })
  // })

  const config = [
    {
      name: '已用',
      colorArray: ['rgba(84, 181, 255, 0.2)', 'rgba(84, 181, 255, 0.4)', 'rgba(84, 181, 255, 0.9)', 'rgba(84, 181, 255, 1)'],
      unit: '个',
      data: areaList.map(item => ([item, Math.round(Math.random() * 10)]))
    },
    {
      name: '停用',
      colorArray: ['rgba(249, 233, 0, 0.2)', 'rgba(249, 233, 0, 0.4)', 'rgba(249, 233, 0, 0.9)', 'rgba(249, 233, 0, 1)'],
      unit: '个',
      data: areaList.map(item => ([item, Math.round(Math.random() * 10)]))
    }
  ]
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .12rem;
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
