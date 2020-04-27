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
      @close-dialog="editorDialog = false"
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
  async created() {
    if (this.$router.currentRoute.meta) {
      this.editorModel = this.$router.currentRoute.meta.model;
    }

    this.isLoading = true;
    // simula uma requisicao para o servidor e em seguida
    // preenche os dados do genericData
    await new Promise(resolve => setTimeout(resolve, 500));
    this.genericData = [
      {
        title: "blog tope",
        text: "pipipi popopo",
        author: "Anderson Guerra",
        updated_at: "28/05/1996",
        created_at: "28/05/1996"
      },
      {
        title: "coisas da google",
        text: "ai pq o firebase nhenhenhe",
        author: "Mateus D'Almeida",
        updated_at: "29/02/1996",
        created_at: "29/02/1996"
      }
    ];
    this.isLoading = false;
  }
};
</script>
