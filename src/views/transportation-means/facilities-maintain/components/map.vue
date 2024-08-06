<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2023-01-04 10:31:11
 * @FilePath: \traffic-web\src\views\transportation-means\base-means\components\map.vue
 * @Description: FilePath
-->
<template>
  <base-map
    @handleRefresh="handleRefresh"
    @onload="mapload"
    @mapZoom="mapZoom"
  >
    <div class="checkbox-legend">
      <div
        v-for="item in legendConfig"
        :key="item.name"
        class="check-legend-item"
        @click="handleLegend(item)"
      >
        <div
          class="radio-box"
          :class="{ checked: item.isChecked }"
        />
        <div class="legend-icon">
          <img :src="require(`@/assets/images/${item.icon}`)">
        </div>
        <div class="legend-name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </base-map>
</template>

<script setup>
  import BaseMap from '@/components/base-map'
  import { equipmentRegionCount } from '@/api/modules/transportation-means'
  import { geoCoordMap } from '@/utils/constants'
  import cluster from '@/assets/images/cluster.svg'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    dlmxData: {
      type: Array,
      default: () => []
    }
  })
  // 地图实例
  const mapIns = shallowRef()
  const clusterLayer = shallowRef()
  const pointerLayer = shallowRef()
  const dlmxLayer = shallowRef()
  const popUp = ref(null)
  const timer = ref(null)
  const popUpInfo = reactive({
    show: false
  })
  const legendConfig = reactive([
    // {
    //   name: '道路',
    //   icon: 'icondaolu.svg',
    //   isChecked: true
    // },
    {
      name: '桥梁',
      icon: 'iconqiaoliang.png',
      isChecked: true
    },
    {
      name: '隧道',
      icon: 'iconsuidao.png'
    },
    {
      name: '边坡挡墙',
      icon: 'iconbiaopo.png'
    }
    // {
    //   name: '公交场站',
    //   icon: 'icongongjiao.png'
    // }
  ])

  const pointData = computed(() => {
    const arr = []
    props.data.forEach((item) => {
      const fd = legendConfig.find((obj) => obj.name.includes(item.fl?.trim()) && obj.isChecked)
      if (fd) {
        arr.push({
        ...item,
        ...fd
        })
      }
    })
    console.log(arr)
    return arr
  })

  const handleLegend = (item) => {
    legendConfig.forEach((obj) => {
      obj.isChecked = obj.name === item.name
    })
  }

  const handleRefresh = () => {
  // mapIns.value.map.flyHome({
  //   duration: 1
  // })
  }
  // 地图聚合数量数据
  const dtjhslsjData = ref([])
  const getdtjhslsj = (list) => {
    equipmentRegionCount(list).then((res) => {
      dtjhslsjData.value = (res || []).filter(item => `${list[0] || ''}`.includes(item.des))
    })
  }

  // 绘制道路明细
  const addDLMXLayer = () => {
    if (!mapIns.value) return
    if (dlmxLayer.value) {
      mapIns.value.removeLayerByLayer(dlmxLayer.value)
      dlmxLayer.value = null
    }
    const newDLData = formatDLData()
    if (!(newDLData || []).length) return
    dlmxLayer.value = new mars3d.layer.GraphicLayer()
    mapIns.value.map.addLayer(dlmxLayer.value)
    newDLData.forEach((item) => {
      const graphic = new mars3d.graphic.PolylineEntity({
        positions: item.position,
        style: {
          width: 3,
          color: '#5C94FF'
        },
        attr: { ...item }
      })
      dlmxLayer.value.addGraphic(graphic)
    })
  }

  const formatDLData = () => {
    const arr = []
    props.dlmxData.forEach((item) => {
      const obj = { ...item }
      const jd = item.jd.split(',')
      const wd = item.wd.split(',')
      const position = jd.map((d, i) => [d, wd[i], 0])
      obj.position = position
      if (item.jd && item.wd) {
        arr.push(obj)
      }
    })
    return arr
  }

  const mapload = (etomap) => {
    mapIns.value = etomap
    addDLMXLayer()
    addCluster()
  }
  const addCluster = () => {
    if (!mapIns.value) return
    if (clusterLayer.value) {
      mapIns.value.removeLayerByLayer(clusterLayer.value)
      clusterLayer.value = null
    }
    const data = dtjhslsjData.value.map((item) =>
      geoCoordMap[item.region] ? Number(item.cnt || 0) : 0
    )
    const max = Math.max(...data)
    clusterLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(clusterLayer.value)
    Object.keys(geoCoordMap).forEach((key, i) => {
      const fd = dtjhslsjData.value.find((obj) => obj.region === key)
      const scale =
        fd && fd.cnt && max ? ((((fd && fd.cnt) || 0) / max) * 0.5 + 0.6).toFixed(2) : 0.6
      const graphic = new mars3d.graphic.BillboardPrimitive({
        name: key,
        position: [...geoCoordMap[key], 1],
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
      const coor = [...geoCoordMap[key], 1]
      // const position = mars3d.Cesium.Cartesian3.fromDegrees(coor[0], coor[1], coor[2])
      const divGraphic = new mars3d.graphic.DivGraphic({
        position: coor,
        style: {
          html: `<div class="map-label-wrapper">
          ${formatNumStr((fd && fd.cnt) || 0)}
        </div>`,
          clampToGround: true,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          attr: fd ? { ...fd } : {}
        }
      })
      fd && fd.cnt && clusterLayer.value.addGraphic(graphic)
      fd && fd.cnt && clusterLayer.value.addGraphic(divGraphic)
    })
    clusterLayer.value.on(mars3d.EventType.click, (e) => {
      mapIns.value.map.flyToGraphic(e.graphic, {
        radius: 4e3
      })
    })
  }
  const addPointLayer = () => {
    if (!mapIns.value) return
    const scale = 0.3
    pointerLayer.value && mapIns.value.removeLayerByLayer(pointerLayer.value)
    pointerLayer.value = null
    if (!(pointData.value || []).length) return
    pointerLayer.value = new mars3d.layer.GraphicLayer({ clampToGround: true })
    mapIns.value.map.addLayer(pointerLayer.value)
    ;(pointData.value || []).forEach((item) => {
      if (item.jd && item.wd) {
        const graphic = new mars3d.graphic.BillboardPrimitive({
          name: item.mc,
          position: [item.jd, item.wd, 1],
          attr: { ...item },
          style: {
            image: require(`@/assets/images/${item.icon}`),
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
    pointerLayer.value.bindPopup(
      function (event) {
        const attr = event.graphic.attr || {}
        return `<div class='popup-wrapper'>${attr.mc}</div>`
      },
      {
        template: false,
        offsetY: -30
      }
    )
    const height = mars3d.Cesium.Cartographic.fromCartesian(
      mapIns.value.map.viewer.camera.position
    ).height
    if (height >= 5e4) {
      pointerLayer.value.show = false
    }
  }
  const mapZoom = (e) => {
    if (e.height < 5e4) {
      if (clusterLayer.value) {
        clusterLayer.value.show = false
      }

      if (pointerLayer.value) {
        pointerLayer.value.show = true
      } else {
        addPointLayer()
      // mapIns.value.map.flyToPoint([114.07724582, 22.62082709], { radius: 2000 })
      }
    } else {
      if (clusterLayer.value) {
        clusterLayer.value.show = true
      } else {
        addCluster()
      }

      if (pointerLayer.value) {
        pointerLayer.value.show = false
      }
    }
  }
  const clickHandler = (e) => {
    if (!popUpInfo.show) return
    if (popUp.value && !popUp.value.contains(e.target)) {
      popUpInfo.show = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', clickHandler, false)
  })

  onBeforeUnmount(() => {
    if (!mapIns.value) return
    if (clusterLayer.value) {
      mapIns.value.removeLayerByLayer(clusterLayer.value)
      clusterLayer.value = null
    }
    pointerLayer.value && mapIns.value.removeLayerByLayer(pointerLayer.value)
    pointerLayer.value = null
    if (dlmxLayer.value) {
      mapIns.value.removeLayerByLayer(dlmxLayer.value)
      dlmxLayer.value = null
    }
    document.removeEventListener('click', clickHandler, false)
    clearTimeout(timer.value)
  })

  watch(
    () => legendConfig.slice(1),
    (newVal, oldVal) => {
      const list = legendConfig.filter((item) => item.isChecked).map((item) => item.name)
      getdtjhslsj(list)
    },
    {
      deep: true,
      immediate: true
    }
  )

  watch(
    () => [legendConfig[0], props.dlmxData],
    () => {
      if (legendConfig[0].isChecked) {
        if (dlmxLayer.value) {
          dlmxLayer.value.show = true
        } else {
          addDLMXLayer()
        }
      } else {
        if (dlmxLayer.value) {
          dlmxLayer.value.show = false
        }
      }
    },
    {
      deep: true,
      immediate: true
    }
  )

  watch(
    () => dtjhslsjData.value,
    () => {
      addCluster()
    },
    {
      deep: true,
      immediate: true
    }
  )

  watch(
    () => pointData.value,
    () => {
      addPointLayer()
    },
    {
      deep: true,
      immediate: true
    }
  )
</script>

<style lang="less" scoped>
.checkbox-legend {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1.3rem;
  padding: .12rem;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .28);
  border-radius: 4px;

  .check-legend-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .08rem;
    cursor: pointer;

    &:last-of-type {
      margin-bottom: 0;
    }

    .radio-box {
      position: relative;
      flex: 0 0 .16rem;
      height: .16rem;
      margin-right: .08rem;
      border: 1px solid #54b5ff;
      border-radius: 50%;

      &.checked {
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: .08rem;
          height: .08rem;
          background: #54b5ff;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .legend-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 .135rem;
      height: .18rem;
      margin-right: .08rem;

      img {
        width: .14rem;
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
  padding: .04rem .1rem;
  color: #b9e1ff;
  font-family: "PingFang SC";
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  background: linear-gradient(97.14deg, #155f97 .81%, rgba(0, 9, 45, .86) 99.86%);
  border: .7px solid rgba(84, 181, 255, .5);
}
</style>
