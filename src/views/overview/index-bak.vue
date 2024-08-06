<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-01 11:14:18
 * @LastEditTime: 2022-12-12 11:21:22
 * @FilePath: \traffic-web\src\views\overview\index-bak.vue
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
        <bottom-card
          :config="item"
          :data="jtzlgkData"
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
  import BottomCard from './components/bottomCard.vue'
  import MapView from './components/map.vue'
  import { jtzlgk } from '@/api/modules/overview'

  const bottomConfig = [
    {
      name: '道路交通',
      icon: roadIcon,
      dateType: '日',
      bgSize: '1.61rem 0.85rem',
      dataArr: [
        {
          name: '全市工作日高峰时段',
          unit: '公里/小时'
        },
        {
          name: '中心城区工作日高峰时段',
          extra: '',
          unit: '公里/小时'
        }
      ]
    },
    {
      name: '城市公交',
      icon: busIcon,
      dateType: '日',
      bgSize: '0.89rem 1.02rem',
      dataArr: [
        {
          name: '轨道交通日均客运量',
          unit: '万人次'
        },
        {
          name: '常规公交日均客运量',
          extra: '',
          unit: '公里/小时'
        }
      ]
    },
    {
      name: '交通安全',
      dateType: '日',
      bgSize: '0.76rem 0.94rem',
      icon: safeBulbIcon,
      dataArr: [
        {
          name: '机动车保有量',
          unit: '万辆'
        },
        {
          name: '机动车驾驶人保有量',
          extra: '',
          unit: '万人'
        }
      ]
    },
    {
      name: '道路运输',
      dateType: '日',
      bgSize: '1.61rem 0.85rem',
      icon: roadIcon,
      dataArr: [
        {
          name: '两客一危',
          unit: '辆'
        },
        {
          name: '货运量',
          extra: '',
          unit: '公里/小时'
        }
      ]
    },
    {
      name: '海港',
      dateType: '日',
      icon: seaportIcon,
      bgSize: '0.98rem 0.98rem',
      dataArr: [
        {
          name: '集装箱吞吐量',
          extra: '集装箱吞吐量全国第',
          unit: '万标准箱'
        },
        {
          name: '货物吞吐量',
          extra: '',
          unit: '亿吨'
        }
      ]
    },
    {
      name: '空港',
      dateType: '日',
      icon: planeIcon,
      dataArr: [
        {
          name: '旅客吞吐量',
          extra: '旅客吞吐量全国第',
          unit: '万标准箱'
        },
        {
          name: '货邮吞吐量',
          extra: '',
          unit: '亿吨'
        }
      ]
    },
    {
      name: '铁路',
      dateType: '日',
      icon: railwayIcon,
      dataArr: [
        {
          name: '旅客发送量',
          extra: '',
          unit: '万人次'
        },
        {
          name: '货物发送量',
          extra: '',
          unit: '万吨'
        }
      ]
    }
  ]

  const jtzlgkData = ref([])
  const getJtzlgkData = () => {
    jtzlgk().then(res => {
      jtzlgkData.value = res || []
    })
  }

  onMounted(() => {
    getJtzlgkData()
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
      min-height: 0;
    }
  }

  .map-container {
    min-height: 0;
  }
}
</style>
