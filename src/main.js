import Vue from 'vue'
import router from './router'
import App from './App'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import config from './config/config'

Vue.use(ViewUI)

Vue.prototype.$config = config

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
