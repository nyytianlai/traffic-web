<template>
  <div class="map-point-wrapper">
    <div class="corner left-top" />
    <div class="corner right-top" />
    <div class="corner left-bottom" />
    <div class="corner right-top" />
    <div class="sub-title">
      <div class="sub-left">
        {{ data.cph || '-' }}
        <div
          v-show="data.lx === '危险品车'"
          class="warning-icon"
        />
      </div>
      <div class="car-type">
        车辆类型
        <div class="type">
          {{ data.lx }}
        </div>
      </div>
    </div>
    <div class="tip-info">
      <div class="info-item">
        <div class="label">
          当前速度
        </div>
        <div class="data">
          {{ data.yxsu || '-' }}
          <div class="unit">
            公里/小时
          </div>
        </div>
      </div>
    </div>
    <div
      class="detail-btn"
      @click="handleDetail"
    >
      车辆详情
      <svg-icon
        icon-class="arrow-right"
        class="arrow-right"
        style="width: 0.12rem;height:0.12rem;font-size:0.12rem;color:#54B5FF; "
      />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
  const emits = defineEmits(['handleDetail'])
  const handleDetail = () => {
    emits('handleDetail')
  }
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
      margin-bottom: .12rem;
      .label {
        margin-top: .12rem;
        margin-bottom: .04rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }

      .data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        .unit {
          margin-left: .04rem;
          color: #fff;
          font-family: "PingFang SC";
          font-size: 16px;
          font-weight: 400;
        }
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
