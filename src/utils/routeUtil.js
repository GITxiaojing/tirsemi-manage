class RouteUtil {
}

/**
   * 判断是否拥有子节点
   * @param {*} obj
   */
RouteUtil.hasChild = function (obj) {
  return obj.children && obj.children.length > 0
}

/**
* 从路由列表中获取菜单列表
* @param {*} list
*/
RouteUtil.getMenuByRouter = (list) => {
  const result = []
  list.forEach((item) => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      const obj = {
        name: item.name,
        meta: item.meta,
        icon: (item.meta && item.meta.icon) || '',
      }
      if (RouteUtil.hasChild(item)) {
        obj.children = RouteUtil.getMenuByRouter(item.children)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      result.push(obj)
    }
  })
  return result
}

RouteUtil.showTitle = (item) => {
  let { title } = item.meta
  title = (item.meta && item.meta.title) || item.name
  return title
}

/**
 * 处理面包屑
 * @param {*} route
 */
RouteUtil.getBreadcrumbList = (route, homeRoute) => {
  const { matched } = route
  const homeItem = { ...homeRoute, icon: (homeRoute.meta && homeRoute.meta.icon) || '' }
  if (matched.some((item) => item.name === homeRoute.Name)) {
    return [homeItem]
  }
  let result = matched.filter((item) => item.meta === undefined || !item.hideInBread).map((item) => {
    const obj = {
      name: item.name,
      icon: (item.meta && item.meta.icon) || '',
      meta: item.meta,
    }
    return obj
  })
  result = result.filter((item) => !item.meta.hideInMenu)
  return [{ ...homeItem, to: homeRoute.path }, ...result]
}

/**
 * 将tagNavList设置到localStorage中
 */
RouteUtil.setTagListToStorage = (list) => {
  localStorage.setItem('tagNavList', JSON.stringify(list))
}

/**
 * 从localStorage中获取
 */
RouteUtil.getTagListFromStorage = () => JSON.parse(localStorage.getItem('tagNavList') || '[]')

/**
 * 获取首页的路由对象
 * @param {} routers
 * @param {*} homeName
 */
RouteUtil.getHomeRoute = (routers, homeName = 'home') => {
  let homeRoute = {}
  for (let i = 0; i < routers.length; i++) {
    const item = routers[i]
    if (item.children && item.children.length) {
      const res = RouteUtil.getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else if (homeName === item.name) {
      homeRoute = item
    }
  }
  return homeRoute
}

/**
 * 现有标签是否存在已选择的标签，若不存在，则添加，否则不添加
 * @param {*} list
 * @param {*} route
 */
RouteUtil.calcTagNavList = (list, route) => {
  const result = list.slice(0)
  const {
    name, path, meta, query, params,
  } = route
  const res = list.filter((item) => name === item.name)
  if (!res.length) {
    result.push({
      name, path, meta, query, params,
    })
  }
  return result
}

/**
 * 判断是否是同一路由
 * @param {*} current
 * @param {*} route
 */
RouteUtil.routeEqual = (current, route) => current.name === route.name

/**
 * 获取下一个路由地址
 * @param {*} list
 * @param {*} route
 */
RouteUtil.getNextRoute = (list, route) => {
  const index = list.findIndex((item) => RouteUtil.routeEqual(item, route))
  if (index < list.length - 1) {
    return list[index + 1]
  }
  if (list.length > 2) {
    return list[index - 1]
  }
  return RouteUtil.getHomeRoute(list)
}

/**
 * 设置网站名称
 * @param {*} route
 * @param {*} vm
 */
RouteUtil.setTitle = (route) => {
  const title = RouteUtil.showTitle(route)
  window.document.title = title
}

/**
 * 判断改路由标签是否已存在
 * @param {} tagNavList
 * @param {*} route
 */
RouteUtil.routeHasExist = (tagNavList, route) => {
  const res = tagNavList.filter((item) => RouteUtil.routeEqual(item, route))
  return res.length > 0
}

export default RouteUtil
