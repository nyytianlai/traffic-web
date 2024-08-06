/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-05-07 16:03:14
 * @LastEditTime: 2022-12-19 10:25:12
 * @FilePath: \traffic-web\src\hooks\calc-gradient.js
 * @Description: FilePath
 */
export function calcGradient (theta1 = 0, theta2 = 0) {
  const r = 0.5 // 半径是0.5 其实表示0.5个直径
  const inner = 0 // 里面镂空部分占60%  option中radius为[33%, 55%]  55 * 0.6 == 33

  const cos = Math.cos
  const sin = Math.sin
  const PI = Math.PI
  const min = Math.min
  const max = Math.max

  const bottom = 0
  const left = 2 * r
  const right = 0

  // y0: θ1对应的外部点的y值
  // y1: θ2对应的外部点的y值
  // _y0: θ1对应的内部点的y值
  // _y1: θ2对应的内部点的y值
  // x0: θ1对应的外部点的x值
  // x1: θ2对应的外部点的x值
  // _x0: θ1对应的内部点的x值
  // _x1: θ2对应的内部点的x值
  const y0 = r * (1 - cos(theta1))
  const y1 = r * (1 - cos(theta2))

  const _y0 = r * (1 - inner * cos(theta1))
  const _y1 = r * (1 - inner * cos(theta2))

  // 如果这个弧经过θ == PI的点  则bottom = 2PI
  // bottom用于之后的max计算中
  if (theta1 < PI && theta2 > PI) {
    bottom = 2 * r
  }
  // 计算这几个点的最大最小值
  const ymin = min(_y0, _y1, y0, y1)
  const ymax = max(_y0, _y1, y0, y1, bottom)

  const x0 = r * (1 + sin(theta1))
  const x1 = r * (1 + sin(theta2))

  const _x0 = r * (1 + inner * sin(theta1))
  const _x1 = r * (1 + inner * sin(theta2))

  // 如果这个弧经过θ == PI / 2的点  则right = 2PI
  if (theta1 < PI / 2 && theta2 > PI / 2) {
    right = 2 * r
  }
  // 如果这个弧经过θ == PI / 2 * 3的点  则left = 0
  if (theta1 < (PI / 2) * 3 && theta2 > (PI / 2) * 3) {
    left = 0
  }
  const xmin = min(_x0, _x1, x0, x1, left)
  const xmax = max(_x0, _x1, x1, x0, right)
  return {
    // 计算圆心以及半径
    center: [(r - xmin) / (xmax - xmin) || 0, (r - ymin) / (ymax - ymin)],
    radius: r / (min(xmax - xmin, ymax - ymin) || 1)
  }
}
