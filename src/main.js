import Vue from 'vue'
import router from './router'
import App from './App'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
