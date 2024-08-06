<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-02 11:31:35
 * @LastEditTime: 2022-12-07 10:51:44
 * @FilePath: \traffic-web\src\views\city-transit\regularTransit\components\road-operation.vue
 * @Description: FilePath
-->
<template>
  <div class="road-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="实时"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="road-content">
      <div
        class="card card1"
        :class="{selected: selectCard === 'pop-car-speed'}"
        @click="showPopup('上线车辆平均速度', 'pop-car-speed', 'pjsd')"
      >
        <div class="card-left">
          <div class="count-info">
            <div class="img-wrappper">
              <img :src="require('@/assets/images/shangxiancheliang.png')">
            </div>
            <div class="name-info">
              <div class="name">
                上线车辆
              </div>
              <div class="num">
                {{ formatData('上线车辆') }}
                <div class="unit">
                  辆
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-right">
          <div class="right-info">
            <div class="right-name">
              上线率
            </div>
            <div class="right-data">
              {{ formatData('上线率') }}%
            </div>
          </div>
          <div class="right-info">
            <div class="right-name">
              上周同期
            </div>
            <div class="right-data">
              {{ formatData('上线率上周同期') }}%
              <svg-icon
                v-if="Number(formatData('上线率上周同期')) && !Number.isNaN(Number(formatData('上线率上周同期')))"
                :icon-class="Number(formatData('上线率上周同期')) < 0 ? 'drop' : 'rise'"
                style="font-size: 0.12rem; width: 0.12rem; margin-left:0.04rem;"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="card card2"
        :class="{selected: selectCard === 'pop-operate-index'}"
        @click="showPopup('当日运营班次', 'pop-operate-index', 'yybc')"
      >
        <div class="count-info">
          <div class="img-wrappper">
            <img :src="require('@/assets/images/yingyunbanci.png')">
          </div>
          <div class="name-info">
            <div class="name">
              营运班次
            </div>
            <div class="num">
              {{ formatData('营运班次') }}
              <div class="unit">
                班次/月
              </div>
              <div class="compare-name">
                上周同期
              </div>
              <div class="compare-data">
                {{ formatData('营运班次上周同期') }}%
                <svg-icon
                  v-if="Number(formatData('营运班次上周同期')) && !Number.isNaN(Number(formatData('营运班次上周同期')))"
                  :icon-class="Number(formatData('营运班次上周同期')) < 0 ? 'drop' : 'rise'"
                  style="font-size: 0.12rem; width: 0.12rem; margin-left:0.04rem;"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="sub-info">
          <div class="sub-name">
            营运载客里程
          </div>
          <div class="sub-data">
            {{ formatData('营运载客里程') }} 万公里/日
          </div>
        </div>
      </div>
      <div class="card card3">
        <div class="count-info">
          <div class="img-wrappper">
            <img :src="require('@/assets/images/keyunliang.png')">
          </div>
          <div class="name-info">
            <div class="name">
              客运量
            </div>
            <div class="num">
              {{ formatData('客运量') }}
              <div class="unit">
                万人次
              </div>
              <div class="compare-name">
                上周同期
              </div>
              <div class="compare-data">
                {{ formatData('客运量上周同期') }}%
                <svg-icon
                  v-if="Number(formatData('客运量上周同期')) && !Number.isNaN(Number(formatData('客运量上周同期')))"
                  :icon-class="Number(formatData('客运量上周同期')) < 0 ? 'drop' : 'rise'"
                  style="font-size: 0.12rem; width: 0.12rem; margin-left:0.04rem;"
                />
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
        :ia-active="visible"
        :data="popData"
      />
    </pop-ups>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import PopUps from '@/components/popUps'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  import PopCarSpeed from './pop-car-speed.vue'
  import PopOperateIndex from './pop-operate-index.vue'
  import { sssztqqxt } from '@/api/modules/city-transit/regularTransit'

  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const popMap = {
    'pop-car-speed': PopCarSpeed,
    'pop-operate-index': PopOperateIndex
  }
  const popData = ref([])
  const formatNumStr = utils.formatNumStr
  const selectCard = ref('')
  const popTitle = ref('')
  const visible = ref(false)
  const date = computed(() => props.data[0]?.sbsj || '-')
  const formatData = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === name || item.zbmc === dataName))
    return formatNumStr(fd?.zbz).trim()
  }
  const showPopup = (name, type, code) => {
    popTitle.value = name
    selectCard.value = type
    visible.value = true
    sssztqqxt(code).then(res => {
      popData.value = res || []
    })
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
.road-wrapper {
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

  .road-content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1;
    min-height: 0;

    .card {
      min-height: 0;
      padding: .24rem .16rem;
      margin-bottom: .16rem;
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
            white-space: nowrap;

            .unit {
              margin-left: .08rem;
              color: #00fff9;
              font-family: "PingFang SC";
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
              white-space: nowrap;
            }

            .compare-name {
              flex: 0 0 .8rem;
              margin-left: .12rem;
              color: #fff;
              font-family: "PingFang SC";
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
              white-space: nowrap;
            }

            .compare-data {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              color: #fff;
              font-family: "PingFang SC";
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
              white-space: nowrap;
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
      display: flex;
      flex-flow: row nowrap;
      cursor: pointer;
      .card-left {
        flex: 0 0 50%;
        min-width: 0;
      }

      .card-right {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        flex: 0 0 50%;
        min-width: 0;
        padding-left: .16rem;

        .right-info {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;

          .right-name {
            flex: 0 0 .8rem;
            color: #fff;
            font-family: "PingFang SC";
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
          }

          .right-data {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            color: #fff;
            font-family: "PingFang SC";
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
          }
        }
      }
    }

    .card2 {
      cursor: pointer;
    }
  }
}
</style>
