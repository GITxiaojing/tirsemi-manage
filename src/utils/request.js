import axios from 'axios'
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

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
        console.log('options: ', options)
        options = Object.assign({
            headers: {
                baseUrl: baseUrl,
                [config.TOKENKEY]: ''
            }
        }, options)
        this.setInterceptor(instance. options.url)
        return instance(options)
    }
}

export default new HttpRequest().request