<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-03 11:30:17
 * @LastEditTime: 2023-01-03 16:53:04
 * @FilePath: \traffic-web\src\views\overview\components\card-item.vue
 * @Description: FilePath
-->
<template>
  <div
    class="card-wrapper"
  >
    <div
      class="bg-img"
      :style="{backgroundImage: `url(${config.icon})`,backgroundSize: config.bgSize}"
    />
    <div class="date">
      <span v-show="config.showDate">{{ date }}</span>
      <span v-show="config.dateType">{{ config.dateType }}</span>
    </div>
    <div class="card-content">
      <component
        :is="config.component"
        :config="config.config"
        :data="data"
        :compare-data="compareData"
        @changeDate="changeDate"
      />
    </div>
    <div class="note">
      {{ config.dataFrom }}
    </div>
  </div>
</template>

<script setup>
  import moment from 'moment'
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => ([])
    },
    compareData: {
      type: Array,
      default: () => ([])
    }
  })

  const date = ref()

  const changeDate = vl => {
    date.value = vl
  }

  watch(() => props.data, () => {
    const fd = props.data?.find(item => props.config?.config?.some(o => item.zbmc.includes(o.name) || item.zbmc.includes(o.dataName)))
    date.value = (fd && !props.config.component ? fd?.sbsj  : date.value) || '-'
  }, { deep: true, immediate: true })

</script>

<style lang="less" scoped>
.card-wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: .08rem 0 .08rem .12rem;
  .bg-img {
    position: absolute;
    right: .1rem;
    bottom: 0;
    z-index: 1;
    width: calc(100% - .1rem);
    height: 100%;
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: auto;
    pointer-events: none;
  }
  .date {
    display: flex;
    align-items: center;
    margin-bottom: .16rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;

    span:last-of-type {
      padding: .01rem .03rem;
      margin-left: .04rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .12rem;
      font-weight: 600;
      line-height: .18rem;
      text-align: center;
      background: #1e9b1c;
      border-radius: 1px;
    }
  }

  .card-content {
    flex: 1;
    min-height: 0;
  }

  .note {
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .14rem;
    font-weight: 400;
    line-height: .2rem;
    text-transform: uppercase;
  }
}
</style>
