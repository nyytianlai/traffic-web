<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-09 10:07:26
 * @LastEditTime: 2022-12-09 10:17:46
 * @FilePath: \traffic-web\src\views\transportation\railroad\components\railway-resource.vue
 * @Description: FilePath
-->
<template>
  <div class="railway-resource-wrapper">
    <div
      v-for="item in config"
      :key="item.name"
      class="data-item"
    >
      <div class="name">
        {{ item.name }}
      </div>
      <div class="data">
        <div class="num">
          {{ formatData(item.name) }}
        </div>
        <div class="unit">
          {{ item.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const formatData = (name, dataName) => {
    const fd = props.data.find(obj => (obj.zbmc === name || obj.zbmc === dataName))
    return formatNumStr(fd?.zbz) || '-'
  }
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const config = [
    {
      name: '车站数',
      dataName: '',
      unit: '个'
    },
    {
      name: '铁路里程',
      dataName: '',
      unit: '公里'
    },
    {
      name: '在建里程',
      dataName: '',
      unit: '公里'
    }
  ]
</script>

<style lang="less" scoped>
.railway-resource-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .data-item {
    flex: 0 0 .8rem;
    margin-right: .48rem;

    &:last-of-type {
      margin-right: 0;
    }

    .name {
      color: #fff;
      font-family: "PingFang SC";
      font-size: .2rem;
      font-weight: 500;
      line-height: .28rem;
    }

    .data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;

      .num {
        margin-right: .04rem;
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .24rem;
        font-weight: 700;
        line-height: .26rem;
      }

      .unit {
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }
    }
  }
}
</style>
