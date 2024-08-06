<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-28 16:03:10
 * @LastEditTime: 2022-11-28 17:26:43
 * @FilePath: \traffic-web\src\views\transportation\logistics\components\car-detail.vue
 * @Description: FilePath
-->
<template>
  <div class="detail-wrapper">
    <div class="detail-head">
      <div class="title">
        车辆详情
      </div>
      <div
        class="close-btn"
        @click="handleClose"
      >
        <svg-icon
          icon-class="close"
          class="arrow-right"
          style="width: 0.17rem;height:0.17rem;font-size:0.17rem;color:#54B5FF; "
        />
      </div>
    </div>
    <div class="detail-content">
      <div class="car-info">
        <div class="top-info">
          <div class="left-info">
            {{ data.cph }}
            <div class="car-type">
              {{ data.lx }}
            </div>
          </div>
          <div class="right-info">
            查看轨迹
            <svg-icon
              icon-class="arrow-right"
              class="arrow-right"
              style="width: 0.12rem;height:0.12rem;font-size:0.12rem;color:#54B5FF;margin-left: 0.08rem;"
            />
          </div>
        </div>
        <div class="sub-info">
          <div class="address-icon" />
          {{ data.dqwz }}
        </div>
      </div>
      <div class="detail-info">
        <div
          v-for="item in detailInfo"
          :key="item.name"
          class="detail-info-item"
        >
          <div class="label">
            {{ item.name }}
          </div>
          <div
            class="data"
            :class="[item.class, {isWarning: data[item.zdCode] === '报警'}]"
          >
            <div
              v-if="data[item.zdCode] === '报警'"
              class="warning-icon"
            />
            {{ data[item.code] || '-' }}
            <div
              v-if="item.unit"
              class="unit"
            >
              {{ item.unit }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
  const emits = defineEmits(['close'])
  const detailInfo = [
    {
      name: '当前速度',
      code: 'yxsu',
      unit: '公里/小时',
      class: 'num'
    },
    {
      name: '当前状态',
      code: 'dqzt',
      zdCode: 'dqzt'
    },
    {
      name: '报警原因',
      code: 'bjyy',
      zdCode: 'dqzt'
    },
    {
      name: '监管单位',
      code: 'jgdw'
    },
    {
      name: '报警时间',
      code: 'bjsj'
    },
    {
      name: '入网情况',
      code: 'rwqk'
    },
    {
      name: '上户公司',
      code: 'shgs'
    },
    {
      name: '所属地区',
      code: 'xzqh'
    }
  ]
  const handleClose = () => {
    emits('close')
  }
</script>

<style lang="less" scoped>
.detail-wrapper {
  width: 100%;
  height: 100%;
  padding: 23px 35px;
  background: linear-gradient(0deg, #0a1746 0%, #122567 100%);
  box-shadow: inset 0 0 10px rgba(156, 234, 255, .221779);
  border: 1px solid #0085ff;
  border-radius: 2px;

  .detail-head {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .title {
      color: #fff;
      font-family: "PingFang SC";
      font-size: 20px;
      font-weight: 400;
      line-height: 26px;
    }
  }

  .detail-content {
    padding: 24px;
    background: rgba(#020d30, .5);
    .car-info {
      position: relative;
      margin-bottom: .24rem;

      &::after {
        content: "";
        position: absolute;
        bottom: -.12rem;
        left: 0;
        width: 100%;
        height: .01rem;
        background-color: rgba(#fff, .2);
      }
      .top-info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .04rem;

        .left-info {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          color: #54b5ff;
          font-family: "PingFang SC";
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;

          .car-type {
            padding: 1px 2px;
            margin-left: .08rem;
            color: #ec2121;
            font-family: "PingFang SC";
            font-size: 12px;
            font-weight: 400;
            line-height: 17px;
            border: 1px solid #ec2121;
            border-radius: 2px;
          }
        }

        .right-info {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          color: #54b5ff;
          font-family: "PingFang SC";
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          cursor: pointer;
        }
      }

      .sub-info {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: rgba(255, 255, 255, .7);
        font-family: "PingFang SC";
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;

        .address-icon {
          flex: 0 0 .2rem;
          height: .2rem;
          margin-right: .04rem;
          background-image: url("~@/assets/images/address.png");
          background-size: 100% 100%;
        }
      }
    }

    .detail-info {
      display: flex;
      flex-flow: row wrap;
      align-items: center;

      .detail-info-item {
        flex: 0 0 calc(100% / 3);
        margin-bottom: 24px;

        &:last-of-type,
        &:nth-of-type(7) {
          margin-bottom: 0;
        }

        .label {
          margin-bottom: .04rem;
          color: rgba(255, 255, 255, .7);
          font-family: "PingFang SC";
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }

        .data {
          display: flex;
          flex-flow: row nowrap;
          color: #fff;
          font-family: "PingFang SC";
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;

          &.num {
            align-items: baseline;
            color: #00fff9;
            font-family: DINCondensed-Bold;
            font-size: 22px;
            font-weight: 700;
            line-height: 26px;
          }

          &.isWarning {
            align-items: center;
            color: #ff5f37;
            .warning-icon {
              flex: 0 0 .2rem;
              height: .2rem;
              margin-right: .04rem;
              background-image: url("~@/assets/images/warning.png");
              background-size: 100% 100%;
            }
          }

          .unit {
            margin-left: .04rem;
            font-family: "PingFang SC";
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
    }
  }

  .arrow-right {
    cursor: pointer;
  }
}
</style>
