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
  >
    <div class="map-legend">
      <div class="legend-title">
        图例
      </div>
      <div
        class="check-legend-item"
        @click="(isChecked=!isChecked)"
      >
        <div
          class="check-box"
          :class="{checked: isChecked}"
        />
        <div class="legend-icon">
          <img :src="icontongguankouan">
        </div>
        <div class="legend-name">
          港口
        </div>
      </div>
    </div>
  </base-map>
</template>

<script setup>
  import BaseMap from '@/components/base-map'
  import { shallowRef } from '@vue/reactivity'
  import icontongguankouan from '@/assets/images/icontongguankouan.png'
  import {transformGCJ2WGS84} from '@/utils/map-coord-tools.js'
  const scale = 0.2
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const mapIns = shallowRef()
  const pointLayer = shallowRef()
  const isChecked = ref(true)
  const mapload = etomap => {
    mapIns.value = etomap
    addPointLayer()
  }

  const addPointLayer = () => {
    if (!mapIns.value) return
    pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
    pointLayer.value = null
    pointLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(pointLayer.value)
    props.data.forEach(item => {
      if (item.jd && item.wd) {
        const graphic = new mars3d.graphic.BillboardEntity({
          name: item.mc,
          position: [...transformGCJ2WGS84([+item.jd, +item.wd]), 0],
          attr: { ...item },
          style: {
            image: icontongguankouan,
            visibleDepth: false,
            width: 20,
            height: 28,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        })
        pointLayer.value.addGraphic(graphic)
        const divGraphic = new mars3d.graphic.DivGraphic({
          position: [item.jd, item.wd, 0],
          style: {
            html: `<div class='popup-wrapper'>${item.mc}</div>`,
            offsetY: 0,
            offsetX: 0
          }
        })
        pointLayer.value.addGraphic(divGraphic)
      }
    })
  }

  watch(() => props.data, () => {
    addPointLayer()
  }, {
    deep: true,
    immediate: true
  })

  watch(() => isChecked.value, () => {
    if (pointLayer.value) {
      pointLayer.value.show = isChecked.value
    }
  }, { immediate: true })
</script>

<style lang="less" scoped>
.pop-container {
  position: absolute;
  width: 4rem;
  height: 3.2rem;
  color: #fff;
  font-size: 20px;
  transform: translate(.2rem, -50%);
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
      width: .12rem;
      height: .16rem;
      margin-right: .08rem;
      line-height: .16rem;

      img {
        width: 100%;
        height: 100%;
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
  transform: translate(-50%, -100%);
}
</style>
