<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-11-21 17:10:02
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\index.vue
 * @Description: FilePath
-->
<template>
  <div class="safe-monitor-wrapper">
    <div class="top-select">
      <RadioList
        v-model:value="selectedRadio"
        :radio-list="radioList"
      />
    </div>
    <div class="content">
      <!-- <keep-alive>
        <component
          :is="selectedRadio"
          :key="selectedRadio"
        />
      </keep-alive> -->
      <component
        :is="selectedRadio"
        :key="selectedRadio"
        :byjtsg-jtwz-data="byjtsgJtwzData"
        :ajqs-data="ajqsData"
        :gqjtaq-data="gqjtaqData"
        :sgdwxq-data="sgdwxqData"
      />
    </div>
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        道路交通运行指挥系统
      </div>
    </div>
  </div>
</template>
<script>
  import RadioList from '@/components/radio-list/index'
  import { defineComponent, onMounted } from '@vue/runtime-core'
  import RoadWorks from './road-works'
  import TrafficAccident from './traffic-accident'
  import TrafficViolation from './traffic-violation'
  import { aqjc, ajqs, gqjtaq, sgdwxq } from '@/api/modules/traffic-safety/safetyMonitoring'
  export default defineComponent({
    components: {
      RadioList,
      RoadWorks,
      TrafficAccident,
      TrafficViolation
    },
    setup () {
      const radioList = [
        {
          name: '交通事故',
          value: 'TrafficAccident',
          component: 'TrafficAccident'
        },
        {
          name: '交通违章',
          value: 'TrafficViolation',
          component: 'TrafficViolation'
        },
        {
          name: '道路施工',
          value: 'RoadWorks',
          component: 'RoadWorks'
        }
      ]
      const selectedRadio = ref(radioList[0].value)

      // 本月交通事故 - 交通违章
      const byjtsgJtwzData = ref([])
      const getByjtsgJtwzData = () => {
        aqjc().then(res => {
          byjtsgJtwzData.value = res || []
        })
      }

      // 案件趋势
      const ajqsData = ref([])
      const getAjqs = () => {
        ajqs('jn').then(res => {
          ajqsData.value = res || []
        })
      }

      // 各区交通安全
      const gqjtaqData = ref([])
      const getGqjtaq = () => {
        gqjtaq().then(res => {
          gqjtaqData.value = res || []
        })
      }

      // 施工点位详情
      const sgdwxqData = ref([])
      const getSgdwxq = () => {
        sgdwxq().then(res => {
          sgdwxqData.value = res || []
        })
      }

      onMounted(() => {
        getByjtsgJtwzData()
        getAjqs()
        getGqjtaq()
        getSgdwxq()
      })

      return {
        selectedRadio,
        radioList,
        byjtsgJtwzData,
        ajqsData,
        gqjtaqData,
        sgdwxqData
      }
    }
  })
</script>

<style lang="less" scoped>
.safe-monitor-wrapper {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: .22rem 1fr;
  row-gap: .24rem;

  .top-select {
    min-height: 0;
  }

  .content {
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
}
</style>
