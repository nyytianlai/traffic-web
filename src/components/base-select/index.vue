<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-09-27 19:31:36
 * @LastEditTime: 2022-11-16 18:32:24
 * @FilePath: \traffic-web\src\components\base-select\index.vue
 * @Description: FilePath
-->
<template>
  <div
    ref="selectWrapper"
    class="selectWrapper"
    @click="showListHandle"
  >
    <span class="currentItem">{{ currentItem.name }}</span>
    <i :class="['cart', showList ? 'cartUp' : '']" />
    <div
      class="listWrapper"
      :style="{display: showList ? 'block' : 'none'}"
    >
      <div
        v-for="item in list"
        :key="item.value"
        :class="currentItem.value === item.value ? 'listItem itemCurrent' : 'listItem'"
        @click="selectCurrent(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['change', 'update:value', 'update:modelValue'])
  const selectWrapper = ref()
  const currentItem = computed(() => {
    const fd = props.list?.find(item => item.value === props.modelValue || item.value === props.value)
    return fd || {}
  })
  const showList = ref(false)
  const selectCurrent = (current) => {
    if (current.value === currentItem.value.value) return
    emit('change', current.value)
    emit('update:value', current.value)
    emit('update:modelValue', current.value)
  }
  const showListHandle = () => {
    showList.value = !showList.value
  }

  const hideList = (e) => {
    if (selectWrapper.value?.contains(e.target)) return
    if (showList.value) {
      showList.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', hideList)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', hideList)
  })
</script>

<style lang="less" scoped>
.selectWrapper {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-width: 120px;
  height: 32px;
  padding-right: 30px;
  color: #6eb3f9;
  background: rgba(84, 181, 255, .1);
  border: 1px solid rgba(84, 181, 255, .3);
  border-radius: 2px;
  cursor: pointer;
  &.selected {
    border-color: rgba(84, 181, 255, .8);
  }
}
.currentItem {
  padding-left: 10px;
  color: #fff;
}
.cart {
  position: absolute;
  top: 12px;
  right: 10px;
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 6px solid #6eb3f9;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  transition: transform 300ms;
  &.cartUp {
    transform: rotateZ(180deg);
  }
}

.listWrapper {
  position: absolute;
  top: 40px;
  left: 0;
  min-width: 100%;
  padding: 10px 0;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .5);
  border-radius: 2px;
}

.listItem {
  overflow: hidden;
  height: 32px;
  padding: 0 12px;
  color: #54b5ff;
  font-size: 16px;
  line-height: 32px;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 300ms;
  cursor: pointer;
  &.itemCurrent,
  &:hover {
    color: #fff;
    background: rgba(84, 181, 255, .3);
  }
}

</style>
