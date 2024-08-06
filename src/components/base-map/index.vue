<template>
  <div
    ref="mapContainer"
    class="map-box-wrapper"
  >
    <Map
      :is-x-z-q-mask="false"
      @onload="mapload"
      @fullScreen="fullScreen"
      @exitFullscreen="exitFullscreen"
      @clickRegionSwitcher="clickRegionSwitcher"
    />
    <map-tools
      v-if="showMapTool"
      style="top: 10px;"
      class="map-tools"
      :all-layers="allLayers"
      :default="defaultLayer"
      @handleRefresh="handleRefresh"
      @handleDrop="handleDrop"
      @handleItem="handleItem"
      @reset="reset"
    />
    <slot />
  </div>
</template>

<script setup>
  import etopmapVue from 'etopmapvue'
  import MapTools from '@/components/map-tools'
  import axios from 'axios'
  import * as mars3d from 'mars3d'
  const { Mars3dViewer: Map } = etopmapVue
  window.mars3d = mars3d
  window.Cesium = mars3d.Cesium
  const props = defineProps({
    maskColor: { // 地图底图颜色
      type: String,
      default: '#081734'
    },
    allLayers: { // 图层切换选项
      type: Array,
      default: () => ([])
    },
    defaultLayer: { // 默认图层
      type: [String, Number],
      default: ''
    },
    showMapTool: {
      type: Boolean,
      default: true
    }
  })
  const mapContainer = ref()
  const emits = defineEmits(['handleDrop', 'handleItem', 'handleRefresh', 'onload', 'fullScreen', 'exitFullscreen', 'reset', 'clickRegionSwitcher', 'mapZoom'])

  const handleRefresh = () => {
    mapIns.value.resizeViewPort(true)
    // mapIns.value.map.flyHome({
    //   duration: 1
    // })
    emits('handleRefresh')
  }

  const handleDrop = (item) => {
    emits('handleDrop', item)
  }

  const handleItem = (item) => {
    emits('handleItem', item)
  }

  // 地图实例
  const mapIns = shallowRef()
  // 基础底图
  const baseMapLayer = shallowRef()
  // 行政区名称图层
  const xzqLabels = shallowRef()

  const mapload = etomap => {
    etomap.resizeViewPort(true)
    mapIns.value = etomap
    addBaseLayer()
    addXZQLabels()
    emits('onload', etomap)

    const camera = etomap.map.viewer.camera

    camera.changed.addEventListener(() => mapScaleHandler(camera))
  }

  const mapScaleHandler = (camera) => {
    // 根据相机高度控制行政区遮罩和标注的显隐
    const coor = mars3d.Cesium.Cartographic.fromCartesian(camera.position)
    const height = coor.height
    if (height < 5e4) {
      if (baseMapLayer.value) {
        baseMapLayer.value.show = false
      }
      if (xzqLabels.value) {
        xzqLabels.value.show = false
      }
    } else {
      if (baseMapLayer.value) {
        baseMapLayer.value.show = true
      }
      if (xzqLabels.value) {
        xzqLabels.value.show = true
      }
    }
    emits('mapZoom', coor)
  }

  const clickRegionSwitcher = e => {
    emits('clickRegionSwitcher', e)
  }

  const fullScreen = () => {
  // if (!mapContainer.value) return
  // if (mapContainer.value.style.position === 'fixed') {
  //   mapContainer.value.style.position = 'relative'
  //   mapContainer.value.style.left = 'initial'
  //   mapContainer.value.style.top = 'initial'
  //   mapContainer.value.style.zIndex = 'initial'
  //   emits('exitFullscreen')
  // } else {
  //   mapContainer.value.style.position = 'fixed'
  //   mapContainer.value.style.left = 0
  //   mapContainer.value.style.top = 0
  //   mapContainer.value.style.zIndex = 100
  //   emits('fullScreen')
  // }
  // document.body.requestFullscreen()
  // mapContainer.value.style.position = 'fixed'
  // mapContainer.value.style.left = 0
  // mapContainer.value.style.top = 0
  // mapContainer.value.style.zIndex = 100
  // emits('fullScreen')
  }

  const exitFullscreen = () => {
  // console.log('exitFullscreen')
  // mapContainer.value.style.position = 'relative'
  // mapContainer.value.style.left = 'initial'
  // mapContainer.value.style.top = 'initial'
  // emits('exitFullscreen')
  }

  const reset = () => {
    emits('reset')
  }

  // 添加各区标记名称
  const addXZQLabels = () => {
    if (!mapIns.value || !mapIns.value.map.viewer) return
    axios.get('/map3d/region/qu_centroids.geojson').then((res) => {
      const features = res.data.features
      xzqLabels.value = mapIns.value.map.viewer.scene.primitives.add(new mars3d.Cesium.LabelCollection())
      const scale = 0.5
      features.forEach((item) => {
        const coordinates = item.geometry.coordinates
        const quName = item.properties.QNAME
        xzqLabels.value.add({
          position: mars3d.Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 800),
          text: quName,
          // distanceDisplayCondition: new mars3d.Cesium.DistanceDisplayCondition(10.0, 240000),
          horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: mars3d.Cesium.HorizontalOrigin.Bottom,
          scale,
          showBackground: true,
          backgroundColor: new mars3d.Cesium.Color(0, 0.35, 0.674, 0)
        })
      })
    })
  }
  // 添加基础底图
  const addBaseLayer = () => {
    if (!mapIns.value) return
    baseMapLayer.value && mapIns.value.removeLayerByLayer(baseMapLayer.value)
    baseMapLayer.value = null
    axios.get('/map3d/region/szxzq4.geojson').then((res) => {
      const data = res.data
      baseMapLayer.value = new mars3d.layer.GeoJsonLayer({
        id: 'baseMapLayer'
      })
      mapIns.value.map.addLayer(baseMapLayer.value)
      // 添加每个行政区的遮罩
      const graphics = mars3d.Util.geoJsonToGraphics(data, {
        symbol: {
          styleOptions: {
            fill: true,
            opacity: 0.5,
            color: props.maskColor || '#081734',
            outline: true,
            outlineStyle: {
              color: '#5997C6',
              width: 1.5,
              opacity: 1
            },
            arcType: mars3d.Cesium.ArcType.GEODESIC,
            clampToGround: false
          }
        }
      })
      graphics.forEach((g) => {
        baseMapLayer.value.addGraphic(g)
      })
    })
  }

  onBeforeUnmount(() => {
    if (!mapIns.value) return
    baseMapLayer.value && mapIns.value.removeLayerByLayer(baseMapLayer.value)
    baseMapLayer.value = null

    if (!mapIns.value.map.viewer) return
    mapIns.value.map.viewer.scene.primitives.remove(xzqLabels.value)
    xzqLabels.value = null

    const camera = mapIns.value.map.viewer.camera
    if (!camera) return
    camera.changed.removeEventListener(() => mapScaleHandler(camera))
    mapIns.value = null
  })

</script>

 <style lang="less" scoped>
.map-box-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .map-tools {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
</style>
