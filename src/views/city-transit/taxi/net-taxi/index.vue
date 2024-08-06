<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-05 11:06:33
 * @LastEditTime: 2022-12-13 09:08:18
 * @FilePath: \traffic-web\src\views\city-transit\taxi\net-taxi\index.vue
 * @Description: FilePath
-->
<template>
  <div class="net-taxi-wrapper">
    <div class="left">
      <div>
        <base-panel title="车辆统计">
          <taxi-count
            :data="cltjyxtsData"
            @showDetail="showDetail"
          />
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
          <today-running-status :data="cltjyxtsData" />
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
    <pop-ups
      v-model:value="popupInfo.visible"
      title="本月网约平台订单数"
      height="8rem"
      width="15.36rem"
    >
      <pop-table />
    </pop-ups>
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
  import PopUps from '@/components/popUps'
  import PopTable from './components/pop-table.vue'

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
  const popupInfo = reactive({})
  const config = reactive([
    {
      name: '在线车辆',
      otherName: '网约车在线车辆',
      color: '#54B5FF',
      data: [],
      unit: '客运量：万辆'
    },
    {
      name: '上周同期',
      otherName: '网约车上周同期',
      color: '#F9E900',
      data: []
    }
  ])

  const config2 = reactive([
    {
      name: '实时客流',
      otherName: '网约出租车实时客流量',
      color: '#54B5FF',
      data: [],
      unit: '客运量：万人次'
    },
    {
      name: '上周同期',
      otherName: '网约出租车上周同期客流量',
      color: '#F9E900',
      data: []
    }
  ])

  // 实时客运量变化趋势
  const gdjtSskylbhqsData = ref([])
  const getGdjtgjczcsskylbhqs = () => {
    gdjtgjczcsskylbhqs('wyczc').then(res => {
      gdjtSskylbhqsData.value = res || []
    })
  }
  // 出租车在线率
  const czczxclData = ref([])
  const getczczxclData = () => {
    czczxcl('wyc').then(res => {
      czczxclData.value = res || []
    })
  }
  const showDetail = info => {
    console.log(info)
    popupInfo.visible = true
  }

  onMounted(() => {
    getGdjtgjczcsskylbhqs()
    getczczxclData()
  })
</script>

<style lang="less" scoped>
.net-taxi-wrapper {
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
