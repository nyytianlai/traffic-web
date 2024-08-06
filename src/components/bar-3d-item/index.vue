<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-14 14:43:04
 * @LastEditTime: 2022-12-01 09:24:06
 * @FilePath: \traffic-web\src\views\transportation\logistics\components\3d-bar-item.vue
 * @Description: FilePath
-->
<template>
  <div
    class="bar-wrapper"
    :class="direction && direction.split(' ').join('')"
    :style="{
      width,
      height
    }"
  >
    <div
      class="bar-shape-1"
      :style="{
        backgroundImage: `linear-gradient(${direction}, ${color[0]} 5.43%, ${color[1]} 132.57%)`
      }"
    >
      <div
        class="highlight-line"
        :style="{backgroundColor: color[0]}"
      />
    </div>
    <div
      class="bar-shape-2"
      :style="{
        backgroundImage: `linear-gradient(${direction}, ${color[0]} 5.43%, ${color[1]} 132.57%)`
      }"
    />
    <div
      class="diamond"
      :style="{
        backgroundColor: color[0],
        height: '0.08rem',
        width: '0.08rem'
      }"
    />
  </div>
</template>

<script setup>
  defineProps({
    width: {
      type: [String, Number],
      default: '1.2rem'
    },
    height: {
      type: String,
      default: '0.16rem'
    },
    direction: {
      type: String,
      default: 'to left'
    },
    color: {
      type: Array,
      default: () => ['rgba(84, 181, 255, 0.900295)', 'rgba(5, 133, 250, 0.0001)']
    }
  })
</script>

<style lang="less" scoped>
.bar-wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  .bar-shape-1 {
    position: relative;
    flex: 0 0 50%;
    width: 100%;
    transform: skew(-23deg);

    .highlight-line {
      position: absolute;
      bottom: -.005rem;
      left: 0;
      width: 100%;
      height: .01rem;
    }
  }

  .bar-shape-2 {
    flex: 0 0 50%;
    width: 100%;
    transform: skew(23deg);
  }

  .diamond {
    position: absolute;
    top: .04rem;
    right: -.04rem;
    transform: rotate(26deg) skewY(40deg);
  }

  &.toleft {
    .bar-shape-1 {
      transform: skew(15deg);
    }

    .bar-shape-2 {
      transform: skew(-15deg);
    }

    .diamond {
      left: -.04rem;
    }
  }
}
</style>
