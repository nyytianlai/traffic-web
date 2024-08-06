/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-07 10:44:59
 * @LastEditTime: 2022-12-19 10:21:16
 * @FilePath: \traffic-web\src\hooks\useFullscreen.js
 * @Description: FilePath
 */
import { Util } from 'mars3d'
import { onMounted, onBeforeUnmount } from 'vue'
const noop = () => {}

/**
 * 
 * @param {function} enterCallback 进入全屏时的回调
 * @param {function} exitCallback  退出全屏时的回调
 * @returns {Object} {isFullscreen, enterFullscreen, exitFullscreen}
 * @example 
 * 
    const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen()

    function fullscreenHandle () {
      if (isFullscreen()) {
        return exitFullscreen()
      }
      return enterFullscreen(document.getElementById('idName'))
    }
 */
export default function (enterCallback = noop, exitCallback = noop) {
  let _isFullscreen = false
  /**
   * 
   * @param {HTMLElement} dom 元素
   */
  function enterFullscreen (dom) {
    return Util.requestFullscreen(dom)
  }
  function exitFullscreen () {
    return Util.exitFullscreen()
  }

  function changeHandle () {
    const cb = _isFullscreen ? exitCallback : enterCallback
    _isFullscreen = !_isFullscreen
    try {
      cb()
    } catch (e) {
      console.error(e)
    }
  }

  // 获取是否全屏的状态
  function isFullscreen() {
    return _isFullscreen
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', changeHandle)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('fullscreenchange', changeHandle)
  })

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen
  }
} 
