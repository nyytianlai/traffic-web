<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-11 10:35:22
 * @LastEditTime: 2022-11-21 17:39:09
 * @FilePath: \traffic-web\src\views\trafficSafety\safetyMonitoring\traffic-violation\components\accident-count.vue
 * @Description: FilePath
-->
<template>
  <div class="wrapper">
    <div class="left-card card">
      <div class="title">
        <span class="name">交通违章</span>
        <DataTypeBtn
          type="日"
          :drop-info="moment(formatData('交通违章').date).format('YYYY-MM-DD')"
          :show-drop="true"
        />
      </div>
      <div class="data">
        <div class="num">
          {{ formatData('交通违章').value }}
        </div>
        <div class="unit">
          件
        </div>
      </div>
    </div>
    <div class="right-card">
      <div class="right-card-item card">
        <div class="title">
          <span class="name">本年度累计案件数</span>
          <DataTypeBtn
            type="年"
            :drop-info="moment(formatData('本年度累计案件数').date).format('YYYY-MM-DD')"
            :show-drop="true"
          />
        </div>
        <div class="data">
          <div class="num">
            {{ formatData('本年度累计案件数').value }}
          </div>
          <div class="unit">
            件
          </div>
        </div>
        <div class="extra-info">
          同比去年 48.31%
          <span>
            <svg-icon
              v-if="Number(formatData('本年度累计案件数同比去年').value) && !Number.isNaN(Number(formatData('本年度累计案件数同比去年').value))"
              :icon-class="Number(formatData('本年度累计案件数同比去年').value) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import moment from 'moment'
  import utils from '@/hooks/utils'
  const dataMap = {
    交通违章: '本月交通违章',
    本年度累计案件数: '本年度累计案件数',
    本年度累计案件数同比去年: '本年度累计案件数同比去年'
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
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;

  .left-card {
    flex: 0 0 1.88rem;
    padding-left: .19rem;
    margin-right: .12rem;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px 0 rgba(#000, .2),inset 0 0 35px 0 rgba(#294cb3, .2);
    border: 1.4px solid rgba(#0085ff, .12);
  }

  .right-card {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1;
    min-width: 0;

    .right-card-item {
      flex: 0 0 100%;
      padding-left: .16rem;
      background: rgba(55, 97, 232, .12);
      box-shadow: 0 1px 14px 0 rgba(#000, .2),inset 0 0 35px 0 rgba(#294cb3, .2);
      border: 1.4px solid rgba(#0085ff, .2);
      ;
    }
  }

  .card {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    .title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: .04rem;

      .name {
        margin-right: .08rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .2rem;
        font-weight: 500;
        line-height: .28rem;
      }
    }

    .data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;

      .num {
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .36rem;
        font-weight: 700;
        line-height: .4rem;
      }

      .unit {
        margin-left: .08rem;
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
      }
    }

    .extra-info {
      display: flex;
      align-items: center;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;

      span {
        margin-left: .04rem;
      }
    }
  }
}
</style>
