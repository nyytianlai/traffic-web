<template>
  <div class="trend-wrapper">
    <div class="select-wrapper">
      <base-select
        v-model:value="selectArea"
        :list="CITY_LIST"
      />
    </div>
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="日"
          :date="date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="chart-wrapper">
      <div class="unit">
        单位：件
      </div>
      <base-echart :option="option" />
    </div>
  </div>
</template>

<script setup>
  import BaseEchart from '@/components/base-echarts'
  import DataTypeBtn from '@/components/data-type-btn'
  import BaseSelect from '@/components/base-select'
  import { useStore } from 'vuex'
  import { CITY_LIST } from '@/utils/constants'
  import { ajqs } from '@/api/modules/traffic-safety/safetyMonitoring'
  import { reactive } from '@vue/reactivity'
  import moment from 'moment'
  const store = useStore()
  const props = defineProps({
    iaActive: {
      type: Boolean,
      default: false
    },
    dataCode: {
      type: String,
      default: 'jtsg'
    }
  })
  const selectArea = ref(CITY_LIST[0].value)
  const date = computed(() => ajqsData.value[0]?.sbsj ?ajqsData.value[0]?.sbsj : '')
  const config = reactive([
    {
      name: '结案',
      type: 'bar',
      code: `${props.dataCode}jas`,
      unit: '件',
      lgColor: '#54B5FF',
      color: {
        type: 'linear',
        x: 0,
        x2: 0,
        y: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#54B5FF'
          },
          {
            offset: 1,
            color: 'rgba(84, 181, 255, 0.0001)'
          }
        ]
      }
    },
    {
      name: '立案',
      code: `${props.dataCode}las`,
      type: 'bar',
      unit: '件',
      lgColor: '#F9E900',
      color: {
        type: 'linear',
        x: 0,
        x2: 0,
        y: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#F9E900'
          },
          {
            offset: 1,
            color: 'rgba(249, 233, 0, 0.0001)'
          }
        ]
      }
    },
    {
      name: '结案率',
      code: `${props.dataCode}jal`,
      type: 'line',
      unit: '%',
      lgColor: '#F9E900',
      color: '#F9E900'
    }
  ])
  const option = computed(() => {
    const fontSize = store.getters.rootFontSize
    const series = []
    const legends = []
    const data2 = ajqsData.value.sort((a, b) => Number(a.sjwd) - Number(b.sjwd))
    config.forEach((item, i) => {
      const serie = {
        type: item.type,
        name: item.name,
        color: item.color,
        symbol: 'circle',
        itemStyle: {
          color: item.color
        },
        barWidth: 0.2 * fontSize,
        yAxisIndex: i > 1 ? 1 : 0,
        data: data2.map(dt => [dt.sjwd, dt[item.code], item.unit])
      }
      legends.push({
        name: item.name,
        icon: item.type === 'bar' ? 'rect' : '',
        itemStyle: {
          color: item.lgColor
        }
      })
      series.push(serie)
    })
    return {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        formatter (p) {
          const param = Array.isArray(p) ? p : [p]
          const title = p[0].axisValueLabel
          let str = ''
          param.forEach(item => {
            str += `
            <div class="tip-data">
              <span>${item.seriesName}</span>
              <span>：${item.value[1]}${item.value[2]}</span>
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
        top: 0.5 * fontSize,
        left: 0.3 * fontSize,
        right: 0.2 * fontSize,
        bottom: 0.1 * fontSize,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 0.16 * fontSize
        }
      },
      yAxis: [
        {
          type: 'value',
          // nameTextStyle: {
          //   color: '#fff',
          //   fontSize: 0.16 * fontSize,
          //   padding: [4, 4, 0.1 * fontSize, 0.26 * fontSize]
          // },
          // name: '单位：件',
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
            fontSize: 0.18 * fontSize
          },
          minInterval: 1,
          splitNumber: 6
        },
        {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: 0.18 * fontSize
          },
          minInterval: 1,
          splitNumber: 4
        }
      ],
      legend: {
        show: true,
        data: legends,
        right: 0,
        top: 0,
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
  const ajqsData = ref([])
  const getAjqs = () => {
    ajqs('ln').then(res => {
      ajqsData.value = res || []
    })
  }
  watch(() => props.iaActive, () => {
    if (props.iaActive) {
      getAjqs()
    }
  }, {
    immediate: true
  })
</script>

<style lang="less" scoped>
.trend-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .24rem;

  .select-wrapper {
    width: 1.44rem;
  }

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 .24rem;
    margin-top: .24rem;
    margin-bottom: .06rem;
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
    position: relative;
    flex: 1;
    min-height: 0;
    .unit {
      position: absolute;
      top: 0;
      left: .24rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-style: normal;
      font-weight: 400;
      line-height: .22rem;
    }
  }
}
</style>
<style lang="less">
.tool-tip {
  padding: 0.12rem;
  position: relative;
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
    font-family: 'PingFang SC';
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #54B5FF;
  }

  .tip-data {
    font-family: 'PingFang SC';
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #FFFFFF;
  }
}
</style>
