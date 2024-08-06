/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2023-01-03 10:35:24
 * @LastEditTime: 2023-01-03 10:39:02
 * @FilePath: \traffic-web\src\api\modules\transportation-means\parking-resources.js
 * @Description: FilePath
 */
import axios from '@/hooks/axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api-proxy/dc/api' : '/api-proxy/dc/api'
// 交通运行专题-停车资源-全天路内停车饱和度变化
export const qtlntcbhdbh = () => {
  return axios({
    url: `${BASE_URL}/v1/dp/jiaotong/jtss/tczy/qtlntcbhdbh`,
    method: 'post',
    data: {}
  })
}
