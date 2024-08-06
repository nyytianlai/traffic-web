<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-05 11:06:33
 * @LastEditTime: 2022-12-13 09:08:05
 * @FilePath: \traffic-web\src\views\city-transit\taxi\cruising-taxi\index.vue
 * @Description: FilePath
-->
<template>
  <div class="cruising-taxi-wrapper">
    <div class="left">
      <div>
        <base-panel title="车辆统计">
          <taxi-count :data="cltjyxtsData" />
        </base-panel>
      </div>
      <div>
        <base-panel title="车辆上线">
          <online-taxi
            :config="config"
            :data="czczxclData"
          />
        </base-panel>
      </div>
    </div>
    <div>
      <map-view
        :data="gqgdgjczcqkData"
        :czczb="glxclfbzbData"
      />
    </div>
    <div class="right">
      <div>
        <base-panel title="今日运行态势">
          <today-running-status
            :data="cltjyxtsData"
            type-name="巡游出租车"
          />
        </base-panel>
      </div>
      <div>
        <base-panel title="出租车实时总客运量趋势变化">
          <online-taxi
            :config="config2"
            :data="gdjtSskylbhqsData"
          />
        </base-panel>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import OnlineTaxi from '../components/online-taxi'
  import TodayRunningStatus from '../components/today-running-status'
  import TaxiCount from './components/taxi-count'
  import MapView from './components/map-view'
  import { gdjtgjczcsskylbhqs } from '@/api/modules/city-transit/cityTrack'
  import { czczxcl } from '@/api/modules/city-transit/taxi'
  defineProps({
    cltjyxtsData: {
      type: Array,
      default: () => ([])
    },
    gqgdgjczcqkData: {
      type: Array,
      default: () => ([])
    },
    glxclfbzbData: {
      type: Array,
      default: () => ([])
    }
  })
  const config = reactive([
    {
      name: '在线车辆',
      otherName: '巡游车在线车辆',
      color: '#54B5FF',
      data: [],
      unit: '客运量：万辆'
    },
    {
      name: '上周同期',
      otherName: '巡游车上周同期',
      color: '#F9E900',
      data: []
    }
  ])

  const config2 = reactive([
    {
      name: '实时客流',
      otherName: '巡游出租车实时客流量',
      color: '#54B5FF',
      data: [],
      unit: '客运量：万人次'
    },
    {
      name: '上周同期',
      otherName: '巡游出租车上周同期客流量',
      color: '#F9E900',
      data: []
    }
  ])

  // 实时客运量变化趋势
  const gdjtSskylbhqsData = ref([])
  const getGdjtgjczcsskylbhqs = () => {
    gdjtgjczcsskylbhqs('xyczc').then(res => {
      gdjtSskylbhqsData.value = res || []
    })
  }
  // 出租车在线率
  const czczxclData = ref([])
  const getczczxclData = () => {
    czczxcl('xyc').then(res => {
      czczxclData.value = res || []
    })
  }
  onMounted(() => {
    getGdjtgjczcsskylbhqs()
    getczczxclData()
  })
</script>

<style lang="less" scoped>
.cruising-taxi-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  column-gap: .24rem;
  grid-template-columns: 4.32rem 1fr 4.32rem;

   > div {
    min-height: 0;
  }

  .left,
  .right {
    display: grid;

    grid-template-rows: 3.38rem 1fr;
    row-gap: .24rem;

     > div {
      min-height: 0;
    }
  }
}
</style>
