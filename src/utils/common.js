/*
 * @Author: qinyushan
 * @Date: 2022-04-25 20:05:41
 * @LastEditTime: 2022-12-19 10:18:45
 * @LastEditors: niyayong
 * @FilePath: \traffic-web\src\utils\common.js
 * @Description:
 */
import { h } from 'vue'
export const formatNum = (n) => {
  if (!Number(n)) {
    if (Number(n) === 0 && (n === '' || n === null)) n = '--'
    return n
  }
  const num = n.toString()
  let decimals = ''
  // 判断是否有小数
  num.indexOf('.') > -1 && (decimals = num.split('.')[1])
  const len = parseInt(num).toString().length
  if (len <= 3) {
    return num
  } else {
    let temp = ''
    const remainder = len % 3
    if (decimals) temp = '.' + decimals
    if (remainder > 0) {
      // 不是3的整数倍
      return (
        num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
      )
    } else {
      // 是3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp
    }
  }
}
export const assignObj = (target = {}, sources = {}) => {
  const obj = target
  if (typeof target !== 'object' || typeof sources !== 'object') {
    return sources
  }
  for (const key in sources) {
    // 如果target存在就覆盖
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      obj[key] = assignObj(target[key], sources[key])
    } else {
      obj[key] = sources[key]
    }
  }
  return obj
}

/**
 * 显示*号
 * @param {Number|null|String} num
 * @param {Number} decimals 小数位数
 * @returns {Number|String}
 */
export const formatDisplayNum = (num, decimals = 2) => {
  if (num === null || num === undefined) return '--'
  let text = Number(num)
  if (isNaN(text)) {
    return '--'
  }
  text = text.toFixed(decimals)
  if (+text === 0) { // 0直接返回
    return text
  }
  return formatNum(text)
}

/**
 * 表格项目状态
 * @param {Number|null|String} num
 * @returns {Number|String}
 */
export const setStatusLabel = (text) => {
  let color = 'blue'
  switch (text) {
    case '正常':
      color = 'blue'
      break
    case '滞后':
      color = 'red'
      break
    case '超前':
      color = 'green'
      break
  }
  return {
    children: text ? h('div', { class: `project-status-box ${color}` }, [text]) : '--'
    // <div class= "project-status-box" > { text } </div>
  }
}
/**
 * 表格滞后天数
 * @param {Number|null|String} num
 * @returns {Number|String}
 */
export const setDelayLabel = (text) => {
  return {
    children: text ? h('div', { class: 'project-status-box red' }, [`滞后${text || '--'}天`]) : '--'
    // <div class= "project-status-box" > { text } </div>
  }
}
export const setDelayLabelMin = (text) => {
  return {
    children: text || text === 0 ? h('div', { class: 'project-other-color red' }, [`${text}`]) : '--'
    // <div class= "project-status-box" > { text } </div>
  }
}
// 转换数据小数点后两位
// 使用方法 myfixed（array,num）
//  ==> myfixed（[1,2,3],2）
/**
 * @param {Number|String|Array} Array       为需要转换的数组
 * @param {String|Number} num       为需要转为为几位小数
 * @returns Array
 */
export const myfixed = (obj, num) => {
  const type = Object.prototype.toString.call(obj)

  if (type === '[object Number]') return obj.toFixed(num)

  if (type === '[object String]') {
    const value = +obj
    return isNaN(value) ? obj : value.toFixed(num)
  }

  if (type === '[object Array]') {
    const newArray = []
    obj.map((currentValue, index) => {
      if (currentValue == null || currentValue === '') {
        newArray.push(null)
      } else {
        newArray.push(Number(currentValue).toFixed(num))
      }
    })
    return newArray
  }
}

/*
 * param str 要截取的字符串
 * param L 要截取的字节长度，注意是字节不是字符，一个汉字两个字节
 * return 截取后的字符串
 */
export const cutStrLength = (str = '') => {
  var strlen = str.length // 字符串长度
  var chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度

  return Math.max(strlen, chrlen)
}
export const cutStr = (str = '', L) => {
  var result = ''
  var strlen = str.length // 字符串长度
  var chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度

  if (chrlen <= L) { return str }

  for (var i = 0, j = 0; i < strlen; i++) {
    var chr = str.charAt(i)
    if (/[\x00-\xff]/.test(chr)) {
      j++ // ascii码为0-255，一个字符就是一个字节的长度
    } else {
      j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
    }
    if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
      result += chr
    } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
      console.log(result, '00000')
      return result
    }
  }
}


export const setCookie = (name, value, expires, path, domain, secure) => {
  let cookieString = name + '=' + encodeURIComponent(value)
  if (expires) {
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + expires * 24 * 60 * 60 * 1000)
    cookieString += '; expires=' + expirationDate.toUTCString()
  }
  if (path) {
    cookieString += '; path=' + path
  }
  if (domain) {
    cookieString += '; domain=' + domain
  }
  if (secure) {
    cookieString += '; secure'
  }
  document.cookie = cookieString
}


// 获取路径中的指定参数
export const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.hash.split('?')[1]?.match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

export const getSearchParam = name => {
  return (getUrlObj() && getUrlObj()[name]) || null
}

// 重定向认证代理，这里以预发布环境为例
export const redirectUrlByToken = (ln, path) => {
  // const hostname = ln.hostname
  // const protocol = ln.protocol
  // const pathname = ln.pathname
  // const redirectUri = decodeURIComponent(`${protocol}//${hostname}${pathname}`)
  const redirectUri = encodeURIComponent(ln)
  const trafficAuthInfo = window.trafficAuthInfo
  const url = `${path}?clientId=${trafficAuthInfo.clientId || 'szh-rio-gw'}&authType=${
    trafficAuthInfo.authType || 'yuezhengyi'
  }&redirectUrl=${redirectUri}`
  console.log(`重定向url：${url}`)
  window.location.replace(url)
}

export const getUrlObj = () => {
  const search = window.location.search && window.location.search.slice(1)
  if (!search) return {}
  const obj = {}
  const arr = decodeURIComponent(search).split('&')
  arr.forEach(item => {
    const arrObj = item.split('=')
    obj[arrObj[0]] = arrObj[1]
  })
  return obj
}

