<template>
  <div class="card-wrapper">
    <slot />
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.card-wrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, rgba(#00b2ff, .3) -36.53%, rgba(0, 133, 255, .0001) 100%);
  border: 1px solid;
  border-image: linear-gradient(to bottom, rgba(0, 7, 24, 0), rgba(0, 178, 255, .2)) 1 10;
}
</style>
