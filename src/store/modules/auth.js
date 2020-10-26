import { logout } from '@/api/auth'
import { setToken, removeToken } from '@/utils/auth'

export default {
    state: {
        token: ''
    },
    mutations: {
        SET_TOKEN (state, token) {
            setToken(token)
            state.token = token
        }
    },
    actions: {
        logout ({commit}) {
            return new Promise((resolve, reject) => {
                logout({}).then(res => {
                    if (res.errno === 0) {
                        commit('SET_TOKEN', '')
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