<template>
  <div>
    <v-dialog v-model="isDialogOpen" persistent max-width="300px">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <span class="headline">Excluir {{$router.currentRoute.name}}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="$emit('close-dialog')" :disabled="loading">Cancelar</v-btn>
          <v-btn color="primary" text @click="removeItems" :loading="loading">
            Excluir
            <template v-slot:loader>
              <v-progress-circular indeterminate></v-progress-circular>
            </template>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { deleteItem } from "@/services/requests";

export default {
  name: "GenericRemover",
  props: ["isDialogOpen", "apiUrlManual", "itemsToRemove"],
  data: () => ({
    loading: false
  }),
  methods: {
    async removeItems() {
      let apiUrl;
      if (this.$router.currentRoute.meta.apiUrl) {
        apiUrl = this.$router.currentRoute.meta.apiUrl;
      } else {
        apiUrl = this.apiUrlManual;
      }
      let result;
      this.itemsToRemove.forEach(async item => {
        result = await deleteItem(apiUrl, item.id);
      });

      if (typeof result != "string") {
        // requisicao conseguiu cadastrar com sucesso, entao pode sair
        this.$emit("close-dialog", true);
      }
    }
  },
  beforeMount() {
    // recupera qual o tipo de modulo
    if (this.$router.currentRoute.meta.module_type) {
      this.module_type = this.$router.currentRoute.meta.module_type;
    }
  }
};
</script>