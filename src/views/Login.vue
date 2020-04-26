<template>
  <v-row justify="center" height="100%" align="center" align-self="center">
    <v-col align="center" align-self="center" cols="12" xs="12" sm md="5">
      <img src="..\assets\logo.png" />
    </v-col>

    <v-col cols="12" xs="12" sm md="5">
      <h2 class="mb-4">Login</h2>
      <v-form ref="form">
        <v-text-field
          type="email"
          v-model="formLogin.email"
          label="Email"
          required
          :disabled="loading"
          solo
          rounded
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="formLogin.senha"
          :disabled="loading"
          label="Senha"
          required
          solo
          rounded
        ></v-text-field>
        <span v-if="errorMessage">{{errorMessage}}</span>
        <v-btn
          type="submit"
          rounded
          color="primary"
          block
          x-large
          dark
          :disabled="loading"
          :loading="loading"
          @click="login()"
        >
          Entrar
          <template v-slot:loader>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </template>
        </v-btn>
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
    },
    errorMessage: null,
    loading: false
  }),
  methods: {
    login() {
      this.loading = true;
      this.$router.push("/dash");
      if (this.$refs.form.validate()) {
      }
    }
  }
};
</script>

<style>
</style>