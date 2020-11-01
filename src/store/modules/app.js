import routeUtil from '@/utils/routeUtil'
import routers from '@/router/routes'
import router from '@/router'
import config from '@/config'

const closePage = (state, route) => {
  let { tagNavList } = state
  const nextRoute = routeUtil.getNextRoute(tagNavList, route)
  const routes = tagNavList.filter((item) => !routeUtil.routeEqual(route, item))
  tagNavList = routes
  router.push(nextRoute)
}

const store = {
  state: {
    breadcrumbList: [],
    tagNavList: [],
    homeRoute: {},
  },
  getters: {
    menuList: () => routeUtil.getMenuByRouter(routers),
  },
  mutations: {
    setBreadcrumb(state, status) {
      state.breadcrumbList = routeUtil.getBreadcrumbList(status, state.homeRoute)
    },
    setHomeRoute(state, routes) {
      state.homeRoute = routeUtil.getHomeRoute(routes, config.homeName)
    },
    setTagNavList(state, list) {
      let tagList = []
      if (Array.isArray(list)) {
        tagList = [...list]
      } else {
        tagList = routeUtil.getTagListFromStorage() || []
      }
      if (tagList[0] && tagList[0].name !== config.homeName) {
        tagList.shift()
      }
      const homeNameIndex = tagList.findIndex((item) => item.name === config.homeName)
      if (homeNameIndex > 0) {
        tagList.unshift(tagList.splice(homeNameIndex, 1)[0])
      } else if (homeNameIndex === -1) {
        const homeRoute = routeUtil.getHomeRoute(routers, config.homeName)
        tagList.unshift(homeRoute)
      }
      state.tagNavList = tagList
      routeUtil.setTagListToStorage([...tagList])
    },
    closeTag(state, route) {
      const result = state.tagNavList.filter((item) => routeUtil.routeEqual(route, item))
      if (result.length > 0) { closePage(state, result[0]) }
    },
    addTag(state, { route, type = 'unshift' }) {
      if (!routeUtil.routeHasExist(state.tagNavList, route)) {
        if (type === 'push') {
          state.tagNavList.push(route)
        } else if (!(route.name === config.homeName)) {
          state.tagNavList.splice(1, 0, route)
        } else {
          state.tagNavList.unshift(route)
        }
        routeUtil.setTagListToStorage([...state.tagNavList])
      }
    },
  },
  actions: {
  },
}

export default store
