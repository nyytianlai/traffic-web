<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-07 15:22:11
 * @FilePath: \traffic-web\src\views\city-transit\regularTransit\components\map.vue
 * @Description: FilePath
-->
<template>
  <base-map
    :all-layers="allLayers"
    @handleRefresh="handleRefresh"
    @onload="mapload"
  >
    <div class="checkbox-legend">
      <div
        v-for="item in legendConfig"
        :key="item.name"
        class="check-legend-item"
        @click="handleLegend(item)"
      >
        <div
          class="check-box"
          :class="{checked: item.isChecked}"
        />
        <div class="legend-name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </base-map>
</template>

<script setup>
  import BaseMap from '@/components/base-map'
  import greenPoint from '@/assets/images/greenPoint.png'
  import orangePoint from '@/assets/images/orangePoint.png'
  import greenPointClick from '@/assets/images/greenPoint-click.png'
  import orangePointClick from '@/assets/images/orangePoint-click.png'
  import utils from '@/hooks/utils'
  import { gjczxq } from '@/api/modules/city-transit/regularTransit'
  import { useStore } from 'vuex'
  const store = useStore()
  const formatNumStr = utils.formatNumStr
  const legendConfig = reactive([
    {
      name: '公交线网',
      isChecked: true
    },
    {
      name: '专用道',
      isChecked: true
    },
    {
      name: '充电站',
      isChecked: true
    },
    {
      name: '站点',
      isChecked: true
    },
    {
      name: '场站',
      isChecked: true
    },
    {
      name: '公交车',
      isChecked: true
    }
  ])
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({})
    /**
     * gjzydCdz: { // 公交专用道、充电桩
          type: Array,
          default: () => ([])
        },
        gjzd: { // 公交站点
          type: Array,
          default: () => ([])
        }
     */
    }
  })
  const allLayers = []
  // 地图实例
  const mapIns = ref()
  // 地铁线路图层
  const dtxlLayer = ref()
  const pointLayer = ref()

  const handleRefresh = () => {
  }

  const pointData = ref([])

  const mapload = etomap => {
    mapIns.value = etomap
    addroadInfoLayer()
    addPointLayer()
  }

  const handleLegend = item => {
    item.isChecked = !item.isChecked
  }

  // 添加地铁线路图层
  const addroadInfoLayer = () => {
    if (!mapIns.value) return
    dtxlLayer.value && mapIns.value.removeLayerByLayer(dtxlLayer.value)
    dtxlLayer.value = null
  }
  const infos = (type, data) => {
    const infoList = type ? [
      {
        name: '所在区域',
        code: 'xzqh'
      },
      {
        name: '类型',
        code: 'lx'
      },
      {
        name: '详细地址',
        code: 'wz'
      }
    ] : [
      {
        name: '所在区域',
        code: 'xzqh'
      },
      {
        name: '场站面积',
        code: 'mj',
        isNumber: true,
        unit: '平方米'
      },
      {
        name: '所属公司',
        code: 'ssgs'
      },
      {
        name: '场站权属',
        code: 'xzqh'
      },
      {
        name: '详细地址',
        code: 'dz'
      }
    ]
    let str = ''
    infoList.forEach(item => {
      str += `
    <div class="info-item">
      <div class="label">
        ${item.name}
      </div>
      <div class="data" title="${item.isNumber ? formatNumStr(data[item.code]) : data[item.code] || '-'}${item.unit || ''}">
        ${item.isNumber ? formatNumStr(data[item.code]) : data[item.code] || '-'}${item.unit || ''}
      </div>
    </div>
    `
    })
    return str
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
            image: item.image,
            visibleDepth: false,
            width: 0.2 * fontSize,
            height: 0.2 * fontSize,
            horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            scaleByDistance: true,
            scaleByDistance_nearValue: 1.6,
            scaleByDistance_near: 100000
          }
        })
        pointLayer.value.addGraphic(graphic)
      }
    })
    pointLayer.value.bindPopup(async function (event) {
      const attr = event.graphic.attr || {}
      const title = attr.type ? '站点' : '场站'
      // const res = attr.type ? [] : await gjczxq(attr.mc)
      const res = attr.type ? [] : await gjczxq('桃花公交总站')
      const data = res[0] ? { ...attr, ...res[0] } : { ...attr }
      const inforStr = infos(attr.type, data)
      return `
      <div class="map-point-wrapper">
      <div class="corner left-top"></div>
      <div class="corner right-top"></div>
      <div class="corner left-bottom"></div>
      <div class="corner right-top"></div>
      <div class="sub-title">
        <div class="sub-left">
          ${title}：${attr.mc}
        </div>
      </div>
      <div class="tip-info">
        ${inforStr}
      </div>
    </div>
    `
    }, {
      template: false,
      offsetY: -30,
      offsetX: 0.3 * fontSize
    })
    pointLayer.value.on(mars3d.EventType.popupOpen, function (event) {
      event.graphic.setStyle({
        width: 0.92 * fontSize,
        height: 0.92 * fontSize,
        image: event.graphic.attr.clickImage
      })
    })
    pointLayer.value.on(mars3d.EventType.popupClose, function (event) {
      event.graphic.setStyle({
        width: 0.2 * fontSize,
        height: 0.2 * fontSize,
        image: event.graphic.attr.image
      })
    })
  }

  watch(() => pointData.value, () => {
    addPointLayer()
  }, {
    deep: true,
    immediate: true
  })

  watch(() => [props.data, legendConfig], () => {
    const data = []
    Object.keys(props.data).forEach(key => {
      const type = key === 'gjzd'
      const image = type ? greenPoint : orangePoint
      const clickImage = type ? greenPointClick : orangePointClick;
      (props.data[key] || []).forEach(item => {
        const fd = legendConfig.find(obj => obj.isChecked && item.legendType.includes(obj.name))
        if (fd) {
          data.push({
          ...item,
          type,
          image,
          clickImage
          })
        }
      })
    })
    pointData.value = data
  }, {
    deep: true,
    immediate: true
  })

  onBeforeUnmount(() => {
    if (!mapIns.value) return
    pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
    pointLayer.value = null

    dtxlLayer.value && mapIns.value.removeLayerByLayer(dtxlLayer.value)
    dtxlLayer.value = null
  })
</script>

<style lang="less" scoped>
:deep(.map-point-wrapper) {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 3rem;
  max-height: 2.5rem;
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
    margin-bottom: .24rem;

    &::after {
      content: "";
      position: absolute;
      bottom: -.12rem;
      left: 0;
      width: 100%;
      height: .01rem;
      background-color: rgba(#fff, .2);
    }

    .sub-left {
      display: flex;
      align-items: center;
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
        flex: 0 0 .88rem;
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
.checkbox-legend {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1.2rem;
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
</style>
