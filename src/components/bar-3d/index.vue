<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-14 14:20:38
 * @LastEditTime: 2022-12-14 16:28:15
 * @FilePath: \traffic-web\src\components\bar-3d\index.vue
 * @Description: FilePath
-->
<template>
  <base-echart
    :option="option"
  />
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import * as echarts from 'echarts'
  import { useStore } from 'vuex'
  const store = useStore()
  const props = defineProps({
    config: {
      type: Array,
      default: () => []
    /* exg: {
    name: '公交站场',
    unit: '个'
    colorArr: ['rgba(84, 181, 255, 0.2)', 'rgba(84, 181, 255, 0.4)', 'rgba(84, 181, 255, 0.9)', 'rgba(84, 181, 255, 1)'],
    icon: barBlue, // 图例所需
    data: [] // 该系列数据
    } */
    },
    xAxis: { // X轴
      type: Array,
      default: () => []
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    barWidth: {
      type: Number,
      default: 0.2
    }
  })
  const option = computed(() => {
    const fontSize = store.getters.rootFontSize
    const barWidth = props.barWidth * fontSize
    const wid = barWidth
    const w1 = Math.sin(Math.PI / 5) * wid // 4
    const w2 = Math.sin(Math.PI / 5) * wid // 4
    const snapHeight = wid / 3
    const CubeLeft = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: function (ctx, shape) {
        // 会canvas的应该都能看得懂，shape是从custom传入的
        const xAxisPoint = shape.xAxisPoint
        const c0 = [shape.x, shape.y - 2]
        const c1 = [shape.x - w2, shape.y - w1 + snapHeight - 2]
        const c2 = [shape.x - w2, xAxisPoint[1] - w1 + snapHeight - 2]
        const c3 = [shape.x, xAxisPoint[1] - 2]
        ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
      }
    })
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: function (ctx, shape) {
        const xAxisPoint = shape.xAxisPoint
        const c1 = [shape.x, shape.y - 2]
        const c2 = [shape.x, xAxisPoint[1] - 2]
        const c3 = [shape.x + w1, xAxisPoint[1] - w2 + snapHeight - 2]
        const c4 = [shape.x + w1, shape.y - w2 + snapHeight - 2]
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
      }
    })
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: function (ctx, shape) {
        const c1 = [shape.x, shape.y - 2]
        const c2 = [shape.x + w1, shape.y - w2 + snapHeight - 2] // 右点
        const c3 = [shape.x - w2 + w1, shape.y - w1 - w2 + +snapHeight * 2 - 2]
        const c4 = [shape.x - w2, shape.y - w1 + snapHeight - 2]
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
      }
    })
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)
    const series = []
    const legends = []
    const len = props.config.length
    const unit = props.config[0] && props.config[0].unit ? `单位：${props.config[0].unit}` : ''
    props.config.forEach((item, i) => {
      const colorArr = item.colorArr
      const data = item.data || []
      const color = {
        type: 'linear',
        x: 0,
        x2: 0,
        y: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: colorArr[0]
          },
          {
            offset: 0.1,
            color: colorArr[0]
          },
          {
            offset: 0.5,
            color: colorArr[1]
          },
          {
            offset: 1,
            color: colorArr[2]
          }
        ]
      }
      const serie = {
        name: item.name,
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          location[0] = location[0] + wid * ((1 - len) * 0.8 + 1.6 * i)
          const xlocation = api.coord([api.value(0), 0])
          xlocation[0] = xlocation[0] + wid * ((1 - len) * 0.8 + 1.6 * i)
          return {
            type: 'group',
            children: [{
              type: 'CubeLeft',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: xlocation
              },
              style: {
                fill: color,
                stroke: colorArr[3],
                lineWidth: 0.25
              }
            }, {
              type: 'CubeRight',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: xlocation
              },
              style: {
                fill: color,
                stroke: colorArr[3],
                lineWidth: 0.25
              }
            }, {
              type: 'CubeTop',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: xlocation
              },
              style: {
                fill: colorArr[3]
              }
            }]
          }
        },
        color,
        data
      }
      if (props.showLegend) {
        legends.push({
          name: item.name,
          icon: `image://${item.icon}`

        })
      }
      series.push(serie)
    })
    return {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        formatter (p) {
          const arr = Array.isArray(p) ? p : [p]
          const name = (p[0] && p[0].name) || ''
          let str = ''
          const unit = (props.config[0] && props.config[0].unit) || ''
          arr.forEach(item => {
            str += `
            <div>
              <span class="tip-title">${item.seriesName}：</span>
              <span class="tip-data">${item.data || '-'}${unit}</span>   
            </div> 
          `
          })
          return `
          <div class="bar3d-tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <div class="area-name">${name}</div>
            ${str}
          </div>
        `
        }
      },
      legend: {
        show: props.showLegend,
        right: 0.2 * fontSize,
        itemWidth: 0.16 * fontSize,
        itemHeight: 0.16 * fontSize,
        itemGap: 0.16 * fontSize,
        textStyle: {
          fontSize: 0.16 * fontSize,
          color: '#FFFFFF',
          lineHeight: 0.22 * fontSize
        },
        data: legends
      },
      grid: {
        top: 0.4 * fontSize,
        left: 0.1 * fontSize,
        right: 0.1 * fontSize,
        bottom: 0,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#283946'
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 0.14 * fontSize,
          interval: 0
        },
        boundaryGap: true,
        data: props.xAxis
      }],
      yAxis: {
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 0.16 * fontSize,
          padding: [0.02 * fontSize, 4, 0.02 * fontSize, 0.26 * fontSize]
        },
        name: unit,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#283946',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 0.16 * fontSize
        },
        minInterval: 1,
        splitNumber: 4
      },
      series: series
    }
  })
</script>

<style lang="less" scoped>
:deep(.bar3d-tool-tip) {
  position: relative;
  padding: .12rem;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .5);

  .dot {
    position: absolute;
    width: .06rem;
    height: .06rem;
    background: rgba(84, 181, 255, .5);

    &.left-top {
      top: 0;
      left: 0;
    }

    &.right-top {
      top: 0;
      right: 0;
    }

    &.left-bottom {
      bottom: 0;
      left: 0;
    }

    &.right-bottom {
      right: 0;
      bottom: 0;
    }
  }

  .area-name {
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }

  .tip-title {
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }

  .tip-data {
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }
}
</style>
