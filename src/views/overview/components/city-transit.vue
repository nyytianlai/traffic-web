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
          v-show="item.subTitle"
          class="sub-title"
        >
          ({{ formatSubtitle(item.name, item.dataName) }})
        </div>
      </div>
      <div class="info-data">
        <div class="num">
          {{ formatData(item.name, item.dataName) }}
        </div>
        <div class="unit">
          {{ item.unit }}
        </div>
      </div>
      <div class="info-compare">
        <span class="compare-name">{{ item.compareName }}</span>
        {{ formatCompareData(item.compareName, item.compareDataName) }}%
        <svg-icon
          v-if="Number(formatCompareData(item.compareName, item.compareDataName)) && !Number.isNaN(Number(formatCompareData(item.compareName, item.compareDataName)))"
          :icon-class="Number(formatCompareData(item.compareName, item.compareDataName)) < 0 ? 'drop' : 'rise'"
          style="font-size: 0.12rem; width: 0.12rem;margin-left: 0.04rem;"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    compareData: {
      type: Array,
      default: () => ([])
    },
    config: {
      type: Array,
      default: () => ([])
    }
  })

  const emits = defineEmits('changeDate')

  const formatData = (name, dataName) => {
    const fd = props.data.find(item => item.zbmc === name || item.zbmc === dataName)
    return formatNumStr(fd?.zbz) || '-'
  }

  const formatCompareData = (name, dataName) => {
    const fd = props.compareData.find(item => item.zbmc === name || item.zbmc === dataName)
    return formatNumStr(fd?.zbz) || '-'
  }
  const formatSubtitle = (name, dataName) => {
    const fd = props.data.find(item => item.zbmc === name || item.zbmc === dataName)
    emits('changeDate', fd?.sjwd)
    return fd?.sjwd || '-'
  }
</script>

<style lang="less" scoped>
.road-wrapper {
  .info-item {
    margin-bottom: .16rem;

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

      .sub-title {
        color: rgba( #fff, .6);
        font-family: "PingFang SC";
        font-size: .18rem;
      }
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

    .info-compare {
      display: flex;
      align-items: center;
      margin-top: .06rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      line-height: .22rem;
      .compare-name {
        margin-right: .08rem;
      }
    }
  }
}
</style>
