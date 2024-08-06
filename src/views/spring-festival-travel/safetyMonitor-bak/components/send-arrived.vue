<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-16 15:19:21
 * @LastEditTime: 2022-12-01 11:41:55
 * @FilePath: \traffic-web\src\views\spring-festival-travel\safetyMonitor\components\send-arrived.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
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
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="top">
              <span class="time">
                当年春运累计{{ activeTab }}人次
              </span>
              <svg-icon
                icon-class="more"
                class="more"
              />
            </div>
            <div class="data-type">
              <span><DataTypeBtn type="实时" /></span>
            </div>
            <div class="chart-wrapper">
              <pie-trend
                :type="activeTab"
                :data="data"
              />
            </div>
          </div>
          <div class="line-wrapper">
            <div class="top">
              <span class="time">
                历年每日{{ activeTab }}旅客趋势对比
              </span>
              <svg-icon
                icon-class="more"
                class="more"
              />
            </div>
            <div class="chart-wrapper">
              <line-trend
                :type="activeTab"
                :data="lnqsdbData"
              />
            </div>
          </div>
        </div>
      </tabPanel>
    </tabCard>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import tabCard from '@/components/tabCard/tabCard.vue'
  import tabPanel from '@/components/tabCard/tabCardPlanelVue3.vue'
  import LineTrend from './line-trend.vue'
  import PieTrend from './pie-trend.vue'
  import { cylnmrqs } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import { watch } from '@vue/runtime-core'
  // const emits = defineEmits(['change'])
  defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const tabList = [
    {
      key: '发送',
      name: '发送'
    },
    {
      key: '到达',
      name: '到达'
    }
  ]
  const activeTab = ref(tabList[0].key)
  const selectTab = tab => {
    activeTab.value = tab.key
  // emits('change', tab.key)
  }

  // 历年趋势对比
  const lnqsdbData = ref([])
  const getLndsdbData = (type) => {
    cylnmrqs({ type }).then(res => {
      lnqsdbData.value = res || []
    })
  }

  watch(() => activeTab.value, () => {
    const type = activeTab.value === tabList[0].key ? 'fslkqs' : 'ddlkqs'
    getLndsdbData(type)
  }, {
    deep: true,
    immediate: true
  })
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: .24rem;
  background: linear-gradient(0deg, rgba(#00b2ff, .3) -36.53%, rgba(0, 133, 255, .0001) 100%);

   > div {
    width: 100%;
    height: 100%;
  }

  :deep(.tab-content) {
    background-image: none;
    border-image: none;
  }

  .content-wrapper {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
  }

  .top-wrapper {
    display: flex;
    flex-flow: column nowrap;
    flex: 0 0 2.5rem;
  }

  .line-wrapper {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    min-height: 0;
  }

  .data-type {
    width: .33rem;
    margin-bottom: .13rem;
  }

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-top: .24rem;
    margin-bottom: .14rem;
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
      font-size: .18rem;
      font-weight: @regular;
      letter-spacing: 0;
    }
  }

  .chart-wrapper {
    flex: 1;
    min-height: 0;
  }
}
</style>
