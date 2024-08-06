<!--
 * @Author: niyayong
 * @LastEditors: niyayong@sutpc.com
 * @Date: 2022-10-31 17:56:19
 * @LastEditTime: 2024-08-02 18:28:09
 * @FilePath: /traffic-web/src/App.vue
 * @Description: FilePath
-->
<template>
  <div
    ref="wrapRef"
    class="wrap"
  >
    <a-config-provider
      :locale="locale"
      :transform-cell-text="({ text }) => (text || text === 0 || text === false) ? text : '-'"
    >
      <Layout />
    </a-config-provider>
  </div>
</template>
<script>
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import Layout from '@/components/layout/index'
  import moment from 'moment'
import * as Cookie from '@/utils/cookie.js'
  // import useAuth from '@/hooks/use-auth'
  import 'moment/locale/zh-cn'
  import {getQueryString, getSearchParam, setCookie} from '@/utils/common.js'
  moment.locale('zh-cn')
  export default {
    name: 'App',
    components: { Layout },
    data () {
      return {
        timer: null,
        locale: zhCN
      }
    },
  mounted () {
    // useAuth()
    this.setTokenCookie()
      // 初始化
      this.setRem()
      // 改变窗口大小时重新设置 rem
      window.onresize = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.setRem, 200)
      }

      ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'].forEach((eventname) => {
        window.addEventListener(eventname, () => {
          this.fullScreenHandler()
        }, false)
      })

      this.clearConsole()
    },
    beforeUnmount () {
      clearTimeout(this.timer)
      clearTimeout(this.clearConsole)
      window.onresize = null;
      ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'].forEach((eventname) => {
        window.removeEventListener(eventname, () => {
          this.fullScreenHandler()
        }, false)
      })
    },
    methods: {
      // 设置 rem 函数
      setRem () {
        const dom = this.$refs.wrapRef
        const style = dom?.getBoundingClientRect() || {}
        const baseSize = 100
        let fontSize = 0
        const scale = style.width / 1920
        fontSize = (baseSize * scale * ((style.height / 1080) / (style.width / 1920))).toFixed(3)
        document.documentElement.style.fontSize = `${fontSize}px`
        this.$store.dispatch('setRootFontSize', { rootFontSize: fontSize, vHeight: style.height })
      },
      fullScreenHandler () {
        this.setRem()
        window.onresize = () => {
          clearTimeout(this.timer)
          this.timer = setTimeout(this.setRem, 200)
        }
      },
      clearConsole () {
        if (process.env.NODE_ENV === 'production') {
          clearTimeout(this.clearTimer)
          this.clearTimer = setTimeout(() => {
            console.clear()
            this.clearConsole()
          }, 10 * 60 * 1000)
        }
      },
      setTokenCookie() {
        const token = getQueryString('token') || getSearchParam('token') || Cookie.getCookie('x-szh-token')
        setCookie('x-szh-token', token, 0.5, '/')
      }
    }
  }
</script>
<style lang="less">
#app-traffic {
  width: 100%;
  height: 100%;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
  @media screen and (min-aspect-ratio:2.4) {
    .wrap {
      width: calc(100vh * 16 / 9) !important;
      margin: 0 auto !important;
    }
  }
}
</style>
