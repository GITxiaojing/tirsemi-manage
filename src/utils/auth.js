import Cookie from 'js-cookie'
import config from '../config'

/**
 * 设置cookie
 */
export const setToken = (token) => {
  Cookie.set(config.TOKENKEY, token, { expires: 1 })
}

/**
 * 获取cookie
 */
export const getToken = () => Cookie.get(config.TOKENKEY)

/**
 * 移除cookie
 */
export const removeToken = () => {
  Cookie.remove(config.TOKENKEY)
}
