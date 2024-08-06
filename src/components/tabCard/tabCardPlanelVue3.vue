<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-04-18 17:27:55
 * @LastEditTime: 2022-07-05 16:06:30
 * @FilePath: \zndd-web\src\components\tabCard\tabCardPlanelVue3.vue
 * @Description: FilePath
-->
<template>
  <div v-if="tabKey === actions.index">
    <slot />
  </div>
</template>
<script>
  export default {
    inject: ['actions'],
    props: {
      tabKey: {
        type: [String, Number],
        default: ''
      }
    }
  }
</script>
