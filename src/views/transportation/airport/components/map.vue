<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-15 14:44:45
 * @FilePath: \traffic-web\src\views\transportation\seaport\components\map.vue
 * @Description: FilePath
-->
<template>
  <base-map
    :show-map-tool="false"
    mask-color="#075895"
    @onload="mapload"
  />
</template>

<script setup>
  import BaseMap from '@/components/base-map'
  import { shallowRef } from '@vue/reactivity'
  import jichang from '@/assets/images/iconshenzhenjichang.png'
  import { gpsLocation } from '@/api/modules/transportation/overview.js'
  import { useStore } from 'vuex'
  const store = useStore()

  const mapIns = shallowRef()
  const pointLayer = shallowRef()
  const isChecked = ref(true)
  const pointData = ref([])
  const mapload = etomap => {
    mapIns.value = etomap
    addPointLayer()
  }

  const getkajcczgkzbData = (type) => {
    gpsLocation('机场').then(res => {
      pointData.value = (res || []).map(item => ({
        ...item,
        jd: item.lon,
        wd: item.lat
      }))
      addPointLayer()
    })
  }

  const addPointLayer = () => {
    if (!mapIns.value) return
    const fontSize = store.getters.rootFontSize
    pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
    pointLayer.value = null
    pointLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(pointLayer.value)
    pointData.value.forEach(item => {
      if (item.jd && item.wd) {
        const graphic = new mars3d.graphic.BillboardEntity({
          name: item.mc,
          position: [item.jd, item.wd, 0],
          attr: { ...item },
          style: {
            image: jichang,
            visibleDepth: false,
            width: 0.24 * fontSize,
            height: 0.32 * fontSize,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        })
        pointLayer.value.addGraphic(graphic)

        const coor = [item.jd, item.wd, 0]
        const position = mars3d.Cesium.Cartesian3.fromDegrees(coor[0], coor[1], coor[2])
        const divGraphic = new mars3d.graphic.DivGraphic({
          position,
          style: {
            html: `<div class='popup-dlys-wrapper'>${item.mc}</div>`,
            offsetY: 0,
            offsetX: 0
          }
        })
        pointLayer.value.addGraphic(divGraphic)
      }
    })
  }

  onBeforeUnmount(() => {
    if (!mapIns.value) return
    pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
    pointLayer.value = null
  })

  onMounted(() => {
    getkajcczgkzbData('kg')
  })

  watch(() => isChecked.value, () => {
    if (pointLayer.value) {
      pointLayer.value.show = isChecked.value
    }
  }, { immediate: true })
</script>

<style lang="less" scoped>
:deep(.popup-wrapper),
:deep(.popup-dlys-wrapper) {
  z-index: 102;
  padding: .04rem .1rem;
  color: #b9e1ff;
  font-family: "PingFang SC";
  font-size: .16rem;
  font-weight: 400;
  line-height: 20px;
  background: linear-gradient(97.14deg, #155f97 .81%, rgba(0, 9, 45, .86) 99.86%);
  border: .7px solid rgba(84, 181, 255, .5);
  transform: translateY(-.15rem);
}
:deep(.popup-dlys-wrapper) {
  transform: translate(-50%, -.2rem);
}
</style>
