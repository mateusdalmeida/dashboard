<template>
  <v-card>
    <v-container>
      <v-autocomplete
          v-model="headersShown"
          :items="headers"
          label="Selecionar colunas para visualizar"
          multiple
          chips
          item-text="text"
          item-value="text"
        ></v-autocomplete>
    </v-container>
    <v-card-title>
      {{tableName ? tableName : routeName}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersSelected" :items="items" :search="search"></v-data-table>
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
    ],
    items: [
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%"
      }
    ]
  }),
  computed: {
    headersSelected: function () {
      // um computed que monitora quais colunas devem ser
      // exibidas de acordo com o valor do array headersShow
      return this.headers.filter(header=>{
        return this.headersShown.includes(header.text)
      })
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
      this.headersShown.push(key)
      return { text: key, value: key };
    });
    this.headersAux = this.headers
    // captura os items e coloca na tabela
    this.items = this.tableData;
  }
};
</script>