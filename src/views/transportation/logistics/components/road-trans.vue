<template>
  <div class="wrapper">
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
    <div class="card-wrapper">
      <div
        v-for="item in config"
        :key="item.name"
        class="card-item"
      >
        <div class="name">
          {{ item.name }}
        </div>
        <div class="data">
          <div class="num">
            {{ formatData(item.name) }}
          </div>
          <div class="unit">
            {{ item.unit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'

  import utils from '@/hooks/utils'
  import moment from 'moment'
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const date = computed(() => props.data[0]?.sbsj ? props.data[0].sbsj : '-')
  const formatNumStr = utils.formatNumStr

  const formatData = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === name || item.zbmc === dataName))
    return formatNumStr(fd?.zbz)
  }
  const config = [
    {
      name: '客运枢纽',
      unit: '个'
    },
    {
      name: '物流枢纽',
      unit: '个'
    }
  ]
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 0 .24rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
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

  .card-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;

    .card-item {
      flex: 0 0 calc(50% - .06rem);
      padding: .1rem .16rem;
      background: rgba(55, 97, 232, .12);
      box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
      border: 1.4px solid rgba(#0085ff, .2);

      .name {
        margin-bottom: .04rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 500;
        line-height: .22rem;
      }

      .data {
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;

        .num {
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: .32rem;
          font-weight: 700;
          line-height: .38rem;
          text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
        }

        .unit {
          margin-left: .08rem ;
          color: #00fff9;
          font-family: "PingFang SC";
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
