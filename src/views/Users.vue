<template>
  <div>
    <div>Usuarios</div>
    <generic-table v-if="genericData.length > 0" :tableData="genericData" />
    <Loading-data v-if="isLoading" />
  </div>
</template>

<script>
import GenericTable from "@/components/GenericTable";
import LoadingData from "@/components/LoadingData";
export default {
  components: { GenericTable, LoadingData },
  name: "Usuarios",
  data: () => ({
    isLoading: false,
    genericData: []
  }),
  async created() {
    this.isLoading = true;
    // simula uma requisicao para o servidor e em seguida
    // preenche os dados do genericData
    await new Promise(resolve => setTimeout(resolve, 500));
    this.genericData = [
      {
        name: "Anderson Guerra",
        email: "and.guerra@outlook.com",
        nacionatity: "Brasileiro",
        birthday: "28/05/1996",
        type: "admin?"
      },
      {
        name: "Mateus D'Almeida",
        email: "dalmeidinha@gmail.com",
        nacionatity: "Colombiano",
        birthday: "29/02/1996",
        type: "admin"
      }
    ];
    this.isLoading = false;
  }
};
</script>
