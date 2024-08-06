import { app } from '@/plugins/app'
import SvgIcon from '@/components/svgIcon/index.vue' // svg component

// 项目全局使用svg-icon组件

app.component('SvgIcon', SvgIcon)

const req = require.context('@/assets/icons', false, /\.svg$/)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
