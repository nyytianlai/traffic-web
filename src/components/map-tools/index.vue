<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-11-04 17:02:32
 * @LastEditTime: 2023-01-05 11:01:27
 * @FilePath: \traffic-web\src\components\map-tools\index.vue
 * @Description: FilePath
-->
<template>
  <div
    class="tip-wrapper"
  >
    <div
      v-if="allLayers.length"
      class="left-pan"
      :style="{display: iscollapse ? 'none' : 'block', marginRight: iscollapse ? '0' : '0.06rem'}"
    >
      <div
        v-for="item in allLayers"
        :key="item.code"
        class="layer-item"
        :class="{selected: item.isChecked}"
        @click="handleItem(item)"
      >
        <div class="item-info">
          {{ item.name }}
          <span
            v-if="item.children?.length"
            class="drop-down"
          >
            <svg-icon
              icon-class="arrow-down"
              class="drop"
              :class="{rotate: item.isHover}"
            />
          </span>
        </div>
        <div
          v-if="item.children?.length"
          class="drop-wrapper"
          :style="{
            height: item.isHover ? `${item.children?.length * 0.46}rem` : 0
          }"
        >
          <div
            v-for="drop in item.children"
            :key="drop.code"
            class="drop-item"
            @click="handleDrop(drop, item, $event)"
          >
            <span
              class="check-box"
              :class="{isChecked: drop.isChecked}"
            />
            {{ drop.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="right-icons">
      <div
        v-if="allLayers.length"
        class="arrow"
        @click="handleCallapse"
      >
        <svg-icon
          icon-class="arrow-left"
          :class="{rotate: iscollapse}"
        />
      </div>
      <div
        class="refresh"
        @click="handleRefresh"
      >
        <svg-icon
          icon-class="refresh"
        />
      </div>
    </div>
  </div>
</template>

<script  setup>
  import { nextTick, onBeforeUnmount, watch } from '@vue/runtime-core'

  const props = defineProps({
    allLayers: {
      type: Array,
      default: () => []
    },
    default: {
      type: [String, Number],
      default: undefined
    }
  })

  const timer = ref(null)
  const emit = defineEmits(['handleDrop', 'handleItem', 'handleRefresh'])
  const allLayers = ref(JSON.parse(JSON.stringify(props.allLayers)))

  const iscollapse = ref(true)
  const handleCallapse = () => {
    iscollapse.value = !iscollapse.value
  }
  const handleDrop = (drop, item, e) => {
    e.stopPropagation && e.stopPropagation()
    e.stopImmediatePropagation && e.stopImmediatePropagation()
    if (!item.isChecked) return
    allLayers.value.forEach(obj => {
      (obj.children || []).forEach(sub => {
        if (sub.code !== drop.code) {
          sub.isChecked = false
          emit('handleDrop', sub)
        }
      })
    })
    drop.isChecked = !drop.isChecked
    emit('handleDrop', drop)
  }

  const handleItem = item => {
    item.isHover = !item.isHover
    item.isChecked = !item.isChecked
    allLayers.value.forEach(obj => {
      if (obj.code !== item.code) {
        obj.isChecked = false
        obj.isHover = false;

        (obj.children || []).forEach(sub => {
          sub.isChecked = false
          emit('handleDrop', sub)
        })
      } else {
        (obj.children || []).forEach(sub => {
          sub.isChecked = item.isChecked ? sub.isChecked : false
          emit('handleDrop', sub)
        })
      }
    })
    emit('handleItem', item)
  }

  const handleRefresh = () => {
    allLayers.value = JSON.parse(JSON.stringify(props.allLayers))
    nextTick(() => {
      if (props.default !== undefined) {
        const fd = allLayers.value.find(item => item.code === props.default)
        if (fd) {
          fd.isChecked = true
        }
      }
    })
    emit('handleRefresh')
  }

  onBeforeUnmount(() => {
    clearTimeout(timer.value)
  })

  watch(() => props.default, () => {
    nextTick(() => {
      if (props.default !== undefined) {
        const fd = allLayers.value.find(item => item.code === props.default)
        if (fd) {
          fd.isChecked = true
        }

        if (fd?.children?.length) {
          fd.isHover = true
        }
      }
    })
  }, {
    immediate: true
  })

</script>

<style lang="less" scoped>
.tip-wrapper {
  display: flex;
  flex-flow: row nowrap;

  .left-pan {
    width: 1.92rem;
    transition: all .3s linear;
    .layer-item {
      position: relative;
      width: 100%;
      white-space: nowrap;

      &.selected {
        .item-info {
          background: rgba(84, 181, 255, .3);
          border-color: rgba(84, 181, 255, .8);
          border-radius: 2px;
        }
      }
      .item-info {
        position: relative;
        overflow: hidden;
        padding-left: .12rem;
        color: #54b5ff;
        font-family: "PingFang SC";
        font-size: .16rem;
        font-weight: 400;
        line-height: .3rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: rgba(13, 46, 89, .601519);
        border: 1px solid rgba(84, 181, 255, .3);
        border-radius: 0 0 2px 2px;
        cursor: pointer;

        &:hover {
          background: rgba(84, 181, 255, .3);
          border-color: rgba(84, 181, 255, .8);
          border-radius: 2px;
        }

        .drop-down {
          position: absolute;
          top: 50%;
          right: .12rem;
          transform: translateY(-50%);

          .drop {
            transition: all .3s linear;

            &.rotate {
              transform: rotate(180deg);
            }
          }
        }
      }

      .drop-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 11;
        overflow: hidden;
        width: 100%;
        background: rgba(0, 9, 45, .9);
        transform: translateY(100%);

        .drop-item {
          display: flex;
          align-items: center;
          padding: .1rem .14rem;
          color: #54b5ff;
          font-family: "PingFang SC";
          font-size: .16rem;
          font-weight: 400;
          line-height: .2rem;
          border: 1px solid rgba(84, 181, 255, .3);
          cursor: pointer;

          .check-box {
            position: relative;
            flex: 0 0 .14rem;
            height: .14rem;
            margin-right: .12rem;
            border: 1px solid #54b5ff;
            border-radius: 2px;

            &.isChecked {
              background: #54b5ff;
              &::after {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: .08rem;
                height: .04rem;
                border-bottom: solid 1.4px rgba(#000);
                border-left: solid 1.4px rgba(#000);
                transform: translate(-55%, -75%) rotate(-45deg);
              }
            }
          }
        }
      }
    }
  }

  .right-icons {
    .arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      width: .32rem;
      height: .32rem;
      margin-bottom: .06rem;
      font-size: .32rem;
      background: rgba(13, 46, 89, .6);
      border: 1px solid rgba(84, 181, 255, .3);
      border-radius: 2px;
      transition: all .3s linear;
      cursor: pointer;

      .rotate {
        transform: rotate(180deg);
        transition: all .3s linear;
      }
    }

    .refresh {
      display: flex;
      justify-content: center;
      align-items: center;
      width: .32rem;
      height: .32rem;
      font-size: .32rem;
      cursor: pointer;
    }
  }
}
</style>
