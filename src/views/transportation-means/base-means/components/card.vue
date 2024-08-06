<template>
  <div class="card-wrapper">
    <div class="left">
      <div class="top">
        <div class="left-icon">
          <img :src="config.icon">
        </div>
        <div class="right-info">
          <div class="title">
            {{ config.name }}
          </div>
          <div class="data">
            <div class="num">
              {{ formatNumStr(config.value) }}
            </div>
            <div class="unit">
              {{ config.unit }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="bottom-info">
        同比去年 {{ formatNumStr(config.compareValue) }}%
        <svg-icon
          v-if="
            Number(formatNumStr(config.compareValue)) &&
              !Number.isNaN(Number(formatNumStr(config.compareValue)))
          "
          :icon-class="Number(formatNumStr(config.compareValue)) < 0 ? 'drop' : 'rise'"
          style="font-size: 0.12rem; width: 0.12rem"
        />
      </div> -->
    </div>
    <div class="right">
      <div
        v-for="item in config.children || []"
        :key="item"
        class="right-item"
      >
        <div class="name">
          {{ item.name }}
        </div>
        <div class="bar-wrapper">
          <div
            class="bar"
            :style="{ width: getWidth(item.value) }"
          />
        </div>
        <div class="label">
          <div class="num">
            {{ formatNumStr(item.value) }}
          </div>
          <div class="unit">
            {{ config.unit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr

  const min = ref(0)
  const max = ref(0)
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    }
  })

  const getMax = (num) => {
    const lgNum = Math.log(num) / Math.log(10)
    const floatNum = lgNum % 1
    const preFix = Math.trunc(Math.pow(10, floatNum)) + 1
    const un = Math.floor(lgNum)
    return preFix * Math.pow(10, un)
  }

  const getWidth = (data) => {
    return data ? `${((data / max.value) * 100).toFixed(2)}%` : 0
  }

  watch(
    () => [props.data, props.config],
    () => {
      nextTick(() => {
        const data = []
        props.config.children.forEach((obj, i) => {
          data.push(obj.value || 0)
        })
        max.value = getMax(Math.max(...data))
      })
    },
    {
      deep: true,
      immediate: true
    }
  )
</script>

<style lang="less" scoped>
.card-wrapper {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;
  padding: .2rem .16rem;
  background: rgba(55, 97, 232, .12);
  box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
  border: 1.4px solid rgba(#0085ff, .2);

  .left {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    flex: 0 0 50%;

    .top {
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
        flex: 1;
        min-width: 0;

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
          overflow: hidden;
          text-overflow: clip;
          white-space: nowrap;

          .num {
            overflow: hidden;
            max-width: calc(100% - .8rem);
            margin-right: .08rem;
            color: #00fff9;
            font-family: DINCondensed-Bold;
            font-size: .48rem;
            font-weight: 700;
            line-height: .58rem;
            text-overflow: clip;
            text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
            white-space: nowrap;
          }

          .unit {
            overflow: hidden;
            color: #00fff9;
            font-family: "PingFang SC";
            font-size: .2rem;
            font-weight: 400;
            text-overflow: ellipsis;
            white-space: nowrap;
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

  .right {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 0 0 50%;

    .right-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      .name {
        flex: 0 0 .7rem;
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
      }

      .bar-wrapper {
        position: relative;
        flex: 1;
        min-width: 0;
        height: .12rem;
        .bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, rgba(84, 181, 255, .0001) 0%, #54b5ff 97.37%);
        }
      }

      .label {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
        margin-left: .16rem;

        .num {
          color: #fff;
          font-family: DINCondensed-Bold;
          font-size: .14rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .unit {
          color: #fff;
          font-family: "PingFang SC";
          font-size: .12rem;
          font-weight: 400;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
