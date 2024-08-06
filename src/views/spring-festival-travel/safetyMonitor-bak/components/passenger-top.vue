<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-30 11:15:38
 * @LastEditTime: 2022-12-05 15:08:03
 * @FilePath: \traffic-web\src\views\spring-festival-travel\safetyMonitor\components\passenger-top.vue
 * @Description: FilePath
-->
<template>
  <div class="passenger-top-wrapper">
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
              :table-data="cyzdklData"
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
  import { cyzdkl } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import { watch } from '@vue/runtime-core'
  const loading = ref(false)
  const tableHead = computed(() => {
    return activeTab === tabList[0].code ? [
      {
        title: '排名',
        dataIndex: 'index',
        className: 'center',
        width: '0.6rem'
      },
      {
        title: '轨道站点',
        dataIndex: 'mc',
        className: 'center'
      },
      {
        title: '线路',
        dataIndex: 'xlh',
        className: 'center',
        width: '1.1rem'
      },
      {
        title: '客流量',
        dataIndex: 'kll',
        className: 'center',
        width: '0.9rem'
      }
    ] : [
      {
        title: '排名',
        dataIndex: 'index',
        className: 'center',
        width: '0.6rem'
      },
      {
        title: '公交站点',
        dataIndex: 'mc',
        className: 'center'
      },
      {
        title: '客流量',
        dataIndex: 'kll',
        className: 'center',
        width: '0.9rem'
      }
    ]
  })
  const tabList = [
    {
      key: 'dtz',
      name: '地铁站'
    },
    {
      key: 'gjz',
      name: '公交站'
    }
  ]
  const activeTab = ref(tabList[0].key)
  const selectTab = tab => {
    activeTab.value = tab.key
  }
  // 春运站点客流
  const cyzdklData = ref([])
  const getcyzdkl = () => {
    loading.value = true
    cyzdkl({ type: activeTab.value }).then(res => {
      cyzdklData.value = (res || []).map((item, i) => ({
      ...item, index: i + 1
      }))
      loading.value = false
    }).catch(() => {
      loading.value = false
    })
  }

  watch(() => activeTab.value, () => {
    getcyzdkl()
  }, {
    deep: true,
    immediate: true
  })

</script>

<style lang="less" scoped>
.passenger-top-wrapper {
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

        :deep(.sipmle-table) {
          width: 100%;
          height: 100%;

          .ant-table-thead > tr > th {
            padding: .05rem .02rem;
          }
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
