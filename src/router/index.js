import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { getToken } from '../utils/auth'

const router = new VueRouter({
	routes
})

Vue.use(VueRouter)

// 解决点击同一路由时控制台报错
const routePush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
	return routePush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
	console.log('to: ', to)
	if (!getToken()) {
		if (to.name !== 'login') next({ name: 'login' })
		else next()
	} else {
		if (to.name === 'login') next({ name: '/' })
		else next()
	}
})

router.afterEach((to, from, next) => {
})

export default router
