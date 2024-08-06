<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-14 09:35:58
 * @FilePath: \traffic-web\src\views\city-transit\cityTrack\components\map.vue
 * @Description: FilePath
-->
<template>
  <div class="map-wrapper">
    <div class="map">
      <base-map
        :all-layers="allLayers"
        @handleRefresh="handleRefresh"
        @onload="mapload"
      >
        <div class="map-legend">
          <div class="legend-title">
            客流量等级
          </div>
          <div class="legend-bar" />
          <div class="legend-label">
            <span>低</span>
            <span>高</span>
          </div>
        </div>
        <div
          v-show="popUpInfo.show"
          ref="popUp"
          class="pop-container"
          :style="{left: `${popUpInfo.left}px`, top: `${popUpInfo.top}px`}"
        >
          <map-point-chart :station="popUpInfo.name" />
        </div>
      </base-map>
    </div>
    <div
      class="bottom-legend"
      :style="{flex: `0 0 ${legendExpand ? 0.8 : 0.4}rem`}"
    >
      <div
        class="legend-title"
        @click="legendExpand=!legendExpand"
      >
        地铁线路 <span
          class="arrow"
          :class="{isCollapse: !legendExpand}"
        >
          <svg-icon icon-class="up" />
        </span>
      </div>
      <div class="legend-wrapper">
        <div
          v-for="item in bottomLegend"
          :key="item.name"
          class="legend-item"
        >
          <div
            class="legend-bar"
            :style="{backgroundColor: item.color}"
          />
          <div class="legend-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseMap from '@/components/base-map'
  import greenPoint from '@/assets/images/green.svg'
  import greenPointClick from '@/assets/images/greenPoint-click.png'
  import MapPointChart from './map-point-chart.vue'
  import { useStore } from 'vuex'
  const props = defineProps({
    pointData: {
      type: Array,
      default: () => ([])
    }
  })
  const popUp = ref(null)
  const timer = ref(null)
  const store = useStore()
  const allLayers = []
  // 地图实例
  const mapIns = ref()
  // 地铁线路图层
  const dtxlLayer = ref()
  const pointLayer = ref()
  const popUpInfo = reactive({
    show: false
  })
  const clickPoint = shallowRef()
  const bottomLegend = [
    {
      name: '1号线',
      color: '#1A9739'
    },
    {
      name: '2号线',
      color: '#FF9A46'
    },
    {
      name: '3号线',
      color: '#1AA1D8'
    },
    {
      name: '4号线',
      color: '#F83037'
    },
    {
      name: '5号线',
      color: '#6E5997'
    },
    {
      name: '6号线',
      color: '#1AD2D7'
    },
    {
      name: '7号线',
      color: '#1A809C'
    },
    {
      name: '9号线',
      color: '#A27043'
    },
    {
      name: '10号线',
      color: '#FF83C9'
    },
    {
      name: '11号线',
      color: '#92659A'
    },
    {
      name: '20号线',
      color: '#1AB5CC'
    }
  ]
  const legendExpand = ref(true)

  const handleRefresh = () => {

  }
  const mapload = etomap => {
    mapIns.value = etomap
    addPointLayer()
  }

  // 添加地铁线路图层
  const addroadInfoLayer = () => {
    if (!mapIns.value) return
    dtxlLayer.value && mapIns.value.removeLayerByLayer(dtxlLayer.value)
    dtxlLayer.value = null
  }

  const clickCallbackFun = e => {
    clearTimeout(timer.value)
    const fontSize = store.getters.rootFontSize
    timer.value = setTimeout(() => {
      e.graphic.setStyle({
        width: 0.9 * fontSize,
        height: 0.9 * fontSize,
        image: greenPointClick
      })
      popUpInfo.show = true
      popUpInfo.left = e.position.x
      popUpInfo.top = e.position.y
      popUpInfo.name = e.graphic.attr.mc
      clickPoint.value = e.graphic
    })
  }

  const addPointLayer = () => {
    if (!mapIns.value) return
    const fontSize = store.getters.rootFontSize
    pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
    pointLayer.value = null
    pointLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(pointLayer.value)
    props.pointData.forEach(item => {
      if (item.jd && item.wd) {
        const graphic = new mars3d.graphic.BillboardEntity({
          name: item.mc,
          position: [item.jd, item.wd, 0],
          attr: { ...item },
          style: {
            image: greenPoint,
            visibleDepth: false,
            width: 0.25 * fontSize,
            height: 0.25 * fontSize,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            scaleByDistance: true,
            scaleByDistance_nearValue: 1.4,
            scaleByDistance_near: 100000
          }
        })
        pointLayer.value.addGraphic(graphic)
      }
    })
    pointLayer.value.on(mars3d.EventType.click, clickCallbackFun)
  }

  watch(() => props.pointData, () => {
    addPointLayer()
    addroadInfoLayer()
  }, {
    deep: true,
    immediate: true
  })

  const clickHandler = e => {
    const fontSize = store.getters.rootFontSize
    if (clickPoint.value) {
      clickPoint.value.setStyle({
        width: 0.25 * fontSize,
        height: 0.25 * fontSize,
        image: greenPoint
      })
    }
    if (!popUpInfo.show) return
    if (popUp.value && !popUp.value.contains(e.target)) {
      popUpInfo.name = ''
      nextTick(() => {
        popUpInfo.show = false
      })
    }
  }

  onMounted(() => {
    document.addEventListener('click', clickHandler, false)
  })

  onBeforeUnmount(() => {
    if (!mapIns.value) return
    pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
    pointLayer.value = null

    dtxlLayer.value && mapIns.value.removeLayerByLayer(dtxlLayer.value)
    dtxlLayer.value = null

    clickPoint.value = null
    document.removeEventListener('click', clickHandler, false)
    clearTimeout(timer.value)
  })
</script>

<style lang="less" scoped>
.map-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .map {
    position: relative;
    flex: 1;
    min-height: 0;
    .map-tools {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
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

    .pop-container {
      position: absolute;
      width: 3rem;
      height: 3.2rem;
      color: #fff;
      font-size: 20px;
      transform: translate(.55rem, -50%);
    }
  }

  .bottom-legend {
    // flex: 0 0 .8rem;
    overflow: hidden;
    padding: .08rem .12rem;
    margin-top: .3rem;
    background: rgba(0, 9, 45, .02);
    border: 1px solid rgba(84, 181, 255, .45);

    backdrop-filter: blur(10.5px);

    .legend-title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: .12rem;
      color: #54b5ff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      line-height: .22rem;
      cursor: pointer;

      span {
        display: flex;
        align-items: center;
        flex: 0 0 .08rem;
        margin-left: .04rem;
        transition: all .3s;

        &.isCollapse {
          transform: rotate(180deg);
          transition: all .3s;
        }
      }
    }

    .legend-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      .legend-item {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        flex: 0 0 .48rem;

        .legend-bar {
          width: 100%;
          height: .04rem;
          margin-bottom: .04rem;
        }

        .legend-name {
          color: #fff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .22rem;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
