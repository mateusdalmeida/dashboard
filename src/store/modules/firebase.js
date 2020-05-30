import firebase from "@/config/firebaseConfig";

export default {
    namespaced: true,
    actions: {
        FIREBASE_LOGIN: ({ commit, dispatch }, user) => {
            return firebase.auth().signInWithEmailAndPassword(user.email, user.senha)
        },
        FIREBASE_LOGOUT: ({ commit, dispatch }) => {
            return firebase.auth().signOut()
        },
    },
}