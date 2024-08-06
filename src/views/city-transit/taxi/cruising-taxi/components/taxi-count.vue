<template>
  <div class="taxi-count-wrapper">
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
    <div class="card">
      <div class="count-info">
        <div class="img-wrappper">
          <img :src="require('@/assets/images/zaixiancheliang.png')">
        </div>
        <div class="name-info">
          <div class="name">
            在线车辆数
          </div>
          <div class="num">
            {{ formatData('巡游出租车总车辆数') }}
            <div class="unit">
              个
            </div>
          </div>
        </div>
      </div>
      <div class="detail-data">
        空载
        <div class="detail-num">
          {{ formatData('巡游出租车空载车辆数') }}
        </div>
        <div class="detail-unit">
          辆
        </div>
      </div>
      <div class="detail-data">
        重载
        <div class="detail-num">
          {{ formatData('巡游出租车重载车辆数') }}
        </div>
        <div class="detail-unit">
          辆
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
  const formatNumStr = utils.formatNumStr
  const date = computed(() => props.data[0]?.sbsj || '-')
  const formatData = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === name || item.zbmc === dataName))
    return formatNumStr(fd?.zbz).trim()
  }
</script>

<style lang="less" scoped>
.taxi-count-wrapper {
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
  .card {
    flex: 1;
    min-height: 0;
    padding: .24rem .16rem;
    margin-bottom: .16rem;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
    border: 1.4px solid rgba(#0085ff, .2);

    &:last-of-type {
      margin-bottom: 0;
    }

    .count-info {
      display: flex;
      flex-flow: row nowrap;

      .img-wrappper {
        flex: 0 0 .8rem;
        height: .8rem;
        margin-right: .24rem;

        img {
          width: .8rem;
          height: .8rem;
        }
      }

      .name-info {
        .name {
          color: #fff;
          font-family: "PingFang SC";
          font-size: 20px;
          font-weight: 500;
        }

        .num {
          display: flex;
          align-items: baseline;
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: 48px;
          font-weight: 700;
          line-height: .5rem;
          text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
          white-space: nowrap;

          .unit {
            margin-left: .08rem;
            color: #00fff9;
            font-family: "PingFang SC";
            font-size: 20px;
            font-weight: 400;
            white-space: nowrap;
          }
        }
      }
    }

    .detail-data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      margin-top: .08rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .18rem;
      font-weight: 400;

      .detail-num {
        margin-left: .16rem;
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .32rem;
        font-weight: 700;
        line-height: .3rem;
        text-shadow: 0 2px 10px rgba(75, 222, 255, .5);
      }

      .detail-unit {
        margin-left: .08rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .18rem;
        font-weight: 400;
      }
    }
  }
}
</style>
