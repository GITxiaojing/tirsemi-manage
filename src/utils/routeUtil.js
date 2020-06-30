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


export default routeUtil

