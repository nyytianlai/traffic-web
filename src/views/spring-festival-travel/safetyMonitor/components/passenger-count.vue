<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-16 11:26:09
 * @LastEditTime: 2022-11-30 15:12:15
 * @FilePath: \traffic-web\src\views\spring-festival-travel\safetyMonitor\components\busy-road-warning.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          :type="isSpring ? '实时' : '年度'"
          :show-drop="false"
          :drop-info="date"
          :date="date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="content-wrapper">
      <tabCard
        :tab-list="tabList"
        width="100%"
        height="calc(100% - 0.36rem)"
        no-padding
        class="tab-card"
        font-size="0.2rem"
        @select-tab="selectTab"
      >
        <tabPanel
          :tab-key="activeTab"
          style="height: 100%;"
        >
          <div class="chart-content-wrapper">
            <pie-trend
              :type="activeTab"
              :data="fssdrlkfslddlData"
              :center-data="getLjData()"
            />
          </div>
        </tabPanel>
      </tabCard>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import tabCard from '@/components/tabCard/tabCard.vue'
  import tabPanel from '@/components/tabCard/tabCardPlanelVue3.vue'
  import PieTrend from './pie-trend.vue'
  import { fssdrlkfslddl, fcyqjfssdrlkfslddl } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import moment from 'moment'
  import { useStore } from 'vuex'
  import { nextTick } from 'vue'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  const index = computed(() => store.getters.index)
  const storDate = computed(() => store.getters.date)
  const date = computed(() => !store.isSpring ? store.getters.glEnd : store.getters.date)
  const props = defineProps({
    isSpring: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  })
  const tabList = [
    {
      key: 'fsl',
      name: '发送量'
    },
    {
      key: 'ddl',
      name: '到达量'
    }
  ]
  const activeTab = ref(tabList[0].key)
  const selectTab = tab => {
    activeTab.value = tab.key
  }
  // 分方式当日旅客发送量到达量
  const fssdrlkfslddlData = ref([])
  const getfssdrlkfslddl = () => {
    (props.isSpring ? fssdrlkfslddl : fcyqjfssdrlkfslddl)({ year: moment(storDate.value).format('YYYY'), day: index.value, type: activeTab.value }).then(res => {
      fssdrlkfslddlData.value = res || []
    })
  }
  const getLjData = () => {
    const fd = props.data[0] || {}
    const value = activeTab.value === 'fsl' ? fd.ljfsl : fd.ljddl
    return formatNumStr(Number(value) ? Number(value).toFixed(2) : value)
  }
  watch(() => [storDate.value, activeTab.value, index.value, props.isSpring], () => {
    nextTick(getfssdrlkfslddl)
  }, {
    deep: true,
    immediate: true
  })
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .16rem .24rem;

  :deep(.tab-content) {
    background-image: none;
  }

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .12rem;
    .more {
      width: .16rem;
      height: .16rem;
      font-size: .16rem;
      cursor: pointer;
    }

    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: .16rem;
      font-weight: @regular;
      letter-spacing: 0;

       > div {
        margin-left: .04rem;
      }
    }
  }

  .content-wrapper {
    flex: 1;
    min-height: 0;

     > div {
      width: 100%;
      height: 100%;
    }
    .chart-content-wrapper {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
