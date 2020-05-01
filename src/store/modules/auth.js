import { http } from '@/config/config'

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('dashboard_token') || '',
        status: ''
    },
    mutations: {
        AUTH_REQUEST: (state) => {
            state.status = 'loading'
        },
        AUTH_SUCCESS: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        AUTH_ERROR: (state) => {
            state.status = 'error'
        },
        AUTH_LOGOUT: (state) => {
            state.status = ''
            state.token = ''
        }
    },
    actions: {
        AUTH_REQUEST: ({ commit, dispatch }, user) => {
            http.post('/auth', user).then((resp) => {
                // teoricamente aqui vem o retorno do login indicando
                // se tem o token ou nao
                // se n tiver token tem que dar um throw error
                // e fazer um catch no Login.vue                
                localStorage.setItem('dashboard_token', 'token')
                http.defaults.headers.common['Authorization'] = 'token'
                commit('AUTH_SUCCESS', 'token')
            }).catch(err => {
                localStorage.removeItem('dashboard_token')
            })

        },
        AUTH_LOGOUT: ({ commit, dispatch }) => {
            localStorage.removeItem('dashboard_token')
            commit('AUTH_LOGOUT')
            delete http.defaults.headers.common['Authorization']
        }
    },
    getters: {
        isAuthenticated: state => !!state.token
    },
    modules: {}
}