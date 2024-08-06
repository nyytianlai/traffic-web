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
          type="实时"
          :show-drop="false"
          :drop-info="date"
          :date="date"
          style="margin-left: 0.08rem;"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div class="card-content">
      <div
        v-for="(item, i) in config"
        :key="i"
        class="card-item"
      >
        <div
          v-for="(card,k) in item"
          :key="card.name"
          class="card"
        >
          <div class="card-top">
            <img
              v-if="!k"
              :src="lvke"
            >
            <div class="card-data">
              <p>{{ card.name }}</p>
              <div class="card-number">
                {{ formatData(card.code) }}
                <span class="unit">{{ card.unit }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="card.compareCode"
            class="card-compare"
          >
            较{{ moment(storDate).format('YYYY')-(isSpring ? 1 : 1) }}年同比：{{ formatData(card.compareCode) }}%
            <svg-icon
              v-if="Number(formatData(card.compareCode)) && !Number.isNaN(Number(formatData(card.compareCode)))"
              :icon-class="Number(formatData(card.compareCode)) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem;"
            />
          </div>
          <div
            v-if="card.compareCode2"
            class="card-compare compare2"
          >
            较{{ moment(storDate).format('YYYY')-(isSpring ? 2 : 2) }}年同比：{{ formatData(card.compareCode2) }}%
            <svg-icon
              v-if="Number(formatData(card.compareCode2)) && !Number.isNaN(Number(formatData(card.compareCode2)))"
              :icon-class="Number(formatData(card.compareCode2)) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem; margin-left: 0.04rem;"
            />
          </div>
          <div
            v-if="!isSpring && card.date"
            class="max-info"
          >
            {{ formatData(card.date) || '-' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import lvke from '@/assets/images/lvke.png'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  import { useStore } from 'vuex'
  const formatNumStr = utils.formatNumStr
  const store = useStore()
  const storDate = computed(() => store.getters.date)
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({})
    },
    isSpring: {
      type: Boolean,
      default: false
    }
  })

  const config = computed(() => (
    [
      [
        props.isSpring ? {
          name: '当日发送量',
          unit: '万人次',
          code: 'fsl',
          compareCode: 'fsltb',
          compareCode2: 'lastfsltb'
        } : {
          name: '最高发送量',
          unit: '万人次',
          code: 'maxfsl',
          date: 'maxfsldate'
        },
        {
          name: '累计发送量',
          unit: '万人次',
          code: 'ljfsl',
          compareCode: 'ljfsltb',
          compareCode2: 'lastljfsltb'
        }
      ],
      [
        props.isSpring ? {
          name: '当日到达量',
          unit: '万人次',
          code: 'ddl',
          compareCode: 'ddltb',
          compareCode2: 'lastddltb'
        } : {
          name: '最高到达量',
          unit: '万人次',
          code: 'maxddl',
          date: 'maxddldate'
        },
        {
          name: '累计到达量',
          unit: '万人次',
          code: 'ljddl',
          compareCode: 'ljddltb',
          compareCode2: 'lastljddltb'
        }
      ]
    ]
  ))
  console.log(store, '99999999999999')
  const date = computed(() => !store.isSpring ? store.getters.glEnd : store.getters.date)
  const formatData = (name) => {
    const nowData = props.data.cycxqkData || {}
    return formatNumStr(Number(nowData[name]) ? Number(nowData[name]).toFixed(2) : nowData[name])
  }
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .16rem .24rem;

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

  .card-content {
    flex: 1;
    min-height: 0;

    .card-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      width: 100%;
      margin-bottom: .2rem;

      .card {
        flex: 0 0 calc(50% - .06rem);
        min-width: 0;
      }

      .card-top {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: .1rem;
        img {
          width: .48rem;
          height: .48rem;
          margin-right: .1rem;
        }
      }

      .card-data p {
        margin-bottom: .04rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .18rem;
        font-weight: 500;
        line-height: .22rem;
      }

      .card-number {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .24rem;
        font-weight: 700;
        line-height: .26rem;

        .unit {
          margin-left: .04rem;
          color: #0ff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
        }
      }

      .card-compare {
        display: flex;
        align-items: center;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .14rem;
        font-weight: 400;
        line-height: .2rem;
        letter-spacing: -.01rem;
        white-space: nowrap;
      }

      .max-info {
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: .14rem;
        font-weight: 400;
        line-height: .2rem;
      }

      .compare2 {
        margin-top: .08rem;
      }
    }
  }
}
</style>
