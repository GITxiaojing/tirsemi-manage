import axios from 'axios'
import { TOKENKEY } from '@/config'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'

const options = {
  headers: {
    [TOKENKEY]: getToken() || '',
  },
}

const instance = axios.create(options)

instance.interceptors.request.use(cof => {
  return cof
}, (err) => {
  console.log('err: ', err)
  Promise.reject(err)
})
instance.interceptors.response.use(res => {
  if (res.status === 200) {
    if (res.data.errno === 10011001) {
      setToken('')
      removeToken()
      router.push({
        path: '/login',  
      })
    } else {
      return res.data
    }
  }
}, (err) => {
  console.log('err: ', err)
  Promise.reject(err)
})

export default instance
