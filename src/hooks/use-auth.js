import { getQueryString, getSearchParam, setCookie } from '@/utils/common'
import * as Cookie from '@/utils/cookie.js'
import {getUserInfo, getResources} from '@/api/auth.js'
import { useRouter } from 'vue-router'

export default async () => {
  const router = useRouter()
  const systemCode = 'TrafficOS-daping'
  const userInfo = await getUserInfo() || {}
  sessionStorage.setItem('traffic_userInfo', JSON.stringify(userInfo))
  const resources = await getResources(systemCode) || []
  sessionStorage.setItem('traffic_resources', JSON.stringify(resources))
 
  if (!resources.includes('ywtg-jtzt')) {
    router.replace('/noPermission')
  }
}