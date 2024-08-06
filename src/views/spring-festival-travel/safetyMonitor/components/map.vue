<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 15:09:59
 * @LastEditTime: 2022-12-09 11:39:22
 * @FilePath: \traffic-web\src\views\spring-festival-travel\safetyMonitor\components\map.vue
 * @Description: FilePath
-->
<template>
  <base-map
    @onload="mapload"
    @handleRefresh="handleRefresh"
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
          :class="{checked: item.isChecked}"
        />
        <div class="legend-icon">
          <img :src="require(`@/assets/images/${item.icon}`)">
        </div>
        <div class="legend-name">
          {{ item.name }}
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
    <div class="top-card">
      <div
        v-show="isSpring"
        class="chunyun-card"
      >
        <div class="chunyundi">
          春运第
        </div>
        <div class="card-num">
          {{ date }}
        </div>
        <div class="tian">
          天
        </div>
      </div>
      <div
        v-show="!isSpring"
        class="chunyun-card"
      >
        <div class="card-num">
          <!-- {{ formatData('春运第几天') }} -->
          {{ moment(nlDate).format('YYYY') }}
        </div>
        <div class="tian">
          年春运
        </div>
      </div>
    </div>
  </base-map>
</template>

<script setup>
  import BaseMap from '@/components/base-map'
  import MapPointChart from './map-point-chart.vue'
  import { useStore } from 'vuex'
  import { gpsLocation } from '@/api/modules/transportation/overview.js'
  import moment from 'moment'
  const store = useStore()

  defineProps({
    isSpring: {
      type: Boolean,
      default: false
    }
  })

  const date = computed(() => store.getters.index)

  const pointData = ref([])

  const nlDate = computed(() => store.getters.nlDate)
  // 地图实例
  const mapIns = shallowRef()
  const pointLayer = shallowRef()
  // const clickedPoint = shallowRef()
  const popUp = ref(null)
  const timer = ref(null)
  const scale = 0.2
  const popUpInfo = reactive({
    show: false
  })
  const legendConfig = reactive([
    {
      name: '全市路况',
      icon: 'icondaolu.svg',
      isChecked: true
    },
    // {
    //   name: '通关口岸',
    //   icon: 'icontongguankouan.png',
    //   code: '口岸'
    // },
    {
      name: '深圳机场',
      icon: 'iconshenzhenjichang.png',
      code: '机场'
    },
    {
      name: '火车站',
      icon: 'iconhuochezhan.png',
      code: '火车站'
    },
    {
      name: '长途客运站',
      icon: 'iconchangtukeyunzhan.png',
      code: '汽车站'
    },
    {
      name: '客运码头',
      icon: 'iconkeyunmatou.png',
      code: '港口'
    }
  ])

  // 口岸机场车站港口坐标
  const getKajcczgkzb = (obj) => {
    gpsLocation(obj.code).then(res => {
      pointData.value = (res || []).map(item => ({
        ...item,
        jd: item.lon,
        wd: item.lat,
        icon: obj.icon
      }))
      addPointLayer()
    })
  }

  const handleLegend = item => {
    legendConfig.forEach(obj => {
      obj.isChecked = item.name === obj.name
    })
    getKajcczgkzb(item)
  }

  const handleRefresh = () => {
  // mapIns.value.map.flyHome({
  //   duration: 1
  // })
  }
  const mapload = etomap => {
    mapIns.value = etomap
    addPointLayer()
  }

  const clickHandler = e => {
    if (!popUpInfo.show) return
    if (popUp.value && !popUp.value.contains(e.target)) {
      popUpInfo.show = false
    }
  }

  // const clickCallbackFun = e => {
  //   clearTimeout(timer.value)
  //   timer.value = setTimeout(() => {
  //     popUpInfo.show = true
  //     popUpInfo.left = e.position.x
  //     popUpInfo.top = e.position.y
  //     popUpInfo.data = { ...e.graphic.attr }
  //     clickedPoint.value = e.graphic
  //     e.graphic.setStyle({
  //       scale: scale + 0.1
  //     })
  //   })
  // }

  // 绘制点位
  const addPointLayer = () => {
    if (!mapIns.value) return
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
            image: require(`@/assets/images/${item.icon}`),
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
      return `<div class='popup-wrapper'>${attr.mc}</div>`
    }, {
      template: false,
      offsetY: -20
    })
  }
  onMounted(() => {
    document.addEventListener('click', clickHandler, false)
  })

  onBeforeUnmount(() => {
    if (mapIns.value) {
      pointLayer.value && mapIns.value.removeLayerByLayer(pointLayer.value)
      pointLayer.value = null
    }

    document.removeEventListener('click', clickHandler, false)
    clearTimeout(timer.value)
  })

</script>

<style lang="less" scoped>
.checkbox-legend {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1.5rem;
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
      flex: 0 0 .16rem;
      height: .16rem;
      margin-right: .08rem;
      border: 1px solid #54b5ff;
      border-radius: 50%;

      &.checked {
        position: relative;

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

.pop-container {
  position: absolute;
  width: 3.4rem;
  height: 2rem;
  color: #fff;
  font-size: 20px;
  transform: translate(.2rem, -50%);
}
.top-card {
  position: absolute;
  top: .05rem;
  left: .8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: .66rem;

  .chunyun-card {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    flex: 0 0 2.82rem;
    width: 2.82rem;
    padding: .06rem .32rem;
    background-image: url("~@/assets/images/chunyunBg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .chunyundi {
      flex: 0 0 1rem;
      color: #fff;
      font-family: "YouSheBiaoTiHei";
      font-size: 36px;
      font-weight: 400;
      line-height: .38rem;
      text-shadow: 0 2px 20px rgba(0, 133, 255, .85), 0 0 30px rgba(0, 209, 255, .65);
      white-space: nowrap;
    }

    .card-num {
      flex: 1;
      font-family: "DS-Digital4";
      font-size: .38rem;
      font-style: italic;
      font-weight: 700;
      letter-spacing: .03rem;
      text-align: center;
      text-shadow: 5.94595px 13.6757px 13.6757px rgba(0, 0, 0, .6);
      text-transform: uppercase;
      background: linear-gradient(227.66deg, #fd4646 15.6%, rgba(255, 225, 68, .74) 100%);
              background-clip: text;

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .tian {
      flex: 0 0 .34rem;
      margin-left: .08rem;
      color: #fff;
      font-family: "YouSheBiaoTiHei";
      font-size: 36px;
      font-weight: 400;
      line-height: .38rem;
      text-shadow: 0 2px 20px rgba(0, 133, 255, .85), 0 0 30px rgba(0, 209, 255, .65);
      white-space: nowrap;
    }
  }
}
</style>
