<template>
  <div class="spring-wrapper">
    <div class="left-wrapper">
      <base-panel title="全市旅客发送量/到达量">
        <passenger-card
          :data="cardData"
          :is-spring="isSpring"
        />
      </base-panel>
      <base-panel title="全市历年每日旅客发送量/到达量趋势变化">
        <passenger-trend
          :is-spring="isSpring"
        />
      </base-panel>
    </div>
    <div class="center-wrapper">
      <map-view
        :is-spring="isSpring"
      />
      <base-panel title="主要枢纽站综合指标概览">
        <sites-overview
          :is-spring="isSpring"
          :data="zysnzzhzbglData"
        />
      </base-panel>
    </div>
    <div class="right-wrapper">
      <base-panel title="旅客发送量/到达量">
        <passenger-count
          :is-spring="isSpring"
          :data="cycxqkData"
        />
      </base-panel>
      <base-panel title="旅客发送量/到达量趋势变化">
        <passenger-count-change
          :is-spring="isSpring"
        />
      </base-panel>
    </div>
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        春运监测平台
      </div>
    </div>
  </div>
</template>

<script setup>
  import BasePanel from '@/components/base-panel'
  import MapView from './components/map.vue'
  import PassengerCard from './components/passenger-card.vue'
  import PassengerTrend from './components/passenger-trend.vue'
  import PassengerCount from './components/passenger-count.vue'
  import PassengerCountChange from './components/passenger-count-change.vue'
  import sitesOverview from './components/sites-overview.vue'
  import { cycxqk, fcyqjcycxqk, zysnzzhzbgl, cycxqkMaxYear } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import { nextTick, onMounted } from '@vue/runtime-core'
  import moment from 'moment'
  import { useStore } from 'vuex'
  import lunar from '@/utils/lunar.js'
  const store = useStore()
  const FULL_FORMAT = 'YYYY-MM-DD hh:mm:ss'
  const testDate = sessionStorage.getItem('spring-date')
  const defaultYear = moment().format('YYYY-MM-DD')
  const date = moment((testDate || defaultYear) + ' 23:59:59', FULL_FORMAT)
  const index = computed(() => store.getters.index)
  const storDate = computed(() => store.getters.date)

  const maxYear = ref('')

  const getLastSpringEndDate = () => {
    const date = testDate ? moment(testDate) : moment().endOf('year')
    const y = date.format('YYYY')
    const m = date.format('M')
    const d = date.format('D')
    const arr = lunar.toLunar(y, m, d)
    const ny = Number(arr[0])
    const glEnd = moment(`${lunar.toSolar(ny, lunar.leapMonth(ny), 25).join('-')} 00:00:01`, FULL_FORMAT)

      return glEnd
  }

  const getIsSpring = () => {
    const y = date.format('YYYY')
    const m = date.format('M')
    const d = date.format('D')
    // 0:年 1:月 2:日 3: 天干地支年 4:生肖年 5:月份 6:日 7:闰几月
    // [2023, 4, 20, '癸卯', '兔', '三月', '二十', 2]
    const arr = lunar.toLunar(y, m, d)
    const ny = Number(arr[0])
    const nm = !arr[7] || arr[1] < arr[7] ? arr[1] : arr[1] - 1
    const nd = arr[2]
    const lunarDate = `${ny}-${nm}-${nd}`
    const lunarMoment = moment(`${lunarDate} 23:59:59`, FULL_FORMAT)
    const end = lunarMoment.isBefore(moment(`${ny}-1-25 23:59:59`, FULL_FORMAT))
      ? moment(`${ny}-1-25 23:59:59`, FULL_FORMAT)
      : moment(`${ny + 1}-1-25 23:59:59`, FULL_FORMAT)// '正月25'
    let start = '' // '腊月16'
    let glStart = ''
    if (lunarMoment.isBefore(moment(`${ny}-1-25`, 'YYYY-MM-DD'))) {
      start = moment(`${ny - 1}-12-16 00:00:01`, FULL_FORMAT)
      glStart = moment(`${lunar.toSolar(ny - 1, lunar.leapMonth(ny - 1) ? 13 : 12, 16).join('-')} 00:00:01`, FULL_FORMAT)
    } else {
      start = moment(`${ny}-12-16 00:00:01`, FULL_FORMAT)
      glStart = moment(`${lunar.toSolar(ny, lunar.leapMonth(ny) ? 13 : 12, 16).join('-')} 00:00:01`, FULL_FORMAT)
    }
    const glEnd = getLastSpringEndDate()
    store.dispatch('setDate', {
      index: Math.ceil(Math.max(date.diff(glStart, 'days', true), 0)),
      nlDate: lunarDate,
      date: date.format('YYYY-MM-DD'),
      glEnd: glEnd.format('YYYY-MM-DD')
    })
    return lunarMoment.isBetween(start, end)
  }
  const isSpring = ref(false)

  nextTick(() => {
    isSpring.value = getIsSpring()
    console.log(isSpring, '00000000000000000')
    getLastSpringEndDate()
  })

  const getMaxYear = async () => {
    const res = await cycxqkMaxYear()
    maxYear.value = res && res[0] && res[0].max_year
  }

  // 春运出行情况
  const cycxqkData = ref([])
  const getCycxqk = () => {
    const year = !isSpring.value ? moment(storDate.value, 'YYYY-MM-DD').format('YYYY') : maxYear.value;
    (isSpring.value ? cycxqk : fcyqjcycxqk)({
      year: year,
      lastYear: `${year - 1}`,
      lastLastYear: `${year - 2}`,
      day: index.value
    }).then(res => {
      cycxqkData.value = res || []
    })
  }

  // 口岸机场车站港口坐标
  const zysnzzhzbglData = ref([])
  const getzysnzzhzbgl = (p) => {
    zysnzzhzbgl(p).then(res => {
      zysnzzhzbglData.value = res || []
    })
  }
  const cardData = computed(() => {
    return { cycxqkData: cycxqkData.value[0] || {} }
  })

  watch(() => [index.value, storDate.value], () => {
    nextTick(() => {
      getzysnzzhzbgl({ year: moment(storDate.value, 'YYYY-MM-DD').format('YYYY'), day: index.value })
    })
  }, {
    deep: true,
    immediate: true
  })

  watch(() => [isSpring.value, index.value, storDate.value], async () => {
    await getMaxYear()
    nextTick(getCycxqk)
  }, {
    immediate: true
  })

  onMounted(() => {
  })
</script>

<style lang="less" scoped>
.spring-wrapper {
  display: grid;
  width: 100%;
  height: 100%;
  min-height: 0;

  column-gap: .24rem;
  grid-template-columns: 4.4rem 1fr 4.4rem;

   > div {
    min-width: 0;
    min-height: 0;
  }

  .left-wrapper {
    display: grid;

    grid-template-rows: 3.63rem 1fr;
    row-gap: .24rem;

     > div {
      min-width: 0;
      min-height: 0;
    }
  }

  .center-wrapper {
    display: grid;

    grid-template-rows: 1fr 3.26rem;
    row-gap: .24rem;

     > div {
      min-width: 0;
      min-height: 0;
    }
  }

  .right-wrapper {
    display: grid;

    grid-template-rows: 3.63rem 1fr;
    row-gap: .24rem;

     > div {
      min-width: 0;
      min-height: 0;
    }
  }
  .data-from {
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.6rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 .6rem;
     > div {
      color: #54b5ff;
      font-family: "PingFang SC";
      font-size: .14rem;
      font-weight: 400;
      line-height: .2rem;
      text-transform: uppercase;
    }
  }
}
</style>
