<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-30 16:54:22
 * @FilePath: \traffic-web\src\views\overview\components\map.vue
 * @Description: FilePath
-->
<template>
  <div class="map-box-container">
    <Map
      v-show="selectLayer!==allLayers[0].code"
      :is-x-z-q-mask="false"
      @onload="mapload"
    />
    <OuterPlatform v-show="selectLayer===allLayers[0].code" />
    <map-tools
      style="top: 10px;"
      class="map-tools"
      :all-layers="[...allLayers.slice(0,1), ...allLayers.slice(3)]"
      :default="selectLayer"
      @handleRefresh="handleRefresh"
      @handleItem="handleItem"
    />
    <div
      v-show="selectLayer === allLayers[0].code || selectLayer === allLayers[2].code"
      class="map-legend"
    >
      <div class="title">
        拥堵指数
      </div>
      <div
        v-for="item in status"
        :key="item.name"
        class="legend-item"
      >
        <div
          class="bar"
          :style="{backgroundColor: item.color}"
        />
        <div class="name">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div
      v-show="selectLayer === allLayers[1].code"
      class="legend-layer2"
    >
      <div
        v-show="!selectLayer"
        class="map-legend2"
      >
        <div class="legend-title">
          客流量等级
        </div>
        <div class="legend-bar" />
        <div class="legend-label">
          <span>低</span>
          <span>高</span>
        </div>
      </div>
      <div
        class="bottom-legend"
        :style="{height: `${legendExpand ? 0.8 : 0.4}rem`, width: `${legendExpand ? 8.9 : 1.64}rem`}"
      >
        <div
          class="legend-title"
          @click="legendExpand=!legendExpand"
        >
          地铁线路 <span
            class="arrow"
            :class="{isCollapse: !legendExpand}"
          >
            <svg-icon icon-class="up" />
          </span>
        </div>
        <div class="legend-wrapper">
          <div
            v-for="item in bottomLegend"
            :key="item.name"
            class="legend-item"
          >
            <div
              class="legend-bar"
              :style="{backgroundColor: item.color}"
            />
            <div class="legend-name">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="legendMap[selectLayer]"
      class="point-legend"
    >
      <div class="legend-icon">
        <img :src="legendMap[selectLayer]?.icon">
      </div>
      <div class="legend-name">
        {{ legendMap[selectLayer]?.name }}
      </div>
    </div>
    <div
      v-show="popUpInfo.show"
      ref="popUp"
      class="pop-container"
      :style="{left: `${popUpInfo.left}px`, top: `${popUpInfo.top}px`}"
    >
      <map-point-chart
        :data="popUpInfo"
        @close="closePopUpTip"
      />
    </div>
  </div>
</template>

