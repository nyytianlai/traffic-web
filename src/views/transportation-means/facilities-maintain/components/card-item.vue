<template>
  <div class="card-item-wrapper">
    <div class="icon-img">
      <img :src="config.icon">
    </div>
    <div class="right-info">
      <div class="top-name">
        <span class="time">
          {{ config.name }}

        </span>
      </div>
      <div class="data">
        <div class="num">
          {{ formatNumStr(config.value) }}
        </div>
        <div class="unit">
          {{ config.unit }}
        </div>
        <div
          v-if="config.compareName"
          class="compare-data"
        >
          同比去年
          <div class="compare-num">
            {{ config.percentValue }}
          </div>
          %
          <svg-icon
            v-if="Number(config.percentValue) && !Number.isNaN(Number(config.percentValue))"
            :icon-class="Number(config.percentValue) < 0 ? 'drop' : 'rise'"
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
.card-item-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: .16rem .16rem;
  background: rgba(55, 97, 232, .12);
  box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px rgba(#294cb3, .2);
  border: 1.4px solid rgba(#0085ff, .2);

  .icon-img {
    flex: 0 0 .7rem;
    width: .7rem;
    height: .7rem;
    margin-right: .08rem;
    vertical-align: middle;

    img {
      width: 100%;
    }
  }

  .right-info {
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

    .data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      white-space: nowrap;

      .num {
        color: #00fff9;
        font-family: "DIN Condensed";
        font-size: .3rem;
        font-weight: 700;
        line-height: .32rem;
        text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
      }

      .unit {
        margin-left: .08rem;
        color: #00fff9;
        font-family: "PingFang SC";
        font-size: .2rem;
        font-weight: 400;
      }

      .compare-data {
        display: flex;
        align-items: center;
        margin-left: .4rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;

        .compare-num {
          margin-left: .08rem;
        }
      }
    }
  }
}
</style>
