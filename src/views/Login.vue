<template>
  <v-row justify="center">
    <v-col md="5" align-self="center">
      <h2 class="mb-4">Login</h2>
      <v-form ref="form">
        <v-text-field
          type="email"
          v-model="formLogin.email"
          label="Email"
          required
          :disabled="loading"
          outlined
          rounded
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="formLogin.senha"
          :disabled="loading"
          label="Senha"
          required
          outlined
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