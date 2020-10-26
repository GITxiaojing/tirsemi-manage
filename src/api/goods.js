import axios from '@/utils/request'
/** ================================= 商品列表 ================================== */
// 获取商品列表
export const getGoodsList = (data) => {
    return axios.request({
        url: '/admin/goods/list',
        method: 'get',
        params: data
    })
}

// 删除商品
export const delGoods = (data) => {
    return axios.request({
        url: '/admin/goods/delete',
        method: 'post',
        data
    })
}

// 添加商品
export const createGoods = data => {
    return axios.request({
        url: '/admin/goods/create',
        method: 'post',
        data
    })
}

// 更新商品
export const updateGoods = data => {
    return axios.request({
        url: '/admin/goods/update',
        method: 'post',
        data
    })
}

// 获取商品详情
export const getGoodsInfo = params => {
    return axios.request({
        url: '/admin/goods/detail',
        method: 'get',
        params
    })
}

// 获取f分类和品牌商
export const getCateAndBrand = params => {
    return axios.request({
        url: '/admin/goods/catAndBrand',
        method: 'get',
        params
    })
}