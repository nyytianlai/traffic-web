<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-04-18 17:27:54
 * @LastEditTime: 2022-12-02 15:08:08
 * @FilePath: \traffic-web\src\components\popUps\index.vue
 * @Description: FilePath
-->
<template>
  <div ref="modalBox">
    <a-modal
      v-model:visible="visible"
      :footer="null"
      :title="title"
      :width="width"
      :height="height"
      wrap-class-name="teleport-max-box"
      :destroy-on-close="destroyOnClose"
      centered
      :get-container="() => $refs.modalBox"
      @cancel="cancel"
    >
      <template #closeIcon>
        <svg-icon
          :icon-class="'close'"
          class="header-buttom-icon"
        />
      </template>
      <slot />
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      width: {
        type: [Number, String],
        default: '16.80rem'
      },
      height: {
        type: [Number, String],
        default: '9.08rem'
      },
      title: {
        type: String,
        default: ''
      },
      destroyOnClose: {
        type: Boolean,
        default: true
      },
      bottomBackground: {
        type: String,
        default: ''
      },
      bottomPadding: {
        type: String,
        default: ''
      },
      inWidth: {
        type: [String, Number],
        default: '16.80'
      },
      inHeight: {
        type: [String, Number],
        default: '9.08'
      },
      inPadding: {
        type: [String, Number],
        default: '40'
      },
      maskClosable: {
        // 点击遮罩层是否关闭
        type: Boolean,
        default: true
      },
      bottomHeight: {
        // 底部大小
        type: [String, Number],
        default: '100%'
      },
      bottomBoder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    computed: {
      visible: {
        get () {
          return this.value
        },
        set (vl) {
          this.$emit('update:value', vl)
        }
      }
    },
    methods: {
      cancel () {
        this.$emit('update:value', false)
        this.$emit('cancelModal')
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="less" scoped>
:deep(.ant-modal-centered) {
  .ant-modal {
    top: .5rem;
    padding-bottom: 0;
  }
}
:deep(.ant-modal-content) {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

// color: #54b5ff;
  color: #9bd4ff;
  font-family: PingFangSC-Regular;
  font-size: .16rem;

// background-image: linear-gradient(0deg,#0a1746,#122567);
  background-image: linear-gradient(0deg, #0a124a 0%, #091a56 100%);
  box-shadow: inset 0 0 .1rem 0 rgb(156 234 255 / 22%);
  border: .01rem solid #0085ff;
  border-radius: .02rem;

  .ant-modal-header {
    padding: .24rem .4rem;
    .ant-modal-title {
      color: #fff;
      font-size: .2rem;
      font-weight: 500;
    }
  }

  .ant-modal-body {
    flex: 1;
    min-height: 0;
    padding: 0 .4rem .4rem;
     > div {
      background: #020d30;
    }
  }

  .ant-modal-close {
    top: .2rem;
    right: .4rem;

    .ant-modal-close-x {
      width: .26rem;
      height: .26rem;
      line-height: inherit;
    }
  }

  .header-buttom-icon {
    width: .26rem;
    height: .26rem;
    font-size: .26rem;
  }
}
</style>
