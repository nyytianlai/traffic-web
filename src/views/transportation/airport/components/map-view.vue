<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-08 15:00:18
 * @LastEditTime: 2022-12-15 10:54:36
 * @FilePath: \traffic-web\src\views\transportation\airport\components\map-view.vue
 * @Description: FilePath
-->
<template>
  <div class="map-view-wrapper">
    <map-tools
      style="top: 10px"
      class="map-tools"
      :default="activeMap.code"
      :all-layers="allLayers"
      @handleRefresh="handleRefresh"
      @handleItem="handleItem"
    />
    <div
      v-if="activeMap.code === allLayers[0].code"
      class="word-echarts-map"
    >
      <ChinaFlowMap :geo-coord-map="chinaCoord" />
    </div>
    <div
      v-if="activeMap.code === allLayers[1].code"
      class="china-echarts-map"
    >
      <WorldEchartsGl :geo-coord-map="wordCoord" />
    </div>
    <div class="map-legend">
      <div class="legend-title">
        图例
      </div>
      <div
        v-for="item in legend"
        :key="item.name"
        class="check-legend-item"
        @click="item.isChecked = !item.isChecked"
      >
        <div
          class="check-box"
          :class="{ checked: item.isChecked }"
        />
        <div class="legend-icon">
          <div
            class="legend-circle"
            :class="item.class"
          />
        </div>
        <div class="legend-name">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div
      class="important-car-card"
      :style="{ top: '1.2rem' }"
    >
      <div
        v-show="activeMap.code === allLayers[1].code"
        class="card-item"
        style="padding-bottom: 0"
      >
        <div class="car-left">
          <img src="@/assets/images/hangban.png">
        </div>
        <div class="car-right">
          <div class="title">
            国际客运航线通航国家
          </div>
          <div class="num">
            <div class="data">
              {{ formatData('国际客运航线通航国家') }}
            </div>
            <div class="unit">
              个
            </div>
          </div>
        </div>
      </div>
      <div class="card-item">
        <div class="car-left">
          <img
            :src="
              require(`@/assets/images/${
                activeMap.code === allLayers[1].code ? 'guoji.png' : 'hangban.png'
              }`)
            "
          >
        </div>
        <div class="car-right">
          <div class="title">
            {{ activeMap.name }}
          </div>
          <div class="num">
            <div class="data">
              {{ formatData(activeMap.name, activeMap.dataName) }}
            </div>
            <div class="unit">
              个
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import MapTools from '@/components/map-tools'
  import ChinaFlowMap from '@/components/china-echarts-gl'
  import WorldEchartsGl from '@/components/world-echarts-gl'
  // import { chinesegeoCoordMap, wordGeoCoordMap } from '@/utils/constants'
  import utils from '@/hooks/utils'
  import { airportCityOrCountryNumber } from '@/api/modules/transportation/airport'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })

  const formatData = (name, dataName) => {
    const fd = countData.value.find((obj) => obj.indicators === name || obj.indicators === dataName)
    return formatNumStr(fd?.numerical) || '-'
  }
  const allLayers = [
    {
      name: '国内通航城市',
      dataName: '通航国内城市数',
      code: 1
    },
    {
      name: '国际通航城市',
      dataName: '国际客运航线通航城市',
      code: 2
    }
  ]
  const legend = [
    {
      name: '货运',
      class: 'keyun',
      isChecked: true
    },
    {
      name: '客运',
      class: 'huoyun',
      isChecked: true
    }
  ]
  const chinaCoord = computed(() => {
    const arr = props.data.filter((item) => item.gjgn === '国内')
    const obj = {}
    arr.forEach((item) => {
      if (item.mc && item.zb) {
        obj[item.mc] = item.zb.split(' ')
      }
    })
    return obj
  })

  const wordCoord = computed(() => {
    const arr = props.data.filter((item) => item.gjgn === '国际')
    const obj = {}
    arr.forEach((item) => {
      if (item.mc && item.zb) {
        obj[item.mc] = item.zb.split(' ')
      }
    })
    return obj
  })
  const activeMap = ref(allLayers[0])
  const countData = ref([])

  const getCardData = async () => {
    const res = await airportCityOrCountryNumber()
    countData.value = res
    console.log(res, '1111')
  }

  const handleItem = (item) => {
    activeMap.value = item
  }
  const handleRefresh = () => { }
  getCardData()
</script>

<style lang="less" scoped>
.map-view-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .map-tools {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .china-echarts-map,
  .word-echarts-map {
    width: 100%;
    height: 100%;
  }

  .important-car-card {
    position: absolute;
    left: 0;
    background: rgba(55, 97, 232, .22);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px #294cb3;
    border: 1.4px solid #0085ff;

    .card-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: .24rem .42rem .24rem .16rem;
    }

    .car-left {
      flex: 0 0 .64rem;
      height: .64rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .car-right {
      display: flex;
      flex-flow: column nowrap;
      margin-left: .12rem;

      .title {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 500;
        line-height: .22rem;
        white-space: nowrap;
      }

      .num {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;

        .data {
          margin-right: .08rem;
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .36rem;
          font-weight: 700;
          line-height: .43rem;
          text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
        }

        .unit {
          color: #00fff9;
          font-family: "PingFang SC";
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
        }
      }
    }
  }
}
.map-legend {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1.2rem;
  padding: .12rem;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .28);
  border-radius: 4px;

  .legend-title {
    margin-bottom: .12rem;
    color: #cae8ff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }

  .check-legend-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .08rem;
    cursor: pointer;

    &:last-of-type {
      margin-bottom: 0;
    }

    .legend-icon {
      width: .08rem;
      height: .08rem;
      margin-right: .08rem;

      .legend-circle {
        width: .08rem;
        height: .08rem;
        border-radius: 50%;

        &.huoyun {
          background: linear-gradient(131.12deg, #00e67b 21.41%, #d3ffe0 93.29%);
          box-shadow: 0 0 5px #00d57a;
        }

        &.keyun {
          background: linear-gradient(131.12deg, #fbb842 21.41%, #ffebd3 93.29%);
          box-shadow: 0 0 5px #feddab;
        }
      }
    }

    .check-box {
      flex: 0 0 .14rem;
      height: .14rem;
      margin-right: .08rem;
      border: 1px solid #54b5ff;
      border-radius: 2px;

      &.checked {
        position: relative;
        background: #54b5ff;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: .08rem;
          height: .04rem;
          border-bottom: solid 1.4px rgba(#000);
          border-left: solid 1.4px rgba(#000);
          transform: translate(-55%, -75%) rotate(-45deg);
        }
      }
    }

    .legend-name {
      color: #54b5ff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      line-height: .22rem;
      white-space: nowrap;
    }
  }
}
</style>
