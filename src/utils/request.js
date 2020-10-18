import axios from 'axios'
import config from '@/config'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'
import { Message } from 'view-design'

class HttpRequest {
    setInterceptor (instance, url) {
        instance.interceptors.request.use((config) => {
            return config
        }, (err) => {

        })
        instance.interceptors.response.use((res) => {
            if (res.status === 200) {
                if (res.data.errno === 10011001) {
                    setToken('')
                    removeToken()
                    router.push({
                        path: '/login'
                    })
                } else {
                    return res.data
                }
            }
        }, (err) => {

        })
    }
    request(options) {
        const instance = axios.create()
        options = Object.assign({
            headers: {
                [config.TOKENKEY]: getToken() || ''
            },
        }, options)
        this.setInterceptor(instance, options.url)
        return instance(options)
    }
}

const httpRequest = new HttpRequest()

export default httpRequest