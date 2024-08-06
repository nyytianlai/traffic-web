<!--
 * @Author: qinyushan
 * @Date: 2021-09-07 16:47:01
 * @LastEditTime: 2023-01-05 10:53:04
 * @LastEditors: niyayong
 * @FilePath: \traffic-web\src\components\layout\index.vue
 * @Description:
-->
<template>
  <div
    class="subject-layout"
  >
    <Header />
    <MainContent />
    <div class="star-dom-wrapper">
      <canvas ref="starDom" />
    </div>
  </div>
</template>

<script>
  import { createStar } from '@/hooks/canvas.js'
  import Header from './components/header.vue'
  import MainContent from './components/content.vue'
  export default {
    components: {
      Header,
      MainContent
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    mounted () {
      this.initCanvas()
    },
    methods: {
      initCanvas () {
        const canvas = this.$refs.starDom
        createStar(canvas, this.width, 80, 0.5)
      }
    }
  }
</script>

<style lang="less" scoped>
.subject-layout {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: #000527;

  .star-dom-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;

    canvas {
      // width: 100%;
      // height: 100%;
      pointer-events: none;
      user-select: none;
    }
  }
}

</style>
