<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="年"
          :show-drop="false"
          :drop-info="date"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>

    <div class="select-wrapper">
      <div class="radio-wrapper">
        <RadioGroup
          v-model:value="selectRadio"
          :color-full="false"
          :radio-list="radioList"
          @change="changeType"
        />
      </div>
      <!-- <div
        v-show="unitInfo.showTotal"
        class="total-mile"
      >
        {{ unitInfo.totalName }}
        <span>{{ formatNumStr(unitInfo.data) || '-' }}{{ unitInfo.totalUnit }}</span>
      </div> -->
    </div>
    <div class="chart-wrapper">
      <div class="unit">
        单位：{{ unitInfo.unit }}
      </div>
      <base-echart :option="option" />
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import BaseEchart from '@/components/base-echarts'
  import RadioGroup from '@/components/radio-list'

  import { useStore } from 'vuex'
  import utils from '@/hooks/utils'
  import moment from 'moment'

  import {
    regionalInfrastructureDistribution
    // dataStatistics
  } from '@/api/modules/transportation-means'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  const dataList = ref()
  const props = defineProps({
    // data: {
    //   type: Array,
    //   default: () => []
    // },
    // ljData: {
    //   type: Array,
    //   default: () => []
    // }
  })
  const date = computed(() =>
    dataList.value && dataList.value[0]?.ywsj
      ? dataList.value && dataList.value[0].ywsj
      : '-'
  )
  const radioList = [
    {
      name: '道路',
      value: 'dllc',
      typeCode: 0,
      unit: '公里',
      showTotal: false
    },
    {
      name: '桥梁',
      value: 'qls',
      typeCode: 1,
      unit: '座',
      totalName: '总长度',
      showTotal: true,
      totalUnit: '公里',
      totalCode: '桥梁'
    },
    {
      name: '隧道',
      value: 'sds',
      typeCode: 2,
      unit: '米',
      totalName: '总长度',
      showTotal: true,
      totalUnit: '公里',
      totalCode: '隧道'
    },
    {
      name: '边坡挡墙',
      value: 'bpdqs',
      typeCode: 3,
      unit: '座',
      showTotal: false
    }
    // {
    //   name: '政府公交场站',
    //   value: 'zfcqgjczs',
    //   typeCode: 4,
    //   unit: '个',
    //   totalName: '占地面积',
    //   showTotal: true,
    //   totalUnit: '万平方米',
    //   totalCode: '公交场站'
    // }
  ]

  const selectRadio = ref(radioList[0].value)
  const unitInfo = ref(radioList[0])

  const changeType = (item) => {
    // const fd = props.ljData.find((obj) => obj.fl === item.totalCode)
    unitInfo.value = { ...item }
  }

  const areaList = [
    '福田区',
    '罗湖区',
    '盐田区',
    '南山区',
    '宝安区',
    '龙岗区',
    '龙华区',
    '坪山区',
    '光明区',
    '大鹏区',
    '深汕合作区'
  ]

  const data = computed(() => {
    const isLong = selectRadio.value === 'dllc'
    return areaList.map((item) => {
      const fd = dataList.value?.find((obj) => obj.region === item)
      return fd ? (fd.total / (isLong ? 1000 : 1)).toFixed(isLong ? 2 : 0) : null
    })
  })

  const option = computed(() => {
    const fontSize = store.getters.rootFontSize
    const colorArr = ['rgba(84, 181, 255, 0.2)', 'rgba(84, 181, 255, 0.4)', 'rgba(84, 181, 255, 0.9)']
    const triangle = ['#54B5FF', 'rgba(84, 181, 255, 0.5)']
    const color = {
      type: 'linear',
      x: 0,
      x2: 0,
      y: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: colorArr[0]
        },
        {
          offset: 0.1,
          color: colorArr[0]
        },
        // {
        //   offset: 0.5,
        //   color: colorArr[0]
        // },
        {
          offset: 0.5,
          color: colorArr[1]
        },
        {
          offset: 1,
          color: colorArr[2]
        }
      ]
    }
    const barWidth = 0.22 * fontSize
    return {
      tooltip: {
        show: true,
        backgroundColor: 'transparent',
        padding: 0,
        borderWidth: 0,
        trigger: 'axis',
        formatter (param) {
          const p = Array.isArray(param) ? param[0] : param
          return `
          <div class="tool-tip">
            <div class="dot left-top"></div>
            <div class="dot right-top"></div>
            <div class="dot left-bottom"></div>
            <div class="dot right-bottom"></div>
            <span class="tip-title">${p?.name || ''}：</span>
            <span class="tip-data">${formatNumStr(p?.value || 0)}${unitInfo.value.unit}</span>  
          </div>
        `
        }
      },
      grid: {
        top: 0.4 * fontSize,
        left: 0.3 * fontSize,
        right: 0.2 * fontSize,
        bottom: 0,
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
          interval: 0
        },
        data: areaList
      },
      yAxis: {
        type: 'value',
        // nameTextStyle: {
        //   color: '#fff',
        //   fontSize: 0.16 * fontSize,
        //   padding: [0.02 * fontSize, 4, 0.02 * fontSize, 0.26 * fontSize]
        // },
        // name: `单位：${unitInfo.value.unit}`,
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
      series: [
        {
          z: 1,
          name: 'body',
          type: 'bar',
          barWidth: barWidth,
          barGap: '-100%',
          data: data.value,
          itemStyle: {
            color: color
          }
        },
        {
          z: 1,
          name: 'line',
          type: 'bar',
          barWidth: barWidth,
          barGap: '-100%',
          data: data.value,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              x2: 1,
              y: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(84, 181, 255, 0)'
                },
                {
                  offset: 0.45,
                  color: 'rgba(84, 181, 255, 0)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(84, 181, 255, 1)'
                },
                {
                  offset: 0.55,
                  color: 'rgba(84, 181, 255, 0)'
                },
                {
                  offset: 1,
                  color: 'rgba(84, 181, 255, 0)'
                }
              ]
            }
          }
        },
        {
          z: 2,
          name: 'end',
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: data.value.map((item, i) => {
            return {
              value: item,
              name: areaList[i],
              itemStyle: Number(item)
                ? {
                  borderWidth: 2,
                  color: colorArr[colorArr.length - 1]
                }
                : {
                  color: 'transparent'
                },
              symbol: Number(item) ? 'diamond' : 'none'
            }
          }),
          symbolOffset: [0, '-50%'],
          symbolSize: [barWidth, 0.08 * fontSize],
          tooltip: {
            show: false
          }
        },
        {
          z: 3,
          name: 'start',
          type: 'pictorialBar',
          symbolPosition: 'start',
          data: data.value.map((item, i) => {
            return {
              value: 0,
              name: areaList[i],
              itemStyle: Number(item)
                ? {
                  borderWidth: 2,
                  color: triangle[0]
                }
                : {
                  color: 'transparent'
                },
              symbol: Number(item) ? 'diamond' : 'none'
            }
          }),
          symbolOffset: [0, '65%'],
          symbolSize: [barWidth, 0.08 * fontSize],
          tooltip: {
            show: false
          }
        }
      ]
    }
  })

  const getData = async (type) => {
    const res = await regionalInfrastructureDistribution(type)
    dataList.value = Array.isArray(res) ? res : []
  }

  // const getSideData = async (type) => {
  //   const res = await dataStatistics(type)
  //   console.log(res)
  // }

  watch(
    () => selectRadio.value,
    () => {
      const type = radioList?.find((item) => item.value === selectRadio.value)?.typeCode
      getData(type)
      // getSideData(type)
    },
    {
      immediate: true
    }
  )
</script>

<style lang="less" scoped>
.wrapper {
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

  .select-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .radio-wrapper {
      height: .3rem;
    }

    .total-mile {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: .3rem;
      padding: 0 .16rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      white-space: nowrap;
      background: rgba(55, 97, 232, .12);
      box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px rgba(#294cb3, .79);
      border: 1.4px solid rgba(0, 133, 255, .78);
      border-radius: .74rem;

      span {
        margin-left: .08rem;
        color: #00fff9;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        white-space: nowrap;
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
      left: 0;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-style: normal;
      font-weight: 400;
      line-height: .22rem;
    }
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
  }
}
</style>
