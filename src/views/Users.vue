<template>
  <div>
    TELA PERSONALIZADA
    <generic-table
      :tableData="genericData"
      :totalItems="totalItems"
      @edit-item="editItem"
      @create-item="createItem"
      @delete-item="deleteItem"
      @table-pagination="tablePagination"
    />
    <Loading-data v-if="isLoading" />
    <p v-if="typeof genericData == 'string'">{{ genericData }}</p>
    <generic-editor
      v-if="editorDialog"
      apiUrlManual="/users"
      :itemToUpdate="itemToUpdate"
      :isDialogOpen="editorDialog"
      :model="userModel"
      @close-dialog="closeDialog"
    />
    <generic-remover
      v-if="removerDialog"
      apiUrlManual="/users"
      :itemsToRemove="itemsToRemove"
      :isDialogOpen="removerDialog"
      @close-dialog="closeDialog"
    />
  </div>
</template>

<script>
import GenericTable from "@/components/GenericTable";
import GenericEditor from "@/components/GenericEditor";
import GenericRemover from "@/components/GenericRemover";
import LoadingData from "@/components/LoadingData";
import modules from "@/config/modules";
import { getItems, getItem } from "@/services/requests";

export default {
  components: { GenericTable, LoadingData, GenericEditor, GenericRemover },
  name: "Usuarios",
  data: () => ({
    editorDialog: false,
    removerDialog: false,
    itemsToRemove: undefined,
    itemToUpdate: undefined,
    totalItems: 0,
    userModel: modules.users.model,
    isLoading: false,
    genericData: [],
  }),
  methods: {
    deleteItem(items) {
      this.itemsToRemove = items;
      this.removerDialog = true;
    },
    createItem() {
      this.itemToUpdate = undefined;
      this.editorDialog = true;
    },
    tablePagination(options) {
      this.requestData(options);
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
      this.removerDialog = false;
      if (reload) {
        await this.requestData();
      }
      this.itemToUpdate = undefined;
    },
    async requestData(options) {
      this.isLoading = true;
      let result;
      let apiUrl = "/users";
      if (options) {
        const { page, sortBy, sortDesc, itemsPerPage, search } = options;
        result = await getItems(
          apiUrl,
          `_page=${page}&_limit=${
            itemsPerPage ? itemsPerPage : 10
          }&_sort=${sortBy}&_order=${sortDesc ? "desc" : "asc"}&q=${
            search ? search : ""
          }`
        );
      } else {
        result = await getItems(apiUrl, "_page=1");
      }
      this.genericData = result.data;
      this.totalItems = result.total_items;
      // simula uma requisicao para o servidor e em seguida
      // preenche os dados do genericData
      this.isLoading = false;
    },
  },
  async created() {
    // captura os dados do modulo
    if (this.$router.currentRoute.meta.model) {
      this.editorModel = this.$router.currentRoute.meta.model;
    }
    await this.requestData();
  },
};
</script>
