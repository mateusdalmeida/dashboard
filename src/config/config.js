export default {
    install(Vue) {
        Vue.prototype.$project_data = project_data
    }
}

//visual settings
export var project_data = {
    NAME: "Dash Generica",
    COLOR: "#a8008c",
    LOGO: require('@/assets/logo.png')
}


//configurações do firebase
var firebase_config = {
    CONFIG_FILE_PATH: ""
}

//configurações do feathers
var feathers_config = {
    //não sei o que precisa aqui
}