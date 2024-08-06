<template>
  <div class="wrapper">
    <img :src="require('./images/noPermission.png')" />
  </div>
</template>
<script></script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 300px;
  }
}
</style>