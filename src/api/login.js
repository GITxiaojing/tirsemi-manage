import request from '@/utils/request'

export const submitLogin = (data) => {
    request({
        data: data,
        method: 'post',
        url: '/'
    })
}