<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-05-24 10:25:34
 * @LastEditTime: 2022-10-08 09:58:35
 * @FilePath: \ImmediateAction_web\src\components\overflow-text\index.vue
 * @Description: FilePath
-->
<template>
  <div
    ref="textRef"
    class="text text-clip"
  >
    <span :class="{hide: overflow}">{{ text }}</span>

    <a-tooltip
      v-if="overflow"
      overlay-class-name="overflow-text-tool-tip-wrapper"
      auto-adjust-overflow
      placement="bottomLeft"
    >
      <template #title>
        <!-- 如果有需要自定义内容就用插槽 否则显示text文本-->
        <slot v-if="slots.default ? slots.default() : null" />
        <template v-else>
          {{ text }}
        </template>
      </template>
      <div class="over-text text-clip">
        {{ text }}
      </div>
    </a-tooltip>
  </div>
</template>
<script setup>
  import { useSlots } from 'vue'
  const props = defineProps({
    text: { // 文本
      type: String,
      default: ''
    }
  })

  const slots = useSlots()
  // const slot = slots.default ? slots.default() : null

  const textRef = ref()
  const overflow = ref(false) // 是否超出

  function compareWidth () {
    const width = textRef.value?.clientWidth
    const scrollWidth = textRef.value?.scrollWidth
    overflow.value = scrollWidth > width
  }
  onMounted(compareWidth)
  watch(() => props.text, () => nextTick(compareWidth))

</script>
<style lang="less" scoped>
.text {
  position: relative;
  .over-text {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .hide {
    opacity: 0;
  }
}

</style>
<style lang="less">
.overflow-text-tool-tip-wrapper {
  max-width: 500px !important;
  .ant-tooltip-arrow {
    opacity: 0;
  }
  .ant-tooltip-inner {
    background: rgba(0,9,45,0.90);
    border: 1px solid rgba(84,181,255,0.5);
    border-radius: 2px;
    font-size: 0.2rem;
    word-break: break-all;
  }
}
</style>
