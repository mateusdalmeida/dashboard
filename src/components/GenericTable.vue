<template>
  <v-card>
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
    <v-data-table :headers="headers" :items="items" :search="search"></v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "GenericTable",
  props: ["tableName", "tableData"],
  data: () => ({
    routeName: "",
    search: "",
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
  created() {
    // obtem o nome da rota atual para colocar no titulo
    // da tabela, caso nenhum titulo seja dado
    this.routeName = this.$router.currentRoute.name;
    // converte as keys do primeiro objeto para
    // virarem os headers da tabela
    this.headers = Object.keys(this.tableData[0]).map(key => {
      return { text: key, value: key };
    });
    // captura os items e coloca na tabela
    this.items = this.tableData;
  }
};
</script>