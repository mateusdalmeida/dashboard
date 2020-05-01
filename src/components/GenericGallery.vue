<template>
  <v-row no-gutters>
    <v-col xs="12" sm="2" md="2">
      <v-card class="ma-1" flat style="cursor: pointer" v-for="(image, index) in col1" :key="index">
        <v-img :src="image['url']"></v-img>
      </v-card>
    </v-col>
    <v-col xs="12" sm="2" md="2">
      <v-card class="ma-1" flat style="cursor: pointer" v-for="(image, index) in col2" :key="index">
        <v-img :src="image['url']"></v-img>
      </v-card>
    </v-col>
    <v-col xs="12" sm="2" md="2">
      <v-card class="ma-1" flat style="cursor: pointer" v-for="(image, index) in col3" :key="index">
        <v-img :src="image['url']"></v-img>
      </v-card>
    </v-col>
    <v-col xs="12" sm="2" md="2">
      <v-card class="ma-1" flat style="cursor: pointer" v-for="(image, index) in col4" :key="index">
        <v-img :src="image['url']"></v-img>
      </v-card>
    </v-col>
    <v-col xs="12" sm="2" md="2">
      <v-card class="ma-1" flat style="cursor: pointer" v-for="(image, index) in col5" :key="index">
        <v-img :src="image['url']"></v-img>
      </v-card>
    </v-col>
    <v-col xs="12" sm="2" md="2">
      <v-card class="ma-1" flat style="cursor: pointer" v-for="(image, index) in col6" :key="index">
        <v-img :src="image['url']"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "GenericGallery",
  props: ["photos"],
  data: () => ({
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    col5: [],
    col6: []
  }),
  methods: {},
  created() {
    let count = 0;
    for (const photo in this.photos) {
      count++;
      switch (count) {
        case 1:
          this.col1.push(this.photos[photo]);
          break;
        case 2:
          this.col2.push(this.photos[photo]);
          break;
        case 3:
          this.col3.push(this.photos[photo]);
          break;
        case 4:
          this.col4.push(this.photos[photo]);
          break;
        case 5:
          this.col5.push(this.photos[photo]);
          break;
        case 6:
          this.col6.push(this.photos[photo]);
          count = 0;
          break;
      }
    }
  }
};
</script>

<style>
</style>