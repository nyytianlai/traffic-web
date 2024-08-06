/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-04-18 17:27:47
 * @LastEditTime: 2022-11-21 11:38:09
 * @FilePath: \traffic-web\src\main.js
 * @Description: FilePath
 */
// import 'default-passive-events'
import 'vue-global-api' // 配合<script setup> 不用手动引入ref\computed等api
// import '@/hooks/public-path'
import { app } from '@/plugins/app'
import router from './router'
import store from './store'
import '@/plugins/antd'
import '@/components/svgIcon/index.js'
import '@/router/permission'
import 'animate.css/animate.min.css'

// 引入全局的样式
import '@/assets/styles/main.less'
import '@/assets/styles/font.css'

// app.use(router).use(store).mount('#app')

app.config.globalProperties.$STATIC_URL = process.env.VUE_APP_STATIC_URL
app.use(store).use(router).mount('#app-traffic')
