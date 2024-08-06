<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2023-01-03 15:02:57
 * @FilePath: \traffic-web\src\views\transportation\logistics\components\map.vue
 * @Description: FilePath
-->
<template>
  <div class="map-wrapper">
    <base-map
      v-show="activeMap.code === allLayers[0].code"
      :show-map-tool="false"
      @onload="mapload"
    >
      <div
        v-show="popUpInfo.show"
        ref="popUp"
        class="pop-container"
        :style="{left: `${popUpInfo.left}px`, top: `${popUpInfo.top}px`}"
      >
        <map-point-chart
          :data="popUpInfo.data"
          @handleDetail="handleDetail"
        />
      </div>
      <div
        v-show="detailVisible"
        class="car-detail"
      >
        <car-detail
          :data="popUpInfo.data"
          @close="detailVisible = false"
        />
      </div>
    </base-map>
    <map-tools
      style="top: 10px;"
      class="map-tools"
      :default="activeMap.code"
      @handleRefresh="handleRefresh"
      @handleItem="handleItem"
    />
    <!-- <div
      class="important-car-card"
      :style="{top: '1.2rem'}"
    >
      <div class="car-left">
        <svg-icon
          icon-class="important-car"
        />
      </div>
      <div class="car-right">
        <div class="title">
          {{ activeMap.name }}
        </div>
        <div class="num">
          <div class="data">
            {{ importCarCount }}
          </div>
          <div class="unit">
            辆
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div
      v-show="activeMap.code === allLayers[0].code"
      class="map-legend"
    >
      <div class="legend-title">
        车流量分布
      </div>
      <div class="legend-bar" />
      <div class="legend-label">
        <span>低</span>
        <span>高</span>
      </div>
    </div>
    <div
      v-show="activeMap.code === allLayers[0].code"
      class="checkbox-legend"
    >
      <div
        v-for="child in legendConfig"
        :key="child.name"
        class="legend-item-wrapper"
      >
        <div class="wrapper-name">
          {{ child.name }}
        </div>
        <div
          v-for="item in child.children"
          :key="item.name"
          class="check-legend-item"
          @click="handleLegend(item)"
        >
          <div
            class="check-box"
            :class="{checked: item.isChecked}"
          />
          <div class="legend-icon">
            <img :src="require(`@/assets/images/${item.icon}`)">
          </div>
          <div class="legend-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="activeMap.code !== allLayers[0].code"
      class="checkbox-legend"
    >
      <div
        v-for="item in flyLegendconfig"
        :key="item.name"
        class="check-legend-item"
        @click="handleLegend(item)"
      >
        <div
          class="check-box"
          :class="{checked: item.isChecked}"
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
    </div> -->
    <!-- <div
      v-if="activeMap.code === allLayers[1].code"
      class="guangdong-echarts-map"
    >
      <GuangDongMap
        :geo-coord-map="GDgeoCoordMap"
      />
      <div class="center-data">
        {{ shenzhenCarData }}
      </div>
    </div>
    <div
      v-if="activeMap.code === allLayers[2].code"
      class="china-echarts-map"
    >
      <ChinaFlowMap :geo-coord-map="QGgeoCoordMap" />
      <div class="center-data">
        {{ shenzhenCarData }}
      </div>
    </div> -->
  </div>
</template>

