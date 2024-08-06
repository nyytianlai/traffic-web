<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-06 17:08:13
 * @LastEditTime: 2022-12-06 17:55:51
 * @FilePath: \traffic-web\src\views\transportation\seaport\components\card-item.vue
 * @Description: FilePath
-->
<template>
  <div class="card-item-wrapper">
    <div class="card-icon">
      <img :src="config.icon">
    </div>
    <div class="right-info">
      <div
        class="name"
        :class="{ showDetail: config.showDetail }"
        @click="handleDetail"
      >
        {{ config.name }}
        <svg-icon
          v-if="config.showDetail"
          icon-class="arrow-right"
          style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.12rem"
        />
      </div>
      <div class="data">
        <div class="num">
          {{
            config.dataInConfig
              ? formatNumStr(config.value)
              : formatData(config.name, config.dataName)
          }}
        </div>
        <div class="unit">
          {{ config.unit }}
        </div>
        <div
          v-if="config.compareName"
          class="compare"
        >
          {{ config.compareName }}：{{
            config.dataInConfig
              ? formatNumStr(config.compareValue)
              : formatData(config.compareDataName)
          }}%
          <svg-icon
            v-if="
              Number(
                config.dataInConfig
                  ? formatNumStr(config.compareValue)
                  : formatData(config.compareDataName)
              ) &&
                !Number.isNaN(
                  Number(
                    config.dataInConfig
                      ? formatNumStr(config.compareValue)
                      : formatData(config.compareDataName)
                  )
                )
            "
            :icon-class="
              Number(
                config.dataInConfig
                  ? formatNumStr(config.compareValue)
                  : formatData(config.compareDataName)
              ) < 0
                ? 'drop'
                : 'rise'
            "
            style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const emits = defineEmits(['handleDetail'])
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({})
    }
  })
  const formatData = (name, dataName) => {
    const fd = props.data.find((obj) => obj.zbmc === name || obj.zbmc === dataName)
    return formatNumStr(fd?.zbz) || '-'
  }
  const handleDetail = () => {
    if (!props.config.showDetail) return
    emits('handleDetail', props.config)
  }
</script>

<style lang="less" scoped>
.card-item-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: 100%;

  .card-icon {
    flex: 0 0 .42rem;
    height: .42rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .right-info {
    margin-left: .08rem;
    .name {
      display: flex;
      align-items: center;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .18rem;
      font-weight: 400;
      line-height: .25rem;
      white-space: nowrap;

      &.showDetail {
        cursor: pointer;
      }
    }

    .data {
      display: flex;
      align-items: baseline;
      white-space: nowrap;
      .num {
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .22rem;
        font-weight: 700;
        line-height: .29rem;
      }

      .unit {
        margin-left: .04rem;
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .14rem;
        font-weight: 400;
      }

      .compare {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-left: .2rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .14rem;
        font-weight: 400;
      }
    }
  }
}
</style>
