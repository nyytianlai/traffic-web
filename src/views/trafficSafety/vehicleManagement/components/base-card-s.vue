<template>
  <div class="card-content">
    <div class="card-top">
      <div class="title">
        {{ config.name }}<span class="date">{{ config.date }}</span>
        <DataTypeBtn :type="config.dateType" :date="config.date" />
      </div>
    </div>
    <div class="card-bottom">
      <div class="card-icon">
        <img :src="require(`@/assets/images/${config.icon}`)">
      </div>
      <div class="card-data">
        <div class="data">
          {{ formatNumStr(config.value) }}
          <span class="unit">{{ config.unit }}</span>
        </div>
        <div class="compare">
          较上月
          <span class="compare-value">{{ config.compareValue }}%</span>
          <svg-icon
            v-if="
              Number(formatNumStr(config.compareValue)) &&
                !Number.isNaN(formatNumStr(config.compareValue))
            "
            :icon-class="
              Number(formatNumStr(config.compareValue)) < 0
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
  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  defineProps({
    config: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<style lang="less" scoped>
.card-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: .24rem;
  .card-top {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-size: .2rem;

      span.date {
        margin-right: .08rem;
        margin-left: .12rem;
        color: #fff;
        font-size: 16px;
      }
    }
  }

  .card-bottom {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .card-icon {
      flex: 0 0 .68rem;
      height: .68rem;
      margin-right: .08rem;;

      img {
        width: .68rem;
      }
    }

    .card-data {
      .data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        color: #00fff9;
        font-family: "DIN Condensed";
        font-size: .32rem;
        font-weight: 700;
        line-height: .24rem;
        text-shadow: 0 2px 10px rgba(75, 222, 255, .50);
      }

      .unit {
        margin-left: .08rem;
        color: #00fff9;
        font-family: PingFang SC;
        font-size: .16rem;
        font-weight: 400;
      }

      .compare {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #fff;
        font-family: PingFang SC;
        font-size: .16rem;
        font-weight: 400;
      }

      .compare-value {
        margin: 0 .08rem;
      }
    }
  }
}
</style>
