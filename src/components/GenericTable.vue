<template>
  <v-card>
    <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      label="Pesquisar"
      single-line
      hide-details
      filled
    >
      <template slot="append" v-if="module_type != 'view'">
        <v-btn color="primary" height="56px" x-large depressed @click="createItem">
          Novo
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <v-autocomplete
      v-model="headersShown"
      :items="headers"
      label="Selecionar colunas para visualizar"
      hide-details
      multiple
      chips
      filled
      small-chips
      item-text="text"
      item-value="text"
    ></v-autocomplete>
    <v-data-table
      show-select
      v-model="selectedItems"
      :headers="headersSelected"
      :items="tableData"
      :search="search"
      @click:row="editItem"
    ></v-data-table>
    <v-btn color="primary" v-if="realSelectedItems.length > 0" @click="deleteItem">Deletar items</v-btn>
  </v-card>
</template>
<script>
export default {
  name: "GenericTable",
  props: ["tableName", "tableData", "isCrud"],
  data: () => ({
    module_type: "",
    routeName: "",
    search: "",
    selectedItems: [],
    headersShown: [],
    headersAux: [],
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name"
      }
    ]
  }),
  computed: {
    headersSelected: function() {
      // um computed que monitora quais colunas devem ser
      // exibidas de acordo com o valor do array headersShow
      return this.headers.filter(header => {
        return this.headersShown.includes(header.text);
      });
    },
    realSelectedItems: function(){
      return this.tableData.filter(value => -1 !== this.selectedItems.indexOf(value))
    }
  },
  created() {
    // obtem o nome da rota atual para colocar no titulo
    // da tabela, caso nenhum titulo seja dado
    this.routeName = this.$router.currentRoute.name;
    // recupera qual o tipo de modulo
    if (this.$router.currentRoute.meta.module_type) {
      this.module_type = this.$router.currentRoute.meta.module_type;
    }
    // converte as keys do primeiro objeto para
    // virarem os headers da tabela
    this.headers = Object.keys(this.tableData[0]).map(key => {
      // adiciona o item no array headersShow, responsavel
      // pelo menu de selecao do que aparece nos headers
      this.headersShown.push(key);
      return { text: key, value: key };
    });
    this.headersAux = this.headers;
  },
  methods: {
    editItem(item) {
      this.$emit("edit-item", item);
    },
    createItem(item) {
      this.$emit("create-item");
    },
    deleteItem(){
      this.$emit("delete-item", this.selectedItems)
    }
  }
};
</script>

<style >
.v-input__append-inner {
  margin: 0 !important;
}
.v-input__slot {
  padding-right: 0 !important;
}
</style>