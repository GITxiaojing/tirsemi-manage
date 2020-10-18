import axios from '@/utils/request'
/** ================================= 商品列表 ================================== */
export const getGoodsList = (data) => {
    return axios.request({
        url: '/admin/goods/list',
        method: 'get',
        params: data
    })
}

export const delGoods = (data) => {
    return axios.request({
        url: '/admin/goods/delete',
        method: 'post',
        data
    })
}