<!--
 * @Author: niyayong
 * @LastEditors: niyayong@sutpc.com
 * @Date: 2022-04-18 17:27:54
 * @LastEditTime: 2024-07-08 16:25:03
 * @FilePath: /traffic-web/src/components/layout/components/header.vue
 * @Description: FilePath
-->
<template>
  <div class="subject-header">
    <div class="text" />
    <div class="buttom-group">
      <svg-icon
        v-for="item in buttomList"
        :key="item"
        :icon-class="item.icon"
        class="header-buttom-icon"
        @click="item.click && item.click(item)"
      />
    </div>
    <div class="page-name">
      <div
        v-for="(item, i) in pageName"
        :key="item.path"
        class="page-item"
      >
        <div
          :class="{highlight: i === pageName.length - 1}"
          @click="handleClick(item, i !== pageName.length - 1)"
        >
          {{ item.meta?.title }}
        </div>
        <div
          v-if="i !== pageName.length - 1"
          class="separte"
        >
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import { useStore } from 'vuex'
// import { routes } from '@/router'
  import { useRoute, useRouter } from 'vue-router'
  import * as Cookie from '@/utils/cookie.js'
  import { getQueryString, getSearchParam } from '@/utils/common'
  // import { nextTick } from '@vue/runtime-core'
  // const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const buttomList = [
    {
      icon: 'back',
      click: () => {
        window.history.go(-1)
      }
    },
    // {
    //   icon: 'bars'
    // },
    // {
    //   icon: 'setting'
    // },
    {
      icon: 'close',
      click: () => {
        window.history.go(-1)
      }
    }
  ]
  const pageName = computed(() => {
    return route.matched || []
  })

const handleClick = (item, bool) => {
    const token = getQueryString('token') || getSearchParam('token') || Cookie.getCookie('token')
    if (!bool) return
    // router.push(item.children[0].realPath)

    // router.replace(item.children[0].realPath)
    router.replace({
      path: item.children[0].realPath,
      query: { token }
    })
  }
</script>
<style lang="less" scoped>
.subject-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 .76rem;
  width: 100%;
  height: .76rem;
  margin-bottom: .24rem;
  background-image: url("~@/assets/images/header.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .text {
    width: 2rem;
    height: .46rem;
    background-image: url("~@/assets/images/title.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
  }

  .buttom-group {
    position: absolute;
    top: 40%;
    right: 4.2%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 22px;
    svg {
      margin-right: .34rem;
      cursor: pointer;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .page-name {
    position: absolute;
    top: 40%;
    left: .6rem;
    display: flex;
    flex-flow: row nowrap;

    .page-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
       > div:first-of-type {
        color: rgba(84, 181, 255, .45);
        font-family: "PingFang SC";
        font-size: .14rem;
        font-weight: 400;
        white-space: nowrap;
        cursor: pointer;

        &.highlight {
          color: #54b5ff;
        }
      }
      .separte {
        margin: 0 .08rem;
        color: rgba(84, 181, 255, .45);
      }
    }
  }
}
</style>
