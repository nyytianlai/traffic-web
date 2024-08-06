import { createRouter, createWebHashHistory } from 'vue-router'
import ParentView from '@/components/parent-view/index.vue'
const basePath = '/child/traffic'
export const routes = [
  {
    path: '/overview',
    name: 'overview',
    meta: { title: '交通总览', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
    component: () => import(/* webpackChunkName: 'overview' */ '@/views/overview/index')
  },
  {
      path: '/road',
      name: 'road',
      meta: { title: '道路交通', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      component: () =>
          import ( /* webpackChunkName: 'road' */ '@/views/road/outer')
  },
  {
    path: '/city-transit',
    name: 'cityTransit',
    meta: { title: '城市公交', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
    component: () =>
      import(/* webpackChunkName: 'cityTrack' */ '@/views/city-transit/publicTransit/index'),
    children: [
      // {
      //   path: 'publicTransit',
      //   realPath: '/city-transit/publicTransit',
      //   name: 'publicTransit',
      //   meta: { title: '公共交通', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () =>
      //     import(/* webpackChunkName: 'cityTrack' */ '@/views/city-transit/publicTransit/index')
      // }
      // {
      //   path: 'cityTrack',
      //   realPath: '/city-transit/cityTrack',
      //   name: 'cityTrack',
      //   meta: { title: '城市轨道', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () =>
      //     import(/* webpackChunkName: 'cityTrack' */ '@/views/city-transit/cityTrack/index')
      // },
      // {
      //   path: 'regularTransit',
      //   realPath: '/city-transit/regularTransit',
      //   name: 'regularTransit',
      //   meta: { title: '常规公交', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'regularTransit' */
      //       '@/views/city-transit/regularTransit/index'
      //     )
      // },
      // {
      //   path: 'taxi',
      //   realPath: '/city-transit/taxi',
      //   name: 'taxi',
      //   meta: { title: '出租车', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () => import(/* webpackChunkName: 'taxi' */ '@/views/city-transit/taxi/index')
      // }
    ]
  },
  {
    path: '/trafficSafety',
    name: 'trafficSafety',
    meta: { title: '交通安全', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
    component: () =>
      import(
        /* webpackChunkName: 'vehicleManagement' */
        '@/views/trafficSafety/vehicleManagement/index'
      ),
    children: [
      // {
      //   path: 'safetyMonitoring',
      //   realPath: '/trafficSafety/safetyMonitoring',
      //   name: 'safetyMonitoring',
      //   meta: { title: '安全监测', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'safetyMonitoring' */
      //       '@/views/trafficSafety/safetyMonitoring/index'
      //     )
      // }
      // {
      //   path: 'vehicleManagement',
      //   realPath: '/trafficSafety/vehicleManagement',
      //   name: 'vehicleManagement',
      //   meta: { title: '车辆管理', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'vehicleManagement' */
      //       '@/views/trafficSafety/vehicleManagement/index'
      //     )
      // }
    ]
  },
  {
    path: '/transportation',
    name: 'transportation',
    meta: { title: '客货运输', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
    component: ParentView,
    children: [
      {
        path: 'overview',
        realPath: '/transportation/overview',
        name: 'transportationOverview',
        meta: {
          title: '客货总览',
          disabled: false,
          keepAlive: true,
          dataInfo: '数值为演示数据'
        },
        component: () =>
          import(
            /* webpackChunkName: 'transportationOverview' */
            '@/views/transportation/overview/index'
          )
      },
      {
        path: 'logistics',
        realPath: '/transportation/logistics',
        name: 'logistics',
        meta: { title: '道路运输', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
        component: () =>
          import(/* webpackChunkName: 'logistics' */ '@/views/transportation/logistics/index')
      },
      {
        path: 'seaport',
        realPath: '/transportation/seaport',
        name: 'seaport',
        meta: { title: '海港', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
        component: () =>
          import(/* webpackChunkName: 'seaport' */ '@/views/transportation/seaport/index')
      },
      {
        path: 'airport',
        realPath: '/transportation/airport',
        name: 'airport',
        meta: { title: '空港', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
        component: () =>
          import(/* webpackChunkName: 'airport' */ '@/views/transportation/airport/index')
      },
      {
        path: 'railroad',
        realPath: '/transportation/railroad',
        name: 'railroad',
        meta: { title: '铁路', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
        component: () =>
          import(/* webpackChunkName: 'railroad' */ '@/views/transportation/railroad/index')
      }
    ]
  },
  {
    path: '/transportation-means',
    name: 'transportationMeans',
    meta: { title: '交通设施', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
    component: ParentView,
    children: [
      {
        path: 'base-means',
        realPath: '/transportation-means/base-means',
        name: 'baseMeans',
        meta: { title: '基础设施', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
        component: () =>
          import(/* webpackChunkName: 'baseMeans' */ '@/views/transportation-means/base-means')
      },
      // {
      //   path: 'parking-resources',
      //   realPath: '/transportation-means/parking-resources',
      //   name: 'parkingResources',
      //   meta: { title: '停车资源', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'parkingResources' */
      //       '@/views/transportation-means/parking-resources'
      //     )
      // },
      {
        path: 'facilities-maintain',
        realPath: '/transportation-means/facilities-maintain',
        name: 'facilitiesMaintain',
        meta: { title: '设施养护', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
        component: () =>
          import(
            /* webpackChunkName: 'facilitiesMaintain' */
            '@/views/transportation-means/facilities-maintain'
          )
      }
    ]
  },
  {
    path: '/spring-festival-travel',
    name: 'springFestivalTravel',
    meta: {
      title: '春运保障',
      disabled: false,
      keepAlive: true,
      isHot: true,
      dataInfo: '数值为演示数据'
    },
    component: () =>
      import(
        /* webpackChunkName: 'springSafetyMonitor' */
        '@/views/spring-festival-travel/safetyMonitor/index'
      ),
    children: [
      // {
      //   path: 'safetyMonitor',
      //   realPath: '/spring-festival-travel/safetyMonitor',
      //   name: 'springSafetyMonitor',
      //   meta: { title: '安全监测', disabled: false, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'springSafetyMonitor' */
      //       '@/views/spring-festival-travel/safetyMonitor/index'
      //     )
      // }
      // {
      //   path: 'vehicleManagement',
      //   realPath: '/spring-festival-travel/vehicleManagement',
      //   name: 'springVehicleManagement',
      //   meta: { title: '车辆管理', disabled: true, keepAlive: true, dataInfo: '数值为演示数据' },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'springVehicleManagement' */
      //       '@/views/spring-festival-travel/vehicleManagement/index'
      //     )
      // }
    ]
  },
  {
    path: '/noPermission',
    name: 'noPermission',
    component: () => import(/* webpackChunkName: 'no-permission' */ '@/views/no-permission/index')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/overview'
  }
]
const router = createRouter({
  history: createWebHashHistory(basePath),
  routes
})
export default router
