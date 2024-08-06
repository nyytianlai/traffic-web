<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2023-01-04 10:27:42
 * @FilePath: \traffic-web\src\views\city-transit\taxi\cruising-taxi\components\map-view.vue
 * @Description: FilePath
-->
<template>
  <base-map
    mask-color="#075895"
    @onload="mapload"
    @mapZoom="mapZoom"
    @handleRefresh="handleRefresh"
  />
</template>
<script setup>
  import BaseMap from '@/components/base-map'
  import { popupGeoCoordMap } from '@/utils/constants'
  import lineIcon from '@/assets/images/line-icon.png'
  import lineIconDown from '@/assets/images/line-icon-down.png'
  import iconTaxi from '@/assets/images/icon-taxi.png'
  import iconKzTaxi from '@/assets/images/icon-kz-taxi.png'
  import iconZzTaxi from '@/assets/images/icon-zz-taxi.png'
  import iconKzTaxiClick from '@/assets/images/icon-kz-taxi-click.png'
  import iconZzTaxiClick from '@/assets/images/icon-zz-taxi-click.png'
  import iconTaxiClick from '@/assets/images/icon-taxi-click.png'
  import { onBeforeUnmount, watch } from '@vue/runtime-core'
  import utils from '@/hooks/utils'
  import { useStore } from 'vuex'
  const store = useStore()
  const iconMap = {
    重载巡游出租车: [iconZzTaxi, iconZzTaxiClick],
    空载巡游出租车: [iconKzTaxi, iconKzTaxiClick]
  }
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    czczb: {
      type: Array,
      default: () => ([])
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
    clusetrLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(clusetrLayer.value)
    const fontSize = store.getters.rootFontSize
    Object.keys(popupGeoCoordMap).forEach((key, i) => {
      const fd = props.data.find(obj => obj.xzqh === key)
      const dowClass = ['罗湖区', '南山区'].includes(key)
      const graphic = new mars3d.graphic.BillboardPrimitive({
        name: key,
        position: [...popupGeoCoordMap[key], 0],
        style: {
          image: dowClass ? lineIconDown : lineIcon,
          visibleDepth: false,
          width: 0.08 * fontSize,
          height: 0.52 * fontSize,
          horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
          clampToGround: true,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      })
      const coor = [...popupGeoCoordMap[key], 0]
      const divGraphic = new mars3d.graphic.DivGraphic({
        position: coor,
        style: {
          html: `
        <div class="map-label-wrapper ${dowClass ? 'down' : ''}">
          <div class="label-title">
            <div class="title-bg"></div>
            <div class="area-name">${key}</div>  
          </div>
          <div class="data-type type">
            <div>空载</div>  
            <div>重载</div>  
          </div>
          <div class="data-type data">
            <div>${formatNumStr(fd?.kzs)}</div>  
            <div>${formatNumStr(fd?.zzs)}</div>  
          </div>
        </div>
        `,
          clampToGround: true,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          attr: fd ? { ...fd } : {}
        }
      })
      clusetrLayer.value.addGraphic(graphic)
      clusetrLayer.value.addGraphic(divGraphic)
    })
    clusetrLayer.value.on(mars3d.EventType.click, (e) => {
      mapIns.value.map.flyToGraphic(e.graphic, {
        scale: 0.12,
        duration: 1
      })
    })
  }

  const pointData = computed(() => props.czczb.filter(item => (item.lx || '').includes('巡游出租车')))
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
            image: iconMap[item.lx] ? iconMap[item.lx][0] : iconTaxi,
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
      const lx = attr.lx.split('巡游出租车')
      const className = lx[0] === '空载' ? 'pop-kz' : (lx[0] === '重载' ? 'pop-zz' : '')
      return `<div class='popup-wrapper'>
        <div class="pop-content">
          <div class="pop-cph">${attr.cph}</div>
        <div class="pop-lx ${className}">${lx[0]}</div>
          </div>
      </div>`
    }, {
      template: false,
      offsetY: 0
    })
    pointerLayer.value.on(mars3d.EventType.popupOpen, function (event) {
      const attr = event.graphic.attr || {}
      event.graphic.setStyle({
        scale: 0.17,
        image: iconMap[attr.lx] ? iconMap[attr.lx][1] : iconTaxiClick
      })
    })
    pointerLayer.value.on(mars3d.EventType.popupClose, function (event) {
      const attr = event.graphic.attr || {}
      event.graphic.setStyle({
        scale: scale,
        image: iconMap[attr.lx] ? iconMap[attr.lx][0] : iconTaxi
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
:deep(.map-label-wrapper) {
  background: rgba(0, 9, 45, .9);
  transform: translateY(-50%) translateY(-.52rem);

  &.down {
    transform: translateY(50%) translateY(0);
  }

  .label-title {
    position: relative;
    overflow: hidden;
    min-width: 1.41rem;
    padding-left: .16rem;
    margin-right: .5rem;

    .title-bg {
      position: absolute;
      top: 0;
      left: -.1rem;
      width: calc(100% + .06rem);
      height: 100%;
      background: linear-gradient(90deg, #00c6de 2.47%, rgba(22, 127, 153, .28) 74.2%);
      transform: skew(20deg);

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - .05rem);
        height: 100%;
        background: linear-gradient(90deg, #00c6de 0%, rgba(46, 220, 241, .13) 74.09%);
        box-shadow: 3px 4px 4px rgba(1, 10, 45, .3);
      }
    }

    .area-name {
      position: relative;
      z-index: 3;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .2rem;
      font-weight: 600;
      line-height: .28rem;
    }
  }

  .data-type {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

     > div {
      flex: 0 0 50%;
      text-align: center;
    }

    &.type {
      background: linear-gradient(90deg, rgba(1, 78, 122, .81) .27%, rgba(0, 107, 167, 0) 100%);

       > div {
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-style: normal;
        font-weight: 400;
        line-height: .3rem;
      }
    }

    &.data {
       > div {
        color: #fff;
        font-family: "DIN Alternate";
        font-size: .22rem;
        font-style: normal;
        font-weight: 700;
        line-height: .32rem;
      }
    }
  }
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
