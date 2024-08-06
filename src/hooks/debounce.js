/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-05-13 14:38:37
 * @LastEditTime: 2022-05-13 14:38:39
 * @FilePath: \zndd-web\src\hooks\debounce.js
 * @Description: FilePath
 */
let timer
export const debounce = (func, wait) => {
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
