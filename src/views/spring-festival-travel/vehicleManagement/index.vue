<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:45:54
 * @LastEditTime: 2022-11-08 09:55:28
 * @FilePath: \traffic-web\src\views\spring-festival-travel\vehicleManagement\index.vue
 * @Description: FilePath
-->
<template>
  <div>
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        道路交通运行指挥系统
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.data-from {
  position: absolute;
  bottom: -0.36rem;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 .6rem;
   > div {
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .14rem;
    font-weight: 400;
    line-height: .2rem;
    text-transform: uppercase;
  }
}
</style>
