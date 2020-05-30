import { project_data } from '@/config/config'
import router from "@/router"
import auth from './auth'
import firebase from './firebase'

export default {
    namespaced: true,
    modules: {
        auth, firebase
    },
    state: {
        isLoading: false,
        loginError: ""
    },
    mutations: {
        LOADING: (state) => {
            state.isLoading = !state.isLoading
        },
        LOGIN_ERROR: (state, msg) => {
            state.loginError = msg
        },
    },
    actions: {
        LOGIN: ({ commit, dispatch }, user) => {
            commit('LOADING')
            commit('LOGIN_ERROR', "")
            if (project_data.USE_FIREBASE) {
                dispatch("firebase/FIREBASE_LOGIN", user).then(() => {
                    commit('LOADING')
                    router.push("/dash");
                }).catch(err => {
                    commit('LOADING')
                    commit('LOGIN_ERROR', err.message)
                })
            } else {
                dispatch("auth/AUTH_REQUEST", user).then(() => {
                    commit('LOADING')
                    router.push("/dash");
                }).catch(err => {
                    commit('LOADING')
                    commit('LOGIN_ERROR', err.message)
                })
            }
        }
    },
}