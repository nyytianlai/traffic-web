<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-12 17:42:50
 * @LastEditTime: 2022-12-13 09:42:16
 * @FilePath: \traffic-web\src\views\city-transit\taxi\net-taxi\components\pop-table.vue
 * @Description: FilePath
-->
<template>
  <div class="pop-table-wrapper">
    <SimpleTable
      :table-head="tableHead"
      :table-data="tableData"
      :loading="loading"
      type="education"
      :scroll="{y: '7rem'}"
      @change="changeTable"
    >
      <template
        #compare="{record}"
      >
        <div class="compare">
          {{ record.jsybhqk }}%
          <svg-icon
            v-if="Number(record.jsybhqk) && !Number.isNaN(Number(record.jsybhqk))"
            :icon-class="Number(record.jsybhqk) < 0 ? 'drop' : 'rise'"
            style="font-size: 0.12rem; width: 0.12rem; margin-left:0.08rem;"
          />
        </div>
      </template>
    </SimpleTable>
  </div>
</template>

<script setup>
  import SimpleTable from '@/components/simple-table'
  import { wycptddxq } from '@/api/modules/city-transit/taxi'
  const loading = ref(false)
  const tableHead = [
    {
      title: '序号',
      dataIndex: 'index',
      className: 'center',
      width: '.8rem'
    },
    {
      title: '平台名称',
      dataIndex: 'ptmc',
      className: 'center'
    },
    {
      title: '本月订单数',
      dataIndex: 'bydds',
      className: 'center',
      width: '4.1rem',
      sorter: true
    },
    {
      title: '较上月变化情况',
      dataIndex: 'jsybhqk',
      className: 'compare',
      width: '4.1rem',
      slots: { customRender: 'compare' }
    }
  ]
  const initTableData = ref([])
  const tableData = ref([])
  const order = ref()

  onMounted(() => {
    loading.value = true
    wycptddxq().then(res => {
      initTableData.value = res || []
      loading.value = false
    }).catch(() => {
      loading.value = false
    })
  })

  const changeTable = ({ sorter }) => {
    order.value = sorter.order
  }

  watch(() => [order.value, initTableData.value], () => {
    const tbData = [...initTableData.value]
    if (order.value === 1) {
      tbData.sort((a, b) => a.bydds - b.bydds)
    } else if (order.value === 2) {
      tbData.sort((a, b) => b.bydds - a.bydds)
    }
    tableData.value = tbData.map((item, i) => ({
    ...item,
    index: i + 1
    }))
  }, {
    immediate: true
  })
</script>

<style lang="less" scoped>
.pop-table-wrapper {
  width: 100%;
  height: 100%;
  padding: .24rem;
  :deep(.sipmle-table) {
    width: 100%;
    height: 100%;

    .ant-table-placeholder {
      padding: 1rem .06rem;
    }
  }

  .compare {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
