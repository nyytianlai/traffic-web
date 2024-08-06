<template>
  <div class="resource-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="年"
          :date="date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="unit">
      单位：辆
    </div>
    <div class="chart-container">
      <div
        v-for="item in data1"
        :key="item.name"
        class="bar-item"
      >
        <div class="name">
          {{ item.name }}
        </div>
        <bar-3d-item
          direction="to right"
          :color="item.color"
          :width="getWidth(item.count)"
        />
        <div class="data">
          {{ formatNumStr(item.count) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Bar3dItem from '@/components/bar-3d-item'

  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const data1 = computed(() => {
    const data = [
      {
        name: '深圳本地',
        dataName: '深圳市',
        count: '0',
        color: ['rgba(30, 200, 23, 0.900295)', 'rgba(30, 200, 23, 0.0001)']
      },
      {
        name: '广东省',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      },
      {
        name: '广西省',
        dataName: '广西壮族自治区',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      },
      {
        name: '湖北省',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      },
      {
        name: '江西省',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      },
      {
        name: '黑龙江省',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      },
      {
        name: '吉林省',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      },
      {
        name: '云南省',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      },
      {
        name: '湖南省',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      },
      {
        name: '四川省',
        count: '0',
        color: ['rgba(0, 255, 146, 0.900295)', 'rgba(0, 255, 146, 0.0001)']
      }
    ]
    data.forEach(item => {
      const fd = props.data.find(obj => (obj.kjwd === item.name || obj.kjwd === item.dataName))
      item.count = fd?.zbz || 0
    })
    return data
  })
  const date = computed(() => props.data[0]?.sbsj ? props.data[0].sbsj : '-')
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const dataMin = ref(Infinity)
  const dataMax = ref(0)

  watch(() => data1.value, () => {
    data1.value.forEach(item => {
      if (+item.count < +dataMin.value) {
        dataMin.value = item.count
      }

      if (+item.count > +dataMax.value) {
        dataMax.value = item.count
      }
    })
  }, {
    immediate: true,
    deep: true
  })

  const min = 0.2

  const getWidth = data => {
    const newMin = Math.min(dataMin.value, dataMax.value * min)
    const dt = Math.max(data, newMin)
    const width = `${(min + (dt - newMin) / dataMax.value) * (1 - min) * 100}%`
    return width
  }
</script>

<style lang="less" scoped>
.resource-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .12rem;
    .more {
      width: .16rem;
      height: .16rem;
      font-size: .16rem;
      cursor: pointer;
    }

    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: .16rem;
      font-weight: @regular;
      letter-spacing: 0;

       > div {
        margin-left: .04rem;
      }
    }
  }

  .unit {
    margin-bottom: .12rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }

  .chart-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1;
    min-width: 0;

    .bar-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: .16rem;

      .name {
        flex: 0 0 .72rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }

      .data {
        margin-left: .1rem;
        color: #fff;
        font-family: DINCondensed-Bold;
        font-size: .14rem;
        font-weight: 700;
      }
    }
  }
}
</style>
