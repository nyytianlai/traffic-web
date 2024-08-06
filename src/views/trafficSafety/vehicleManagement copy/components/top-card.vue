<template>
  <div class="card-wrapper">
    <div class="card card1">
      <div
        v-for="item in config"
        :key="item.name"
        class="card-item"
      >
        <div class="name">
          {{ item.name }}
          <DataTypeBtn
            :type="item.dataType"
            :show-drop="true"
            :drop-info="formatDate(item.name, item.dataName)"
            :date="formatDate(item.name, item.dataName)"
            style="margin-left: 0.08rem;"
          />
        </div>
        <div class="card-info">
          <div class="card-icon">
            <img :src="require(`@/assets/images/${item.icon}`)">
          </div>
          <div class="card-data">
            <div class="data">
              <div class="num">
                {{ formatData(item.name, item.dataName) }}
              </div>
              <div class="unit">
                {{ item.unit }}
              </div>
              <div class="compare-data">
                同比去年：{{ formatData(item.compareName) }}%<svg-icon
                  v-if="Number(formatData(item.compareName)) && !Number.isNaN(Number(formatData(item.compareName)))"
                  :icon-class="Number(formatData(item.compareName)) < 0 ? 'drop' : 'rise'"
                  style="font-size: 0.12rem; width: 0.12rem; margin-left:0.04rem;"
                />
              </div>
            </div>
            <div class="new-add">
              今年登记：<div class="new-add-data">
                {{ formatData(item.newAdd) }}
              </div>
              <div class="unit">
                {{ item.unit }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card card2">
      <div class="name">
        驾驶员保有量
        <DataTypeBtn
          type="日"
          :show-drop="true"
          :drop-info="formatDate('驾驶员保有量')"
          :date="formatDate('驾驶员保有量')"
          style="margin-left: 0.08rem;"
        />
      </div>
      <div class="card-info">
        <div class="card-icon">
          <img :src="require('@/assets/images/jiashiyuan2.png')">
        </div>
        <div class="card-data">
          <div class="data">
            <div class="flex1">
              <div class="num">
                {{ formatData('驾驶员保有量') }}
              </div>
              <div class="unit">
                辆
              </div>
            </div>
            <div class="compare-data">
              同比去年：{{ formatData('驾驶员保有量同比去年') }}%<svg-icon
                v-if="Number(formatData('驾驶员保有量同比去年')) && !Number.isNaN(Number(formatData('驾驶员保有量同比去年')))"
                :icon-class="Number(formatData('驾驶员保有量同比去年')) < 0 ? 'drop' : 'rise'"
                style="font-size: 0.12rem; width: 0.12rem; margin-left:0.04rem;"
              />
            </div>
          </div>
          <div class="sex">
            <div class="new-add flex1">
              男：<div class="new-add-data">
                {{ formatData('男驾驶员保有量') }}
              </div>
              <div class="unit">
                人
              </div>
            </div>
            <div class="new-add flexBase">
              女：<div class="new-add-data">
                {{ formatData('女驾驶员保有量') }}
              </div>
              <div class="unit">
                人
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
  // import moment from 'moment'
  import utils from '@/hooks/utils'
  import moment from 'moment'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    }
  })
  const formatDate = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === name || item.zbmc === dataName))
    return fd?.rksj ? fd.rksj : '-'
  }
  const formatData = (name, dataName) => {
    const fd = props.data.find(item => (item.zbmc === name || item.zbmc === dataName))
    return formatNumStr(fd?.zbz) || '-'
  }
  const config = [
    {
      name: '机动车保有量',
      dataType: '日',
      icon: 'jidongche.png',
      unit: '辆',
      compareName: '机动车保有量同比去年',
      newAdd: '当年登记机动车数量'
    },
    {
      name: '新能源机动车',
      dataName: '新能源机动车保有量',
      dataType: '日',
      icon: 'jidongche.png',
      unit: '辆',
      compareName: '新能源机动车保有量同比去年',
      newAdd: '当年登记新能源机动车数量'
    }
  ]
</script>

<style lang="less" scoped>
.card-wrapper {
  display: flex;
  flex-flow: row nowrap;

  column-gap: .24rem;

  .card {
    padding: .24rem 0 .24rem .22rem;
    background: rgba(55, 97, 232, .12);
    box-shadow: 0 1px 14px rgba(0, 0, 0, .2), inset 0 0 35px rgba(#294cb3, .2);
    border: 1.4px solid rgba(#0085ff, .2);
  }

  .card1 {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    min-width: 0;

     > div {
      flex: 0 0 50%;
    }
  }

  .card2 {
    flex: 0 0 3.84rem;
    min-width: 0;

    .flex1 {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      flex: 1;
      min-width: 0;
      white-space: nowrap;
    }

    .compare-data {
      flex: 0 0 1.5rem;
      margin-left: 0;
    }

    .sex {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      .flexBase {
        flex: 0 0 1.5rem;
      }
    }
  }

  .name {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: .2rem;
    color: #fff;
    font-family: "PingFang SC";
    font-size: .2rem;
    font-weight: 500;
    line-height: .2rem;
  }

  .card-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .card-icon {
      flex: 0 0 .68rem;
      height: .68rem;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .card-data {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    flex: 1;
    min-width: 0;
    margin-left: .08rem;
    .data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      margin-bottom: .04rem;

      .num {
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .32rem;
        font-weight: 700;
        line-height: .36rem;
      }

      .unit {
        margin-left: .04rem;
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .16rem;
      }

      .compare-data {
        display: flex;
        align-items: center;
        margin-left: .24rem;
        color: #fff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .16rem;
      }
    }

    .new-add {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #fff;
      font-family: "PingFang SC";
      font-size: .16rem;
      font-weight: 400;
      line-height: .22rem;

      .new-add-data {
        color: #00fff9;
        font-family: DINCondensed-Bold;
        font-size: .22rem;
        font-weight: 700;
        line-height: .26rem;
      }
      .unit {
        margin-left: .04rem;
        color: #0ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .16rem;
      }
    }
  }
}
</style>
