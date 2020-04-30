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
      :itemToUpdate="itemToUpdate"
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
import { getItems, getItem } from "@/services/requests";

export default {
  components: { GenericTable, LoadingData, GenericEditor },
  name: "Generic",
  data: () => ({
    editorDialog: false,
    editorModel: {},
    itemToUpdate: undefined,
    isLoading: false,
    genericData: [],
    apiUrl: ""
  }),
  methods: {
    createItem() {
      this.itemToUpdate = undefined;
      this.editorDialog = true;
    },
    async editItem(item) {
      // recupera os dados daquele item especifico
      // para enviar ao editor
      let result = await getItem(this.apiUrl, item.id);
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
      // simula uma requisicao para o servidor e em seguida
      // preenche os dados do genericData
      let result = await getItems(this.apiUrl);
      this.genericData = result;
      this.isLoading = false;
    }
  },
  async created() {
    // captura os dados do modulo
    this.apiUrl = this.$router.currentRoute.meta.apiUrl;
    if (this.$router.currentRoute.meta.model) {
      this.editorModel = this.$router.currentRoute.meta.model;
    }
    await this.requestData();
  }
};
</script>
