/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-09 15:27:58
 * @LastEditTime: 2023-01-03 15:00:44
 * @FilePath: \traffic-web\src\views\road\config.js
 * @Description: FilePath
 */

export const status = [
  {
    name: '畅通',
    class: 'goodTraffic',
    color: '#1ec817',
    bgColor: '#1ec817',
    opacity: 0.6,
    barColor: ['rgba(30, 200, 23, 0.900295)', 'rgba(30, 200, 23, 0)']
  },
  {
    name: '基本畅通',
    class: 'normalTraffic',
    color: '#00ff92',
    bgColor: '#00ff92',
    opacity: 0.6,
    barColor: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0)']
  },
  {
    name: '缓行',
    class: 'slowTraffic',
    color: '#f9e900',
    bgColor: '#f9e900',
    opacity: 0.6,
    barColor: ['rgba(249, 233, 0, 0.900295)', 'rgba(249, 233, 0, 0)']
  },
  {
    name: '较拥堵',
    class: 'littleBusyTraffic',
    color: '#ffb713',
    bgColor: '#ffb713',
    opacity: 0.6,
    barColor: ['rgba(252, 145, 0, 0.900295)', 'rgba(252, 145, 0, 0)']
  },
  {
    name: '拥堵',
    class: 'busyTraffic',
    color: '#FF1717',
    bgColor: '#FF4D21',
    opacity: 0.6,
    barColor: ['rgba(255, 77, 33, 0.900295)', 'rgba(255, 77, 33, 0)']
  }
]
