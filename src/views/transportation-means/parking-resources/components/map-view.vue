<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-09 16:45:18
 * @FilePath: \traffic-web\src\views\transportation-means\parking-resources\components\map-view.vue
 * @Description: FilePath
-->
<template>
  <base-map
    mask-color="#075895"
    @onload="mapload"
    @handleRefresh="handleRefresh"
  >
    <div class="map-card">
      <div class="car-left">
        <img src="@/assets/images/jidongche.png">
      </div>
      <div class="car-right">
        <div class="title">
          {{ title }}
        </div>
        <div class="num">
          <div class="data">
            {{ 9 }}
          </div>
          <div class="unit">
            个
          </div>
        </div>
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
    title: {
      type: String,
      default: ''
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
.map-card {
  position: absolute;
  top: .58rem;
  left: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 2.3rem;
  padding: .24rem .42rem .24rem .16rem;
  background: rgba(55, 97, 232, .22);
  box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px #294cb3;
  border: 1.4px solid #0085ff;
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
:deep(.map-label-wrapper) {
  font-family: DINCondensed-Bold;
  font-size: 20px;
  font-weight: 700;
}
</style>
