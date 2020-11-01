import Vue from 'vue'
import ViewUI from 'view-design'
import router from './router'
import store from './store'
import App from './App'
import 'view-design/dist/styles/iview.css'
import config from './config'
import CommonIcon from '_c/common-icon'

Vue.component('CommonIcon', CommonIcon)

Vue.use(ViewUI)

Vue.prototype.$config = config

Vue.directive('focus', {
  inserted(el) {
    el.getElementsByTagName('input')[0].focus()
  },
})

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
