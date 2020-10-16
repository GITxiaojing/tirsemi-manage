import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import config from './config'

Vue.use(ViewUI)

Vue.prototype.$config = config

Vue.directive('focus', {
	inserted (el) {
		el.getElementsByTagName('input')[0].focus()
	}
})

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
