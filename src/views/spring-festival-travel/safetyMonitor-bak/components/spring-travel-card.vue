<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-16 14:07:55
 * @LastEditTime: 2022-11-30 14:59:25
 * @FilePath: \traffic-web\src\views\spring-festival-travel\safetyMonitor\components\spring-travel-card.vue
 * @Description: FilePath
-->
<template>
  <div class="spring-travel-card-wrapper">
    <!-- <div class="top-card">
      <div class="top-left">
        <div class="border">
          <div class="calander">
            <div class="calander-top">
              <div class="circle" />
              <div class="circle" />
            </div>
            <div class="calander-bottom">
              <div class="date">
                25
              </div>
              <div class="month">
                一月
              </div>
            </div>
          </div>
        </div>
        <div class="label">
          春运
        </div>
      </div>
      <div class="top-right">
        <div class="right-label">
          第<span>{{ formatData('春运第几天') }}</span>天
        </div>
      </div>
    </div> -->
    <div class="top-card">
      <div
        v-show="isSpring"
        class="chunyun-card"
      >
        <div class="chunyundi">
          春运第
        </div>
        <div class="card-num">
          {{ formatData('春运第几天') }}
        </div>
        <div class="tian">
          天
        </div>
      </div>
      <div
        v-show="!isSpring"
        class="chunyun-card"
      >
        <div class="card-num">
          <!-- {{ formatData('春运第几天') }} -->
          {{ new Date().getFullYear() }}
        </div>
        <div class="tian">
          年春运
        </div>
      </div>
    </div>
    <div class="bottom-card">
      <div
        v-for="item in config"
        :key="item.name"
        class="card-item"
      >
        <div class="top">
          <div class="right-info">
            <div class="title">
              {{ item.name }}
              <DataTypeBtn
                :type="item.dataType"
                :show-drop="false"
                drop-info="2022-10-31"
              />
            </div>
            <div class="data">
              <div class="num">
                {{ formatData(item.dataName) }}
              </div>
              <div class="unit">
                {{ item.unit }}
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-info">
          同比去年{{ formatData(item.compareName) }}%
          <svg-icon
            v-if="Number(formatData(item.compareName)) && !Number.isNaN(Number(formatData(item.compareName)))"
            :icon-class="Number(formatData(item.compareName)) < 0 ? 'drop' : 'rise'"
            style="font-size: 0.12rem; width: 0.12rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DataTypeBtn from '@/components/data-type-btn'
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const props = defineProps({
    data: {
      type: Array,
      default: () => ([])
    },
    isSpring: {
      type: Boolean,
      default: false
    }
  })
  const config = [
    {
      name: '流入',
      dataName: '流入客流量',
      dataType: '实时',
      unit: '万人次',
      compareName: '流入客流量同比去年'
    },
    {
      name: '流出',
      dataName: '流出客流量',
      dataType: '实时',
      unit: '万人次',
      compareName: '流出客流量同比去年'
    }
  ]

  const formatData = (name) => {
    const fd = props.data.find(item => item.zbmc === name)
    return formatNumStr(fd?.zbz)
  }
</script>

