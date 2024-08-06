/** [传参]： tabList: [ { name: String -------名称, key: [String, Number]-----key值 showIcon:
Boolean --------是否显示问号图标, showIconTitle: String --------弹窗表题, showIconText: String
--------弹窗内容, disabled: Boolean -------是否需要禁用 }] **/
<template>
  <div
    class="tab-card"
    :style="cardWidth()"
  >
    <div
      v-if="tabInBottom"
      :class="['tab-content',{'tab-content-nobackground':!isBackground}]"
      :style="tabContentStyle()"
    >
      <slot />
    </div>
    <div class="card-header">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        class="box-tabs"
      >
        <div
          class="tabs"
          :class="{ 'action-tab': action === item.key }"
          :style="createBoard(index)"
          @click="selectTab($event, item, index)"
        >
          <div
            class="tab-title"
            :style="{ color: action === item.key ? activeColor : titleColor }"
          >
            <span :style="getFontStyle(item)">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!tabInBottom"
      :class="['tab-content',{'tab-content-nobackground':!isBackground}]"
      :style="tabContentStyle()"
    >
      <slot />
    </div>
  </div>
</template>
<script>
  export default {
    provide () {
      return {
        actions: this.actions
      }
    },
    props: {
      tabList: {
        type: Array,
        default: () => {
          return []
        }
      },
      width: {
        type: [String, Number],
        default: '500px'
      },
      height: {
        type: [String, Number],
        default: '300px'
      },
      vertical: {
        type: Boolean,
        default: false
      },
      noPadding: {
        type: Boolean,
        default: false
      },
      titleColor: {
        type: String,
        // default: '#54B5FF'
        default: '#9bd4ff'
      },
      activeColor: {
        type: String,
        default: '#FFFFFF'
      },
      fontSize: {
        type: [String, Number],
        default: '0.2rem'
      },
      defaultAction: {
        type: String,
        default: ''
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      padding: {
        type: Number,
        default: 10
      },
      isBackground: {
        type: Boolean,
        default: true
      },
      tabInBottom: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        action: '',
        actions: {
          index: 0
        },
        questionBlue: require('@/assets/icons/question-blue.png'),
        questionWhite: require('@/assets/icons/question-fff.png'),
        showTip: false,
        showTipArr: [],
        tipStyle: {}
      }
    },
    watch: {
      tabList: {
        handler: function (val) {
          this.action = this.defaultAction === '' ? val[0].key : this.defaultAction
          this.actions.index = this.defaultAction === '' ? val[0].key : this.defaultAction
          if (val.length !== this.showTipArr.length) {
            val.forEach((item) => {
              this.showTipArr.push(false)
            })
          }
        },
        immediate: true
      }
    },
    mounted () {
      this.tipStyleFn()
    },
    methods: {
      getTitleColor (item) {
        return {
          color: item.icon.titleColor
        }
      },
      tipStyleFn () {
        const arr = []
        this.showTipArr.forEach((item) => arr.push(false)) // 这里用2的方法写的,vue3不支持$set
        this.showTipArr = arr
        if (JSON.stringify(this.$refs) !== '{}') {
          const dom = this.$refs['wenhao-0'][0]
          const left = dom.offsetParent?.offsetWidth - dom.offsetLeft + 10
          this.tipStyle = {
            left: `${left}px`
          }
          return
        }
        this.tipStyle = {
          right: '-220px'
        }
      },
      svgIconStyle (item) {
        const right =
          typeof item.icon.right === 'number' ||
          (typeof item.icon.right === 'string' && item.icon.right.indexOf('px') === -1)
            ? item.icon.right + 'px'
            : item.icon.right
        return {
          right: right
        }
      },
      getFontStyle (item) {
        const style = {}
        if (item.disabled) {
          style.cursor = 'default'
          style.color = '#888888'
        }
        const fs =
          typeof this.fontSize === 'number' ? this.fontSize + 'rem'
          : this.fontSize
        return {
          fontSize: fs,
          lineHeight: fs,
        ...style
        }
      },
      selectTab (event, item, index) {
        if (item.disabled) return
        if (event.target.className === 'wenhao') {
          this.showTipArr[index] = !this.showTipArr[index]
          this.$emit('handleIconClick')
        } else {
          const arr = []
          this.showTipArr.forEach((item) => arr.push(false)) // 这里用2的方法写的,vue3不支持$set
          this.showTipArr = arr
        }
        this.action = item.key
        this.actions.index = item.key
        this.$emit('select-tab', item)
      },
      cardWidth () {
        if (typeof this.width === 'number') {
          return {
            width: this.width + 'px'
          }
        } else {
          return {
            width: this.width
          }
        }
      },
      tabContentStyle () {
        let h = this.height
        if (typeof this.height === 'number') {
          h = this.height + 'px'
        }
        if (this.noPadding) {
          return {
            height: h,
            border: 0
          }
        } else {
          return {
            height: h,
            padding: this.padding + 'px'
          }
        }
      },
      createBoard (index) {
        if (this.vertical && index !== 0) {
          return {
            'border-left': '1px solid #003A65'
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.tab-card {
  box-sizing: content-box;
  color: white;
}

.card-header {
  display: flex;
  flex-direction: row;
  height: 36px;
  border: 1px transparent solid;
  border-image: linear-gradient(to right, #0077b0, #003a65) 1 10;
}
.box-tabs {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  color: #f4f6f8;
}

.tabs {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
          clip-path: polygon(0% 100%, 23px 0%, 100% 0%, 96% 100%);
  color: #f4f6f8;
  line-height: 36px;
  text-align: center;
  cursor: pointer;

  -webkit-clip-path: polygon(0% 100%, 23px 0%, 100% 0%, 96% 100%);
}
.box-tabs:first-child .tabs {
          clip-path: polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%);

  -webkit-clip-path: polygon(0% 100%, 0% 0%, 100% 0%, 96% 100%);
}

.box-tabs:not(:first-child) .tabs::before {
  content: " ";
  position: absolute;
  top: -7px;
  left: 2px;
  display: block;
  width: 2px;
  height: 75px;
  text-align: center;
  background-color: #135f72;
  transform: rotate(35deg);
}

.tabs.action-tab::after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #00568f, rgba(0, 0, 0, 0));
}
.tab-title {
  position: relative;
  left: 10px;
  z-index: 1;
  flex-grow: 1;
}

.tab-content {
  width: 100%;
  background-image: linear-gradient(180deg, rgba(0, 133, 255, 0) 0%, #00b2ff20 100%);
  border: 1px transparent solid;
  border-image: linear-gradient(to bottom, #001130, #013d77) 1 10;
}

.tab-content-nobackground {
  width: 100%;
  background-image: none;
  border: 0;
}
.wenhao {
  position: relative;
  top: -2px;
  width: 20px;
  height: 20px;
  margin-left: 8px;
  cursor: pointer;
}

.svgFire {
  position: absolute;
  top: -3px;
  margin-top: 2px;
  font-size: 18px;
}

.svgFire-title {
  margin-right: 7px;
}

.disabled {
  .tab-title:nth-child(1) {
    color: #888;
  }
}
.tip {
  position: absolute;
  top: 10px;
  z-index: 9999;
  width: 260px;
  background: rgba(0, 9, 45, .9);
  border: 1px solid rgba(84, 181, 255, .5);
  p {
    margin: 0 20px;
    color: #00fff9;
    font-size: 16px;
    line-height: 40px;
    border-bottom: 1px solid #283946;
  }
  div {
    margin: 10px 20px;
  }
}
.box-tabs:last-child .tip {
  right: 245px;
}
</style>
