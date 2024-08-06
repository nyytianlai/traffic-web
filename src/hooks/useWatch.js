/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-07-06 11:21:13
 * @LastEditTime: 2022-12-19 10:20:44
 * @FilePath: \traffic-web\src\hooks\useWatch.js
 * @Description: FilePath
 */
// 主要用于根页面组件内
import { onActivated, onDeactivated, watch } from "vue"
const watchList = []
export default  function(watchParams, watchFunc, option) {
  const initWatch = () => {
    const watchStop = watch(watchParams, watchFunc, option)
    watchList.push(watchStop)
  }

  onActivated(() => {
    initWatch()
  })

  // onMounted(() => {
  //   initWatch()
  // })

  onDeactivated(() => {
    while(watchList?.length) {
      watchList.pop()()
    }
  })

  onBeforeUnmount(() => {
    while(watchList?.length) {
      watchList.pop()()
    }
  })

  return {
    watchList
  }
}
