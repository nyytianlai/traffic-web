<template>
  <b
    v-for="(w, z) in lineFloatHorn"
    :key="z + 'lineFloatHorn1'"
    :class="[w, 'corner']"
    :style="{'color':color,'width':width+'px','height':height+'px'}"
  />
</template>
<script>
// 此组件是边框的四个角
  export default {
    name: 'FourCorner',
    props: {
      color: {
        type: String,
        default: '#676a7a'
      },
      width: {
        type: [Number, String],
        default: 4
      },
      height: {
        type: [Number, String],
        default: 4
      }
    },
    data () {
      return {
        lineFloatHorn: ['left-top-dot', 'right-top-dot', 'left-bottom-dot', 'right-bottom-dot']
      }
    }

  }
</script>
<style lang="less" scoped>
.corner {
  display: inline-block;
  width: 4px;
  height: 4px;
  position: absolute;
  background: #676a7a;
}

.left-top-dot {
  left: 0;
  top: 0;
}

.left-bottom-dot {
  left: 0;
  bottom: 0;
}

.right-top-dot {
  right: 0;
  top: 0;
}

.right-bottom-dot {
  right: 0;
  bottom: 0;
}
</style>
