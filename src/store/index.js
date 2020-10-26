import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/auth'
import config from '@/config'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        uploadFileUrl: (process.env.NODE_ENV === 'production' ? config.prod.host : config.dev.host) + '/admin/storage/create' // 上传文件的后台地址
    },
    mutations: {

    },
    getters: {

    },
    actions: {

    },
    modules: {
        app,
        auth
    }
})

export default store