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
            <div
              class="name"
              :class="{showDetail: item.showDetail}"
              @click="showDetail(item)"
            >
              {{ item.name }}
              <svg-icon
                v-if="item.showDetail"
                icon-class="arrow-right"
                style="font-size: 0.12rem; width: 0.12rem; margin-left:0.12rem;"
              />
            </div>
            <div class="num">
              {{ formatData(item.name, item.dataName) }}
              <div class="unit">
                {{ item.unit }}
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
      name: '在线车辆数',
      dataName: '网约出租车在线车辆数',
      icon: 'zaixiancheliang.png',
      unit: '个'
    },
    {
      name: '网约车平台公司',
      dataName: '网约车平台公司数',
      icon: 'wangyueche.png',
      showDetail: true,
      unit: '家'
    }
  ]
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const emits = defineEmits(['showDetail'])
  const formatNumStr = utils.formatNumStr
  const date = computed(() => props.data[0]?.sbsj || '-')
  const formatData = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === name || item.zbmc === dataName))
    return formatNumStr(fd?.zbz).trim()
  }
  const showDetail = item => {
    emits('showDetail', item)
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

            &.showDetail {
              cursor: pointer;
            }
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
          }
        }
      }
    }
  }
}
</style>
