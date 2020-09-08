import axios from 'axios'
import config from '@/config'
import { getToken } from '@/utils/auth'

class HttpRequest {
    setInterceptor (instance, url) {
        instance.interceptors.request.user((config) => {
            
        }, (err) => {

        })
        instance.interceptors.response.use((response) => {

        }, (err) => {

        })
    }
    request(options) {
        const instance = axios.create()
        options = Object.assign({
            headers: {
                baseUrl: process.env.VUE_APP_BASE_URL,
                [config.TOKENKEY]: getToken() || ''
            }
        }, options)
        this.setInterceptor(instance. options.url)
        return instance(options)
    }
}

export default new HttpRequest().request