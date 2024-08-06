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
          type="实时"
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
    <div class="chart-wrapper">
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
            <div class="chart-wrapper">
              <line-trend
                :type="activeTab"
                :data="cylnmrqsData"
              />
            </div>
            <div class="bottom-data">
              <div
                v-for="item in bottomCOnfig"
                :key="item.name"
                class="bottom-item"
              >
                <p class="name">
                  {{ item.name }}<span>{{ formatData(item.code)?.to_char || '-' }}</span>
                </p>
                <p
                  class="data"
                  :style="{color: item.color}"
                >
                  {{ formatData(item.code)?.zbz && Number(formatData(item.code)?.zbz).toFixed(2) || '-' }}<span>{{ item.unit }}</span>
                </p>
              </div>
            </div>
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
  import LineTrend from './line-trend.vue'
  import { cylnmrqs, lnzghzd } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import { nextTick, watch } from 'vue'
  import { useStore } from 'vuex'
  import moment from 'moment'
  defineProps({
    isSpring: {
      type: Boolean,
      default: false
    }
  })
  const store = useStore()
  const storDate = computed(() => store.getters.date)
  const date = computed(() => !store.isSpring ? store.getters.glEnd : store.getters.date)
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

  const bottomCOnfig = [
    {
      name: '历史最高',
      unit: '万人次',
      color: '#FFB713',
      code: 'max'
    },
    {
      name: '历史最低',
      unit: '万人次',
      color: '#00FF92',
      code: 'min'
    }
  ]
  // 春运历年每日趋势
  const cylnmrqsData = ref([])
  const getcylnmrqs = () => {
    cylnmrqs({ type: activeTab.value, year: moment(storDate.value).format('YYYY') }).then(res => {
      cylnmrqsData.value = res || []
    })
  }

  // 春运历年每日趋势
  const lnzghzdData = ref([])
  const getlnzghzd = () => {
    lnzghzd({ type: activeTab.value }).then(res => {
      lnzghzdData.value = res || []
    })
  }
  const formatData = (name) => {
    const fd = lnzghzdData.value.find(item => item.lx === name)
    return fd || {}
  }
  watch(() => [activeTab.value, storDate.value], () => {
    nextTick(() => {
      getcylnmrqs()
      getlnzghzd()
    })
  }, {
    immediate: true
  })

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .12rem .24rem;

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

  .chart-wrapper {
    flex: 1;
    min-height: 0;

     > div {
      width: 100%;
      height: 100%;
    }
    .content-wrapper {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      height: 100%;

      .chart-wrapper {
        flex: 1;
        min-height: 0;
      }

      .bottom-data {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .bottom-item {
        flex: 0 0 calc(50% - .08rem);
        .name {
          margin-bottom: .03rem;
          color: #fff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .2rem;
          white-space: nowrap;

          span {
            margin-left: .08rem;
            color: #54b5ff;
            font-family: "PingFang SC";
            font-size: .14rem;
            font-weight: 400;
            line-height: .2rem;
            white-space: nowrap;
          }
        }

        .data {
          display: flex;
          align-items: baseline;
          font-family: DINCondensed-Bold;
          font-size: .32rem;
          font-weight: 700;
          line-height: .38rem;

          span {
            margin-left: .08rem;
            font-family: "PingFang SC";
            font-size: .16rem;
            font-weight: 400;
            line-height: .22rem;
          }
        }
      }
    }
  }
}
</style>
