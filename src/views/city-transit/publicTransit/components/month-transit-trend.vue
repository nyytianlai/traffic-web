<template>
  <div class="content-wrapper">
    <stack-bar
      :config="config"
      :date="maxDate"
    />
  </div>
</template>

<script setup>
  import StackBar from '@/views/transportation-means/facilities-maintain/components/stack-bar.vue'
  import Api from '@/api/modules/city-transit/publicTransit.js'
  defineProps({
    maxDate: {
      type: String,
      default: ''
    }
  })
  const dataList = [
    {
      name: '地铁客流',
      colorArray: [
        'rgba(84, 181, 255, 0.2)',
        'rgba(84, 181, 255, 0.4)',
        'rgba(84, 181, 255, 0.9)',
        'rgba(84, 181, 255, 1)'
      ],
      unit: '万人次'
    },
    {
      name: '常规公交客流',
      colorArray: [
        'rgba(0, 255, 249, 0.2)',
        'rgba(0, 255, 249, 0.4)',
        'rgba(0, 255, 249, 0.9)',
        'rgba(0, 255, 249, 1)'
      ],
      unit: '万人次'
    },
    {
      name: '巡游车客流',
      colorArray: [
        'rgba(249, 233, 0, 0.2)',
        'rgba(249, 233, 0, 0.4)',
        'rgba(249, 233, 0, 0.9)',
        'rgba(249, 233, 0, 1)'
      ],
      unit: '万人次'
    },
    {
      name: '网约车客流',
      colorArray: [
        'rgba(0, 255, 146, 0.2)',
        'rgba(0, 255, 146, 0.4)',
        'rgba(0, 255, 146, 0.9)',
        'rgba(0, 255, 146, 1)'
      ],
      unit: '万人次'
    }
  ]
  const data = ref([])
  const config = computed(() => {
    const series = []
    const dataMap = {}
    const yearList = [...new Set(data.value.map((item) => `${item.year}-${item.month}`))]
    data.value.forEach((item) => {
      dataMap[item.category] = dataMap[item.category] || []
      dataMap[item.category].push(item)
    })
    dataList.forEach((item) => {
      const dt = Object.keys(dataMap).find(
        (key) => item.name.includes(key)
      )
      if (dt) {
        series.push({
        ...item,
        data: new Array(yearList.length).fill(1).map((i, n) => {
          const fd = dataMap[dt]?.find((o) => `${o.year}-${o.month}` === yearList[n])
          return [yearList[n], fd?.sum]
        })
        })
      }
    })
    return series
  })
  const getData = async () => {
    const res = await Api.monthOfYearTrend()
    data.value = res || []
  }
  getData()
</script>

<style lang="less" scoped>
.content-wrapper {
  width: 100%;
  height: 100%;
}
</style>
