<template>
  <v-card>
    <v-card-title class="pt-0 pb-0">
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="headersShown"
            :items="headers"
            label="Selecionar colunas para visualizar"
            multiple
            chips
            small-chips
            item-text="text"
            item-value="text"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table :headers="headersSelected" :items="tableData" :search="search"></v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "GenericTable",
  props: ["tableName", "tableData"],
  data: () => ({
    routeName: "",
    search: "",
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
    }
  },
  created() {
    // obtem o nome da rota atual para colocar no titulo
    // da tabela, caso nenhum titulo seja dado
    this.routeName = this.$router.currentRoute.name;
    // converte as keys do primeiro objeto para
    // virarem os headers da tabela
    this.headers = Object.keys(this.tableData[0]).map(key => {
      // adiciona o item no array headersShow, responsavel
      // pelo menu de selecao do que aparece nos headers
      this.headersShown.push(key);
      return { text: key, value: key };
    });
    this.headersAux = this.headers;
  }
};
</script>