<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-12 11:30:08
 * @LastEditTime: 2022-12-28 16:47:01
 * @FilePath: \traffic-web\src\views\overview\components\transportation.vue
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
        <div
          v-show="item.other"
          class="other-data-name"
        >
          <span style="margin: 0 0.02rem;">|</span>{{ item.other.name }}
          <div
            v-show="item.other.subTitle"
            class="other-sub-title"
          >
            {{ item.subTitle }}
          </div>
        </div>
      </div>
      <div class="info-data">
        <div class="raw-data">
          <div class="num">
            {{ formatData(item.value) }}
          </div>
          <div class="unit">
            {{ item.unit }}
          </div>
        </div>
        <div
          v-if="item.other"
          class="other-data"
        >
          <span class="seprate">|</span>
          <div class="num">
            {{ formatData(item.other.value) }}
          </div>
          <div class="unit">
            {{ item.other.unit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  import { daoluyunshu } from '@/api/modules/overview'
  const formatNumStr = utils.formatNumStr
  const emits = defineEmits(['changeDate'])
  const config = reactive([
    {
      name: '货运业户',
      dataName: '道路货运业户',
      unit: '家',
      other: {
        name: '车辆',
        subTitle: '(2022年1-10月)',
        unit: '辆',
        dataName: '货运车辆'
      }
    },
    {
      name: '客运企业',
      dataName: '注册道路客运企业数',
      unit: '家',
      other: {
        name: '车辆',
        subTitle: '(2022年1-10月)',
        unit: '辆',
        dataName: '道路客运车辆数'
      }
    }
  ])

  const getCardData = async () => {
    const res = await daoluyunshu()
    
    const hyyh = res.find(item => item.indicators?.includes('货运业户'))
    const hycl = res.find(item => item.indicators?.includes('货运车辆'))
    const kyyh = res.find(item => item.indicators?.includes('客运企业'))
    const kycl = res.find(item => item.indicators?.includes('客运车辆'))

    config[0].value = hyyh?.numerical
    config[0].other.value = hycl?.numerical
    config[0].other.subTitle = hycl?.report_date ? `(${hycl?.report_date})` : ''

    config[1].value = kyyh?.numerical
    config[1].other.value = kycl?.numerical
    config[1].other.subTitle = kycl?.report_date ? `(${kycl?.report_date})` : ''
    emits('changeDate', (res[0] && res[0]?.report_date) || '-')
  }
  getCardData()
  const formatData = (value) => {
    return formatNumStr(Number(value)) || '-'
  }
</script>

<style lang="less" scoped>
.road-wrapper {
  .info-item {
    margin-bottom: .4rem;

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

      .other-data-name {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: .18rem;
        .other-sub-title {
          color: rgba( #fff, .6);
          font-family: "PingFang SC";
          font-size: .18rem;
        }
      }
    }

    .info-data {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      .raw-data,
      .other-data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
      }

      .raw-data {
        flex: 0 0 1rem;
        white-space: nowrap;
      }

      .other-data {
        flex: 1;
        min-width: 0;
      }

      .seprate {
        margin-right: .16rem;
        color: #fff;
        font-size: .16rem;
      }

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
