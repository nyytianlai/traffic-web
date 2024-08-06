<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-02 09:25:14
 * @LastEditTime: 2022-12-19 10:08:09
 * @FilePath: \traffic-web\src\views\city-transit\regularTransit\components\base-resource.vue
 * @Description: FilePath
-->
<template>
  <div class="base-resource-wrapper">
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
    <div class="base-content">
      <div
        class="card card1"
        :class="{selected: selectCard === 'pop-area-sites'}"
        @click="showPopup('区域站点统计', 'pop-area-sites')"
      >
        <div class="count-info">
          <div class="img-wrappper">
            <img :src="require('@/assets/images/daolu.png')">
          </div>
          <div class="name-info">
            <div class="name">
              站点统计
            </div>
            <div class="num">
              {{ formatData('站点统计') }}
              <div class="unit">
                个
              </div>
            </div>
          </div>
        </div>
        <div class="sub-info">
          <div class="sub-name">
            500米覆盖率
          </div>
          <div class="circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="0.16rem"
              width="0.16rem"
            >
              <circle
                :r="0.06*rootFontSize"
                :cx="0.08*rootFontSize"
                :cy="0.08*rootFontSize"
                :stroke-width="0.12*rootFontSize"
                fill="transparent"
                stroke="#00FF92"
                :stroke-dasharray="(0.12*rootFontSize * Math.PI)"
                :stroke-dashoffset="(0.12 * rootFontSize * Math.PI * (1 - formatData('500米站点覆盖率') / 100))"
              />
            </svg>
          </div>
          <div class="sub-data">
            {{ formatData('500米站点覆盖率') }}%
          </div>
        </div>
      </div>
      <div class="card card2">
        <div class="card-left">
          <div class="count-info">
            <div class="img-wrappper">
              <img :src="require('@/assets/images/xianlutongji.png')">
            </div>
            <div class="name-info">
              <div class="name">
                线路统计
              </div>
              <div class="num">
                {{ formatData('线路统计') }}
                <div class="unit">
                  个
                </div>
              </div>
            </div>
          </div>
          <div class="sub-info">
            <div class="sub-name">
              重复系数
            </div>
            <div class="sub-data">
              {{ formatData('重复系数') }}
            </div>
          </div>
        </div>
        <div class="card-right">
          <div
            v-for="item in card2"
            :key="item.name"
            class="right-info"
          >
            <div class="right-name">
              {{ item.name }}
            </div>
            <div class="right-count">
              {{ formatData(item.name) }}
            </div>
            <div
              v-if="item.unit"
              class="right-unit"
            >
              {{ item.unit }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="card card3"
        :class="{selected: selectCard === 'pop-area-bus'}"
        @click="showPopup('区域公交场站', 'pop-area-bus')"
      >
        <div class="card-left">
          <div class="count-info">
            <div class="img-wrappper">
              <img :src="require('@/assets/images/gongjiaochangzhan.png')">
            </div>
            <div class="name-info">
              <div class="name">
                公交场站
              </div>
              <div class="num">
                {{ formatData('公交场站') }}
                <div class="unit">
                  个
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-right">
          <div class="count-info">
            <div class="img-wrappper">
              <img :src="require('@/assets/images/chongdianzhuang.png')">
            </div>
            <div class="name-info">
              <div class="name">
                充电站
              </div>
              <div class="num">
                {{ formatData('充电站') }}
                <div class="unit">
                  个
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card card4">
        <div class="card-left">
          <div class="count-info">
            <div class="img-wrappper">
              <img :src="require('@/assets/images/gongjiaocheliang.png')">
            </div>
            <div class="name-info">
              <div class="name">
                公交车辆
              </div>
              <div class="num">
                {{ formatData('公交车辆') }}
                <div class="unit">
                  个
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-right">
          <div class="count-info">
            <div class="img-wrappper">
              <img :src="require('@/assets/images/jiashiyuan.png')">
            </div>
            <div class="name-info">
              <div class="name">
                驾驶员
              </div>
              <div class="num">
                {{ formatData('驾驶员') }}
                <div class="unit">
                  个
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card card5">
        <div class="card-left">
          <div class="count-info">
            <div class="img-wrappper">
              <img :src="require('@/assets/images/daolu.png')">
            </div>
            <div class="name-info">
              <div class="name">
                专用道总里程
              </div>
              <div class="num">
                {{ formatData('专用道总里程') }}
                <div class="unit">
                  个
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pop-ups
      v-model:value="visible"
      :title="popTitle"
      height="5.4rem"
    >
      <component
        :is="popMap[selectCard]"
        :is-active="visible"
        :data="popData"
      />
    </pop-ups>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import PopUps from '@/components/popUps'
  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  import PopAreaBus from './pop-area-bus.vue'
  import PopAreaSites from './pop-area-sites.vue'
  import { zdtj } from '@/api/modules/city-transit/regularTransit'
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const popMap = {
    'pop-area-sites': PopAreaSites,
    'pop-area-bus': PopAreaBus
  }
  const formatNumStr = utils.formatNumStr
  const selectCard = ref('')
  const popTitle = ref('')
  const visible = ref(false)
  const date = computed(() => props.data[0]?.sbsj || '-')
  const formatData = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === name || item.zbmc === dataName))
    return formatNumStr(fd?.zbz).trim()
  }
  const store = useStore()
  const rootFontSize = computed(() => store.getters?.rootFontSize)
  const card2 = [
    {
      name: '线路长度',
      value: '20,497',
      unit: '公里'
    },
    {
      name: '线网长度',
      value: '20,497',
      unit: '公里'
    },
    {
      name: '线网密度',
      value: '20,497',
      unit: ''
    }
  ]
  const popData = ref([])
  const showPopup = (name, type) => {
    popTitle.value = name
    selectCard.value = type
    visible.value = true
    if (!popData.value.length) {
      zdtj().then(res => {
        popData.value = res || []
      })
    }
  }

  watch(() => visible.value, () => {
    if (!visible.value) {
      popTitle.value = ''
      selectCard.value = ''
    }
  }, {
    immediate: true
  })
