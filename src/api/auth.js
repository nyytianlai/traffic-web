import axios from '@/hooks/axios'

// 获取用户信息
export const getUserInfo = () => {
  return axios({
    url: `/api-proxy/perm/public/userinfo`,
    method: 'GET'
  })
}

// 获取资源编码列表
export const getResources = (systemCode) => {
  return axios({
    url: `/api-proxy/perm/public/user-html-resources?systemCode=${systemCode}`,
    method: 'GET'
  })
}