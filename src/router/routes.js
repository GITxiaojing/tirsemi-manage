import Main from '@/components/main';

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/login'),
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		}
	},
	{
		path: '/',
		name: '_home',
		redirect: '/home',
		component: Main,
		meta: {
			hideInMenu: true
		},
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/home'),
				meta: {
					title: '首页',
					hideInMenu: true,
					icon: 'md-home'
				},
			}
		]
	},
	{
		path: '/user',
		name: 'user',
		component: Main,
		meta: {
			title: '用户管理'
		},
		children: [
			{
				path: 'addr',
				name: 'addr',
				component: () => import('@/views/user/address'),
				meta: {
					title: '地址管理',
					icon: '_location',
					keepAlive: true
				}
			}
		]
	},
	{
		path: '/goods',
		name: 'goods',
		component: Main,
		meta: {
			title: '商品管理',
			icon: '_notice'
		},
		children: [
			{
				path: 'list',
				name: 'goods-list',
				component: () => import('@/views/goods/list'),
				meta: {
					title: '商品列表',
					keepAlive: true
				}
			},
			{
				path: 'create',
				name: 'goods-create',
				component: () => import('@/views/goods/create'),
				meta: {
					title: '商品上架',
					keepAlive: true
				}
			},
			{
				path: 'edit',
				name: 'goods-edit',
				component: () => import('@/views/goods/edit'),
				meta: {
					title: '商品编辑',
					hideInMenu: true,
					keepAlive: true
				}
			},
			{
				path: 'comment',
				name: 'comment',
				component: () => import('@/views/goods/comment'),
				meta: {
					title: '商品评论',
					icon: '_evaluate',
					keepAlive: true
				}
			}
		]
	},
	{
		path: '/config',
		name: 'config',
		component: Main,
		meta: {
			title: '配置管理',
			icon: '_setting'
		},
		children: [
			{
				path: 'wx',
				name: 'small-routine',
				component: () => import('@/views/config/smallRoutine'),
				meta: {
					title: '小程序配置',
					icon: '_repair',
					keepAlive: true
				}
			}
		]
	}
]

export default routes
