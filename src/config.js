//configuraçoes basicas
export default {
    install(Vue) {
        Vue.prototype.$project_data = {
            NAME: "Dash Generica",
            COLOR: "#a8008c",
            LOGO: require('@/assets/logo.png')
        }

    }
}


//configurações do firebase
var firebase_config = {
    CONFIG_FILE_PATH: ""
}

//configurações do feathers
var feathers_config = {
    //não sei o que precisa aqui
}

//modulos
// var modules = {
//     users: {
//         name: this.fields.STRING,
//         email: this.fields.STRING,
//         nacionatity: this.fields.STRING,
//         birthday: this.fields.DATE,
//         type: this.fields.BOOLEAN
//     },
//     news: {
//         title: this.fields.STRING,
//         subtitle: this.fields.STRING
//     }
// }

//acho que dá pra separar isso depois
//only-read

export const fields = {
    STRING: "string",
    DATE: "date",
    BOOLEAN: "boolean"
}