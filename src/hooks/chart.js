const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, height) => {
  // 计算
  const midRatio = (startRatio + endRatio) / 2

  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u)
      }
      return Math.sin(v) > 0 ? 1 * height : -1
    }
  }
}

// 生成模拟 3D 饼图的配置项
export const getPie3D = (pieData, internalDiameterRatio) => {
  const maxHeight = 100
  const minHeight = 80
  const newPieData = [...pieData]
  const minValue = Math.min(...newPieData.map((item) => item.value))
  const maxValue = Math.max(...newPieData.map((item) => item.value))
  console.log(minValue, maxValue)
  const series = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const legendData = []
  const k =
    typeof internalDiameterRatio !== 'undefined'
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < newPieData.length; i++) {
    sumValue += Number(newPieData[i].value)

    const seriesItem = {
      name: typeof newPieData[i].name === 'undefined' ? `series${i}` : newPieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: newPieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    }

    if (typeof newPieData[i].itemStyle !== 'undefined') {
      const itemStyle = {}
      if (typeof newPieData[i].itemStyle.color !== 'undefined') {
        itemStyle.color = newPieData[i].itemStyle.color
      }
      if (typeof newPieData[i].itemStyle.opacity !== 'undefined') {
        itemStyle.opacity = newPieData[i].itemStyle.opacity
      }
      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = Number((startValue / sumValue).toFixed(3))
    series[i].pieData.endRatio = Number((endValue / sumValue).toFixed(3))
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      true,
      true,
      k,
      minHeight + ((series[i].pieData.value - minValue) / maxValue) * maxHeight
    )

    startValue = endValue

    legendData.push(series[i].name)
  }

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    tooltip: {
      backgroundColor: 'transparent',
      padding: 0,
      borderWidth: 0,
      formatter: (params) => {
        if (params.seriesName !== 'mouseoutSeries') {
          return `
            <div class="tool-tip">
              <div class="dot left-top"></div>
              <div class="dot right-top"></div>
              <div class="dot left-bottom"></div>
              <div class="dot right-bottom"></div>
              <div class="pie-3d-tip-data">
                <span>${params.seriesName}：</span>
                <span>${series[params.seriesIndex].pieData.value}</span>
              </div>
            </div>
          `
        }
      }
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -100,
      max: 10
    },

    grid3D: {
      show: false,
      boxHeight: 26,
      top: '0%',
      left: '1%',
      bottom: '0%',
      environment: 'auto', // 背景色,auto为自适应颜色
      viewControl: {
        distance: 300,
        alpha: 30,
        beta: 225
      }
    },
    series: series
  }
  return option
}
