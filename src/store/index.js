// import Vue from 'vue'
import Vuex from 'vuex'
// import authModule from './modules/auth'
// import userModule from './modules/user'
import postModule from './modules/post'

// Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        post: postModule,
    },
})