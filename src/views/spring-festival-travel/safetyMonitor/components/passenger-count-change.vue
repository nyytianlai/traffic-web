<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-16 11:26:09
 * @LastEditTime: 2022-11-30 15:12:15
 * @FilePath: \traffic-web\src\views\spring-festival-travel\safetyMonitor\components\busy-road-warning.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          :type="isSpring ? '实时' : '年度'"
          :show-drop="false"
          :date="date"
          :drop-info="date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-wrapper">
      <tabCard
        :tab-list="tabList"
        width="100%"
        height="calc(100% - 0.36rem)"
        no-padding
        class="tab-card"
        font-size="0.2rem"
        @select-tab="selectTab"
      >
        <tabPanel
          :tab-key="activeTab"
          style="height: 100%;"
        >
          <div class="content-wrapper">
            <base-echart :option="option" />
            <div class="unit">
              单位：万人次
            </div>
          </div>
        </tabPanel>
      </tabCard>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import tabCard from '@/components/tabCard/tabCard.vue'
  import tabPanel from '@/components/tabCard/tabCardPlanelVue3.vue'
  import BaseEchart from '@/components/base-echarts'
  import { useStore } from 'vuex'
  import moment from 'moment'
  import lunar from '@/utils/lunar.js'
  import { ffsdrlkfslddlqsbh } from '@/api/modules/spring-festival-travel/safetyMonitor'
  import { nextTick, watch } from 'vue'
  const store = useStore()
  const colorList = ['#F9E900', '#54B5FF', '#6362FF', '#00FFF9']
  defineProps({
    isSpring: {
      type: Boolean,
      default: false
    }
  })

  // const storDate = computed(() => store.getters.date)
  const date = computed(() => !store.isSpring ? store.getters.glEnd : store.getters.date)
  const tabList = [
    {
      key: 'fsl',
      name: '发送量'
    },
    {
      key: 'ddl',
      name: '到达量'
    }
  ]
  const activeTab = ref(tabList[0].key)
  const selectTab = tab => {
    activeTab.value = tab.key
  }

  // 分方式当日旅客发送量到达量趋势变化图
  const ffsdrlkfslddlqsbhData = ref([])
  const getffsdrlkfslddlqsbh = () => {
    ffsdrlkfslddlqsbh({ year: moment(date.value).format('YYYY'), type: activeTab.value }).then(res => {
      ffsdrlkfslddlqsbhData.value = res || []
    })
  }

  const option = computed(() => {
    const config = [
      { name: '铁路', code: 'tl' },
      { name: '公路', code: 'gl' },
      { name: '航空', code: 'hk' },
      { name: '水路', code: 'sl' }
    ]
    config.forEach(item => {
      const fd = ffsdrlkfslddlqsbhData.value.find(arr => arr.some(obj => obj.lx === item.code))
      item.data = (fd || []).map(obj => {
        const rq = obj.rq
        const p = rq.replaceAll(/(年|月)/g, '-').replaceAll(/日/g, '')
        const arr = p.split('-')
        const nlArr = lunar.toLunar(Number(arr[0]), Number(arr[1]), Number(arr[2]))
        return [rq, obj.zbz ? Number(obj.zbz).toFixed(2) : obj.zbz, nlArr]
      })
    })
    const series = []
    const fontSize = store.getters.rootFontSize
    config.forEach((item, i) => {
      series.push({
      ...item,
      color: colorList[i],
      type: 'line',
      smooth: false,
      symbol: 'none',
      lineStyle: {
        color: colorList[i]
      }
      })
    })
    return {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        trigger: 'axis',
        formatter (p) {
          const param = Array.isArray(p) ? p : [p]
          const arr = param[0].data[2]
          const title = `${param[0].data[0]}（${arr[5]}${arr[6]}）`
          let str = ''
          param.forEach(item => {
            str += `
            <div class="tip-data">
              <span>${item.seriesName}：</span>
              <span>${item.value[1]}万人次</span>
            </div>
          `
          })
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <div class="tip-title">${title || ''}</div>
            ${str}
          </div>
        `
        }
      },
      grid: {
        top: 0.8 * fontSize,
        left: 0.1 * fontSize,
        right: 0.1 * fontSize,
        bottom: 0.1 * fontSize,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#283946'
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 0.16 * fontSize,
          interval: 5,
          formatter: (vl, i) => {
            const p = vl.replaceAll(/(年|月)/g, '-').replaceAll(/日/g, '')
            const arr = p.split('-')
            const nlArr = lunar.toLunar(Number(arr[0]), Number(arr[1]), Number(arr[2]))
            return `${nlArr[5]}
${nlArr[6]}`
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#283946',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 0.16 * fontSize
        },
        minInterval: 1,
        splitNumber: 4
      },
      legend: {
        show: true,
        right: 0.1 * fontSize,
        top: 0.05 * fontSize,
        itemGap: 0.12 * fontSize,
        textStyle: {
          color: '#fff',
          fontSize: 0.16 * fontSize
        },
        borderRadius: 0,
        align: 'left'
      },
      series
    }
  })

  watch(() => [activeTab.value, date.value], () => {
    nextTick(getffsdrlkfslddlqsbh)
  }, {
    immediate: true
  })
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .16rem .24rem;

  :deep(.tab-content) {
    background-image: none;
  }

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

  .chart-wrapper {
    flex: 1;
    min-height: 0;

     > div {
      width: 100%;
      height: 100%;
    }
    .content-wrapper {
      position: relative;
      width: 100%;
      height: 100%;

      .unit {
        position: absolute;
        top: .35rem;
        left: 0;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }
    }
  }
}
</style>
<style lang="less" scoped>
:deep(.tool-tip) {
  position: relative;
  padding: .12rem;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .5);

  .dot {
    position: absolute;
    width: .06rem;
    height: .06rem;
    background: rgba(84, 181, 255, .5);

    &.left-top {
      top: 0;
      left: 0;
    }

    &.right-top {
      top: 0;
      right: 0;
    }

    &.left-bottom {
      bottom: 0;
      left: 0;
    }

    &.right-bottom {
      right: 0;
      bottom: 0;
    }
  }

  .tip-title {
    color: #54b5ff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }

  .tip-data {
    color: #fff;
    font-family: "PingFang SC";
    font-size: .16rem;
    font-weight: 400;
    line-height: .22rem;
  }
}
</style>
