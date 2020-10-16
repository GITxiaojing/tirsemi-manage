import axios from '@/utils/request'

export const login = (data) => {
    return axios.request({
        data: data,
        method: 'post',
        url: '/admin/auth/login'
    })
}

export const logout = (data) => {
    return axios.request({
        data: data,
        method: 'post',
        url: '/admin/auth/logout'
    })
}