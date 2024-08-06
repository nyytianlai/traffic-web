<template>
  <div
    class="checkBox-wrapper"
    @click="handleClick"
  >
    <div
      class="check-box"
      :class="{checked: isChecked}"
    />
    <slot
      v-if="slot"
      name="title"
    />
    <div
      v-else
      class="check-name"
    >
      {{ name }}
    </div>
  </div>
</template>

<script setup>
  import { useSlots } from 'vue'
  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  })
  const emits = defineEmits(['change', 'update:checked'])
  const slots = useSlots()
  const slot = computed(() => slots.default ? slots.default() : null)
  const isChecked = computed({
    get () {
      console.log(props.checked, '111111')
      return props.checked
    },
    set (vl) {
      emits('update:value', vl)
      emits('change', { name: props.name, value: props.value, checked: vl })
    }
  })
  const handleClick = () => {
    emits('update:checked', !isChecked.value)
    emits('change', { name: props.name, value: props.value, checked: !isChecked.value })
  }
</script>

<style lang="less" scoped>
.checkBox-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  cursor: pointer;
  .check-box {
    flex: 0 0 .14rem;
    height: .14rem;
    margin-right: .08rem;
    border: 1px solid #54b5ff;
    border-radius: 2px;

    &.checked {
      position: relative;
      background: #54b5ff;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: .08rem;
        height: .04rem;
        border-bottom: solid 1.4px rgba(#000);
        border-left: solid 1.4px rgba(#000);
        transform: translate(-55%, -75%) rotate(-45deg);
      }
    }
  }

  .check-name {
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
    white-space: nowrap;
  }
}
</style>
