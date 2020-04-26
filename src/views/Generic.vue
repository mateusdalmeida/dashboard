<template>
  <div>
    <generic-table v-if="genericData.length > 0" :tableData="genericData" />
    <Loading-data v-if="isLoading" />
    <p v-if="genericData.length == 0 && isLoading == false">Sem dados para mostrar no momento</p>
  </div>
</template>

<script>
import GenericTable from "@/components/GenericTable";
import LoadingData from "@/components/LoadingData";
export default {
  components: { GenericTable, LoadingData },
  name: "Generic",
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
