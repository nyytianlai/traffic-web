<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-08 10:57:04
 * @LastEditTime: 2022-11-30 14:19:06
 * @FilePath: \traffic-web\src\views\city-transit\cityTrack\components\passenger-transport.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="top-card card">
      <div class="card-content">
        <div class="card-name">
          <span>客运量</span>
          <span class="data-type">实时</span>
        </div>
        <div class="card-data">
          <span class="data">{{ formatData('今日客运量') }}</span>
          <span class="unit">万人次</span>
          <div class="compare-info">
            上周同期 {{ formatData('今日客运量上周同期') }}%
            <svg-icon
              v-if="Number(formatData('今日客运量上周同期')) && !Number.isNaN(Number(formatData('今日客运量上周同期')))"
              :icon-class="Number(formatData('今日客运量上周同期')) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem"
            />
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="card-item">
          <div class="card-name">
            <span>日均客运量</span>
          </div>
          <div class="card-data">
            <span class="data">{{ formatData('日均客运量') }}</span>
            <span class="unit">万人次</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-name">
            <span>历史最高</span>
          </div>
          <div class="card-data">
            <span class="data">{{ formatData('历史最高') }}</span>
            <span class="unit">万人次</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-card card">
      <div class="card-name">
        <span>客运强度</span>
        <span class="data-type">实时</span>
      </div>
      <div class="card-data">
        <span class="data">{{ formatData('客运强度') }}</span>
        <span class="unit">万人次</span>
        <div class="compare-info">
          同比去年 {{ formatData('客运强度上周同期') }}%
          <svg-icon
            v-if="Number(formatData('客运强度上周同期')) && !Number.isNaN(Number(formatData('客运强度上周同期')))"
            :icon-class="Number(formatData('客运强度上周同期')) < 0 ? 'drop' : 'rise'"
            style="font-size: 0.12rem; width: 0.12rem"
          />
        </div>
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
      default: () => []
    }
  })
  const formatData = (name) => {
    const fd = props.data.find(item => item.zbmc === name && item.kjwd === '深圳市')
    return formatNumStr(fd?.zbz).trim()
  }
</script>

<style lang="less" scoped>
.wrapper {
  display: grid;
  width: 100%;
  height: 100%;
  padding: .2rem .24rem .12rem;

  grid-template-rows: 1fr .78rem;
  row-gap: .08rem;

  .top-card {
    display: flex;
    flex-flow: column nowrap;

    .card-content {
      flex: 0 0 calc(50% - .005rem);

      &:first-of-type {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: -.005rem;
          left: 0;
          width: 100%;
          height: 1px;
          border-top: 1px dashed rgba(0, 133, 255, .3);
        }
      }

      &:last-of-type {
        display: flex;
        flex-flow: row nowrap;

        .card-item {
          flex: 0 0 50%;
        }
      }
    }
  }

  .card {
    overflow: hidden;
    padding: .12rem .24rem 0;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px 0 rgba(#000, .2),inset 0 0 35px 0 rgba(#294cb3, .2);
    border: 1.4px solid rgba(#0085ff, .2);

    .card-name {
      display: flex;
      align-items: center;

      span:first-of-type {
        margin-right: .12rem;
        color: #fff;
        font-family: PingFang SC;
        font-size: .18rem;
        font-weight: @medium;
      }

      .data-type {
        padding: .02rem .04rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .12rem;
        font-weight: 400;
        line-height: .17rem;
        background: #1e9b1c;
        border-radius: 2px;
      }
    }

    .card-data {
      display: flex;
      align-items: baseline;

      .data {
        margin-right: .08rem;
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .24rem;
        font-weight: @bold;
        line-height: .28rem;
        letter-spacing: 0;
      }

      .unit {
        color: #0ff;
        font-family: PingFang SC;
        font-size: .16rem;
        font-weight: @regular;
        letter-spacing: 0;
      }
    }

    .compare-info {
      margin-left: .08rem;
      color: #fff;
      font-family: PingFang SC;
      font-size: .16rem;
      font-weight: @regular;
      letter-spacing: 0;
      white-space: nowrap;
    }
  }
}
</style>
