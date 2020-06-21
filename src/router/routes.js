import Main from '@/components/main';

const routes = [
	{
		path: '/',
		name: 'main',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'main',
		component: Main
	}
]

export default routes
