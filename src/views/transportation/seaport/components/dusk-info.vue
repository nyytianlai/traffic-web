<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-06 17:30:11
 * @LastEditTime: 2022-12-14 15:26:17
 * @FilePath: \traffic-web\src\views\transportation\seaport\components\dusk-info.vue
 * @Description: FilePath
-->
<template>
  <div class="month-info-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="月"
          :date="date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="card-list">
      <div
        v-for="item in config"
        :key="item.name"
        class="card-wrapper"
      >
        <card-item
          :data="data"
          :config="item"
          @handleDetail="handleDetail"
        />
      </div>
    </div>
    <!-- <pop-ups
      v-model:value="popupInfo.visible"
      title="不同类型码头泊位情况"
      height="5.4rem"
      width="8rem"
    >
      <pop-pie :is-active="popupInfo.visible" />
    </pop-ups> -->
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import CardItem from './card-item.vue'
  // import PopUps from '@/components/popUps'
  // import PopPie from './pop-pie.vue'
  import moment from 'moment'
  import { portBerths } from '@/api/modules/transportation/seaport.js'

  const popupInfo = reactive({})
  const date = ref('-')
  const config = reactive([
    {
      name: '码头泊位数',
      icon: require('@/assets/images/matou.png'),
      unit: '个',
      dataName: '',
      compareName: '',
      compareDataName: '',
      showDetail: false,
      dataInConfig: true
    },
    {
      name: '泊位岸线总长度',
      icon: require('@/assets/images/bowei.png'),
      unit: '公里',
      dataName: '',
      compareName: '',
      compareDataName: '',
      showDetail: false,
      dataInConfig: true
    }
    // {
    //   name: '国际集装箱班轮航线 (季度更新)',
    //   icon: require('@/assets/images/guoji.png'),
    //   unit: '条',
    //   dataName: '',
    //   compareName: '',
    //   compareDataName: '',
    //   showDetail: false
    // }
  ])
  const handleDetail = item => {
    console.log(item)
    popupInfo.visible = true
  }
  const getData = async () => {
    const res = await portBerths()
    const data = Array.prototype.flat.call(res)
    date.value = data[0]?.report_date ? data[0].report_date: '-'
    config.forEach(item => {
      const fd = data.find(o => item.name?.includes(o.indicators) || o.indicators?.includes(item.name))
      console.log(fd)
      item.value = fd?.numerical
    })
    console.log(data)
  }
  getData()
</script>

<style lang="less" scoped>
.month-info-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 .24rem;
    margin-top: .24rem;
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

  .card-list {
    display: flex;
    flex-flow: row wrap;
  }

  .card-wrapper {
    flex: 0 0 50%;
    padding: 0 .24rem;
    margin-bottom: .12rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
