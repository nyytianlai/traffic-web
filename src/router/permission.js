/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-06-07 09:23:20
 * @LastEditTime: 2022-12-08 17:05:43
 * @FilePath: \traffic-web\src\router\permission.js
 * @Description: FilePath
 */
import router from './index'
// import Cookies from 'js-cookie'
import store from '@/store'
router.beforeEach(async (to, from, next) => {
  const date = store.getters.selectDate
  // const isGWS = process.env.VUE_APP_GWS_MODE === 'true'
  // const home = process.env.VUE_APP_HOME
  // const token = Cookies.get('ssokey')
  const disabled = (to.matched[0] && to.matched[0].meta?.disabled) || to.meta?.disabled
  if (disabled) {
    await next('/')
  }
  if (date) {
    next()
  } else {
    try {
      // await actualTimeLetterInfo()
    } catch (error) {

    }
    next()
  }
})
