import TabCard from './tabCard.vue'
import TabCardPlanel from './tabCardPlanel.vue'

const install = (Vue) => {
  Vue.component('TabCard', TabCard)
  Vue.component('TabCardPlanel', TabCardPlanel)
}

export default {
  install
}

export {
  TabCard,
  TabCardPlanel
}
