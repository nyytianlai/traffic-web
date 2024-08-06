import { createStore } from 'vuex'
import getters from './getters'

// 自动引入
const modules = {}
const requireStore = require.context('./modules', true, /\.js$/)
requireStore.keys().forEach((fileName) => {
  const file = requireStore(fileName)
  const key = getFileName(fileName)
  modules[key] = file.default || file
})

export default createStore({
  modules,
  getters
})

// 获取文件名
function getFileName (fileName) {
  const startIndex = fileName.lastIndexOf('/')
  const endIndex = fileName.lastIndexOf('.')
  return fileName.substring(startIndex + 1, endIndex)
}
