<template>
  <div class="wrapper">
    <div class="date">
      <span class="name">{{ moment(formatData('道路施工').date).format('YYYY-MM-DD') }}</span>
      <DataTypeBtn
        type="年"
        :show-drop="false"
      />
    </div>
    <div class="card">
      <div class="icon">
        <img :src="roadWorksIcon">
      </div>
      <div class="title">
        道路施工
      </div>
      <div class="data">
        <div class="num">
          {{ formatData('道路施工').value }}
        </div>
        <div class="unit">
          个
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import roadWorksIcon from '@/assets/images/road-works.png'
  import moment from 'moment'
  import utils from '@/hooks/utils'
  const dataMap = {
    道路施工: '本月道路施工数量'
  }
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })

  const formatData = (name) => {
    const fd = props.data.find(item => item.zbmc === dataMap[name])
    return { value: formatNumStr(fd?.zbz), date: fd?.ywsj }
  }
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .24rem .24rem .21rem;

  .date {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .12rem;

    .name {
      margin-right: .08rem;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .2rem;
      font-weight: 500;
      line-height: .28rem;
    }
  }

  .card {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-height: 0;
    padding: .2rem;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px 0 rgba(#000, .2),inset 0 0 35px 0 rgba(#294cb3, .2);
    border: 1.4px solid rgba(#0085ff, .2);

    .icon {
      flex: 0 0 .89rem;

      img {
        width: 1.05rem;
        height: 100%;
      }
    }

    .title {
      margin-bottom: .08rem;
      color: #fff;
      font-family: PingFang SC;
      font-size: .2rem;
      font-weight: @medium;
      letter-spacing: 0;
    }

    .data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;

      .num {
        margin-right: .04rem;
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .36rem;
        font-weight: @bold;
        line-height: .34rem;
        letter-spacing: 0;
        white-space: nowrap;
      }

      .unit {
        color: #0ff;
        font-family: PingFang SC;
        font-size: .16rem;
        font-weight: @regular;
        letter-spacing: 0;
      }
    }
  }
}
</style>
