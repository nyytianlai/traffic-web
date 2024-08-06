// import request from '@/utils/request'
// export const getUserToken = data => {
//   return request.post({
//     url: `./api-proxy/smallscreen-api/raydata/getToken`,
//     data,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }
import axios from '@/hooks/axios'
export const getUserToken = (data) => {
  return axios({
    url: '/api-proxy/smallscreen-api/raydata/getToken',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}
// 获取用户信息
export const getUserInfo = (token) => {
  return axios({
    url: `/api-proxy/smallscreen-api/raydata/getUserInfo?access_token=${token}`,
    method: 'GET'
  })
}
// 获取系统权限接口路径
export const getResource = ({ token, systemCode }) => {
  const para = {
    token,
    systemCode
  }
  return axios({
    url: '/api-proxy/smallscreen-api/authority/user/resource',
    method: 'POST',
    data: para
  })
}
