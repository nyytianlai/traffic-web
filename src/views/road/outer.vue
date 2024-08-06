<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-09 17:24:17
 * @LastEditTime: 2023-01-04 09:17:01
 * @FilePath: \traffic-web\src\views\road\outer.vue
 * @Description: FilePath
-->
<template>
  <div class="platform-wrapper">
    <div
      class="top-wrapper"
    >
      <RadioList
        v-model:value="selectedRadio"
        :radio-list="radioList"
      />
    </div>
    <iframe
      ref="irfameRef"
      style="border:none"
      :src="searchParam+selectedRadio"
    />
    <div class="data-from">
      <div>数据来源：市交通运输局</div>
      <div>
        <svg-icon icon-class="datasources" />
        深圳市道路交通运行指数系统
      </div>
    </div>
  </div>
</template>

<script setup>
  import RadioList from '@/components/radio-list'

  // const prefix = process.env.NODE_ENV === 'development' ? '/sdti/' : '/rio-gw/jtj_zsxt/sdti/'
  const prefix = '/sdti/'
  const searchParam = `${prefix}?accesToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZFZhbGlkRGF5cyI6MCwidXNlcl9uYW1lIjoieXd0ZzgwOTAiLCJzbXJfZXhwYW5kMiI6IiIsInJlbWluZFVwZGF0ZVBhc3N3b3JkIjpmYWxzZSwic21yX2V4cGFuZDEiOiIiLCJhdXRob3JpdGllcyI6WyJ5d3RnIl0sImNsaWVudF9pZCI6InpoYW5qaWFuZy1zc28tdGVzdCIsInNtcl9leHBhbmQzIjoiIiwidWlkIjoiYTU5MDBkZDVkY2QxNDEwY2JjNzM0M2YwN2NlYjA2ZTIiLCJpc19maXJzdF9sb2dpbiI6ZmFsc2UsInNjb3BlIjpbImFsbCJdLCJyX2V4cGFuZCI6IjEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDExMSwyMjIsMzMzIiwic21yX2NvbXBhbnlfZmxhZyI6IiIsImV4cCI6MTg4NjI3NzAwOCwianRpIjoiZjVkMDNlMTctMzkyZi00YmYzLWI4NDYtZTQ4NjI5M2U1ZGExIn0.o9LoBaUbNonU8jXBwQj2zaHLXGw0gmqAgLST-c6CscE&tokenType=bearer#`
  const radioList = [
    {
      name: '全景交通',
      value: '/index'
    },
    {
      name: '全市概况',
      value: '/home/city'
    },
    {
      name: '片区路况',
      value: '/rtsect/street'
    },
    {
      name: '道路路况',
      value: '/rtroad/city4'
    }
  ]
  const selectedRadio = ref(radioList[0].value)
  const irfameRef = ref()

  const handler = () => {
    const contentWindow = irfameRef.value.contentWindow
    const doc = contentWindow.document
    const style = doc.createElement('style')
    style.type = 'text/css'
    var textNode = document.createTextNode(`
        .footer-wrap {
          display: none!important;
        }

        .header-wrap.header-menu {
          display: none!important;
        }

        .page-main.full-container {
          padding-bottom: 0!important;
        }
      `)
    style.appendChild(textNode)
    const head = doc.querySelector('head')
    head.appendChild(style)
  }

  onMounted(() => {
    // setTimeout(() => {
    //   const doc = irfameRef.value.contentWindow.document
    //   const link = doc.createElement('link')
    //   link.setAttribute('href', `${process.env.VUE_APP_PUBLIC_PATH}iframe.css`)
    //   const head = doc.querySelector('head')
    //   head.appendChild(link)
    // }, 1000)
    const contentWindow = irfameRef.value.contentWindow
    contentWindow.onload = handler

    contentWindow.onhashchange = function () {
      setTimeout(handler, 1000)
    }

    localStorage.setItem('theme', 'dark')
  })
</script>

<style lang="less" scoped>
.platform-wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  iframe {
    flex: 1;
    overflow: hidden;
    width: 100%;
    min-height: 0;
  }

  .top-wrapper {
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    // background-color: #000527;
    height: .5rem;
  }
  .data-from {
    position: absolute;
    bottom: -0.36rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
     > div {
      color: #54b5ff;
      font-family: "PingFang SC";
      font-size: .14rem;
      font-weight: 400;
      line-height: .2rem;
      text-transform: uppercase;
    }
  }
}
</style>
