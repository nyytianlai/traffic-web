<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-12 11:30:08
 * @LastEditTime: 2022-12-28 16:46:39
 * @FilePath: \traffic-web\src\views\overview\components\traffic-safety.vue
 * @Description: FilePath
-->
<template>
  <div class="road-wrapper">
    <div
      v-for="item in config"
      :key="item.name"
      class="info-item"
    >
      <div class="info-title">
        {{ item.name }}
      </div>
      <div class="info-data">
        <div class="num">
          {{ formatData(item.value) }}
        </div>
        <div class="unit">
          {{ item.unit }}
        </div>
        <!-- <svg-icon
          v-if="Number(item.compareValue)"
          :icon-class="Number(item.compareValue) < 0 ? 'drop' : 'rise'"
          style="font-size: 0.12rem; width: 0.12rem;margin-left: 0.04rem;"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  import { jsybyl, jtsgs, ccss } from '@/api/modules/traffic-safety/vehicleManagement'
  const emits = defineEmits(['changeDate'])
  const formatNumStr = utils.formatNumStr

  const config = reactive([
    {
      name: '道路交通事故',
      unit: '起',
      api: jtsgs
    },
    {
      name: '驾驶员保有量',
      unit: '万人',
      api: jsybyl
    },
    {
      name: '直接财产损失',
      unit: '万元',
      api: ccss
    }
  ])

  const getCardData = async () => {
    const pArr = []
    let date;
    config.forEach((item) => {
      pArr.push(item.api())
    })
    const resAll = await Promise.allSettled(pArr)
    resAll.forEach((item, i) => {
      const data = item.value && item.value[0]
      config[i].value = data?.cur_month
      config[i].compareValue = data?.cur_month && data?.last ? ((data?.cur_month - data?.last) / data?.last * 100).toFixed(2) : '-'
      config[i].date = data?.report_date || '-'
      date = date || data?.report_date
    })
    emits('changeDate', date || '-')
  }
  getCardData()
  const formatData = (value) => {
    return formatNumStr(Number(value)) || '-'
  }
  // const formatData = (name, dataName) => {
  //   const fd = props.data.find(item => item.zbmc === name || item.zbmc === dataName)
  //   return formatNumStr(fd?.zbz) || '-'
  // }
  // const formatCompareData = (name, dataName) => {
  //   const fd = props.compareData.find(item => item.zbmc === name || item.zbmc === dataName)
  //   return formatNumStr(fd?.zbz) || '-'
  // }
</script>

<style lang="less" scoped>
.road-wrapper {
  .info-item {
    margin-bottom: .08rem;

    &:last-of-type {
      margin-bottom: 0;
    }
    .info-title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      overflow: hidden;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .18rem;
      font-weight: 400;
      line-height: .22rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .info-data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      .num {
        color: #0ff;
        font-family: DINCondensed-Bold;
        font-size: .32rem;
        font-weight: 700;
        line-height: .38rem;
      }

      .unit {
        margin-left: .04rem;
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }
    }
  }
}
</style>
