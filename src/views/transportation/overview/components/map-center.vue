<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-01 11:21:35
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\components\base-map.vue
 * @Description: FilePath
-->
<template>
  <div class="center-map-wrapper">
    <div class="map-wrapper">
      <base-map
        @onload="mapload"
        @handleRefresh="handleRefresh"
      >
        1
      </base-map>
    </div>
    <div class="bottom-card">
      <div
        v-for="item in config"
        :key="item.name"
        class="card-item"
      >
        <img :src="item.icon">
        <div class="right-info">
          <div class="time">
            {{ item.date }}
            <DataTypeBtn
              type="日"
              :date="item.date"
              style="margin-left: 0.08rem"
            />
          </div>
          <div class="info-name">
            {{ item.name }}
          </div>
          <div class="info-data">
            <div class="info-num">
              {{ item.value }}
            </div>
            <div class="info-unit">
              {{ item.unit }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import BaseMap from '@/components/base-map'
  import DataTypeBtn from '@/components/data-type-btn'
  import { gpsLocation } from '@/api/modules/transportation/overview.js'
  import qichezhan from '@/assets/images/qichezhan.png'
  import wuliushuniu from '@/assets/images/wuliushuniu.png'

  const imapMap = {
    汽车站: qichezhan,
    物流枢纽: wuliushuniu
  }
  defineProps({
    config: {
      type: Array,
      default: () => []
    }
  })
  const mapIns = shallowRef()
  let graphicLayer
  const handleRefresh = () => {
  // mapIns.value.map.flyHome({
  //   duration: 1
  // })
  }

  const getMapData = async () => {
    const res = (await gpsLocation('汽车站')) || []
    drawPoint(res)
  }

  const drawPoint = (data) => {
    if (!mapIns.value) return
    if (!graphicLayer) {
      graphicLayer = new mars3d.layer.GraphicLayer({ clampToGround: true })
      mapIns.value.addLayer(graphicLayer)
    }
    graphicLayer.clear()
    const arr = []
    data.forEach((item) => {
      if (!item.lon || !item.lat) return
      const billboard = new mars3d.graphic.BillboardPrimitive({
        name: item.mc,
        position: [+item.lon, +item.lat, 0],
        style: {
          image: imapMap[item.lx] || imapMap['汽车站'],
          visibleDepth: false,
          width: 32,
          height: 32,
          horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
          clampToGround: true,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      })
      billboard.bindPopup(
        `<div class="area-name">
      ${item.mc}
    </div>`,
        {
          template: false,
          closeButton: false,
          className: 'area-name-wrapper',
          closeOnClick: false,
          horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
          offsetY: 16
        }
      )
      arr.push(billboard)
    })
    graphicLayer.addGraphic(arr)
    arr.forEach((item) => {
      item.openPopup()
    })
    // graphicLayer.flyToByAnimationEnd()
  }

  const mapload = (etomap) => {
    mapIns.value = etomap.map
    getMapData()
  }

  onBeforeUnmount(() => {
    clearLayers()
  })

  const clearLayers = () => {
    if (!mapIns.value || !graphicLayer) return
    graphicLayer.clear()
    mapIns.value.removeLayerByLayer && mapIns.value.removeLayerByLayer(graphicLayer)
    graphicLayer = null
  // if (clusetrLayer.value) {
  //   mapIns.value.removeLayerByLayer(clusetrLayer.value)
  //   clusetrLayer.value = null
  // }
  }
</script>

<style lang="less" scoped>
.center-map-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: 1fr 2.26rem;
  row-gap: .16rem;
   > div {
    min-width: 0;
    min-height: 0;
  }

  .bottom-card {
    display: grid;

    gap: .16rem .24rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    .card-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: 0;
      min-height: 0;
      padding: .05rem .16rem;
      background: rgba(55, 97, 232, .22);
      box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .8);
      border: 1.4px solid #0085ff;
      // cursor: pointer;
      &.selected {
        //
      }

      img {
        flex: 0 0 .64rem;
        height: .64rem;
        margin-right: .12rem;
      }

      .time {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: .04rem;
        color: #fff;
        font-family: PingFang SC;
        font-size: .16rem;
        font-weight: @regular;
        line-height: .22rem;
        letter-spacing: 0;

         > div {
          margin-left: .04rem;
        }
      }

      .info-name {
        margin-bottom: .04rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 500;
        line-height: .22rem;
      }

      .info-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        .info-num {
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .36rem;
          font-style: normal;
          font-weight: 700;
          line-height: .43rem;
          text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
        }

        .info-unit {
          margin-left: .08rem;
          color: #00fff9;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .22rem;
        }
      }
    }
  }
}
:deep(.area-name.area-name-wrapper) {
  padding: .04rem .12rem;
  color: #b9e1ff;
  font-size: .14rem;
  font-weight: 400;
  text-align: center;
  background: linear-gradient(97deg, rgba(21, 95, 151, .9) .81%, rgba(0, 9, 45, .57) 99.86%);
  border: .73px solid rgba(84, 181, 255, .5);
  transform: translateY(100%);
}
</style>
