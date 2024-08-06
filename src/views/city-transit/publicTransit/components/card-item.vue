<template>
  <div class="card-item-wrapper">
    <div class="card-content-wrapper">
      <div class="card-top">
        <p>{{ data.name }}</p>
        <div
          v-if="data.showDetail"
          class="show-detail"
          @click="showDetail(data)"
        >
          查看<svg-icon
            icon-class="arrow-right"
            style="margin-left: 0.08rem; font-size: 0.12rem"
          />
        </div>
      </div>
      <div class="card-bottom">
        <img :src="data.icon">
        <div class="right-info">
          <div class="info-data">
            {{ formatNumStr(data.value) }}<span>{{ data.unit }}</span>
          </div>
          <div class="compare">
            {{ data.compareName }}
            {{ data.compareValue || '--' }}%
            <svg-icon
              v-if="Number(data.compareValue) && !Number.isNaN(Number(data.compareValue))"
              :icon-class="Number(data.compareValue) < 0 ? 'drop' : 'rise'"
              style="font-size: 0.12rem; width: 0.12rem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import utils from '@/hooks/utils'
  const formatNumStr = utils.formatNumStr
  const emits = defineEmits(['showDetail'])
  defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
  const showDetail = (data) => {
    emits('showDetail', data)
  }
</script>

<style lang="less" scoped>
.card-item-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  padding: .11rem .16rem;
  background: rgba(55, 97, 232, .12);
  box-shadow: 0 1px 14px 0 rgba(0, 0, 0, .20), 0 0 35px 0 rgba(#294cb3, .2) inset;
  border: 1.4px solid rgba(#0085ff, .2);
  .card-content-wrapper {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    min-width: 0;

    row-gap: .08rem;
  }

  .card-top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    p {
      margin: 0;
      color: #fff;
      font-size: .16rem;
      font-weight: 400;
    }

    .show-detail {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #54b5ff;
      font-size: .16rem;
      font-weight: 400;
      cursor: pointer;
    }
  }
  .card-bottom {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    column-gap: .12rem;
    img {
      flex: 0 0 .56rem;
      width: .56rem;
    }

    .info-data {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      color: #00fff9;
      font-family: "DINCondensed-Bold";
      font-size: .36rem;
      font-weight: 700;
      line-height: .2rem;
      text-shadow: 0 .02rem 01rem rgba(75, 222, 255, .50);
      span {
        margin-left: .08rem;
        color: #00fff9;
        font-size: .16rem;
        font-weight: 400;
      }
    }
    .compare {
      color: #fff;
      font-size: .16rem;
      font-weight: 400;
    }
  }
}
</style>
