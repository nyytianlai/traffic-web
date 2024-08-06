<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-15 16:25:03
 * @LastEditTime: 2023-01-03 11:53:35
 * @FilePath: \traffic-web\src\views\transportation-means\base-means\components\base-means.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="月"
          :show-drop="true"
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
    <div class="content-wrapper">
      <div
        v-for="item in config"
        :key="item.name"
        class="card-wrapper"
      >
        <base-card :config="item" />
      </div>
      <div class="last-card">
        <div
          v-for="item in lastConfig"
          :key="item.name"
          class="left"
        >
          <div class="left-top">
            <div class="left-icon">
              <img :src="item.icon">
            </div>
            <div class="right-info">
              <div class="title">
                {{ item.name }}
              </div>
              <div class="data">
                <div class="num">
                  {{ formatNumStr(item.value) }}
                </div>
                <div class="unit">
                  {{ item.unit }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="bottom-info">
            同比去年 {{ formatNumStr(item.compareValue) }}%
            <svg-icon
              v-if="
                Number(formatNumStr(item.compareValue)) &&
                  !Number.isNaN(Number(formatNumStr(item.compareValue)))
              "
              :icon-class="Number(formatNumStr(item.compareValue)) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem"
            />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import daolu from '@/assets/images/daolu.png'
  import qiaoliang from '@/assets/images/qiaoliang.png'
  import suidao from '@/assets/images/suidao.png'
  import bianpo from '@/assets/images/bianpo.png'
  import zfcq from '@/assets/images/zfcq.png'
  import BaseCard from './card.vue'
  import utils from '@/hooks/utils'
  import { staticsByType, basicData } from '@/api/modules/transportation-means'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })

  const date = ref('-')
  const config = reactive([
    {
      name: '道路',
      dataName: '道路',
      icon: daolu,
      unit: '公里',
      compareName: '道路总长度同比',
      code: 0,
      children: [
        {
          name: '快速路'
        },
        {
          name: '其他',
          dataName: '其他道路'
        },
        {
          name: '支路',
          dataName: '支路里程'
        },
        {
          name: '次干路',
          dataName: '次干路里程'
        },
        {
          name: '主干路',
          dataName: '主干路里程'
        },
        // {
        //   name: '次干道',
        //   dataName: '次干道里程'
        // },
        {
          name: '街坊路',
          dataName: '街坊路里程'
        }
      // {
      //   name: '次干路/街坊路',
      //   dataName: '次干路/街坊路里程'
      // }
      ]
    },
    {
      name: '桥梁',
      icon: qiaoliang,
      dataName: '桥梁',
      unit: '座',
      compareName: '桥梁座数同比',
      code: 1,
      children: [
        {
          name: '特大桥'
        },
        {
          name: '大桥'
        },
        {
          name: '中桥'
        },
        {
          name: '小桥'
        },
        {
          name: '其他'
        }
      ]
    },
    {
      name: '隧道',
      icon: suidao,
      dataName: '隧道座数（按单洞计）',
      unit: '座',
      code: 2,
      compareName: '隧道座数同比',
      children: [
        {
          dataName: '短隧道数',
          name: '短隧道'
        },
        {
          dataName: '中隧道数',
          name: '中隧道'
        },
        {
          dataName: '长隧道数',
          name: '长隧道'
        },
        {
          dataName: '特长隧道数',
          name: '特长隧道'
        }
      ]
    }
  ])

  const lastConfig = reactive([
    {
      name: '边坡挡墙',
      dataName: '边坡',
      icon: bianpo,
      unit: '座',
      code: 3,
      compareName: '边坡挡墙数同比去年'
    },
    {
      name: '政府产权公交站',
      // dataName: '政府产权公交场站个数',
      icon: zfcq,
      unit: '个',
      dataName: '产站',
      code: 4,
      compareName: '政府产权公交场站个数同比'
    }
  ])

  const getData = async (type) => {
    const arr = []
    ;[...config, ...lastConfig].forEach((item) => {
      item.children?.length && arr.push(staticsByType(item.code))
    })
    const res = await Promise.allSettled([...arr, basicData()])
    const total = res[arr.length].value
    
    const list = total?.sort((a, b) => {
      return moment(b.report_date) - moment(a.report_date)
    })
    date.value = list[0].report_date
    ;[...config, ...lastConfig].forEach((item, i) => {
      const isGL = item.unit === '公里'
      const fd = total?.find((obj) => item.name === obj.type || item.dataName === obj.type)
      item.value = ((isGL ? fd?.total / 1000 : fd?.total) && (isGL ? fd?.total / 1000 : fd?.total).toFixed(isGL ? 1 : 0)) || '-'
      item.compareValue = fd?.comparePercent
      const data = res[i]?.value || []

      item.children &&
        item.children.forEach((child) => {
          const fdChild = data?.find(
            (obj) => child.name === obj.type || child.dataName === obj.type
          )
          child.value = i ? fdChild?.total : fdChild?.total && (fdChild?.total / 1000).toFixed(1)
        })
    })
  }
  getData()
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
    margin-bottom: .16rem;
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

  .content-wrapper {
    flex: 1;
    min-height: 0;

     > div {
      margin-bottom: .2rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    .last-card {
      display: flex;
      flex-flow: row nowrap;
      padding: .2rem .16rem;
      background: rgba(55, 97, 232, .12);
      box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
      border: 1.4px solid rgba(#0085ff, .2);

      .left {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        flex: 0 0 50%;

        .left-top {
          display: flex;
          flex-flow: row nowrap;

          .left-icon {
            flex: 0 0 .8rem;
            height: .8rem;
            margin-right: .08rem;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .right-info {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;

            .title {
              color: #fff;
              font-family: "PingFang SC";
              font-size: .2rem;
              font-weight: 500;
            }

            .data {
              display: flex;
              flex-flow: row nowrap;
              align-items: baseline;

              .num {
                margin-right: .08rem;
                color: #00fff9;
                font-family: DINCondensed-Bold;
                font-size: .3rem;
                font-weight: 700;
                line-height: .58rem;
                text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
              }

              .unit {
                color: #00fff9;
                font-family: "PingFang SC";
                font-size: .18rem;
                font-weight: 400;
              }
            }
          }
        }

        .bottom-info {
          display: flex;
          align-items: center;
          margin-top: .12rem;
          color: #fff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .22rem;

          svg {
            margin-left: .04rem;
          }
        }
      }
    }
  }
}
</style>
