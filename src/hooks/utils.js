/**
 *@desc 工具箱
 *@author sulihua
 *@date 2021/11/9
 */
const URL_REX =
  /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim

export default {
  /**
   * 回调动画帧函数
   * @param {function} callback
   */
  requestAnimFrame: (function () {
    const executer =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    return executer.bind(window)
  })(),

  /**
   * 生成[min-max]之间的随机数
   * @param {number} min
   * @param {number} max
   * @param {boolean} isInt 为true生成整数随机数
   * @return {number}
   */
  random(min, max, isInt) {
    if (isInt) return Math.floor(Math.random() * (max - min) + min)
    return Math.random() * (max - min) + min
  },

  /**
   * 计算两点距离
   * @param {number} sx 开始点x坐标
   * @param {number} sy 开始点y坐标
   * @param {number} tx 结束点x坐标
   * @param {number} ty 结束点y坐标
   * @return {number}
   */
  distances(sx, sy, tx, ty) {
    const x = sx - tx
    const y = sy - ty
    return Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))
  },

  /**
   * 是否是url地址
   * @param {string} url
   * @return {boolean}
   */
  isUrl(url) {
    return URL_REX.test(url)
  },
  /**
   * 检索字符串中url值并返回
   * @param {string} content
   * @return {string}
   */
  matchUrl(content) {
    return content.match(URL_REX)
  },
  /**
   * 是否是邮件地址
   * @param {string} email
   * @return {string}
   */
  isEmail(email) {
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
      email
    )
  },
  /**
   * 是否是电话号码
   * @param {string} phone
   * @return {string}
   */
  isPhone(phone) {
    return /^[0-9]+[-]*$/.test(phone)
  },
  /**
   * 是否是字母数字
   * @param {string} code
   * @return {string}
   */
  isEngCode(code) {
    return /^[ A-z0-9-\\._]*$/.test(code)
  },
  /**
   * 是否是字母
   * @param {string} str
   * @return {string}
   */
  isEng(str) {
    return /^[A-z-]*$/.test(str)
  },

  formatNumStr(str) {
    if (str || str === 0) {
      const arr = String(str).split('.')
      arr[0] = String(arr[0])
        .trim()
        .replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
      return arr.join('.')
    }
    return '-'
  },

  // 保留两位小数，不足两位补零
  toDecimal2(x) {
    const f = Math.round(x * 100) / 100
    const s = f.toString()
    const rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  },
  hex2Rgba(bgColor, alpha = 1) {
    let color = bgColor.slice(1) // 去掉'#'号
    let rgba = [
      parseInt('0x' + color.slice(0, 2)),
      parseInt('0x' + color.slice(2, 4)),
      parseInt('0x' + color.slice(4, 6)),
      alpha
    ]
    return 'rgba(' + rgba.toString() + ')'
  }
}
