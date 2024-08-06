<template>
  <div class="map-point-wrapper">
    <div class="corner left-top" />
    <div class="corner right-top" />
    <div class="corner left-bottom" />
    <div class="corner right-top" />
    <div class="sub-title">
      <div class="sub-left">
        {{ data.mc }}
      </div>
    </div>
    <div class="tip-info">
      <div class="info-item">
        <div class="label">
          施工开始时间
        </div>
        <div class="data">
          {{ data.sgkssj }}
        </div>
      </div>
      <div class="info-item">
        <div class="label">
          施工结束时间
        </div>
        <div class="data">
          {{ data.sgjssj }}
        </div>
      </div>
      <div class="info-item">
        <div class="label">
          所属单位
        </div>
        <div class="data">
          {{ data.ssdw }}
        </div>
      </div>
      <div class="info-item">
        <div class="label">
          详细地址
        </div>
        <div
          class="data"
          :title="data.dz"
        >
          {{ data.dz }}
        </div>
      </div>
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
        flex: 0 0 1rem;
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
}
</style>
