<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-11 09:17:25
 * @LastEditTime: 2023-01-04 09:06:39
 * @FilePath: \traffic-web\src\components\radio-list\index.vue
 * @Description: FilePath
-->
<template>
  <div class="radio-list-wrapper">
    <div
      v-for="item in radioList"
      :key="item.value"
      class="radio-item"
      :class="{selected:selectRadio === item.value, colorFull}"
      @click="handleChange(item)"
    >
      <div class="circle" />
      <div class="radio-name">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    radioList: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [String, Number, undefined],
      default: undefined
    },
    value: {
      type: [String, Number, undefined],
      default: undefined
    },
    colorFull: {
      type: Boolean,
      default: true
    }
  })
  const emits = defineEmits(['change', 'update:modelValue', 'update:value'])

  const selectRadio = computed({
    get () {
      return props.modelValue ?? props.value
    },
    set (vl) {
      emits('update:value', vl)
      emits('update:modelValue', vl)
    }
  })

  const handleChange = item => {
    if (item.value === props.value || item.value === props.modelValue) return
    emits('change', item)
    emits('update:modelValue', item.value)
    emits('update:value', item.value)
  }
</script>

<style lang="less" scoped>
.radio-list-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: 100%;

  .radio-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-right: .24rem;
    cursor: pointer;

    &:last-of-type {
      margin-right: 0;
    }

    .circle {
      width: .16rem;
      height: .16rem;
      margin-right: .08rem;
      border: 1px solid #54b5ff;
      border-radius: 50%;
    }

    .radio-name {
      color: #54b5ff;
      font-family: PingFang SC;
      font-size: .16rem;
      font-weight: @semibold;
      letter-spacing: 0;
      white-space: nowrap;
    }

    &.selected {
      .circle {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: .08rem;
          height: .08rem;
          background: #54b5ff;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    &.colorFull {
      .circle {
        width: .08rem;
        height: .08rem;
        background: #54b5ff;
        border: none;
      }

      &.selected {
        .circle {
          background: #f9e900;

          &::after {
            content: initial;
          }
        }

        .radio-name {
          color: #f9e900;
        }
      }
    }
  }
}
</style>
