<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="年"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-wrapper">
      <div class="units">
        <div
          v-for="item in config"
          :key="item.unit"
          class="unit"
        >
          {{ item.unit }}
        </div>
      </div>
      <div class="content-wrapper">
        <div
          v-for="(year, i) in years"
          :key="year"
          class="bar-row"
        >
          <div class="bar-item alignright">
            <div class="bar-item-wrapper">
              <bar-item
                :direction="config[0].direction"
                :color="config[0].color"
                :width="getWidth(config[0].data[i], yslMax, yslMin)"
              />
            </div>
            <span class="count">{{ formatNumStr(config[0].data[i]) }}</span>
          </div>
          <div class="year">
            {{ year }}
          </div>
          <div class="bar-item">
            <div class="bar-item-wrapper">
              <bar-item
                :direction="config[1].direction"
                :color="config[1].color"
                :width="getWidth(config[1].data[i], zzlMax, zzlMin)"
              />
            </div>
            <span class="count">{{ formatNumStr(config[1].data[i]) }}</span>
          </div>
        </div>
      </div>
      <div class="units">
        <div
          v-for="item in config"
          :key="item.name"
          class="unit"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BarItem from '@/components/bar-3d-item'
  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  import { historicalFreightPassengerMetrics } from '@/api/modules/transportation/railroad.js'
  const formatNumStr = utils.formatNumStr

  const years = ref([])
  const date = ref('-')
  const config = reactive([
    {
      name: '发送量',
      code: 'tllkfsl',
      color: ['rgba(249, 233, 0, 0.900295)', 'rgba(249, 233, 0, 0.0001)'],
      direction: 'to left',
      unit: '单位：万吨',
      data: []
    },
    {
      name: '周转量',
      code: 'tllkzzl',
      color: ['rgba(84, 181, 255, 0.900295)', 'rgba(5, 133, 250, 0.0001)'],
      direction: 'to right',
      unit: '单位：亿吨公里',
      data: []
    }
  ])

  const yslMax = computed(() => Math.max(...config[0].data))
  const yslMin = computed(() => Math.min(...config[0].data))

  const zzlMax = computed(() => Math.max(...config[1].data))
  const zzlMin = computed(() => Math.min(...config[1].data))

  const min = 0

  const getWidth = (data, dataMax, dataMin) => {
    const newMin = Math.min(dataMin, dataMax * min)
    const dt = Math.max(data, newMin)
    const width = `${(min + (dt - newMin) / dataMax) * (1 - min) * 100}%`
    return width
  }

  const chartData = ref([])
  const getData = async () => {
    const res = await historicalFreightPassengerMetrics()
    chartData.value = res
    date.value = res[0]?.report_date
  }
  getData()

  watch(
    () => chartData.value,
    () => {
      config.forEach((item) => {
        item.data = []
      })
      const newData = chartData.value
      newData.sort((a, b) => parseInt(a.year) - parseInt(b.year))

      newData.forEach((item, i) => {
        const fd = config.find((obj) => item.category === obj.name)
        date.value = item?.report_date
        if (fd) {
          fd.data.push(item.total_sum)
        }
      })
      const list = [...new Set(newData.map((item) => item.year))]
      years.value = list.slice(list.length - 5)
      config.forEach((item) => {
        item.data = item.data.slice(list.length - 5)
      })
    },
    {
      immediate: true,
      deep: true
    }
  )
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 0.24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2rem;
    .more {
      width: 0.16rem;
      height: 0.16rem;
      font-size: 0.16rem;
      cursor: pointer;
    }

    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: 0.16rem;
      font-weight: @regular;
      letter-spacing: 0;

      > div {
        margin-left: 0.04rem;
      }
    }
  }

  .chart-wrapper {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    min-height: 0;

    .content-wrapper {
      flex: 1;
      min-height: 0;
    }

    .units {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-bottom: 0.2rem;

      &:last-of-type {
        margin-bottom: 0;
      }

      .unit {
        flex: 0 0 calc(50% - 0.36rem);
        color: #fff;
        font-family: 'PingFang SC';
        font-size: 0.16rem;
        font-weight: 400;
        line-height: 0.22rem;
        &:first-of-type {
          margin-right: 0.72rem;
          text-align: right;
        }
      }
    }

    .bar-row {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: 0.2rem;
    }

    .year {
      flex: 0 0 0.72rem;
      color: #fff;
      font-family: 'PingFang SC';
      font-size: 0.16rem;
      font-weight: 400;
      text-align: center;
      white-space: nowrap;
    }

    .bar-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      flex: 0 0 calc(50% - 0.36rem);

      .count {
        flex: 0 0 0.6rem;
        color: #fff;
        font-family: DINCondensed-Bold;
        font-size: 0.16rem;
        font-weight: 700;
        line-height: 0.16rem;
        text-align: right;
        white-space: nowrap;
      }

      .bar-item-wrapper {
        flex: 1;
        min-width: 0;
      }

      &.alignright {
        flex-direction: row-reverse;
        .count {
          text-align: left;
        }
        .bar-item-wrapper {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
