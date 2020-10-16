import { logout } from '@/api/auth'
import { setToken, removeToken } from '@/utils/auth'

export default {
    state: {

    },
    actions: {
        logout (state) {
            return new Promise((resolve, reject) => {
                logout({}).then(res => {
                    if (res.errno === 0) {
                        setToken('')
                        removeToken()
                        resolve()
                    }
                }).catch(err => {
                    console.log('err: ', err)
                    reject(err)
                })
            })
        }
    }
}