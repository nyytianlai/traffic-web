<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-01 10:20:03
 * @LastEditTime: 2022-12-29 15:28:16
 * @FilePath: \traffic-web\src\components\base-panel\index.vue
 * @Description: FilePath
-->
<template>
  <div class="panel-wrapper">
    <div class="panel-top">
      <div class="top-left">
        <div class="arrows">
          <svg-icon
            icon-class="arrow-1"
          />
          <svg-icon
            icon-class="arrow-2"
          />
        </div>
        <div class="panel-title">
          <div class="title-text">
            {{ title }}
          </div>
        </div>
        <div class="corner-1" />
      </div>
      <div class="rotate-line" />
      <div class="right-line" />
      <div
        v-show="$slots['extra-title']"
        class="title-extra"
      >
        <slot name="extra-title" />
      </div>
    </div>
    <div class="panel-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="less" scoped>
.panel-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .panel-top {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    flex: 0 0 .35rem;
    height: .35rem;
    padding-bottom: .1rem;

    .top-left {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      white-space: nowrap;

      &::after {
        content: "";
        position: absolute;
        bottom: -.06rem;
        left: 0;
        width: 100%;
        height: .01rem;
        background-image: linear-gradient(to right, rgba(#006acf, .1), rgba(#0077ba, .8));
      }
      .arrows {
        margin-right: .08rem;
        font-size: .12rem;
      }

      .panel-title {
        position: relative;
        padding-right: .2rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .18rem;
        font-weight: 600;

        .title-text {
          position: relative;
          z-index: 10;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &::after {
          content: "";
          position: absolute;
          bottom: .01rem;
          left: 0;
          width: 100%;
          height: .12rem;
          background: linear-gradient(90deg, #00b2ff -45.48%, rgba(0, 133, 255, .0001) 100%);
          transform: rotate(180deg);
        }
      }

      .corner-1 {
        width: .36rem;
        height: .21rem;
        background-image: url("~@/assets/images/panel-bulb.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        transform: translate(-.12rem, .065rem);
      }
    }

    .rotate-line {
      width: .2rem;
      height: .01rem;
      background-image: linear-gradient(to right, rgba(#0077ba, .8), rgba(#0095df, .8));
      transform: translate(-.04rem, .07rem) rotate(-45deg);
    }

    .right-line {
      position: relative;
      flex: 1;
      min-width: 0;
      height: .01rem;
      background-color: #0077ba;
      transform: translateY(0);

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -.08rem;
        width: .08rem;
        height: .01rem;
        background-color: #0077ba;
      }
    }

    .title-extra {
      margin-left: .08rem;
      transform: translateY(.02rem);
    }
  }

  .panel-content {
    flex: 1;
    min-height: 0;
    background-image: linear-gradient(0deg, rgba(#00b2ff, .3) -36.53%, rgba(0, 133, 255, .0001) 100%);
    border: 1px solid;
    border-image: linear-gradient(to bottom, rgba(0, 7, 24, 0), rgba(0, 178, 255, .2)) 1 10;
  }
}
</style>
