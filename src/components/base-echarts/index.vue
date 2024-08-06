<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-10-31 17:56:20
 * @LastEditTime: 2022-12-19 10:04:16
 * @FilePath: \traffic-web\src\components\base-echarts\index.vue
 * @Description: FilePath
-->
<template>
  <div
    class="base-echart"
  />
</template>

<script>
// 按需引入基本模板
  import * as echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pictorialBar'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/grid'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/graphic'
  import 'echarts/lib/component/radar'
  import 'echarts-gl'
  import 'echarts-liquidfill'

  export default {
    name: 'BaseEcharts',
    props: {
      option: {
        type: Object,
        default: function () {
          return {
            series: []
          }
        }
      }
    },
    data () {
      return {
        isInit: false
      }
    },
    computed: {
      rootFontSize () {
        return this.$store.getters.rootFontSize
      }
    },
    watch: {
      option: {
        handler () {
          this.$nextTick(function () {
            this.chartInstance && this.chartInstance.resize()
            this.drawChart()
          })
        },
        deep: true
      },
      rootFontSize: {
        handler () {
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.chartInstance && this.chartInstance.resize()
            this.drawChart()
          })
        }
      },
      isInit: {
        handler () {
          this.$nextTick(function () {
            if (this.isInit) {
              this.chartInstance.on('click', param => this.$emit('echartsClick', param))
              this.chartInstance.on('mouseover', param => this.$emit('echartsHover', param))
              this.chartInstance.on('mouseout', param => this.$emit('echartsOut', param))
            }
          })
        }
      }
    },
    mounted () {
      this.drawChart()
    },
    beforeUnmount () {
      this.chartInstance && this.chartInstance.dispose()
    },
    methods: {
      drawChart (option) {
        if (!this.$el || !this.$el.getBoundingClientRect().width || !this.$el.getBoundingClientRect().height) return
        this.chartInstance && this.chartInstance.clear()
        this.chartInstance && this.chartInstance.resize()
        if (!this.chartInstance) {
          this.chartInstance = echarts.init(this.$el, 'chalk')
        }
        this.chartInstance.setOption(option || this.option)
        this.isInit = true
      }
    }
  }
</script>

<style lang="less" scoped>
.base-echart {
  width: 100%;
  height: 100%;
}
</style>
