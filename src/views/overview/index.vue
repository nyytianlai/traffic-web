<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-01 11:14:18
 * @LastEditTime: 2023-01-03 15:58:16
 * @FilePath: \traffic-web\src\views\overview\index.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="map-container">
      <map-view />
    </div>
    <div class="bottom-wrapper">
      <base-panel
        v-for="item in bottomConfig"
        :key="item.name"
        :title="item.name"
      >
        <card-item
          :config="item"
          :data="jtzlgkData"
          :compare-data="tbhbsjData"
        />
      </base-panel>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import roadIcon from '@/assets/images/road.png'
  import busIcon from '@/assets/images/bus.png'
  import planeIcon from '@/assets/images/plane.png'
  import railwayIcon from '@/assets/images/railway.png'
  import seaportIcon from '@/assets/images/seaport.png'
  import safeBulbIcon from '@/assets/images/safe-bulb.png'
  import MapView from './components/map.vue'
  import CardItem from './components/card-item.vue'
  import Road from './components/road.vue'
  import CityTransit from './components/city-transit.vue'
  import TrafficSafety from './components/traffic-safety.vue'
  import Transportation from './components/transportation.vue'
  import { jtzlgk, tbhbsj } from '@/api/modules/overview'

  const bottomConfig = [
    {
      name: '道路交通',
      icon: roadIcon,
      dateType: '实时',
      bgSize: '1.61rem 0.85rem',
      showDate: false,
      component: Road,
      dataFrom: '数据来源：市交通运输局'
    },
    {
      name: '城市公交',
      icon: busIcon,
      dateType: '月',
      bgSize: '0.89rem 1.02rem',
      showDate: true,
      component: CityTransit,
      dataFrom: '数据来源：市交通运输局',
      config: [
        {
          name: '地铁月客流量',
          dataName: '地铁客流量',
          subTitle: '(2022年10月)',
          unit: '万人次',
          compareName: '环比',
          compareDataName: '地铁客流量环比'
        },
        {
          name: '公交月客流量',
          dataName: '公交客流量',
          subTitle: '(2022年1-10月)',
          unit: '万人次',
          compareName: '同比',
          compareDataName: '公交客流量同比'
        }
      ]
    },
    {
      name: '交通安全',
      dateType: '月',
      bgSize: '0.76rem 0.94rem',
      icon: safeBulbIcon,
      showDate: true,
      component: TrafficSafety,
      dataFrom: '数据来源：深圳交警'
    },
    {
      name: '道路运输',
      config: [
        {
          name: '道路',
          dataName: '道路'
        }
      ],
      dateType: '月',
      bgSize: '1.61rem 0.85rem',
      icon: roadIcon,
      showDate: true,
      component: Transportation,
      dataFrom: '数据来源：市交通运输局'
    },
    {
      name: '海港',
      dateType: '月',
      icon: seaportIcon,
      bgSize: '0.98rem 0.98rem',
      showDate: true,
      component: CityTransit,
      dataFrom: '数据来源：市交通运输局',
      config: [
        {
          name: '集装箱吞吐量',
          dataName: '港口集装箱吞吐量',
          subTitle: '(2022年1-10月)',
          unit: '万标准箱',
          compareName: '同比',
          compareDataName: '港口集装箱吞吐量同比'
        },
        {
          name: '货物吞吐量',
          dataName: '港口货物吞吐量',
          subTitle: '(2022年1-10月)',
          unit: '万吨',
          compareName: '同比',
          compareDataName: '港口货物吞吐量同比'
        }
      ]
    },
    {
      name: '空港',
      dateType: '月',
      icon: planeIcon,
      showDate: true,
      bgSize: '1.58rem 0.84rem',
      component: CityTransit,
      dataFrom: '数据来源：市交通运输局',
      config: [
        {
          name: '旅客周转量',
          dataName: '民航运输旅客周转量',
          subTitle: '(2022年10月)',
          unit: '万人公里',
          compareName: '环比',
          compareDataName: '民航运输旅客周转量环比'
        },
        {
          name: '货物周转量',
          dataName: '民航运输货物周转量',
          subTitle: '(2022年10月)',
          unit: '万吨公里',
          compareName: '环比',
          compareDataName: '民航运输货物周转量环比'
        }
      ]
    },
    {
      name: '铁路',
      dateType: '月',
      icon: railwayIcon,
      showDate: true,
      bgSize: '0.98rem 0.97rem',
      component: CityTransit,
      dataFrom: '数据来源：市交通运输局',
      config: [
        {
          name: '发送客运量',
          dataName: '铁路发送客运量',
          subTitle: '(2022年10月)',
          unit: '万人次',
          compareName: '环比',
          compareDataName: '铁路发送客运量环比'
        },
        {
          name: '发送货运量',
          dataName: '铁路发送货运量',
          subTitle: '(2022年10月)',
          unit: '万吨',
          compareName: '环比',
          compareDataName: '铁路发送货运量环比'
        }
      ]
    }
  ]

  const timer = ref()
  const jtzlgkData = ref([])
  const getJtzlgkData = () => {
    jtzlgk().then(res => {
      jtzlgkData.value = res || []
    // clearTimeout(timer.value)
    // timer.value = setTimeout(getJtzlgkData, 5 * 60 * 1000)
    })
  }

  const tbhbsjData = ref([])
  const gettbhbsjData = () => {
    tbhbsj().then(res => {
      tbhbsjData.value = res || []
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        gettbhbsjData()
        getJtzlgkData()
      }, 5 * 60 * 1000)
    })
  }

  onMounted(() => {
    getJtzlgkData()
    gettbhbsjData()
  })

  onBeforeUnmount(() => {
    clearTimeout(timer.value)
  })
</script>
<style lang="less" scoped>
.wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: 1fr 3.22rem;
  row-gap: .24rem;

  .bottom-wrapper {
    display: grid;
    min-height: 0;

    column-gap: .24rem;
    grid-template-columns: repeat(7, 1fr);

     > div {
      min-width: 0;
      min-height: 0;
    }
  }

  .map-container {
    min-height: 0;
  }
}
</style>
