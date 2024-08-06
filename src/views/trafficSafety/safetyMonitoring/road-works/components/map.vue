<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-01 18:07:09
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\road-works\components\map.vue
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
  import shigongdianwei from '@/assets/images/shigongdianwei.png'
  import shigongdianweiSelect from '@/assets/images/shigongdianwei-select.png'
  const scale = 0.3
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const mapIns = shallowRef()
  const pointLayer = shallowRef()

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
          position: [item.jd, item.wd, 0],
          attr: { ...item },
          style: {
            image: shigongdianwei,
            visibleDepth: false,
            scale,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        })
        pointLayer.value.addGraphic(graphic)
      }
    })
    pointLayer.value.bindPopup(function (event) {
      const attr = event.graphic.attr || {}

      return `
      <div class="map-point-wrapper">
      <div class="corner left-top"></div>
      <div class="corner right-top"></div>
      <div class="corner left-bottom"></div>
      <div class="corner right-top"></div>
      <div class="sub-title">
        <div class="sub-left">
          ${attr.mc}
        </div>
      </div>
      <div class="tip-info">
        <div class="info-item">
          <div class="label">
            施工开始时间
          </div>
          <div class="data">
            ${attr.sgkssj}
          </div>
        </div>
        <div class="info-item">
          <div class="label">
            施工结束时间
          </div>
          <div class="data">
            ${attr.sgjssj}
          </div>
        </div>
        <div class="info-item">
          <div class="label">
            所属单位
          </div>
          <div class="data">
            ${attr.ssdw}
          </div>
        </div>
        <div class="info-item">
          <div class="label">
            详细地址
          </div>
          <div
            class="data"
            title="${attr.dz}"
          >
            ${attr.dz}
          </div>
        </div>
      </div>
    </div>
    `
    }, {
      template: false,
      offsetY: -30
    })
    pointLayer.value.on(mars3d.EventType.popupOpen, function (event) {
      event.graphic.setStyle({
        scale: 0.2,
        image: shigongdianweiSelect
      })
    })
    pointLayer.value.on(mars3d.EventType.popupClose, function (event) {
      event.graphic.setStyle({
        scale: scale,
        image: shigongdianwei
      })
    })
  }

  onBeforeUnmount(() => {
    if (!mapIns.value) return
    pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
    pointLayer.value = null
  })

  watch(() => props.data, () => {
    addPointLayer()
  }, {
    deep: true,
    immediate: true
  })
</script>

<style lang="less" scoped>
:deep(.map-point-wrapper) {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 3.4rem;
  height: 2rem;
  padding: .12rem;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .5);
  transform: translate(50%, 50%) translate(20px, 20px);

  .corner {
    position: absolute;
    width: .06rem;
    height: .06rem;
    background: rgba(84, 181, 255, .5);

    &.left-top {
      top: 0;
      left: 0;
    }

    &.left-bottom {
      bottom: 0;
      left: 0;
    }

    &.right-top {
      top: 0;
      right: 0;
    }

    &.right-bottom {
      right: 0;
      bottom: 0;
    }
  }

  .sub-title {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .1rem;

    &::after {
      content: "";
      position: absolute;
      bottom: -.08rem;
      left: 0;
      width: 100%;
      height: .01rem;
      background-color: rgba(#fff, .2);
    }

    .sub-left {
      color: #54b5ff;
      font-family: "SF Pro Display";
      font-size: .16rem;
      font-weight: 400;
      line-height: 19px;
    }
  }

  .tip-info {
    .info-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: .12rem;

      &:last-of-type {
        margin-bottom: 0;
      }
      .label {
        flex: 0 0 1rem;
        margin-right: .16rem;
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
        white-space: nowrap;
      }

      .data {
        flex: 1;
        overflow: hidden;
        min-width: 0;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