<script setup>
  import MapTools from '@/components/map-tools'
  // import ChinaFlowMap from '@/components/china-echarts-gl'
  // import GuangDongMap from '@/components/china-echarts-gl/flow-map'
  import MapPointChart from './map-point-chart.vue'
  import CarDetail from './car-detail.vue'
  import BaseMap from '@/components/base-map'
  import { zdcl } from '@/api/modules/transportation/logistics'
  import { gpsLocation } from '@/api/modules/transportation/overview.js'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const allLayers = [
    {
      name: '深圳市重点车辆',
      code: 0
    }
    // {
    //   name: '广东省重点车辆',
    //   code: 1
    // },
    // {
    //   name: '全国重点车辆',
    //   code: 2
    // }
  ]
  // 地图实例
  const mapIns = shallowRef()

  const activeMap = ref(allLayers[0])
  const popUp = shallowRef(null)
  const timer = shallowRef(null)
  const popUpInfo = reactive({
    show: false
  })
  const clickedPoint = ref()
  // 详情弹框
  const detailVisible = ref(false)

  const importCarCount = computed(() => {
    const key = activeMap.value.code === allLayers[0].code ? '深圳市' : (activeMap.value.code === allLayers[1].code ? '广东省' : '中国')
    const fd = zdclData.value.find(item => item.kjwd === key)
    return formatNumStr(fd?.zbz) || '-'
  })

  // 绘制深圳市重点车辆图层
  const shenzhenImportCar = shallowRef()

  const legendConfig = reactive([
    {
      name: '交通枢纽',
      children: [
        {
          name: '客运枢纽',
          icon: 'iconkeyunshuniu.png',
          isChecked: true
        }
      ]
    }
  ])

  const flyLegendconfig = [
    {
      name: '货车',
      class: 'huoche'
    },
    {
      name: '客运班车',
      class: 'keyunbanche'
    },
    {
      name: '旅游包车',
      class: 'lvyoubaoche'
    },
    {
      name: '危险品车',
      class: 'weixianpingche'
    },
    {
      name: '泥头车',
      class: 'nitouche'
    }
  ]

  // 重点车辆
  const zdclData = ref([])
  const getzdclData = () => {
    zdcl().then(res => {
      zdclData.value = res || []
    })
  }

  // 口岸机场港口坐标
  const kajcczgkzbData = ref([])
  const getkajcczgkzbData = () => {
    gpsLocation('汽车站').then(res => {
      kajcczgkzbData.value = res || []
    })
  }

  // 绘制交通枢纽图层
  // 交通枢纽
  const jtsnLayer = shallowRef()
  // 车辆类型
  const cllxLayer = shallowRef()
  const jtsnData = computed(() => {
    const arr = []
    kajcczgkzbData.value.forEach(item => {
      arr.push({
        ...item,
        icon: 'iconkeyunshuniu.png'
      })
    })
    return arr
  })

  const addJTSNLayer = () => {
    if (!mapIns.value) return
    const scale = 0.4
    jtsnLayer.value && mapIns.value.removeLayerByLayer(jtsnLayer.value)
    jtsnLayer.value = null
    jtsnLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(jtsnLayer.value);
    (jtsnData.value || []).forEach(item => {
      if (item.lon && item.lat) {
        const graphic = new mars3d.graphic.BillboardEntity({
          name: item.mc,
          position: [item.lon, item.lat, 0],
          attr: { ...item },
          style: {
            image: require(`@/assets/images/${item.icon}`),
            visibleDepth: false,
            scale,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        })
        jtsnLayer.value.addGraphic(graphic)

        const coor = [item.lon, item.lat, 0]
        const position = mars3d.Cesium.Cartesian3.fromDegrees(coor[0], coor[1], coor[2])
        const divGraphic = new mars3d.graphic.DivGraphic({
          position,
          style: {
            html: `<div class='popup-wrapper'>${item.mc}</div>`,
            offsetY: 0,
            offsetX: 0
          }
        })
        jtsnLayer.value.addGraphic(divGraphic)
      }
    })
  }

  const handleDetail = () => {
    detailVisible.value = true
    popUpInfo.show = false
    if (clickedPoint.value) {
      clickedPoint.value.setStyle({
        scale: 0.3
      })
      clickedPoint.value = null
    }
  }

  watch(() => jtsnData.value, () => {
    addJTSNLayer()
  }, {
    deep: true,
    immediate: true
  })

  const handleLegend = item => {
    item.isChecked = !item.isChecked
  }

  const handleItem = item => {
    activeMap.value = item
    if (item.code === allLayers[0].code) {
      // addCluster()
    }
  }

  const handleRefresh = () => {
    mapIns.value.resizeViewPort(true)
  }
  const mapload = etomap => {
    mapIns.value = etomap
    addJTSNLayer()
  }

  const clickHandler = e => {
    if (!popUpInfo.show) return
    if (popUp.value && !popUp.value.contains(e.target)) {
      popUpInfo.show = false
    }
    if (clickedPoint.value) {
      clickedPoint.value.setStyle({
        scale: 0.3
      })
      clickedPoint.value = null
    }
  }

  onMounted(() => {
    document.addEventListener('click', clickHandler, false)
    // getzdclData()
    getkajcczgkzbData()
  })

  onBeforeUnmount(() => {
    if (!mapIns.value) return

    shenzhenImportCar.value && mapIns.value.removeLayerByLayer(shenzhenImportCar.value)
    shenzhenImportCar.value = null

    jtsnLayer.value && mapIns.value.removeLayerByLayer(jtsnLayer.value)
    jtsnLayer.value = null

    cllxLayer.value && mapIns.value.removeLayerByLayer(cllxLayer.value)
    cllxLayer.value = null

    document.removeEventListener('click', clickHandler, false)
    clearTimeout(timer.value)

    mapIns.value = null
  })

</script>

<style lang="less" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .china-echarts-map,
  .guangdong-echarts-map {
    position: relative;
    width: 100%;
    height: 100%;

    .center-data {
      position: absolute;
      top: 40%;
      left: 55%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.04rem;
      height: 1.04rem;
      color: #283130;
      font-family: "DINCondensed-bold";
      font-size: .38rem;
      font-style: normal;
      font-weight: 700;
      background-image: url("~@/assets/images/cluster.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .map-legend {
    position: absolute;
    bottom: 0;
    left: 0;
    .legend-title {
      margin-bottom: .04rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      line-height: .22rem;
    }

    .legend-bar {
      width: 1.4rem;
      height: .07rem;
      margin-bottom: .04rem;
      background: linear-gradient(90deg, #1ec817 0%, #00ff92 23.96%, #f9e900 50.1%, #ffb713 74.65%, #ff4d21 100%);
    }

    .legend-label {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      width: 1.4rem;

      span {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .12rem;
        font-weight: 400;
        line-height: .16rem;
      }
    }
  }

  .checkbox-legend {
    position: absolute;
    bottom: .75rem;
    left: 0;
    width: 1.3rem;
    padding: .12rem;
    background: rgba(0, 9, 45, .9);
    border: 1px solid rgba(84, 181, 255, .28);
    border-radius: 4px;

    .legend-item-wrapper {
      margin-bottom: .16rem;

      &:last-of-type {
        margin-bottom: 0;
      }
      .wrapper-name {
        margin-bottom: .16rem;
        color: #cae8ff;
        font-family: "PingFang SC";
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
      }
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

      .legend-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 .135rem;
        height: .18rem;
        margin-right: .08rem;

        img {
          width: .14rem;
        }

        .legend-circle {
          width: .06rem;
          height: .06rem;
          border-radius: 50%;

          &.huoche {
            background: linear-gradient(131.12deg, #00e67b 21.41%, #d3ffe0 93.29%);
            box-shadow: 0 0 5px #00d57a;
          }

          &.keyunbanche {
            background: linear-gradient(131.12deg, #fbb842 21.41%, #ffebd3 93.29%);
            box-shadow: 0 0 5px #feddab;
          }

          &.lvyoubaoche {
            background: linear-gradient(131.12deg, #01f4ee 21.41%, #8bffcd 93.29%);
            box-shadow: 0 0 5px #5afcda;
          }

          &.weixianpingche {
            background: linear-gradient(131.12deg, #ec2121 21.41%, #ffb6b6 93.29%);
            box-shadow: 0 0 5px #fa8989;
          }

          &.nitouche {
            background: linear-gradient(131.12deg, #e4ee1d 21.41%, #efffc1 93.29%);
            box-shadow: 0 0 5px #00d57a;
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

  .map-tools {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .important-car-card {
    position: absolute;
    left: 0;
    z-index: 2;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: .24rem .16rem;
    background: rgba(55, 97, 232, .22);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px #294cb3;
    border: 1.4px solid #0085ff;

    .car-left {
      flex: 0 0 .64rem;
      height: .64rem;

      svg {
        font-size: .64rem;
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

  :deep(.map-label-wrapper) {
    z-index: 102;
    font-family: DINCondensed-Bold;
    font-size: 20px;
    font-weight: 700;
  }

  :deep(.popup-wrapper) {
    z-index: 102;
    padding: .04rem .1rem;
    color: #b9e1ff;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    background: linear-gradient(97.14deg, #155f97 .81%, rgba(0, 9, 45, .86) 99.86%);
    border: .7px solid rgba(84, 181, 255, .5);
    transform: translate(-50%, -100%) translateY(.15rem);
  }

  .pop-container {
    position: absolute;
    z-index: 102;
    width: 3.4rem;
    height: 2.1rem;
    color: #fff;
    font-size: 20px;
    transform: translate(.2rem, -50%);
  }

  .car-detail {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    width: 6.2rem;
    height: 4.13rem;
  }
}
</style>
