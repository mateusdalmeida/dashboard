<template>
  <v-row justify="center" height="100%" align="center" align-self="center">
    <v-col align="center" align-self="center" cols="12" xs="12" sm md="5">
      <img :src="$project_data.LOGO" />
    </v-col>

    <v-col cols="12" xs="12" sm md="5">
      <h2 class="mb-4">Login</h2>
      <v-form ref="form">
        <v-text-field
          type="email"
          v-model="formLogin.email"
          label="Email"
          required
          :disabled="$store.state.login.isLoading"
          solo
          rounded
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="formLogin.senha"
          :disabled="$store.state.login.isLoading"
          label="Senha"
          required
          solo
          rounded
        ></v-text-field>
        <v-btn
          rounded
          color="primary"
          block
          x-large
          dark
          :disabled="$store.state.login.isLoading"
          :loading="$store.state.login.isLoading"
          @click="login()"
        >
          Entrar
          <template v-slot:loader>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </template>
        </v-btn>
        <p
          class="text-center mt-3 red--text"
          v-if="$store.state.login.loginError"
        >{{$store.state.login.loginError}}</p>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    formLogin: {
      email: "",
      senha: ""
    }
  }),
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("login/LOGIN", this.formLogin);
      }
    }
  }
};
</script>

<style>
</style>