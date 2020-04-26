<template>
  <v-app>
    <!-- drawer disponivel em todas as telas menos login -->
    <v-navigation-drawer v-if="$router.currentRoute.name != 'Login'" v-model="drawer" app clipped>
      <v-list nav>
        <v-list-item to="/dash">
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/users">
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/generic">
          <v-list-item-content>
            <v-list-item-title>Generica</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-footer fixed bottom class="pa-0" color="primary">
        <v-btn text color="white" block @click="logout">Logout</v-btn>
      </v-footer>
    </v-navigation-drawer>
    <!-- appbar disponivel em todas as telas menos login -->
    <v-app-bar v-if="$router.currentRoute.name != 'Login'" app clipped-left elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="align-center">
        <span class="headline">Nome do Projeto</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="align-center">
        <span class="headline">{{$router.currentRoute.name}}</span>
      </v-toolbar-title>
    </v-app-bar>
    <!-- conteudo do app -->
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Login from "./views/Login";
import Dash from "./views/Dash";
export default {
  name: "App",
  components: {
    Login,
    Dash
  },
  data: () => ({
    drawer: true
  }),
  methods: {
    logout() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}
::-webkit-scrollbar {
  width: 5px;
  background: #f4f4f4;
}
::-webkit-scrollbar-thumb {
  background: #dad7d7;
}
</style>
