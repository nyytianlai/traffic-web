<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-09-26 17:39:09
 * @LastEditTime: 2023-01-05 10:59:29
 * @FilePath: \traffic-web\src\components\layout\components\content.vue
 * @Description: FilePath
-->
<template>
  <div class="main-content">
    <div class="nav-list">
      <!-- <div
        v-show="$route.meta.dataInfo"
        class="data-tip"
      >
        <span class="circle">
          <ExclamationOutlined />
        </span>
        <span class="text">{{ $route.meta.dataInfo }}</span>
      </div> -->
      <div
        v-for="item in newRoutes.filter(item => item.meta)"
        :key="item.name"
        class="link-item"
        :class="{ activeTab: selectTab === item.path, disabled: item.meta.disabled, isHot: item.meta.isHot }"
        @click="handleTab(item)"
        @mouseover="handleHover(item)"
        @mouseout="handleOut(item)"
      >
        <div class="dot top-left" />
        <div class="dot top-right" />
        <div class="dot bottom-left" />
        <div class="dot bottom-right" />
        {{ item?.meta?.title }}
        <div
          v-if="item.children?.length"
          class="drop-down"
          :style="{height: `${item.isHover && item.children?.length ? item.children?.length * 0.41 : 0}rem` }"
        >
          <div
            v-for="child in item.children"
            :key="child.realPath"
            :class="['drop-item', { active: selectRadio === child.realPath }, { disabled: child.meta.disabled }, {isHot: item.meta.isHot}]"
            @click.self="handleDrop(item, child, $event)"
          >
            {{ child.meta.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <router-view />
      <!-- <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <keep-alive :exclude="excludeViews">
            <component :is="wrap(route.fullPath, Component)" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </router-view> -->
    </div>
  </div>
</template>

<script setup>
  import { routes } from '@/router/index'
  import { computed, h, nextTick } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ExclamationOutlined } from '@ant-design/icons-vue'
  const route = useRoute()
  const router = useRouter()
  const wrapperMap = new Map()

  const newRoutes = ref(routes)

  const excludeViews = ref([])
  const selectTab = computed(() => {
    return route.matched[0]?.path || ''
  })

  const selectRadio = computed(() => {
    return route.matched[1]?.path || ''
  })

  // const allViews = computed(() => {
  //   const names = []
  //   routes.forEach(item => {
  //     if (item.children?.length) {
  //       item.children.forEach(child => {
  //         if (child.meta.keepAlive) {
  //           names.push(child.realPath || item.path)
  //         }
  //       })
  //     } else {
  //       if (item.meta?.keepAlive) {
  //         names.push(item.realPath || item.path)
  //       }
  //     }
  //   })
  //   return names
  // })

  const getExcludeViews = (list, flag = false) => {
    list.forEach(item => {
      const isDropChildren = flag || item?.children?.lenght
      if (item.children?.length) {
        getExcludeViews(item.children, isDropChildren)
      } else {
        if (!item.meta?.keepAlive) {
          excludeViews.value.push(item.realPath || item.path)
        } else {
          if (flag) {
            excludeViews.value.push(item.realPath || item.path)
          }
        }
      }
    })
  }

  nextTick(() => getExcludeViews(routes))

  const handleHover = (tab) => {
    tab.isHover = true
  }
  const handleOut = (tab) => {
    tab.isHover = false
  }

  const handleTab = data => {
    if ((Object.prototype.hasOwnProperty.call(data.meta, 'disabled') && data.meta.disabled)) {
      return
    }
    const path = data.children?.length ? data.children[0].realPath : (data.realPath || data.path)
    if (path === route.fullPath) return
    // router.push(path)
    router.replace(path)
  }

  const handleDrop = (tab, child, e) => {
    e.stopPropagation && e.stopPropagation()
    e.stopImmediatePropagation && e.stopImmediatePropagation()
    const path = child.realPath
    if (path === route.fullPath || child.meta.disabled) return
    // router.push(path)
    router.replace(path)
    tab.isHover = false
  }
  // eslint-disable-next-line
const wrap = (fullPath, component) => {
    let wrapper
    // 重点就是这里，这个组件的名字是完全可控的，
    // 只要自己写好逻辑，每次能找到对应的外壳组件就行，完全可以写成任何自己想要的名字
    // 这就能配合 keep-alive 的 include 属性可控地操作缓存
    if (component) {
      const wrapperName = fullPath
      if (wrapperMap.has(wrapperName)) {
        wrapper = wrapperMap.get(wrapperName)
      } else {
        wrapper = {
          name: wrapperName,
          render () {
            return h('div', { className: 'vaf-page-wrapper', style: { width: '100%', height: '100%' } }, component)
          }
        }
        wrapperMap.set(wrapperName, wrapper)
      }
      return h(wrapper)
    }
  }
</script>

<style lang="less" scoped>
.main-content {
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  width: 100%;
  min-height: 0;
  padding: 0 .6rem .6rem;
  position: relative;

  .nav-list {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;

    .link-item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: .32rem;
      padding: 0 .48rem;
      margin-right: .2rem;
      color: #54b5ff;
      font-family: PingFangSC-Medium;
      font-size: .16rem;
      background: rgba(84, 181, 255, .1);
      border: 1px solid rgba(84, 181, 255, .3);
      cursor: pointer;

      &.activeTab {
        color: #fff;
        background: rgba(84, 181, 255, .3);
        border: 1px solid #54b5ff;
      }

      &.isHot {
        color: #f9e900;
        background: rgba(249, 233, 0, .1);
        border: 1px solid rgba(249, 233, 0, .3);

        &.activeTab {
          color: #fff;
          background: #8e8619;
          border: 1px solid rgba(255,243,60,.3);
          border: 1px solid rgba(#f9e900, .9);
        }

        .dot {
          background: rgba(255, 255, 255, .6);
        }
      }

      &.disabled {
        color: rgba(155, 212, 255, .5) !important;
        background: rgba(84, 181, 255, .2) !important;
        border: 1px solid rgba(84, 181, 255, .2) !important;
        cursor: not-allowed;
      }

      &:last-of-type {
        margin-right: 0;
      }

      .dot {
        position: absolute;
        width: 2px;
        height: 2px;
        background: #3cd4fa;

        &.top-left {
          top: 0;
          left: 0;
        }

        &.top-right {
          top: 0;
          right: 0;
        }

        &.bottom-left {
          bottom: 0;
          left: 0;
        }

        &.bottom-right {
          right: 0;
          bottom: 0;
        }
      }

      .drop-down {
        position: absolute;
        top: .4rem;
        z-index: 100;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
        background: #080c36e5;

// border: 1px solid rgba(84, 181, 255, .3);
        transition: all .3s ease-in-out;

        .drop-item {
          width: 100%;
          height: .4rem;
          padding-left: .16rem;
          color: #9bd4ff;
          font-family: SF Pro Display;
          font-size: .16rem;
          line-height: .4rem;
          border: 1px solid rgba(84, 181, 255, .3);
          border-top: none;
          border-bottom: none;
          cursor: pointer;

          &:first-of-type {
            border-top: 1px solid rgba(84, 181, 255, .3);
          }
          &:last-of-type {
            border-bottom: 1px solid rgba(84, 181, 255, .3);
          }

          &:hover {
            color: #fff;
            background: rgba(22, 59, 115, .9);
          }

          &.disabled {
            background-color: transparent !important;
            cursor: not-allowed;
          }

          &.active {
            color: #fff;
          }

          &.isHot {
            color: #f9e900;
            background: rgba(249, 233, 0, .1);

            &.active {
              color: #fff;
            }

            &:hover {
              color: #fff;
              background-color: #887f09;
            }
          }
        }
      }
    }

    .data-tip {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      max-width: 2.3rem;
      padding: .04rem .08rem;
      border: .5px solid #ff8d00;
      border-radius: 2px;

      .text {
        color: #ff8d00;
        font-size: .16rem;
        font-weight: 400;
        line-height: .22rem;
        white-space: normal;
      }

      .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 .14rem;
        width: .14rem;
        height: .14rem;
        margin-top: .04rem;
        margin-right: .04rem;
        color: #000;
        font-size: .1rem;
        background: #ff8d00;
        border-radius: 50%;
      }
    }
  }

  .radio-list {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 24px;

    .radio-item {
      position: relative;
      padding-left: 14px;
      margin-right: 32px;
      color: #9bd4ff;
      font-size: 20px;
      cursor: pointer;

      &.activeRadio {
        color: #f9e900;

        &::before {
          background-color: #f9e900;
        }
      }

      &.disabled {
        color: rgba(#9bd4ff, .5) !important;
        cursor: not-allowed !important;

        &::before {
          background-color: rgba(#54b5ff, .5);
        }
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 10px;
        height: 10px;
        background-color: #54b5ff;
        border-radius: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .content-wrapper {
    flex: 1;
    min-height: 0;
  }
}
</style>
