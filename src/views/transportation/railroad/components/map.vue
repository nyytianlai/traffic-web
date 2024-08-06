<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-19 10:05:17
 * @FilePath: \traffic-web\src\views\transportation\railroad\components\map.vue
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
      <!-- <div
        class="check-legend-item"
      >
        <div class="legend-icon railway">
          <img :src="require('@/assets/images/xianzhuangtielu.png')">
        </div>
        <div class="legend-name">
          现状铁路
        </div>
      </div> -->
      <div
        class="check-legend-item"
      >
        <div class="legend-icon">
          <img :src="huochezhan">
        </div>
        <div class="legend-name">
          国铁枢纽
        </div>
      </div>
    </div>
    <div
      v-show="popUpInfo.show"
      ref="popUp"
      class="pop-container"
      :style="{left: `${popUpInfo.left}px`, top: `${popUpInfo.top}px`}"
    >
      <map-point-chart
        :data="popUpInfo.data"
      />
    </div>
  </base-map>
</template>

<script setup>
  import BaseMap from '@/components/base-map'
  import MapPointChart from './map-point-chart'
  import { hczxq } from '@/api/modules/transportation/railroad'
  import railwayPoint from '@/assets/images/railway-point.svg'
  import huochezhan from '@/assets/images/iconhuochezhan.png'
  import { useStore } from 'vuex'
  const store = useStore()
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const mapIns = shallowRef()
  const pointLayer = shallowRef()
  const popUp = ref(null)
  const selectGraphic = shallowRef()
  const popUpInfo = reactive({
    show: false
  })

  const mapload = etomap => {
    mapIns.value = etomap
    addPointLayer()
  }

  const addPointLayer = () => {
    if (!mapIns.value) return
    const fontSize = store.getters.rootFontSize
    pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
    pointLayer.value = null
    pointLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(pointLayer.value);
    (props.data || []).forEach(item => {
      if (item.jd && item.wd) {
        const graphic = new mars3d.graphic.BillboardEntity({
          name: item.mc,
          position: [item.jd, item.wd, 0],
          attr: { ...item },
          style: {
            image: huochezhan,
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
    // pointLayer.value.on(mars3d.EventType.click, function (event) {
    //   // event.graphic.setStyle({
    //   //   image: railwayPointClick
    //   // })
    //   const attr = event.graphic.attr
    //   hczxq(attr.mc).then(res => {
    //     popUpInfo.show = true
    //     popUpInfo.left = event.position.x
    //     popUpInfo.top = event.position.y
    //     popUpInfo.data = res[0] ? { ...attr, ...res[0] } : attr
    //   })
    //   selectGraphic.value = event.graphic
    // })
  }
  // const clickHandler = e => {
  //   if (!popUpInfo.show) return
  //   if (popUp.value && !popUp.value.contains(e.target)) {
  //     popUpInfo.name = ''
  //     nextTick(() => {
  //       popUpInfo.show = false
  //       if (selectGraphic.value) {
  //         selectGraphic.value.setStyle({
  //           image: railwayPoint
  //         })
  //         selectGraphic.value = null
  //       }
  //     })
  //   }
  // }
  // onMounted(() => {
  //   document.addEventListener('click', clickHandler, false)
  // })
  // onBeforeUnmount(() => {
  //   if (!mapIns.value) return
  //   pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
  //   pointLayer.value = null
  //   document.removeEventListener('click', clickHandler, false)
  // })

  watch(() => props.data, () => {
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
  width: 1.55rem;
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
      display: flex;
      align-items: center;
      width: .16rem;
      margin-right: .12rem;

      &.railway {
        flex: 0 0 .54rem;
        width: .54rem;
        height: .04rem;
      }

      img {
        width: 100%;
        height: 100%;
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
  transform: translate(-50%, -.25rem);
}
.pop-container {
  position: absolute;
  z-index: 102;
  width: 2.9rem;
  height: 2.4rem;
  color: #fff;
  font-size: 20px;
  transform: translate(.3rem, -50%);
}
</style>
