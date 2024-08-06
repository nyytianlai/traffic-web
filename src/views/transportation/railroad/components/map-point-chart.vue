<template>
  <div class="map-point-wrapper">
    <div class="corner left-top" />
    <div class="corner right-top" />
    <div class="corner left-bottom" />
    <div class="corner right-top" />
    <div class="sub-title">
      <div class="sub-left">
        {{ data.mc || '-' }}
      </div>
    </div>
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="年"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="tip-info">
      <div class="info-item">
        <div class="label">
          车站地址
        </div>
        <div class="data">
          {{ data.dz ||'-' }}
        </div>
      </div>
      <div class="info-item">
        <div class="label">
          场站面积
        </div>
        <div class="data">
          {{ formatNumStr(data.mj) ||'-' }}平方米
        </div>
      </div>
      <div class="info-item">
        <div class="label">
          车站规模
        </div>
        <div class="data">
          {{ data.gm ||'-' }}
        </div>
      </div>
      <div class="info-item">
        <div class="label">
          日发车量
        </div>
        <div class="data">
          {{ formatNumStr(data.rfcl) ||'-' }}次
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
  const date = computed(() => props.data?.sbsj ? moment(props.data?.sbsj).format('YYYY-MM-DD') : '')
</script>

<style lang="less" scoped>
.map-point-wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .12rem;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .5);

  .corner {
    position: absolute;
    width: .06rem;
    height: .06rem;
    background: rgba(84, 181, 255, .5);

    &.left-top {
      top: 0;
      left: 0;
    }

    &.left-bottom {
      bottom: 0;
      left: 0;
    }

    &.right-top {
      top: 0;
      right: 0;
    }

    &.right-bottom {
      right: 0;
      bottom: 0;
    }
  }

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-top: .12rem;
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

  .sub-title {
    position: relative;
    margin-bottom: .1rem;

    &::after {
      content: "";
      position: absolute;
      bottom: -.08rem;
      left: 0;
      width: 100%;
      height: .01rem;
      background-color: rgba(#fff, .2);
    }

    .sub-left {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      color: #54b5ff;
      font-family: "SF Pro Display";
      font-size: .16rem;
      font-weight: 400;
      line-height: 19px;

      .warning-icon {
        flex: 0 0 .2rem;
        height: .2rem;
        margin-right: .04rem;
        background-image: url("~@/assets/images/warning.png");
        background-size: 100% 100%;
      }
    }

    .car-type {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: rgba(255, 255, 255, .7);
      font-family: "PingFang SC";
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      .type {
        padding: 2px 4px;
        margin-left: .12rem;
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: 12px;
        font-weight: 400;
        line-height: 17px;
        border: 1px solid #54b5ff;
        border-radius: 2px;
      }
    }
  }

  .tip-info {
    .info-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: .12rem;

      &:last-of-type {
        margin-bottom: 0;
      }
      .label {
        flex: 0 0 .84rem;
        margin-right: .16rem;
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
        white-space: nowrap;
      }

      .data {
        flex: 1;
        overflow: hidden;
        min-width: 0;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .detail-btn {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin-bottom: .12rem;
    background: rgba(55, 97, 232, .22);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px #294cb3;
    border: 1.4px solid #0085ff;
    border-radius: 28px;
    cursor: pointer;

    .arrow-right {
      margin-left: .08rem;
    }
  }
}
</style>
