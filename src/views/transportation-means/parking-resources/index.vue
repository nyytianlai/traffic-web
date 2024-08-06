<template>
  <div class="parking-resources-wrapper">
    <div class="top-select">
      <RadioList
        v-model:value="selectedRadio"
        :radio-list="radioList"
      />
    </div>
    <div class="content">
      <div><map-view :title="title" /> </div>
      <div
        class="bottom-wrapper"
        :class="{ tccbw: selectedRadio === radioList[1].value }"
      >
        <div v-show="(selectedRadio === radioList[0].value)">
          <base-panel title="全天路内停车饱和度变化">
            <use-info-chart
              :is-active="(selectedRadio === radioList[0].value)"
              :data="qtlntcbhdbhData"
            />
          </base-panel>
        </div>
        <div v-show="(selectedRadio === radioList[0].value)">
          <base-panel title="区域路内停车泊位使用情况">
            <saturation-change :is-active="(selectedRadio === radioList[0].value)" />
          </base-panel>
        </div>
        <div v-show="(selectedRadio === radioList[1].value)">
          <base-panel title="区域停车场分布">
            <parking-distribute :is-active="(selectedRadio === radioList[1].value)" />
          </base-panel>
        </div>
        <div v-show="(selectedRadio === radioList[1].value)">
          <base-panel title="区域路内停车泊位使用情况">
            <use-info-pie
              :is-active="(selectedRadio === radioList[1].value)"
              :data="UseInfoPiedata"
            />
          </base-panel>
        </div>
        <div v-show="(selectedRadio === radioList[1].value)">
          <base-panel title="区域路内停车泊位使用情况">
            <useinfo-3d-pie
              v-if="selectedRadio === radioList[1].value"
              :is-active="(selectedRadio === radioList[1].value)"
            />
          </base-panel>
        </div>
      </div>
    </div>
    <div class="data-from">
      <div>市交通运输局、深圳交警</div>
      <div>
        <svg-icon icon-class="datasources" />
        宜停车、停车云平台
        <svg-icon icon-class="arrow-down " />
      </div>
    </div>
  </div>
</template>

<script setup>
  import RadioList from '@/components/radio-list/index'
  import BasePanel from '@/components/base-panel'
  import ParkingDistribute from './components/parking-distribute.vue'
  import UseInfoChart from './components/use-info-chart.vue'
  import SaturationChange from './components/saturation-change.vue'
  import UseInfoPie from './components/use-info-pie.vue'
  import Useinfo3dPie from './components/useinfo-3d-pie.vue'
  import MapView from './components/map-view'
  import { cycxqk, kajcczgkzb } from '@/api/modules/spring-festival-travel/safetyMonitor'

  import { qtlntcbhdbh } from '@/api/modules/transportation-means/parking-resources'
  const radioList = [
    {
      name: '路内停车泊位',
      value: 'lntcbw'
    },
    {
      name: '停车场泊位',
      value: 'tccbw'
    }
  ]
  const title = computed(() => radioList.find(item => item.value === selectedRadio.value)?.name)
  const selectedRadio = ref(radioList[0].value)
  // 春运出行情况
  const cycxqkData = ref([])
  const getCycxqk = () => {
    cycxqk().then(res => {
      cycxqkData.value = res || []
    })
  }

  // 口岸机场车站港口坐标
  const kajcczgkzbData = ref([])
  const getKajcczgkzb = () => {
    kajcczgkzb().then(res => {
      kajcczgkzbData.value = res || []
    })
  }

  const qtlntcbhdbhData = ref([])
  const getqtlntcbhdbh = () => {
    qtlntcbhdbh().then(res => {
      qtlntcbhdbhData.value = res || []
    })
  }

  onMounted(() => {
    getCycxqk()
    getKajcczgkzb()
    getqtlntcbhdbh()
  })

  const UseInfoPiedata = computed(() => {
    const dt = [];
    (['商业场所', '写字楼', '住宅小区', '其他']).forEach(item => {
      dt.push({
        zbmc: item.name,
        zbz: Math.ceil(Math.random() * 120)
      })
      dt.push({
        zbmc: `${item.name}占比`,
        zbz: Math.ceil(Math.random() * 120)
      })
    })
    dt.push({
      zbmc: '车辆类型',
      zbz: Math.ceil(Math.random() * 240)
    })
    return dt
  })

</script>

<style lang="less" scoped>
.parking-resources-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: .22rem 1fr;
  row-gap: .24rem;

   > div {
    min-height: 0;
  }
  .data-from {
    position: absolute;
    bottom: -0.36rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 .6rem;
     > div {
      color: #54b5ff;
      font-family: "PingFang SC";
      font-size: .14rem;
      font-weight: 400;
      line-height: .2rem;
      text-transform: uppercase;
    }
  }

  .content {
    display: grid;

    grid-template-rows: 1fr 3.32rem;
    row-gap: .24rem;

     > div {
      min-height: 0;
    }

    .bottom-wrapper {
      display: grid;

      column-gap: .24rem;
      grid-template-columns: repeat(2, 1fr);

      &.tccbw {
        grid-template-columns: 8.88rem repeat(2, 1fr);
      }
    }
  }
}
</style>
