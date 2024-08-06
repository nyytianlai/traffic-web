/**
 * @author chen
 * @description 鼠标点击指定容器外隐藏弹框或盒子
 * @update 2021-11-11 10:14:49
 */

import { ref, watch, nextTick } from 'vue'

// 点击盒子隐藏或显示指定元素
export const clickOutSideBox = () => {
  const isShow = ref(false)
  const refSwitchBox = ref()
  const handleSwitchBoxClick = () => {
    isShow.value = !isShow.value
  }
  const _clickOutSide = (e) => {
    nextTick(() => {
      if (refSwitchBox.value && refSwitchBox.value.contains(e.target)) {
        isShow.value = true
      } else isShow.value = false
    })
  }
  watch(isShow, (val) => {
    if (val === true) document.addEventListener('click', _clickOutSide, true)
    else document.removeEventListener('click', _clickOutSide, true)
  })

  return {
    isShow, // 是否显示
    refSwitchBox, // 指定容器区域
    handleSwitchBoxClick // 切换显示方法
  }
}

// 点击输入框隐藏或显示指定元素
export const clickOutSideInput = () => {
  const _isFocus = ref(false)
  const isShow = ref(false)
  const refSwitchInput = ref()
  const handleSwitchInput = (flag) => {
    if (flag === true) {
      _isFocus.value = true
      isShow.value = true
    } else _isFocus.value = false
  }
  const _clickOutSide = (e) => {
    nextTick(() => {
      if ((refSwitchInput.value && refSwitchInput.value.contains(e.target)) || _isFocus.value) {
        isShow.value = true
      } else isShow.value = false
    })
  }
  watch(isShow, (val) => {
    if (val === true) document.addEventListener('click', _clickOutSide, true)
    else document.removeEventListener('click', _clickOutSide, true)
  })

  return {
    isShow, // 是否显示
    refSwitchInput, // 指定容器区域
    handleSwitchInput // 切换显示方法
  }
}
