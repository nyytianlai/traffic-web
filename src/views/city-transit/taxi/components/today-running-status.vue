<template>
  <div class="running-status-wrapper">
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
    <div class="status-content">
      <div
        v-for="item in config"
        :key="item.name"
        class="card"
      >
        <div class="count-info">
          <div class="img-wrappper">
            <img :src="require(`@/assets/images/${item.icon}`)">
          </div>
          <div class="name-info">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="num">
              {{ formatData(item.name, item.compareName) }}
              <div class="unit">
                {{ item.unit }}
              </div>
              <div class="compare-name">
                上周同期
              </div>
              <div class="compare-data">
                {{ formatData(item.compareName) }}%
                <svg-icon
                  v-if="Number(formatData(item.compareName)) && !Number.isNaN(Number(formatData(item.compareName)))"
                  :icon-class="Number(formatData(item.compareName)) < 0 ? 'drop' : 'rise'"
                  style="font-size: 0.12rem; width: 0.12rem; margin-left:0.04rem;"
                />
              </div>
            </div>
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
  const config = [
    {
      name: '订单数',
      dataName: '订单数',
      icon: 'dingdanshu.png',
      unit: '万个',
      compareName: '订单数同比上周'
    },
    {
      name: '客运量',
      dataName: '客运量',
      icon: 'keyunliang.png',
      unit: '万人次',
      compareName: '订单数同比上周'
    }
  ]
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    typeName: {
      type: String,
      default: '网约出租车'
    }
  })
  const formatNumStr = utils.formatNumStr
  const date = computed(() => props.data[0]?.sbsj || '-')
  const formatData = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === `${props.typeName}${name}` || item.zbmc === `${props.typeName}${dataName}`))
    return formatNumStr(fd?.zbz).trim()
  }
</script>

<style lang="less" scoped>
.running-status-wrapper {
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

  .status-content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1;
    min-height: 0;

    .card {
      flex: 0 0 calc(50% - .08rem);
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
    }
  }
}
</style>
