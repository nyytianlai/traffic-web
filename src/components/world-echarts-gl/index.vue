<template>
  <div
    class="map-echart"
  />
</template>
<script>
  import * as echarts from 'echarts'
  import 'echarts-gl'
  import world from './world.json'

  export default {
    name: 'WorldEchartsGl',
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
      newGeoCoordMap () {
        const geocoordMap = { ...this.geoCoordMap }
        if (geocoordMap['广东省']) delete geocoordMap['广东省']
        if (!geocoordMap['深圳市']) {
          geocoordMap['深圳市'] = [114.24779, 22.71991]
        }
        return geocoordMap
      },
      lineData () {
        return Object.keys(this.geoCoordMap).map(key => ({
          coords: this.flow === 'out' ? [
            [114.24779, 22.71991], // 深圳市
            this.geoCoordMap[key]
          ] : [
            this.geoCoordMap[key],
            [114.24779, 22.71991] // 深圳市
          ],
          value: 200
        }))
      },
      data1 () {
        return Object.keys(this.newGeoCoordMap).map(key => ({
          name: key,
          value: 0
        }))
      }
    },
    watch: {
      data1: {
        handler () {
          this.drawChart()
        },
        immediate: true
      },
      flow: {
        handler (value) {
          this.drawChart()
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
          var geoCoord = this.newGeoCoordMap[data[i].name]
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
        echarts.registerMap('world', world)

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
            map: 'world',
            shading: 'lambert',
            // aspectScale: 0.75, // 长宽比
            regionHeight: 2,
            viewControl: {
              distance: 100,
              alpha: 60,
              beta: 0
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
              color: 'rgba(7, 88, 149, 0.3)', // 地图板块的颜色
              borderColor: 'rgba(93, 223, 236, 1)',
              borderWidth: 1
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
                fontSize: 14,
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
                color: '#16E985',
                symbol: 'arrow', // 箭头图标
                symbolSize: 20 // 图标大小
              },
              lineStyle: {
                normal: {
                  color: '#16E985',
                  width: 2,
                  curveness: 0.8
                }
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
<style lang="less">
.map-echart {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/images/gdImage.jpg");
  background-size: cover;
}
</style>
