<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-30 11:15:38
 * @LastEditTime: 2022-12-15 11:27:20
 * @FilePath: \traffic-web\src\views\transportation\railroad\components\top-rank.vue
 * @Description: FilePath
-->
<template>
  <div class="passenger-top-wrapper">
    <div class="top">
      <span class="time">
        2022-12-01
        <DataTypeBtn
          type="实时"
          :show-drop="false"
          drop-info="2022-10-31"
          style="margin-left: 0.04rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="content-wrapper">
      <SimpleTable
        :table-head="tableHead"
        :table-data="data"
        :loading="loading"
        type="education"
      />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import SimpleTable from '@/components/simple-table'
  const loading = ref(false)
  defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const tableHead = [
    {
      title: '排名',
      dataIndex: 'index',
      className: 'center',
      width: '0.6rem'
    },
    {
      title: '城市',
      dataIndex: 'kjwd',
      className: 'center',
      width: '0.95rem'
    },
    {
      title: '月客流量（万人次）',
      dataIndex: 'zbz',
      className: 'center'
    }
  ]

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

  .content-wrapper {
    flex: 1;
    min-height: 0;

    :deep(.sipmle-table) {
      width: 100%;
      height: 100%;

      .ant-table-thead > tr > th {
        padding: .1rem .02rem;
      }

      .ant-table-tbody > tr > td {
        padding: .1rem .02rem;
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
</style>