</script>

<style lang="less" scoped>
.base-resource-wrapper {
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

  .base-content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1;
    min-height: 0;

    .card {
      min-height: 0;
      padding: .24rem .16rem;
      margin-bottom: .24rem;
      background: rgba(55, 97, 232, .12);
      box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
      border: 1.4px solid rgba(#0085ff, .2);

      &:last-of-type {
        margin-bottom: 0;
      }

      &.selected {
        background: rgba(84,181,255,.1);
        box-shadow: 0 .01rem .14rem 0 rgba(84,181,255,.2),inset 0 0 .27rem 0 rgba(84,181,255,.5);
        border: .014rem solid #54b5ff;
      }

      .count-info {
        display: flex;
        flex-flow: row nowrap;

        .img-wrappper {
          flex: 0 0 .56rem;
          height: .56rem;
          margin-right: .12rem;

          img {
            width: .56rem;
            height: .56rem;
          }
        }

        .name-info {
          .name {
            color: #fff;
            font-family: "PingFang SC";
            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
          }

          .num {
            display: flex;
            align-items: baseline;
            color: #00fff9;
            font-family: DINCondensed-Bold;
            font-size: 36px;
            font-weight: 700;
            line-height: 40px;
            text-shadow: 0 2px 10px rgba(75, 222, 255, .5);

            .unit {
              margin-left: .08rem;
              color: #00fff9;
              font-family: "PingFang SC";
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
            }
          }
        }
      }
      .sub-info {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-top: .06rem;

        .sub-name {
          margin-right: .16rem;
          color: #fff;
          font-family: "PingFang SC";
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
        }

        .circle {
          width: .16rem;
          height: .16rem;
          margin-right: .08rem;
          border-radius: 50%;
          svg {
            border-radius: 50%;
            transform: rotate(270deg);
          }
        }

        .sub-data {
          color: #00fff9;
          font-family: "PingFang SC";
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
        }
      }
    }

    .card1 {
      flex: 0 0 1.43rem;
      cursor: pointer;
    }

    .card2,
    .card3,
    .card4 {
      display: flex;
      flex-flow: row nowrap;
      .card-left {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        flex: 0 0 50%;
        min-width: 0;
      }

      .card-right {
        flex: 0 0 50%;
        min-width: 0;
      }
    }

    .card2 {
      flex: 0 0 1.47rem;

      .card-right {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;

        .right-info {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          margin-bottom: .1rem;

          &:last-of-type {
            margin-bottom: 0;
          }

          .right-name {
            margin-right: 20px;
            color: #fff;
            font-family: "PingFang SC";
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            white-space: nowrap;
          }

          .right-count {
            margin-right: 8px;
            color: #00fff9;
            font-family: "PingFang SC";
            font-size: 16px;
            font-weight: 600;
            white-space: nowrap;
          }

          .right-unit {
            color: #fff;
            font-family: "PingFang SC";
            font-size: 16px;
            font-weight: 400;
            white-space: nowrap;
          }
        }
      }
    }

    .card3 {
      flex: 0 0 1.18rem;
      cursor: pointer;
    }

    .card4 {
      flex: 0 0 1.18rem;
    }

    .card5 {
      flex: 0 0 1.16rem;
    }
  }
}
</style>
