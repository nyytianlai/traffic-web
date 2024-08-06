<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-11 11:33:44
 * @LastEditTime: 2022-12-26 09:51:35
 * @FilePath: \traffic-web\src\components\data-type-btn\index.vue
 * @Description: FilePath
-->
<template>
  <span>
    <div
      class="data-type-wrapper"
      :style="{cursor: showDrop ? 'pointer' : 'text'}"
      @mouseover="show=true"
      @mouseout="show=false"
    >
      {{ getType() }}
      <span
        v-if="showDrop"
        class="triangle"
      />
      <div
        v-if="showDrop"
        class="data-type-info"
        :class="{show}"
      >业务发生时间：{{ dropInfo }}</div>
    </div>
  </span>
</template>

<script setup>
 const props= defineProps({
    type: {
      type: String,
      default: '月'
    },
    dropInfo: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    showDrop: {
      type: Boolean,
      default: false
    }
  })

  const show = ref(false)

  const getType = () => {
    const arr = props.date?.split('-') || [];
    console.log(arr,'111111111111111111')
    if (arr.length>2) {
      return '日'
    } else if (arr.length === 2) {
      return '月'
    } else if (arr.length === 1) {
      return '年'
    } else {
      return '实时'
    }
  }
</script>

<style lang="less" scoped>
.data-type-wrapper {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: .01rem .03rem;
  color: #fff;
  font-family: "PingFang SC";
  font-size: .12rem;
  font-weight: 600;
  white-space: nowrap;
  background: #1e9b1c;
  border-radius: 1px;
  cursor: pointer;

  .triangle {
    width: .06rem;
    height: .04rem;
    margin-left: .02rem;
    border-top: solid .04rem #fff;
    border-right: solid .03rem transparent;
    border-left: solid .03rem transparent;
  }

  .data-type-info {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: none;
    padding: .12rem .24rem;
    color: #fff;
    font-size: 16px;
    white-space: nowrap;
    background: rgba(0, 9, 45, .9);
    border: 1px solid rgba(84, 181, 255, .5);
    transform: translate(-50%, 100%) translateY(.12rem);

    &.show {
      display: block;
    }
  }
}
</style>
