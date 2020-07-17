class routeUtil {
    /**
     * 判断是否拥有子节点
     * @param {*} obj 
     */
    hasChild(obj) {
        return obj.children && obj.children.length > 0
    }
}

const routeObj = new routeUtil()

/**
* 从路由列表中获取菜单列表
* @param {*} list 
*/
routeUtil.getMenuByRouter = (list) => {
    let result = []
    list.forEach(item => {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                name: item.name,
                meta: item.meta,
                icon: (item.meta && item.meta.icon) || ''
            }
            if (routeObj.hasChild(item)) {
                obj.children = routeUtil.getMenuByRouter(item.children)
            }
            if (item.meta && item.meta.href) obj.href = item.meta.href
            result.push(obj)
        }
    });
    return result
}

routeUtil.showTitle = (item) => {
    let { title } = item.meta
    title = (item.meta && item.meta.title) || item.name
    return title
}

/**
 * 处理面包屑
 * @param {*} route 
 */
routeUtil.getBreadcrumbList = (route) => {
    let { matched } = route
    let result = matched.filter(item => {
        return item.meta === undefined || !item.hideInBread
    }).map(item => {
        let obj = {
            name: item.name,
            icon: (item.meta && item.meta.icon) || '',
            meta: item.meta
        }
        return obj
    })
    result = result.filter(item => {
        return !item.meta.hideInMenu
    })
    return result
}

/**
 * 将tagNavList设置到localStorage中
 */
routeUtil.setTagListToStorage = (list) => {
    localStorage.setItem('tagNavList', JSON.stringify(list))
}

/**
 * 从localStorage中获取
 */
routeUtil.getTagListFromStorage = () => {
    return JSON.parse(localStorage.getItem('tagNavList') || '[]')
}

/**
 * 获取首页的路由对象
 * @param {} routers 
 * @param {*} homeName 
 */
routeUtil.getHomeRoute = (routers, homeName = 'home') => {
    let homeRoute = {}
    routers.forEach(item => {
        if (item.children && item.children.length) {
            routeUtil.getHomeRoute(item.children, homeName)
        } else {
            if (homeName === item.name) {
                homeRoute = item
            }
        }
    })
    return homeRoute
}

/**
 * 现有标签是否存在已选择的标签，若不存在，则添加，否则不添加
 * @param {*} list 
 * @param {*} route 
 */
routeUtil.calcTagNavList = (list, route) => {
    let result = list.slice(0)
    let { name, path, meta } = route
    let res = list.filter(item => {
        return name === item.name
    })
    if (!res.length) result.push({name, path, meta})
    return result
}

/**
 * 判断是否是同一路由
 * @param {*} current 
 * @param {*} route 
 */
routeUtil.routeEqual = (current, route) => {
    return current.name === route.name
}

/**
 * 获取下一个路由地址
 * @param {*} list 
 * @param {*} route 
 */
routeUtil.getNextRoute = (list, route) => {
    let index = list.findIndex(item => routeUtil.routeEqual(item, route))
    if (index < list.length - 1) {
        return list[index + 1]
    } else {
        if (list.length > 2) {
            return list[index - 1]
        } 
        return routeUtil.getHomeRoute(list)
    }
}

/**
 * 设置网站名称
 * @param {*} route 
 * @param {*} vm 
 */
routeUtil.setTitle = (route, vm) => {
    let title = routeUtil.showTitle(route)
	window.document.title = title
}

/**
 * 判断改路由标签是否已存在
 * @param {} tagNavList 
 * @param {*} route 
 */
routeUtil.routeHasExist = (tagNavList, route) => {
    let res = tagNavList.filter(item => routeUtil.routeEqual(item, route))
    return res.length > 0 ? true : false
}

export default routeUtil

