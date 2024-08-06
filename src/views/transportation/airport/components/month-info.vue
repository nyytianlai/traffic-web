<template>
  <div class="month-info-wrapper">
    <div class="top">
      <span class="time">
        {{ date }}
        <DataTypeBtn
          type="日"
          :date="date"
          style="margin-left: 0.08rem"
        />
      </span>
      <!-- <svg-icon
        icon-class="more"
        class="more"
      /> -->
    </div>
    <div
      v-for="item in config"
      :key="item.name"
      class="card-item"
    >
      <!-- <div class="card-icon">
        <img :src="require(`@/assets/images/${item.icon}`)">
      </div> -->
      <div class="card-data">
        <div class="card-name">
          {{ item.name }}
        </div>
        <div class="card-count">
          <div class="num">
            {{ formatData(item.name, item.dataName) }}
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
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const config = [
    {
      name: '航空器起降架次',
      icon: 'hangban.png',
      unit: '万架次',
      dataName: ''
    },
    {
      name: '旅客吞吐量',
      icon: 'lvke.png',
      unit: '万人次',
      dataName: ''
    },
    {
      name: '货邮吞吐量',
      icon: 'huowu.png',
      unit: '万吨',
      dataName: ''
    },
    {
      name: '国际航线（不含港澳台）旅客吞吐量',
      icon: 'huowu.png',
      unit: '万人次',
      dataName: '国际航线（不含港澳台）旅客吞吐量'
    },
    {
      name: '国际航线（不含港澳台）货邮吞吐量',
      icon: 'huowu.png',
      unit: '万吨',
      dataName: '国际航线（不含港澳台）货邮吞吐量'
    }
  ]
  const date = computed(() =>
    props.data[0]?.report_date || '-'
  )
  const formatData = (name, dataName) => {
    const fd = props.data.find((obj) => obj.category === name || obj.category === dataName)
    return formatNumStr(fd?.sum_numerical) || '-'
  }
</script>

<style lang="less" scoped>
.month-info-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 0.24rem 0.24rem 0.16rem;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.12rem;
    .more {
      width: 0.16rem;
      height: 0.16rem;
      font-size: 0.16rem;
      cursor: pointer;
    }

    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: PingFang SC;
      font-size: 0.16rem;
      font-weight: @regular;
      letter-spacing: 0;

      > div {
        margin-left: 0.04rem;
      }
    }
  }

  .card-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    flex: 1;
    min-height: 0;
    padding: 0.16rem 0.24rem;
    margin-bottom: 0.08rem;
    background: rgba(55, 97, 232, 0.12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, 0.195203), inset 0 0 35px rgba(#294cb3, 0.2);
    border: 1.4px solid rgba(#0085ff, 0.2);

    &:last-of-type {
      margin-bottom: 0;
    }

    .card-icon {
      flex: 0 0 0.64rem;
      height: 0.64rem;
      margin-right: 0.2rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .card-data {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      .card-name {
        color: #fff;
        font-family: 'PingFang SC';
        font-size: 0.18rem;
        font-weight: 500;
      }

      .card-count {
        display: flex;
        align-items: baseline;

        .num {
          color: #00fff9;
          font-family: DINCondensed-Bold;
          font-size: 0.26rem;
          font-weight: 700;
          line-height: 0.18rem;
        }

        .unit {
          margin-left: 0.04rem;
          color: #0ff;
          font-family: 'PingFang SC';
          font-size: 0.16rem;
          font-weight: 400;
          line-height: 0.18rem;
        }
      }
    }
  }
}
</style>
