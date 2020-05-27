const axios = require('axios')

export default {
    install(Vue) {
        Vue.prototype.$project_data = project_data
        Vue.prototype.$http = http
    }
}

//visual settings
export var project_data = {
    NAME: "Dash Generica",
    COLOR: "#a8008c",
    LOGO: require('@/assets/logo.png'),
    USE_FIREBASE: true
}

// axios configuration
export const http = axios.create({
    baseURL: 'http://localhost:3000',
    // timeout: 1000
});