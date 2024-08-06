<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-12-13 09:14:29
 * @FilePath: \traffic-web\src\views\city-transit\taxi\index.vue
 * @Description: FilePath
-->
<template>
  <div class="taxi-wrapper">
    <div class="top-select">
      <RadioList
        v-model:value="selectedRadio"
        :radio-list="radioList"
      />
    </div>
    <div class="content">
      <!-- <keep-alive>
        <component
          :is="selectedRadio"
          :key="selectedRadio"
        />
      </keep-alive> -->
      <component
        :is="selectedRadio"
        :key="selectedRadio"
        :cltjyxts-data="cltjyxtsData"
        :gqgdgjczcqk-data="gqgdgjczcqkData"
        :glxclfbzb-data="glxclfbzbData"
      />
    </div>
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        道路交通运行指挥系统
      </div>
    </div>
  </div>
</template>
<script>
  import RadioList from '@/components/radio-list/index'
  import NetTaxi from './net-taxi'
  import CruisingTaxi from './cruising-taxi'
  import { cltjyxts, glxclfbzb, wycptddxq } from '@/api/modules/city-transit/taxi'
  import { gqgdgjczcqk } from '@/api/modules/city-transit/cityTrack'

  export default defineComponent({
    components: {
      RadioList,
      CruisingTaxi,
      NetTaxi
    },
    setup () {
      const radioList = [
        {
          name: '巡游车出租车',
          value: 'CruisingTaxi',
          component: 'CruisingTaxi'
        },
        {
          name: '网约车出租车',
          value: 'NetTaxi',
          component: 'NetTaxi'
        }
      ]
      const selectedRadio = ref(radioList[0].value)

      // 车辆统计/运行态势
      const cltjyxtsData = ref([])
      const getcltjyxtsData = () => {
        cltjyxts().then(res => {
          cltjyxtsData.value = res || []
        })
      }

      // 各类型车辆分布坐标
      const glxclfbzbData = ref([])
      const getglxclfbzbData = () => {
        glxclfbzb().then(res => {
          glxclfbzbData.value = res || []
        })
      }

      // 网约车平台订单详情
      const wycptddxqData = ref([])
      const getwycptddxqData = () => {
        wycptddxq().then(res => {
          wycptddxqData.value = res || []
        })
      }

      // 各区轨道公交出租车情况
      const gqgdgjczcqkData = ref([])
      const getgqgdgjczcqkData = () => {
        gqgdgjczcqk().then(res => {
          gqgdgjczcqkData.value = res || []
        })
      }

      onMounted(() => {
        getcltjyxtsData()
        getglxclfbzbData()
        getwycptddxqData()
        getgqgdgjczcqkData()
      })

      return {
        selectedRadio,
        radioList,
        cltjyxtsData,
        gqgdgjczcqkData,
        glxclfbzbData
      }
    }
  })
</script>

<style lang="less" scoped>
.taxi-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: .22rem 1fr;
  row-gap: .24rem;

  .top-select {
    min-height: 0;
  }

  .content {
    min-height: 0;
  }
  .data-from {
    position: absolute;
    bottom: -0.36rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 .6rem;
     > div {
      color: #54b5ff;
      font-family: "PingFang SC";
      font-size: .14rem;
      font-weight: 400;
      line-height: .2rem;
      text-transform: uppercase;
    }
  }
}
</style>