<script setup>
  import etopmapVue from 'etopmapvue'
  import MapTools from '@/components/map-tools'
  import * as mars3d from 'mars3d'
  import { status } from '@/views/road/config'
  import { geoCoordMap } from '@/utils/constants'
  import cluster from '@/assets/images/cluster.svg'
  import axios from 'axios'
  import { xzqhjdjtzs } from '@/api/modules/road'
  import { gqjtaq } from '@/api/modules/traffic-safety/safetyMonitoring'
  import { gdzdmx } from '@/api/modules/city-transit/cityTrack'
  import { kajcczgkzb } from '@/api/modules/transportation/logistics'
  import { gpsLocation } from '@/api/modules/transportation/overview.js'
  import OuterPlatform from './outer'
  import MapPointChart from '@/views/road/components/map-point-chart'
  import utils from '@/hooks/utils'
  import redPoint from '@/assets/images/redPoint.png'
  import qichezhan from '@/assets/images/iconchangtukeyunzhan.png'
  import gangqu from '@/assets/images/icontongguankouan.png'
  import jichang from '@/assets/images/iconshenzhenjichang.png'
  import huochezhan from '@/assets/images/iconhuochezhan.png'
  import { useStore } from 'vuex'
  const store = useStore()
  const { Mars3dViewer: Map } = etopmapVue
  window.mars3d = mars3d
  window.Cesium = mars3d.Cesium
  const formatNumStr = utils.formatNumStr
  // 地图实例
  const mapIns = shallowRef()
  const legendMap = {
    dl: { name: '汽车站', icon: qichezhan },
    hg: { name: '港区', icon: gangqu },
    kg: { name: '机场', icon: jichang },
    tl: { name: '火车站 ', icon: huochezhan }
  }
  const allLayers = [
    {
      name: '道路交通',
      code: 'dljt'
    },
    {
      name: '城市公交',
      code: 'csgj'
    },
    {
      name: '交通安全',
      code: 'jtaq'
    },
    {
      name: '道路运输',
      code: 'dl'
    },
    {
      name: '海港',
      code: 'hg'
    },
    {
      name: '空港',
      code: 'kg'
    },
    {
      name: '铁路',
      code: 'tl'
    }
  ]
  // 选中的图层code
  const selectLayer = ref(allLayers[0].code)

  const bottomLegend = [
    {
      name: '1号线',
      color: '#1A9739'
    },
    {
      name: '2号线',
      color: '#FF9A46'
    },
    {
      name: '3号线',
      color: '#1AA1D8'
    },
    {
      name: '4号线',
      color: '#F83037'
    },
    {
      name: '5号线',
      color: '#6E5997'
    },
    {
      name: '6号线',
      color: '#1AD2D7'
    },
    {
      name: '7号线',
      color: '#1A809C'
    },
    {
      name: '9号线',
      color: '#A27043'
    },
    {
      name: '10号线',
      color: '#FF83C9'
    },
    {
      name: '11号线',
      color: '#92659A'
    },
    {
      name: '20号线',
      color: '#1AB5CC'
    }
  ]
  const legendExpand = ref(true)

  const handleRefresh = () => {
    mapIns.value.resizeViewPort(true)
  }

  const handleItem = item => {
    selectLayer.value = item.code
  }
  const mapload = etomap => {
    etomap.resizeViewPort(true)
    mapIns.value = etomap
    addBaseLayer()
    addXZQLabels()
  }

  // 基础底图
  const baseMapLayer = shallowRef()
  // 行政区名称图层
  const xzqLabels = shallowRef()
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
            color: '#081734',
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
  // 城市公交图层
  // const getCsgjLayers = () => {
  // }

  // 交通安全
  const jtzs = ref([])
  const clusetrLayer = shallowRef()
  const jtzsMaskLayer = shallowRef()
  const getXzqhjdjtzs = () => {
    xzqhjdjtzs().then(res => {
      jtzs.value = res || []
    })
  }

  // 各区交通安全
  const gqjtaqData = ref([])
  const popUpInfo = reactive({
    show: false
  })
  const getGqjtaq = () => {
    gqjtaq().then(res => {
      gqjtaqData.value = res || []
    })
  }

  const addXZQ = () => {
    if (!mapIns.value) return
    jtzsMaskLayer.value && mapIns.value.removeLayerByLayer(jtzsMaskLayer.value)
    jtzsMaskLayer.value = null
    if (!jtzs.value.length) return
    axios.get('/map3d/region/szxzq4.geojson').then((res) => {
      const data = res.data
      data.features.forEach(item => {
        const fd = jtzs.value.find(obj => obj.xzqh === item.properties.QUNAME)
        const fd2 = status.find(obj => obj.name === fd?.yddj)
        item.properties.bgColor = fd2?.bgColor
        item.properties.opacity = fd2?.opacity
        item.properties.color = fd2?.color
        fd && Object.keys(fd).forEach(key => {
          item.properties[key] = fd[key]
        })
      })
      jtzsMaskLayer.value = new mars3d.layer.GeoJsonLayer({
        id: 'jtzsMask',
        zIndex: 3
      })
      mapIns.value.map.addLayer(jtzsMaskLayer.value)
      // 添加每个行政区的遮罩
      const graphics = mars3d.Util.geoJsonToGraphics(data, {
        symbol: {
          styleOptions: {
            fill: true,
            opacity: 0.8,
            outline: true,
            outlineStyle: {
              color: 'rgba(0,0,0,0)',
              width: 1.5,
              opacity: 1
            },
            arcType: mars3d.Cesium.ArcType.GEODESIC,
            clampToGround: false
          },
          callback: (attr, styleOpt) => {
            return { color: attr.bgColor || 'rgba(0,0,0,0)', opacity: attr.opacity || 0 }
          }
        }
      })
      graphics.forEach((g) => {
        jtzsMaskLayer.value.addGraphic(g)
      })
      jtzsMaskLayer.value.on(mars3d.EventType.click, function (e) {
        popUpInfo.show = true
        popUpInfo.left = e.position.x
        popUpInfo.top = e.position.y
        popUpInfo.xzqh = e.graphic.attr.xzqh
        popUpInfo.yddj = e.graphic.attr.yddj
        popUpInfo.pjsd = e.graphic.attr.pjsd
        popUpInfo.color = e.graphic.attr.color
      })

      jtzsMaskLayer.value.on(mars3d.EventType.mouseOut, function (e) {
        popUpInfo.show = false
      })
    })
  }

  const closePopUpTip = () => {
    popUpInfo.show = false
  }

  // 交通安全聚合点位
  const addCluster = () => {
    if (!mapIns.value) return
    if (clusetrLayer.value) {
      mapIns.value.removeLayerByLayer(clusetrLayer.value)
      clusetrLayer.value = null
    }
    if (!gqjtaqData.value.length) return
    const data = gqjtaqData.value.map(item => Number(item.jtsgs || 0))
    const max = Math.max(...data)
    clusetrLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(clusetrLayer.value)
    Object.keys(geoCoordMap).forEach((key, i) => {
      const fd = gqjtaqData.value.find(obj => obj.xzqh === key)
      const scale = fd && fd.jtsgs && max ? (((fd && fd.jtsgs) || 0) / max * 0.5 + 0.6).toFixed(2) : 0.6
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
          ${formatNumStr((fd && fd.jtsgs) || 0)}
        </div>`,
          clampToGround: true,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          attr: fd ? { ...fd } : {}
        }
      })
      fd && fd.jtsgs && clusetrLayer.value.addGraphic(graphic)
      fd && fd.jtsgs && clusetrLayer.value.addGraphic(divGraphic)
    })
  }

  // 城市公交点位
  const gdzdmxData = ref([])
  const cityTracPointkLayer = shallowRef()
  const getgdzdmx = () => {
    gdzdmx().then(res => {
      gdzdmxData.value = res || []
    })
  }
  const addCityTrackPointLayer = () => {
    if (!mapIns.value) return
    const scale = 0.2
    cityTracPointkLayer.value && mapIns.value.removeLayerByLayer(cityTracPointkLayer.value)
    cityTracPointkLayer.value = null
    if (!gdzdmxData.value.length) return
    cityTracPointkLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(cityTracPointkLayer.value);
    (gdzdmxData.value || []).forEach(item => {
      if (item.jd && item.wd) {
        const graphic = new mars3d.graphic.BillboardEntity({
          name: item.mc,
          position: [item.jd, item.wd, 0],
          attr: { ...item },
          style: {
            image: redPoint,
            visibleDepth: false,
            scale,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        })
        cityTracPointkLayer.value.addGraphic(graphic)
      }
    })
    cityTracPointkLayer.value.bindPopup(function (event) {
      const attr = event.graphic.attr || {}
      return `<div class='popup-wrapper'>${attr.mc}</div>`
    }, {
      template: false,
      offsetY: 0
    })
  }

  // 道路运输
  const jtsnLayer = shallowRef()
  const jtsnData = ref([])
  const getkajcczgkzbData = (type) => {
    gpsLocation(type).then(res => {
      jtsnData.value = (res || []).map(item => ({
        ...item,
        jd: item.lon,
        wd: item.lat
      }))
      addJTSNLayer()
    })
  }
  const addJTSNLayer = () => {
    if (!mapIns.value) return
    const fontSize = store.getters.rootFontSize
    const image = legendMap[selectLayer.value]?.icon || qichezhan
    jtsnLayer.value && mapIns.value.removeLayerByLayer(jtsnLayer.value)
    jtsnLayer.value = null
    jtsnLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(jtsnLayer.value);
    (jtsnData.value || []).forEach(item => {
      if (item.jd && item.wd) {
        const graphic = new mars3d.graphic.BillboardEntity({
          name: item.mc,
          position: [item.jd, item.wd, 0],
          attr: { ...item },
          style: {
            image,
            visibleDepth: false,
            width: 0.24 * fontSize,
            height: 0.32 * fontSize,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        })
        jtsnLayer.value.addGraphic(graphic)

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
        jtsnLayer.value.addGraphic(divGraphic)
      }
    })
  }

  const hideAllLayers = () => {
    if (jtzsMaskLayer.value) {
      jtzsMaskLayer.value.show = false
    }
    if (clusetrLayer.value) {
      clusetrLayer.value.show = false
    }
    if (cityTracPointkLayer.value) {
      cityTracPointkLayer.value.show = false
    }
    if (jtsnLayer.value) {
      jtsnLayer.value.show = false
    }
  }

  const switchLayer = () => {
    hideAllLayers()
    switch (selectLayer.value) {
    case allLayers[0].code:
      // 切换到道路交通图层
      break
    case allLayers[1].code:
      // 切换到城市公交图层
      // if (cityTracPointkLayer.value) {
      //   cityTracPointkLayer.value.show = true
      // } else {
      //   addCityTrackPointLayer()
      // }
      break
    case allLayers[2].code:
      // 切换到交通安全图层
      // if (jtzsMaskLayer.value) {
      //   jtzsMaskLayer.value.show = true
      // } else {
      //   addXZQ()
      // }
      // if (clusetrLayer.value) {
      //   clusetrLayer.value.show = true
      // } else {
      //   addCluster()
      // }
      break
    case allLayers[3].code:
      // 切换到道路交通图层
      getkajcczgkzbData('汽车站')
      break
    case allLayers[4].code:
      // 切换到海港图层
      getkajcczgkzbData('港口')
      break
    case allLayers[5].code:
      // 切换到空港图层
      getkajcczgkzbData('机场')
      break
    case allLayers[6].code:
      // 切换到铁路图层
      getkajcczgkzbData('火车站')
      break
    }
  }

  watch(() => selectLayer.value, () => {
    switchLayer()
  }, {
    immediate: true
  })

  onMounted(() => {
    // getXzqhjdjtzs()
    // getGqjtaq()
    // getgdzdmx()
  })

  onBeforeUnmount(() => {
    if (!mapIns.value) return
    baseMapLayer.value && mapIns.value.removeLayerByLayer(baseMapLayer.value)
    baseMapLayer.value = null

    if (!mapIns.value.map.viewer) return
    mapIns.value.map.viewer.scene.primitives.remove(xzqLabels.value)
    xzqLabels.value = null
    if (jtzsMaskLayer.value) {
      mapIns.value.removeLayerByLayer(jtzsMaskLayer.value)
      jtzsMaskLayer.value = null
    }
    if (clusetrLayer.value) {
      mapIns.value.removeLayerByLayer(clusetrLayer.value)
      clusetrLayer.value = null
    }
    if (cityTracPointkLayer.value) {
      mapIns.value.removeLayerByLayer(cityTracPointkLayer.value)
      cityTracPointkLayer.value = null
    }
    if (jtsnLayer.value) {
      mapIns.value.removeLayerByLayer(jtsnLayer.value)
      jtsnLayer.value = null
    }
    mapIns.value = null
  })
</script>

<style lang="less" scoped>
.map-box-container {
  position: relative;
  width: 100%;
  height: 100%;
  .map-tools {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .pop-container {
    position: absolute;
    width: 2.4rem;
    height: 1.3rem;
    color: #fff;
    font-size: 20px;
    transform: translate(.2rem, -50%);
  }
}

.map-legend {
  position: absolute;
  bottom: 0;
  left: 0;
  width: .95rem;
  padding: .16rem .12rem;
  background: rgba(#0d2e59, .6);
  border: .01rem solid rgba(#54b5ff, .3);
  border-radius: 2px;

  .title {
    margin-bottom: .12rem;
    color: #54b5ff;
    font-family: PingFang SC;
    font-size: .16rem;
    font-weight: @regular;
    letter-spacing: 0;
  }

  .legend-item {
    margin-bottom: .08rem;

    &:last-of-type {
      margin-bottom: 0;
    }
    .bar {
      width: .32rem;
      height: .04rem;
      margin-bottom: .04rem;
    }

    .name {
      color: #fff;
      font-family: PingFang SC;
      font-size: .16rem;
      font-weight: @regular;
      letter-spacing: 0;
    }
  }
}

.legend-layer2 {
  position: absolute;
  bottom: 0;
  left: 0;

  .map-legend2 {
    width: 1.64rem;
    height: .84rem;
    padding: .16rem .12rem;
    margin-bottom: .16rem;
    background: rgba(13, 46, 89, .6);
    border: 1 solid rgba(84, 181, 255, .3);
    border-radius: 2px;
    .legend-title {
      margin-bottom: .04rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      line-height: .22rem;
    }

    .legend-bar {
      width: 1.4rem;
      height: .07rem;
      margin-bottom: .04rem;
      background: linear-gradient(90deg, #1ec817 0%, #00ff92 23.96%, #f9e900 50.1%, #ffb713 74.65%, #ff4d21 100%);
    }

    .legend-label {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      width: 1.4rem;

      span {
        color: #fff;
        font-family: "PingFang SC";
        font-size: .12rem;
        font-weight: 400;
        line-height: .16rem;
      }
    }
  }

  .bottom-legend {
    overflow: hidden;
    width: 9rem;
    padding: .08rem .12rem;
    background: rgba(0, 9, 45, .02);
    border: 1px solid rgba(84, 181, 255, .45);

    .legend-title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: .12rem;
      color: #54b5ff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      line-height: .22rem;
      cursor: pointer;

      span {
        display: flex;
        align-items: center;
        flex: 0 0 .08rem;
        margin-left: .04rem;
        transition: all .3s;

        &.isCollapse {
          transform: rotate(180deg);
          transition: all .3s;
        }
      }
    }

    .legend-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      .legend-item {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        flex: 0 0 .48rem;

        .legend-bar {
          width: 100%;
          height: .04rem;
          margin-bottom: .04rem;
        }

        .legend-name {
          color: #fff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .22rem;
          white-space: nowrap;
        }
      }
    }
  }
}

.point-legend {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: .08rem .12rem;
  background: rgba(0, 9, 45, .9);
  border: .838983px solid rgba(84, 181, 255, .28);
  border-radius: 4px;

  .legend-icon {
    width: .16rem;
    margin-right: .08rem;

    img {
      width: 100%;
    }
  }

  .legend-name {
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
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
</style>