<style lang="less" scoped>
.spring-travel-card-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: .14rem .24rem;
  background: linear-gradient(0deg, rgba(#00b2ff,.3) -36.53%, rgba(0, 133, 255, .0001) 100%);

  .top-card {
    display: flex;
    justify-content: center;
    align-items: center;

// display: flex;
    // flex-flow: row nowrap;
    // flex: 0 0 .68rem;
    // background: rgba(232, 55, 255, .12);
    // box-shadow: 0 1px 14px rgba(255, 107, 0, .195203), inset 0 0 35px rgba(#ff6b00, .4);
    // .top-left {
    //   position: relative;
    //   display: flex;
    //   flex-flow: row nowrap;
    //   align-items: center;
    //   flex: 0 0 calc(50% - .24rem);
    //   padding-left: .4rem;
    //   &::after {
    //     content: "";
    //     position: absolute;
    //     top: 50%;
    //     right: 0;
    //     width: .01rem;
    //     height: .5rem;
    //     border-right: dashed .01rem #760b16;
    //     transform: translateY(-50%);
    //   }
    //   .border {
    //     position: relative;
    //     flex: 0 0 .48rem;
    //     height: .47rem;
    //     background: rgba(255, 105, 107, .13);
    //     border-radius: 3px 0 0 3px;
    //     .calander {
    //       position: absolute;
    //       top: .03rem;
    //       left: -.03rem;
    //       display: flex;
    //       flex-flow: column nowrap;
    //       width: 100%;
    //       height: 100%;
    //       background: rgba(255, 105, 107, .13);
    //       border-radius: 3px;
    //       .calander-top {
    //         display: flex;
    //         flex-flow: row nowrap;
    //         justify-content: center;
    //         align-items: center;
    //         flex: 0 0 .12rem;
    //         background: rgba(5, 178, 190, .25);
    //         .circle {
    //           position: relative;
    //           width: .08rem;
    //           height: .08rem;
    //           border: 2.7px solid rgba(255, 105, 107, .13);
    //           border-radius: 50%;
    //           &:first-of-type {
    //             margin-right: .08rem;
    //           }
    //           &::after {
    //             content: "";
    //             position: absolute;
    //             top: 50%;
    //             left: 50%;
    //             width: .06rem;
    //             height: .06rem;
    //             border: .7px solid #979797;
    //             border-radius: 50%;
    //             transform: translate(-50%, -50%);
    //           }
    //         }
    //       }
    //       .calander-bottom {
    //         display: flex;
    //         flex-flow: column nowrap;
    //         justify-content: center;
    //         align-items: center;
    //         width: 100%;
    //         height: calc(100% - .12rem);
    //         .date {
    //           margin-top: -.04rem;
    //           color: #fff;
    //           font-family: "PingFang SC";
    //           font-size: .16rem;
    //           font-weight: 600;
    //           line-height: .2rem;
    //         }
    //         .month {
    //           color: #fff;
    //           font-family: "PingFang SC";
    //           font-size: .16rem;
    //           font-weight: 400;
    //           line-height: .1rem;
    //           transform: scale(.5);
    //         }
    //       }
    //     }
    //   }
    //   .label {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     flex: 0 0 .6rem;
    //     height: .47rem;
    //     color: #ffe1e1;
    //     font-family: "PingFang SC";
    //     font-size: .2rem;
    //     font-weight: 500;
    //     background: linear-gradient(90deg, rgba(255, 0, 0, .38) 0%, rgba(255, 0, 0, 0) 100%);
    //     border-radius: 2px;
    //   }
    // }
    // .top-right {
    //   flex: 1;
    //   min-width: 0;
    //   padding-left: .24rem;
    //   .right-label {
    //     display: flex;
    //     flex-flow: row nowrap;
    //     align-items: center;
    //     height: 100%;
    //     color: #ffe1e1;
    //     font-family: "PingFang SC";
    //     font-size: .2rem;
    //     font-weight: 500;
    //     span {
    //       margin: 0 .04rem;
    //       color: #ffe1e1;
    //       font-family: "PingFang SC";
    //       font-size: .2rem;
    //       font-weight: 500;
    //     }
    //   }
    // }
    flex: 0 0 .66rem;

    .chunyun-card {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      flex: 0 0 2.82rem;
      width: 2.82rem;
      padding: .06rem .32rem;
      background-image: url("~@/assets/images/chunyunBg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .chunyundi {
        flex: 0 0 1rem;
        color: #fff;
        font-family: "YouSheBiaoTiHei";
        font-size: 36px;
        font-weight: 400;
        line-height: .38rem;
        text-shadow: 0 2px 20px rgba(0, 133, 255, .85), 0 0 30px rgba(0, 209, 255, .65);
        white-space: nowrap;
      }

      .card-num {
        flex: 1;
        font-family: "DS-Digital";
        font-size: .38rem;
        font-style: italic;
        font-weight: 700;
        letter-spacing: .03rem;
        text-align: center;
        text-shadow: 5.94595px 13.6757px 13.6757px rgba(0, 0, 0, .6);
        text-transform: uppercase;
        background: linear-gradient(227.66deg, #fd4646 15.6%, rgba(255, 225, 68, .74) 100%);
                background-clip: text;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .tian {
        flex: 0 0 .34rem;
        margin-left: .08rem;
        color: #fff;
        font-family: "YouSheBiaoTiHei";
        font-size: 36px;
        font-weight: 400;
        line-height: .38rem;
        text-shadow: 0 2px 20px rgba(0, 133, 255, .85), 0 0 30px rgba(0, 209, 255, .65);
        white-space: nowrap;
      }
    }
  }

  .bottom-card {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    flex: 1;
    min-height: 0;
    margin-top: .08rem;

    .card-item {
      flex: 0 0 calc(50% - .06rem);
      padding: .08rem .12rem;
      background: rgba(55, 97, 232, .12);
      box-shadow: 0 1px 14px rgba(0, 0, 0, .195203), inset 0 0 35px rgba(#294cb3, .37);
      border: 1.4px solid rgba(#0085ff, .37);
      .top {
        display: flex;
        flex-flow: row nowrap;

        .right-info {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;

          .title {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            color: #fff;
            font-family: "PingFang SC";
            font-size: .16rem;
            font-weight: 500;

            :deep(.data-type-wrapper) {
              margin-left: .08rem;
            }
          }

          .data {
            display: flex;
            flex-flow: row nowrap;
            align-items: baseline;

            .num {
              margin-right: .08rem;
              color: #00fff9;
              font-family: DINCondensed-Bold;
              font-size: .28rem;
              font-weight: 700;
              line-height: .32rem;
            }

            .unit {
              color: #0ff;
              font-family: "PingFang SC";
              font-size: .12rem;
              font-weight: 400;
            }
          }
        }
      }

      .bottom-info {
        display: flex;
        align-items: center;
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
  }
}
</style>
