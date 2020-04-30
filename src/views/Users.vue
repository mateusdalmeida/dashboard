<template>
  <div>
    <generic-table
      v-if="typeof genericData != 'string' && genericData.length > 0"
      :tableData="genericData"
      @edit-item="editItem"
      @create-item="createItem"
    />
    <Loading-data v-if="isLoading" />
    <p
      v-if="typeof genericData != 'string' && genericData.length == 0 && isLoading == false"
    >Sem dados para mostrar no momento</p>
    <p v-if="typeof genericData == 'string'">{{genericData}}</p>
    <generic-editor
      v-if="editorDialog"
      apiUrlManual="/users"
      :itemToUpdate="itemToUpdate"
      :isDialogOpen="editorDialog"
      :model="userModel"
      @close-dialog="closeDialog"
    />
  </div>
</template>

<script>
import GenericTable from "@/components/GenericTable";
import GenericEditor from "@/components/GenericEditor";
import LoadingData from "@/components/LoadingData";
import modules from "@/config/modules";
import { getItems, getItem } from "@/services/requests";

export default {
  components: { GenericTable, LoadingData, GenericEditor },
  name: "Usuarios",
  data: () => ({
    editorDialog: false,
    userModel: modules.users.model,
    isLoading: false,
    genericData: []
  }),
  methods: {
    createItem() {
      this.itemToUpdate = undefined;
      this.editorDialog = true;
    },
    async editItem(item) {
      // recupera os dados daquele item especifico
      // para enviar ao editor
      let apiUrl = "/users";
      let result = await getItem(apiUrl, item.id);
      if (typeof result != "string") {
        this.itemToUpdate = result;
        this.editorDialog = true;
      }
    },
    async closeDialog(reload) {
      this.editorDialog = false;
      if (reload) {
        await this.requestData();
      }
      this.itemToUpdate = undefined;
    },
    async requestData() {
      this.isLoading = true;
      // configura a url do modulo para acessar a api
      let apiUrl = "/users";
      // simula uma requisicao para o servidor e em seguida
      // preenche os dados do genericData
      let result = await getItems(apiUrl);
      this.genericData = result;
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
