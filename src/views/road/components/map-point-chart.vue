<template>
  <div class="map-point-wrapper">
    <div class="corner left-top" />
    <div class="corner right-top" />
    <div class="corner left-bottom" />
    <div class="corner right-top" />
    <div class="sub-title">
      <div class="sub-left">
        {{ data.xzqh }}
      </div>
      <div
        class="sub-right"
        @click="handleClose"
      >
        <svg-icon icon-class="close" />
      </div>
    </div>
    <div class="tip-info">
      <div class="tip-name">
        平均速度
      </div>
      <div
        class="tip-status"
        :style="{backgroundColor: data.color}"
      >
        {{ data.yddj }}
      </div>
    </div>
    <div class="data">
      <div class="num">
        {{ data.pjsd }}
      </div>
      <div class="unit">
        公里/小时
      </div>
    </div>
  </div>
</template>

<script setup>
  const emits = defineEmits(['close'])
  defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
  const handleClose = () => {
    emits('close')
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
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
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
      color: #54b5ff;
      font-family: "SF Pro Display";
      font-size: .16rem;
      font-weight: 400;
      line-height: 19px;
    }

    .sub-right {
      font-size: .16rem;
      cursor: pointer;
    }
  }

  .tip-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .1rem;

    .tip-name {
      flex: 0 0 1.2rem;
      color: #54b5ff;
      font-family: "SF Pro Display";
      font-size: .16rem;
      font-weight: 400;
    }

    .tip-status {
      padding: .02rem .1rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .14rem;
      font-weight: 500;
      line-height: .2rem;
      border-radius: .32rem;
    }
  }

  .data {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;

    .num {
      color: #fff;
      font-family: DINCondensed-Bold;
      font-size: .28rem;
      font-weight: 700;
      line-height: .34rem;
    }

    .unit {
      margin-left: .04rem;
      color: #fff;
      font-family: "SF Pro Display";
      font-size: .16rem;
      font-weight: 400;
    }
  }
}
</style>
