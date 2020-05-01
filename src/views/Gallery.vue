<template>
  <v-container>
    <v-card class="mb-3">
      <v-card-title>
        Upload de imagens
        <v-spacer></v-spacer>
        <v-btn v-if="images.length > 0" text color="primary">
          Fazer Uploud
          <v-icon right>mdi-cloud-upload-outline</v-icon>
        </v-btn>
        <v-btn text color="primary" @click="adicionarAlternativa">Nova</v-btn>
      </v-card-title>
      <v-row no-gutters>
        <v-col cols="12" v-for="(alternativa, i) in images" :key="i" xs="12" sm="4" md="3">
          <v-card outlined class="ma-1">
            <v-card-title>
              IMAGEM {{i+1}}
              <v-spacer />
              <v-btn class="mb-2" icon @click="removerAlternativa(i)">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </v-card-title>
            <v-row class="ml-2 mr-2 mb-2" no-gutters>
              <v-col>
                <v-file-input
                  v-model="images[i].img"
                  label="Imagem"
                  accept="image/*"
                  outlined
                  dense
                  hide-details
                  class="mb-3"
                ></v-file-input>
                <v-text-field
                  label="Descrição"
                  v-model="images[i].text"
                  dense
                  outlined
                  hide-details
                  class="mb-3"
                  prepend-icon="mdi-format-align-justify"
                ></v-text-field>
                <!-- precisa fazer o component receber parametros -->
                <date-picker v-model="images[i].latex" :isEditing="true" fieldName="Data" />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-card-title>Suas Imagens</v-card-title>
      <generic-gallery v-if="!isLoading" :photos="photos" />
    </v-card>
  </v-container>
</template>

<script>
import DatePicker from "@/components/DatePicker";
import GenericGallery from "@/components/GenericGallery";
import { getItems, getItem } from "@/services/requests";
export default {
  name: "Gallery",
  components: { GenericGallery, DatePicker },
  data: () => ({
    photos: [],
    isLoading: true,
    images: []
  }),
  methods: {
    removerAlternativa(index) {
      this.images.splice(index, 1);
    },
    adicionarAlternativa() {
      this.images.push({});
    }
  },
  async created() {
    let result = await getItems("/gallery");
    this.photos = result;
    this.isLoading = false;
  }
};
</script>

<style>
</style>