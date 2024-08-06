<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-01 16:43:44
 * @FilePath: \traffic-web\src\views\road\components\map.vue
 * @Description: FilePath
-->
<template>
  <base-map
    :default-layer="allLayers[1].code"
    :all-layers="allLayers"
    @onload="mapload"
    @handleDrop="handleDrop"
    @handleRefresh="handleRefresh"
    @handleItem="handleItem"
  >
    <div class="map-legend">
      <div class="title">
        指数解读
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
    <Popup
      v-model:value="visible"
      title="视频监控"
    >
      <div class="video-wrapper">
        1111
      </div>
    </Popup>
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
  </base-map>
</template>
<script setup>
  import BaseMap from '@/components/base-map'
  import { status } from '../config'
  import videoIcon from '@/assets/images/video-icon.png'
  import Popup from '@/components/popUps'
  import axios from 'axios'
  import MapPointChart from './map-point-chart.vue'
  // 地图实例
  const mapIns = shallowRef()
  // 视频点位图层
  const markLayer = shallowRef()
  // 交通指数图层
  const jtzsMaskLayer = shallowRef()
  // 实时路况图层
  const sslkLayer = shallowRef()
  const visible = ref(false)
  const popUpInfo = reactive({
    show: false
  })
  const timer = ref(null)
  const popUp = ref(null)
  const props = defineProps({
    videoPoint: {
      type: Array,
      default: () => ([])
    },
    jtzs: {
      type: Array,
      default: () => ([])
    }
  })
  const allLayers = [
    {
      name: '交通指数',
      code: 0
    },
    {
      name: '实时路况',
      code: 1,
      children: [
        {
          name: '视频监控',
          code: 'video'
        }
      ]
    }
  ]
  // const markDataList = computed(() => [
  //   {
  //     id: 0,
  //     name: '深圳市某地点',
  //     position: [114.057939, 22.543527, 0],
  //     image: videoIcon
  //   },
  //   {
  //     id: 1,
  //     name: '大芬油画村',
  //     sible: true,
  //     position: [114.209039, 22.639527, 0],
  //     image: videoIcon,
  //     num: '9.7/10'
  //   },
  //   {
  //     id: 2,
  //     name: '华侨城创意文化园',
  //     sible: true,
  //     position: [113.909639, 22.689527, 0],
  //     image: videoIcon,
  //     num: '9.7/10'
  //   },
  //   {
  //     id: 3,
  //     name: '南头古城',
  //     sible: true,
  //     position: [113.895639, 22.628527, 0],
  //     num: '9.7/10',
  //     image: videoIcon
  //   }
  // ])
  const markDataList = computed(() => {
    const arr = []
    props.videoPoint.forEach(item => {
      if (item.jkspzb) {
        arr.push({
          id: item.jkspy,
          name: 'jkspbh',
          image: videoIcon,
          position: [...item.jkspzb.split(','), 0]
        })
      }
    })
    return arr
  })
  const clickCallbackFun = e => {
    visible.value = true
  }
  const handleDrop = (drop) => {
    // 移除视频点位
    markLayer.value && mapIns.value.removeLayerByLayer(markLayer.value)
    markLayer.value = null
    jtzsMaskLayer.value && mapIns.value.removeLayerByLayer(jtzsMaskLayer.value)
    jtzsMaskLayer.value = null
    if (drop.code === 'video' && drop.isChecked) {
      // 添加视频点位
      markLayer.value = mapIns.value.addMarkLayer(
        markDataList.value,
        clickCallbackFun
      )
    }
  }
  const handleItem = item => {
    if (!mapIns.value) return
    jtzsMaskLayer.value && mapIns.value.removeLayerByLayer(jtzsMaskLayer.value)
    jtzsMaskLayer.value = null
    if (!item.code) {
      addXZQ()
    } else {
      addroadInfoLayer()
    }
  }

  const addXZQ = () => {
    if (!mapIns.value || !props.jtzs.length) return
    jtzsMaskLayer.value && mapIns.value.removeLayerByLayer(jtzsMaskLayer.value)
    jtzsMaskLayer.value = null
    axios.get('/map3d/region/szxzq4.geojson').then((res) => {
      const data = res.data
      data.features.forEach(item => {
        const fd = props.jtzs.find(obj => obj.xzqh === item.properties.QUNAME)
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
            opacity: 1,
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
            return { color: attr.bgColor, opacity: attr.opacity }
          }
        }
      })
      graphics.forEach((g) => {
        jtzsMaskLayer.value.addGraphic(g)
      })

      jtzsMaskLayer.value.on(mars3d.EventType.click, function (e) {
        clearTimeout(timer.value)
        timer.value = setTimeout(() => {
          popUpInfo.show = true
          popUpInfo.left = e.position.x
          popUpInfo.top = e.position.y
          popUpInfo.xzqh = e.graphic.attr.xzqh
          popUpInfo.yddj = e.graphic.attr.yddj
          popUpInfo.pjsd = e.graphic.attr.pjsd
          popUpInfo.color = e.graphic.attr.color
        })
      })
    })
  }

  // 添加实时路况
  const addroadInfoLayer = () => {
    if (!mapIns.value) return
    sslkLayer.value && mapIns.value.removeLayerByLayer(sslkLayer.value)
    sslkLayer.value = null
  }
  const handleRefresh = () => {
    if (!mapIns.value) return
    markLayer.value && mapIns.value.removeLayerByLayer(markLayer.value)
    markLayer.value = null
    jtzsMaskLayer.value && mapIns.value.removeLayerByLayer(jtzsMaskLayer.value)
    jtzsMaskLayer.value = null
  }
  const mapload = etomap => {
    mapIns.value = etomap
  }

  const clickHandler = e => {
    if (!popUpInfo.show) return
    if (popUp.value && !popUp.value.contains(e.target)) {
      popUpInfo.show = false
    }
  }

  const closePopUpTip = () => {
    clearTimeout(timer.value)
    popUpInfo.show = false
  }

  onMounted(() => {
    document.addEventListener('click', clickHandler, false)
  })

  onBeforeUnmount(() => {
    if (!mapIns.value) return

    markLayer.value && mapIns.value.removeLayerByLayer(markLayer.value)
    markLayer.value = null

    jtzsMaskLayer.value && mapIns.value.removeLayerByLayer(jtzsMaskLayer.value)
    jtzsMaskLayer.value = null

    sslkLayer.value && mapIns.value.removeLayerByLayer(sslkLayer.value)
    sslkLayer.value = null

    document.removeEventListener('click', clickHandler, false)
    clearTimeout(timer.value)
  })

// watch(() => props.jtzs, () => {
//   if (props.jtzs?.length && mapIns.value) {
//     addXZQ()
//   }
// }, {
//   deep: true
// })
</script>

<style lang="less" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .map-tools {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
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

  .video-wrapper {
    width: 100%;
    height: 100%;
    padding: .22rem;
    background: rgba(#020d30, .5);
    border: .01rem solid rgba(#0085ff, .5);
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
</style>
