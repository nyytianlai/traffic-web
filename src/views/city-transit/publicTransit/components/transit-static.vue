<template>
  <div class="content-wrapper">
    <div class="sub-info">
      {{ maxDate || '-' }}
      <DataTypeBtn
        :show-drop="false"
        type="日"
        :date="maxDate"
        style="margin-left: 0.04rem;"
      />
    </div>
    <div class="card-list">
      <div class="top-card">
        <CardItem
          :data="topCard"
        />
      </div>
      <div
        v-for="item in config"
        :key="item.name"
        class="item-wrapper"
      >
        <CardItem
          :data="item"
          @show-detail="handleDetail"
        />
      </div>
    </div>
    <pop-ups
      v-model:value="visible"
      :title="popupInfo.title"
      height="5.4rem"
    >
      <SubwayLine
        v-if="popupInfo.isSubway"
        :max-date="maxDate"
      />
      <TaxiOperate
        v-else
        :max-date="maxDate"
      />
    </pop-ups>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import CardItem from './card-item.vue'
  import PopUps from '@/components/popUps'
  import SubwayLine from './subway-line.vue'
  import TaxiOperate from './taxi-operate.vue'
  import Api from '@/api/modules/city-transit/publicTransit.js'
  const props = defineProps({
    maxDate: {
      type: String,
      default: ''
    },
    lastDate: {
      type: String,
      default: ''
    }
  })
  const popupInfo = {
    title: '',
    data: null,
    isSubway: false
  }
  const visible = ref(false)

  const topCard = reactive({
    name: '当日累计总客流',
    icon: require('@/assets/images/lvke.png'),
    showDetail: false,
    unit: '万人次',
    compareName: '较上周同期',
    value: '-',
    compareValue: '-'
  })

  const config = reactive([
    {
      name: '地铁客流',
      icon: require('@/assets/images/railway-icon.png'),
      showDetail: true,
      unit: '万人次',
      compareName: '较上周同期',
      value: '-',
      compareValue: '-'
    },
    {
      name: '常规公交客流',
      icon: require('@/assets/images/gongjiaocheliang.png'),
      showDetail: false,
      unit: '万人次',
      compareName: '较上周同期',
      value: '-',
      compareValue: '-'
    },
    {
      name: '巡游车客流',
      icon: require('@/assets/images/zaixiancheliang.png'),
      showDetail: true,
      unit: '万人次',
      compareName: '较上周同期',
      value: '-',
      compareValue: '-'
    },
    {
      name: '网约车客流',
      icon: require('@/assets/images/wangyueche2.png'),
      showDetail: '',
      unit: '万人次',
      compareName: '较上周同期',
      value: '-',
      compareValue: '-'
    }
  ])

  const handleDetail = data => {
    popupInfo.title = data.name.includes('地铁') ? '地铁客运情况' : '巡游出租车运行情况'
    popupInfo.data = data
    visible.value = true
    popupInfo.isSubway = data.name.includes('地铁')
  }

  const getData = async () => {
    const res = await Api.monthIncrease()

    topCard.value = res[0]?.sum_numerical
    topCard.compareValue = res[0]?.increase_percentage?.toFixed(2)
  }

  const getConfigData = async () => {
    const res = await Promise.allSettled([
      Api.flowPercentage({
        report_date: props.maxDate
      }),
      Api.flowPercentage({
        report_date: props.lastDate
      })
    ])
    const todayData = res[0]?.value
    const lastData = res[1]?.value

    config.forEach(item => {
      const fd = todayData?.find(obj => item.name.includes(obj.category))
      const fd2 = lastData?.find(obj => item.name.includes(obj.category))
      item.value = fd?.sum_numerical || fd?.sum_numerical === 0 ? fd?.sum_numerical.toFixed(2) : null
      // item.percent =
      //   fd?.percentage || fd?.percentage === 0 ? fd?.percentage.toFixed(2) + '%' : fd?.percentage
      if (fd?.sum_numerical && fd2?.sum_numerical) {
        item.compareValue = (
          ((fd?.sum_numerical - fd2?.sum_numerical) * 100) /
          fd2?.sum_numerical
        )?.toFixed(2)
      }
    })
  }
  getData()

  watch(() => [props.maxDate, props.lastDate], () => {
    if (props.maxDate && props.lastDate) {
      getConfigData()
    }
  }, {
    immediate: true
  })

</script>

<style lang="less" scoped>
.content-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .2rem;
  .sub-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .12rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }
  .card-list {
    display: grid;
    flex: 1;
    min-height: 0;

    gap: .12rem;
    grid-template-areas: "a a"
    "b c"
    "d e";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .top-card {
    grid-area: a;
    :deep(.card-item-wrapper) {
      .card-content-wrapper {
        position: relative;
        left: 1.77rem;
        flex: 0 0 auto;
      }
    }
  }
}
</style>
