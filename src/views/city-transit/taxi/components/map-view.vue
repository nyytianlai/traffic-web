<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-01 11:21:35
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\components\base-map.vue
 * @Description: FilePath
-->
<template>
  <base-map
    mask-color="#075895"
    @onload="mapload"
    @handleRefresh="handleRefresh"
  >
    <div class="map-legend">
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
  import { onBeforeUnmount, watch } from '@vue/runtime-core'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    dataCode: {
      type: String,
      default: 'jtsgs'
    },
    legendName: {
      type: String,
      default: '交通事故数'
    }
  })
  const mapIns = shallowRef()
  const clusetrLayer = shallowRef()
  const timer = ref(null)
  const handleRefresh = () => {
  // mapIns.value.map.flyHome({
  //   duration: 1
  // })
  }
  const mapload = etomap => {
    mapIns.value = etomap
    addCluster()
  }

  const addCluster = () => {
    clearLayers()
    const data = props.data.map(item => Number(item[props.dataCode] || 0))
    const max = Math.max(...data)
    clusetrLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(clusetrLayer.value)
    Object.keys(geoCoordMap).forEach((key, i) => {
      const fd = props.data.find(obj => obj.xzqh === key)
      const scale = fd && fd[props.dataCode] && max ? (((fd && fd[props.dataCode]) || 0) / max * 0.5 + 0.6).toFixed(2) : 0.6
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
          ${formatNumStr((fd && fd[props.dataCode]) || 0)}
        </div>`,
          clampToGround: true,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          attr: fd ? { ...fd } : {}
        }
      })
      fd && fd[props.dataCode] && clusetrLayer.value.addGraphic(graphic)
      fd && fd[props.dataCode] && clusetrLayer.value.addGraphic(divGraphic)
    })
  }

  onBeforeUnmount(() => {
    clearTimeout(timer.value)
    clearLayers()
  })

  const clearLayers = () => {
    if (!mapIns.value) return
    if (clusetrLayer.value) {
      mapIns.value.removeLayerByLayer(clusetrLayer.value)
      clusetrLayer.value = null
    }
  }
  watch(() => props.data, () => {
    if (!mapIns.value) return
    addCluster()
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
</style>
