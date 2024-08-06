<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 18:14:05
 * @LastEditTime: 2022-11-25 15:38:01
 * @FilePath: \traffic-web\src\views\road\components\busyRank.vue
 * @Description: FilePath
-->
<template>
  <div class="busy-rank-wrapper">
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
          <div class="head">
            <div
              v-for="item in head"
              :key="item.code"
              class="head-item"
              :style="{flex: item.width ? `0 0 ${item.width}` : 1}"
            >
              {{ item.name }}
            </div>
          </div>

          <div class="tb-content">
            <div
              v-for="(dt, i) in listInfo"
              :key="i"
              class="data-row"
            >
              <div class="row-left">
                <div class="point-name">
                  <span>{{ i + 1 }}</span>
                  <span :title="dt.pointName">{{ dt.pointName }}</span>
                </div>
                <div class="point-address">
                  {{ dt.address }}
                </div>
              </div>
              <div class="row-right">
                <span>{{ dt.pjsd }}</span>
                <span :style="{color: getStatus(dt.yddj)}">{{ dt.yddj }}</span>
              </div>
            </div>
          </div>
        </div>
      </tabPanel>
    </tabCard>
  </div>
</template>

<script setup>
  import tabCard from '@/components/tabCard/tabCard.vue'
  import tabPanel from '@/components/tabCard/tabCardPlanelVue3.vue'
  import { status } from '../config'
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const emits = defineEmits(['change'])
  const listInfo = ref([])
  const tabList = [
    {
      key: '',
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
  const head = [{
    name: '站点名称',
    width: '1.8rem'
  }, {
    name: '平均速度（公里/小时）',
    code: 'speed'
  }]

  const activeTab = ref(tabList[0].key)
  const getStatus = data => {
    const fd = status.find(item => item.name === data)
    return fd?.color
  }
  const selectTab = tab => {
    activeTab.value = tab.key
    emits('change', tab.key)
  }

  watch(() => props.data, () => {
    listInfo.value = props.data
    listInfo.value.forEach(item => {
      const arr = item.mc.split(' ')
      item.pointName = arr[0]
      item.address = arr[1]
    })
  }, {
    deep: true,
    immediate: true
  })
</script>

<style lang="less" scoped>
.busy-rank-wrapper {
  width: 100%;
  height: 100%;

  .tab-card {
    width: 100%;
    height: 100%;
  }

  .content-wrapper {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    padding: .16rem 0 .16rem .24rem;
    color: #fff;

    .head {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      flex: 0 0 .22rem;
      padding-right: .1rem;

      .head-item {
        overflow: hidden;
        min-width: 0;
        color: #54b5ff;
        font-family: PingFang SC;
        font-size: .16rem;
        font-weight: @regular;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:first-of-type {
          margin-right: .24rem;
        }

        &:last-of-type {
          text-align: right;
        }
      }
    }

    .tb-content {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      padding-right: .1rem;

      .data-row {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: .12rem;

        &:last-of-type {
          margin-bottom: 0;
        }

        .row-left {
          flex: 0 0 1.8rem;
          margin-right: .24rem;
          .point-name {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            span:first-of-type {
              flex: 0 0 .32rem;
              margin-right: .08rem;
              color: #00082b;
              font-family: PingFang SC;
              font-size: .16rem;
              font-weight: @medium;
              line-height: .18rem;
              letter-spacing: 0;
              text-align: center;
              background: #54b5ff;
            }

            span:last-of-type {
              flex: 1;
              overflow: hidden;
              min-width: 0;
              color: #fff;
              font-family: PingFang SC;
              font-size: .16rem;
              font-weight: @regular;
              letter-spacing: 0;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .point-address {
            padding-left: .4rem;
            color: rgba(#fff, .6);
            font-family: PingFang SC;
            font-size: .12rem;
            font-weight: @regular;
            letter-spacing: 0;
            white-space: nowrap;
          }
        }

        .row-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex: 1;
          min-width: 0;

          span:first-of-type {
            margin-right: .04rem;
            color: #fff;
            font-family: DINCondensed-Bold;
            font-size: .24rem;
            font-weight: @bold;
            letter-spacing: 0;
          }

          span:last-of-type {
            flex: 0 0 .68rem;
            font-family: PingFang SC;
            font-size: .16rem;
            font-weight: @regular;
            letter-spacing: 0;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
