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
        <DataTypeBtn
          type="实时"
          :show-drop="false"
          :date="date"
          drop-info="2022-10-31"
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
            <SimpleTable
              :table-head="tableHead"
              :table-data="cyldyddjmxData"
              :loading="loading"
              type="education"
              :scroll="{y: '1.2rem'}"
            >
              <template
                #compare="{record}"
              >
                <div class="compare">
                  {{ record.tbqn }}%
                  <svg-icon
                    v-if="Number(record.tbqn) && !Number.isNaN(Number(record.tbqn))"
                    :icon-class="Number(record.tbqn) < 0 ? 'drop' : 'rise'"
                    style="font-size: 0.12rem; width: 0.12rem; margin-left:0.08rem;"
                  />
                </div>
              </template>
            </SimpleTable>
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
  import SimpleTable from '@/components/simple-table'
  import { cyldyddjmx } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import { watch } from '@vue/runtime-core'
  const loading = ref(false)
  const tableHead = [
    {
      title: '拥堵排名',
      dataIndex: 'index',
      className: 'center',
      width: '1.1rem'
    },
    {
      title: '路段名称',
      dataIndex: 'mc',
      className: 'center'
    },
    {
      title: '道路等级',
      dataIndex: 'lddj',
      className: 'center',
      width: '1.1rem'
    },
    {
      title: '速度（km/h）',
      dataIndex: 'pjsd',
      className: 'center',
      width: '1.6rem'
    },
    {
      title: '同比去年',
      dataIndex: 'tbqn',
      className: 'compare',
      width: '1.2rem',
      slots: { customRender: 'compare' }
    }
  ]
  const tabList = [
    {
      key: 'all',
      name: '全部'
    },
    {
      key: 'gsl',
      name: '高速路'
    },
    {
      key: 'ksl',
      name: '快速路'
    },
    {
      key: 'zgl',
      name: '主干路'
    }
  ]
  const activeTab = ref(tabList[0].key)
  const selectTab = tab => {
    activeTab.value = tab.key
  }
  // 春运路段拥堵等级明细
  const cyldyddjmxData = ref([])
  const getCyldyddjmx = () => {
    loading.value = true
    cyldyddjmx({ type: activeTab.value }).then(res => {
      cyldyddjmxData.value = (res || []).map((item, i) => ({
      ...item, index: i + 1
      }))
      loading.value = false
    }).catch(() => {
      loading.value = false
    })
  }

  watch(() => activeTab.value, () => {
    getCyldyddjmx()
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
  padding: .24rem;

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

      .content-wrapper {
        width: 100%;
        height: 100%;
        padding-top: .2rem;

        .sipmle-table {
          width: 100%;
          height: 100%;
        }

        .compare {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
      }
    }
  }
}
</style>
