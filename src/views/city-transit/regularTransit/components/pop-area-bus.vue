<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-02 14:39:58
 * @LastEditTime: 2022-12-07 10:47:12
 * @FilePath: \traffic-web\src\views\city-transit\regularTransit\components\pop-area-bus.vue
 * @Description: FilePath
-->

<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        2022-08-17
        <DataTypeBtn
          type="年"
          :show-drop="false"
          drop-info="2022-10-31"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-wrapper">
      <Bar3D
        :config="config"
        :x-axis="areaList"
        :show-legend="true"
      />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import Bar3D from '@/components/bar-3d'
  import barBlue from '@/assets/images/bar-blue.png'
  import barYellow from '@/assets/images/bar-yellow.png'
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const areaList = ['福田区', '罗湖区', '盐田区', '南山区', '宝安区', '龙岗区', '坪山区', '光明区', '大鹏区', '前海合作区', '深汕合作区']
  const config = computed(() => {
    return [
      {
        name: '公交场站',
        colorArr: ['rgba(84, 181, 255, 0.2)', 'rgba(84, 181, 255, 0.4)', 'rgba(84, 181, 255, 0.9)', 'rgba(84, 181, 255, 1)'],
        icon: barBlue,
        unit: '个',
        data: areaList.map((key) => {
          const fd = props.data.find(item => item.xzqh === key)
          return fd?.gjczs
        })
      },
      {
        name: '充电站',
        colorArr: ['rgba(249, 233, 0, 0.2)', 'rgba(249, 233, 0, 0.4)', 'rgba(249, 233, 0, 0.9)', 'rgba(249, 233, 0, 1)'],
        icon: barYellow,
        unit: '个',
        data: areaList.map((key) => {
          const fd = props.data.find(item => item.xzqh === key)
          return fd?.gjcdzs
        })
      }
    ]
  })
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
