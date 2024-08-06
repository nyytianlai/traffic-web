<!--
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-12-09 17:24:17
 * @LastEditTime: 2022-12-26 11:26:08
 * @FilePath: \traffic-web\src\views\overview\components\outer.vue
 * @Description: FilePath
-->
<template>
  <div class="platform-wrapper">
    <iframe
      ref="irfameRef"
      style="border:none"
      :src="url"
    />
  </div>
</template>

<script setup>
  const irfameRef = ref()
  // const prefix = process.env.NODE_ENV === 'development' ? '/sdti/' : '/rio-gw/jtj_zsxt/sdti/'
  const prefix = '/sdti/'
  const url = `${prefix}?accesToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZFZhbGlkRGF5cyI6MCwidXNlcl9uYW1lIjoieXd0ZzgwOTAiLCJzbXJfZXhwYW5kMiI6IiIsInJlbWluZFVwZGF0ZVBhc3N3b3JkIjpmYWxzZSwic21yX2V4cGFuZDEiOiIiLCJhdXRob3JpdGllcyI6WyJ5d3RnIl0sImNsaWVudF9pZCI6InpoYW5qaWFuZy1zc28tdGVzdCIsInNtcl9leHBhbmQzIjoiIiwidWlkIjoiYTU5MDBkZDVkY2QxNDEwY2JjNzM0M2YwN2NlYjA2ZTIiLCJpc19maXJzdF9sb2dpbiI6ZmFsc2UsInNjb3BlIjpbImFsbCJdLCJyX2V4cGFuZCI6IjEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDExMSwyMjIsMzMzIiwic21yX2NvbXBhbnlfZmxhZyI6IiIsImV4cCI6MTg4NjI3NzAwOCwianRpIjoiZjVkMDNlMTctMzkyZi00YmYzLWI4NDYtZTQ4NjI5M2U1ZGExIn0.o9LoBaUbNonU8jXBwQj2zaHLXGw0gmqAgLST-c6CscE&tokenType=bearer#/index`

  const handler = () => {
    const contentWindow = irfameRef.value.contentWindow
    const doc = contentWindow.document
    const style = doc.createElement('style')
    style.type = 'text/css'
    var textNode = document.createTextNode(`
        .footer-wrap,
        .header-wrap.header-menu,
        .left-part,
        .right-part,
        .exponent-legend-wrap {
          display: none!important;
        }

        .exponent-legend-wrap {
          left: -422px!important;
          bottom: 0!important;
        }

        .page-main.full-container {
          padding-bottom: 0!important;
        }

        .center .switch-area-wrap {
          right: -412px!important;
          bottom: 8px!important;
        }
      `)
    style.appendChild(textNode)
    const head = doc.querySelector('head')
    head.appendChild(style)
  }

  onMounted(() => {
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
}
</style>
