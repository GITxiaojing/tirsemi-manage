import routeUtil from '@/utils/routeUtil'
import routers from '@/router/routes'
const store = {
    state: {

    },
    getters: {
        menuList: (state) => routeUtil.getMenuByRouter(routers)
    },
    mutations: {

    },
    actions: {

    }
}

export default store