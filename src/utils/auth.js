import Cookie from 'js-cookie'
import config from '@/config'

/**
 * 设置cookie
 */
export const setToken = (token) => {
    Cookie.set(config.TOKENKEY, token, {expires: 1})
}

/**
 * 获取cookie
 */
export const getToken = () => {
    return Cookie.get(config.TOKENKEY)
}

/**
 * 移除cookie
 */
export const removeToken = () => {
    console.log(233)
    Cookie.remove(config.TOKENKEY)
}