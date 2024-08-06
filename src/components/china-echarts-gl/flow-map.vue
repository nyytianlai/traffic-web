<template>
  <div
    class="map-echart"
  />
</template>
<script>
  import * as echarts from 'echarts'
  import guangdong from './guangdong.json'
  import 'echarts-gl'
  export default {
    name: 'GuangDongEchartsGl',
    props: {
      flow: {
        type: String,
        default: 'out'
      },
      geoCoordMap: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {}
    },
    computed: {
      lineData () {
        return Object.keys(this.geoCoordMap).map(key => ({
          coords: this.flow === 'out' ? [
            [114.24779, 22.71991], // 深圳市
            this.geoCoordMap[key]
          ] : [
            this.geoCoordMap[key],
            [114.24779, 22.71991] // 深圳市
          ]
        }))
      },
      data1 () {
        return Object.keys(this.geoCoordMap).map(key => ({
          name: key,
          value: 0
        }))
      }
    },
    watch: {
      option: {
        handler () {
          this.drawChart()
        },
        immediate: true
      },
      flow: {
        handler (value) {
          if (value === 'out') {
            this.drawChart()
          } else {
            this.drawChart()
          }
        },
        immediate: true
      },
      isInit: {
        handler () {
          this.$nextTick(function () {
            if (this.isInit) {
              this.chartInstance.on('click', param => this.$emit('echartsClick', param))
            }
          })
        }
      }
    },
    mounted () {
      this.drawChart()
    },
    beforeDestroy () {
      this.chartInstance && this.chartInstance.dispose()
    },
    methods: {
      convertData (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = this.geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      },
      drawChart () {
        if (!this.$el || !this.$el.getBoundingClientRect().width || !this.$el.getBoundingClientRect().height) return
        echarts.registerMap('guangdong', guangdong)

        if (!this.chartInstance) {
          this.chartInstance = echarts.init(this.$el, 'chalk')
        } else {
          this.chartInstance.clear()
          this.chartInstance.resize()
        }
        const locationOption = {
          tooltip: {
            show: false
          },
          geo3D: {
            map: 'guangdong',
            shading: 'lambert',
            aspectScale: 0.75, // 长宽比
            viewControl: {
              distance: 120,
              alpha: 70,
              beta: 10,
              rotateSensitivity: 0
            },
            scaleLimit: {
              min: 1,
              max: 5
            },
            roam: false,
            label: {
              show: true,
              distance: 10,
              formatter: (params) => {
                if (params.name === '广东省') {
                  return '深圳市'
                } else {
                  return ' '
                }
              },
              color: '#fff',
              backgroundColor: 'transparent',
              fontSize: 14
            },
            itemStyle: {
              color: 'rgba(0,143,255,.3)', // 地图板块的颜色
              borderColor: '#008fff',
              borderWidth: 2
            },
            light: {
              main: {
                color: '#fff',
                alpha: 80,
                beta: 30
              }
            },
            silent: true,
            emphasis: {
              itemStyle: {
                color: '#e0d40f'
              }
            }

          },
          series: [
            {
              name: 'effect',
              type: 'scatter3D',
              coordinateSystem: 'geo3D',
              shading: 'color', // color,lambert,realistic
              itemStyle: { // 柱条样式
                color: '#00FFF9',
                opacity: 1
              },
              label: {
                show: true,
                position: 'left',
                color: '#fff',
                formatter (p) {
                  return p.name
                }
              },
              data: this.convertData(this.data1)
            },
            {
              type: 'lines3D',
              coordinateSystem: 'geo3D',
              // 动画效果
              effect: {
                show: true,
                period: 4, // 特效动画的时间，单位为 s
                trailLength: 0.1, // 特效尾迹的长度。0~1数值越大尾迹越长
                color: '#E0D40E',
                symbol: 'arrow', // 箭头图标
                symbolSize: 20 // 图标大小
              },
              lineStyle: {
                color: '#E0D40E',
                width: 2,
                curveness: 1
              },
              blendMode: 'lighter',
              data: this.lineData
            }
          ]
        }
        this.chartInstance.setOption(locationOption)
      }
    }
  }
</script>
<style scoped lang="less">
.map-echart {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/images/gdImage.jpg");
  background-size: cover;
}
</style>
