<!--
 * @Author: niyayong
 * @LastEditors: qinyushan
 * @Date: 2022-04-18 17:27:55
 * @LastEditTime: 2022-07-20 14:55:36
 * @FilePath: \zndd-web\src\components\tabCard\tabCardPlanel.vue
 * @Description: FilePath
-->
<template>
  <div v-show="tabKey === action">
    <slot />
  </div>
</template>
<script>
  export default {
    props: {
      tabKey: {
        type: [String, Number],
        default: ''
      }
    },
    computed: {
      action: function () {
        return this.$parent.action
      }
    }
  }
</script>
