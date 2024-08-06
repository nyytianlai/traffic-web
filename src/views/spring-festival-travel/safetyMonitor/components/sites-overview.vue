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
          type="日"
          :show-drop="false"
          drop-info="date"
          :date="date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="table-wrapper">
      <SimpleTable
        :table-head="tableHead"
        :table-data="tableData"
        :loading="false"
        type="education"
        :scroll="{y: '1.8rem'}"
      >
        <template #bssj="{row}">
          {{ `${row?.bssj?.slice(0,4)}-${row?.bssj?.slice(4,6)}-${row?.bssj?.slice(6)}` }}
        </template>
      </SimpleTable>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import SimpleTable from '@/components/simple-table'
  import moment from 'moment'
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })

  const date = computed(() => (props.data &&props.data[0]?.sbsj) || '-')

  const tableData = computed(() => props.data)
  const tableHead = [
    {
      title: '日期',
      dataIndex: 'bssj',
      className: 'center'
    },
    {
      title: '枢纽名称',
      dataIndex: 'cz',
      className: 'center'
    },
    {
      title: '当日发送量（人次）',
      dataIndex: 'zfsl',
      align: 'right',
      width: '3rem'
    },
    {
      title: '当日到达量（人次）',
      dataIndex: 'ddfsl',
      align: 'right',
      width: '3rem'
    }
  ]
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

  .table-wrapper {
    flex: 1;
    min-height: 0;

     > div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
