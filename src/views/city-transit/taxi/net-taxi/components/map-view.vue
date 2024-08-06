<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2023-01-04 10:30:51
 * @FilePath: \traffic-web\src\views\city-transit\taxi\net-taxi\components\map-view.vue
 * @Description: FilePath
-->
<template>
  <base-map
    mask-color="#075895"
    @onload="mapload"
    @handleRefresh="handleRefresh"
    @mapZoom="mapZoom"
  >
    <div
      v-show="showLegend"
      class="map-legend"
    >
      <div class="circle" />
      <div class="legend-name">
        {{ legendName }}
      </div>
    </div>
  </base-map>
</template>
<script setup>
  import BaseMap from '@/components/base-map'
  import { geoCoordMap } from '@/utils/constants'
  import cluster from '@/assets/images/cluster.svg'
  import iconTaxi from '@/assets/images/icon-taxi.png'
  import iconTaxiClick from '@/assets/images/icon-taxi-click.png'
  import { onBeforeUnmount, watch } from '@vue/runtime-core'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    czczb: {
      type: Array,
      default: () => ([])
    },
    legendName: {
      type: String,
      default: '出租车数量'
    }
  })
  const showLegend = ref(true)
  const mapIns = shallowRef()
  const clusetrLayer = shallowRef()
  // 出租车图层
  const pointerLayer = shallowRef()
  const handleRefresh = () => {
  // mapIns.value.map.flyHome({
  //   duration: 1
  // })
  }
  const mapload = etomap => {
    mapIns.value = etomap
    addCluster()
    addPointLayer()
  }

  const mapZoom = e => {
    if (e.height < 5e4) {
      if (clusetrLayer.value) {
        clusetrLayer.value.show = false
      }

      if (pointerLayer.value) {
        pointerLayer.value.show = true
      } else {
        addPointLayer()
      }
      showLegend.value = false
    } else {
      if (clusetrLayer.value) {
        clusetrLayer.value.show = true
      } else {
        addCluster()
      }

      if (pointerLayer.value) {
        pointerLayer.value.show = false
      }
      showLegend.value = true
    }
  }

  const addCluster = () => {
    if (!mapIns.value) return
    if (clusetrLayer.value) {
      mapIns.value.removeLayerByLayer(clusetrLayer.value)
      clusetrLayer.value = null
    }
    const data = props.data.map(item => Number(item.wycs || 0))
    const max = Math.max(...data)
    clusetrLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(clusetrLayer.value)
    Object.keys(geoCoordMap).forEach((key, i) => {
      const fd = props.data.find(obj => obj.xzqh === key)
      const scale = fd && fd.wycs && max ? (((fd && fd.wycs) || 0) / max * 0.5 + 0.6).toFixed(2) : 0.6
      const graphic = new mars3d.graphic.BillboardPrimitive({
        name: key,
        position: [...geoCoordMap[key], 0],
        style: {
          image: cluster,
          visibleDepth: false,
          scale,
          horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
          clampToGround: true,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      })
      const coor = [...geoCoordMap[key], 0]
      const divGraphic = new mars3d.graphic.DivGraphic({
        position: coor,
        style: {
          html: `<div class="map-label-wrapper">
          ${formatNumStr((fd && fd.wycs) || 0)}
        </div>`,
          clampToGround: true,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          attr: fd ? { ...fd } : {}
        }
      })
      fd && fd.wycs && clusetrLayer.value.addGraphic(graphic)
      fd && fd.wycs && clusetrLayer.value.addGraphic(divGraphic)
    })
    clusetrLayer.value.on(mars3d.EventType.click, (e) => {
      mapIns.value.map.flyToGraphic(e.graphic, {
        scale: 0.12,
        duration: 1
      })
    })
  }
  const pointData = computed(() => props.czczb.filter(item => item.lx === '网约出租车'))
  const addPointLayer = () => {
    if (!mapIns.value) return
    const scale = 0.16
    pointerLayer.value && mapIns.value.removeLayerByLayer(pointerLayer.value)
    pointerLayer.value = null
    pointerLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(pointerLayer.value);
    (pointData.value || []).forEach(item => {
      if (item.jd && item.wd) {
        const graphic = new mars3d.graphic.BillboardEntity({
          name: item.mc,
          position: [item.jd, item.wd, 0],
          attr: { ...item },
          style: {
            image: iconTaxi,
            visibleDepth: false,
            scale,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        })
        pointerLayer.value.addGraphic(graphic)
      }
    })
    pointerLayer.value.bindPopup(function (event) {
      const attr = event.graphic.attr || {}
      return `<div class='popup-wrapper'>
        <div class="pop-content">
          <div class="pop-cph">${attr.cph}</div>
          </div>
      </div>`
    }, {
      template: false,
      offsetY: 0
    })
    pointerLayer.value.on(mars3d.EventType.popupOpen, function (event) {
      event.graphic.setStyle({
        scale: 0.17,
        image: iconTaxiClick
      })
    })
    pointerLayer.value.on(mars3d.EventType.popupClose, function (event) {
      event.graphic.setStyle({
        scale: scale,
        image: iconTaxi
      })
    })
    const height = mars3d.Cesium.Cartographic.fromCartesian(mapIns.value.map.viewer.camera.position).height
    if (height >= 5e4) {
      pointerLayer.value.show = false
    }
  }

  onBeforeUnmount(() => {
    clearLayers()
  })

  const clearLayers = () => {
    if (!mapIns.value) return
    if (clusetrLayer.value) {
      mapIns.value.removeLayerByLayer(clusetrLayer.value)
      clusetrLayer.value = null
    }

    if (pointerLayer.value) {
      mapIns.value.removeLayerByLayer(pointerLayer.value)
      pointerLayer.value = null
    }

    mapIns.value = null
  }
  watch(() => props.data, () => {
    if (!mapIns.value) return
    addCluster()
  }, {
    deep: true,
    immediate: true
  })

  watch(() => pointData.value, () => {
    addPointLayer()
  }, {
    deep: true,
    immediate: true
  })
</script>

<style lang="less" scoped>
.map-legend {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: .08rem .12rem;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .28);
  border-radius: 3px;

  .circle {
    position: relative;
    width: .16rem;
    height: .16rem;
    margin-right: .06rem;
    background-color: rgba(#01e7e7, .5);
    border-radius: 50%;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: .08rem;
      height: .08rem;
      background-color: #01e7e7;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .legend-name {
    color: #6eb3f9;
    font-family: "PingFang SC";
    font-size: .14rem;
    font-weight: 400;
    line-height: .2rem;
    white-space: nowrap;
  }
}
:deep(.map-label-wrapper) {
  font-family: DINCondensed-Bold;
  font-size: 20px;
  font-weight: 700;
}
:deep(.popup-wrapper) {
  width: 2.58rem;
  height: .77rem;
  padding-left: .62rem;
  background-image: url("~@/assets/images/taxi-tip.svg");
  background-size: 100% 100%;
  transform: translate(50%, -.27rem) translateX(-.05rem);

  .pop-content {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    transform: translateY(.12rem);

    .pop-cph {
      padding: .02rem .04rem;
      color: #1d1d1d;
      font-family: "PingFang SC";
      font-size: .2rem;
      font-weight: 600;
      line-height: .26rem;
      background: #00ff92;
      border-radius: 2px;
    }

    .pop-lx {
      padding: .02rem .04rem;
      margin-left: .08rem;
      color: #1d1d1d;
      font-family: "PingFang SC";
      font-size: .2rem;
      font-weight: 500;
      line-height: .26rem;
      border-radius: 2px;

      &.pop-zz {
        background: #f8540f;
      }

      &.pop-kz {
        background: #fef71a;
      }
    }
  }
}
</style>
