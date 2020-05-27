import firebase from "@/config/firebaseConfig";
import router from "@/router"

export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        FIREBASE_LOGIN: ({ commit, dispatch }, user) => {
            firebase.auth().signInWithEmailAndPassword(user.email, user.senha).then(() => {
                router.push("/dash");
            }).catch(err => {
                console.log(err);
            })
        }
    },
    getters: {
    },
    modules: {}
}