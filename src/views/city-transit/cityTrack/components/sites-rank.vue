<template>
  <div class="wrapper">
    <div class="select-wrapper">
      <RadioGroup
        v-model:value="selectRadio"
        :color-full="false"
        :radio-list="radioList"
      />
    </div>
    <div class="top">
      <span class="time">
        <DataTypeBtn
          type="实时"
          :show-drop="false"
          :drop-info="date"
          :date="date"
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
        :table-data="tableData"
        :loading="loading"
        type="education"
        :scroll="{y: '1.1rem'}"
      />
    </div>
  </div>
</template>

<script setup>
  import RadioGroup from '@/components/radio-list'
  import DataTypeBtn from '@/components/data-type-btn'
  import SimpleTable from '@/components/simple-table'
  import moment from 'moment'
  import { getTop10 } from '@/api/modules/city-transit/cityTrack'

  const date = computed(() => top10Data.value[0]?.sbsj || '-')

  const tableData = computed(() => top10Data.value?.map((item, i) => ({
    index: i + 1,
    ...item
  })))
  const radioList = [
    {
      name: '进站量',
      value: 'jzl'
    },
    {
      name: '出站量',
      value: 'czl'
    }
  ]
  const loading = ref(false)
  const tableHead = [
    {
      title: '排名',
      dataIndex: 'index',
      className: 'center',
      width: '0.5rem'
    },
    {
      title: '站点名称',
      dataIndex: 'kjwd',
      className: 'center'
    },
    {
      title: '线路',
      dataIndex: 'xlh',
      className: 'center',
      width: '0.9rem'
    },
    {
      title: '实时客流(人次)',
      dataIndex: 'zbz',
      className: 'center',
      width: '1.47rem'
    }
  ]

  const selectRadio = ref(radioList[0].value)
  // 城市轨道-实时站点客流TOP
  const top10Data = ref([])
  const getTop10Data = () => {
    loading.value = true
    getTop10(selectRadio.value).then(res => {
      top10Data.value = res || []
      loading.value = false
    }).catch(e => {
      loading.value = false
    })
  }

  watch(() => selectRadio.value, () => {
    getTop10Data()
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
  padding: .1rem 0 .16rem .24rem;
  color: #fff;

  .select-wrapper {
    height: .22rem;
  }

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding-right: .24rem;
    margin-top: .08rem;
    margin-bottom: .08rem;
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
    min-width: 0;
    padding-right: .24rem;
    padding-bottom: .1rem;
  }
}
</style>
