<template>
  <div>
    <v-btn @click="editorDialog = true">criar</v-btn>
    <generic-table v-if="genericData.length > 0" :tableData="genericData" />
    <Loading-data v-if="isLoading" />
    <p v-if="genericData.length == 0 && isLoading == false">Sem dados para mostrar no momento</p>
    <generic-editor
      v-if="editorDialog"
      :isDialogOpen="editorDialog"
      :model="editorModel"
      @close-dialog="closeDialog"
    />
  </div>
</template>

<script>
import GenericTable from "@/components/GenericTable";
import GenericEditor from "@/components/GenericEditor";
import LoadingData from "@/components/LoadingData";

export default {
  components: { GenericTable, LoadingData, GenericEditor },
  name: "Usuarios",
  data: () => ({
    editorDialog: false,
    editorModel: {},
    isLoading: false,
    genericData: []
  }),
  methods: {
    async closeDialog(reload) {
      this.editorDialog = false;
      if (reload) {
        await this.requestData();
      }
    },
    async requestData() {
      this.isLoading = true;
      // configura a url do modulo para acessar a api
      let apiUrl = this.$router.currentRoute.meta.apiUrl;
      // simula uma requisicao para o servidor e em seguida
      // preenche os dados do genericData
      let result = await this.$http.get(apiUrl);
      if (result.status == 200) {
        this.genericData = result.data;
      }
      this.isLoading = false;
    }
  },
  async created() {
    // captura os dados do modulo
    if (this.$router.currentRoute.meta.model) {
      this.editorModel = this.$router.currentRoute.meta.model;
    }
    await this.requestData();
  }
};
</script>
