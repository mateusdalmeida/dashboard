<template>
  <v-container>
    <div v-if="isLoading">
      <v-row>
        <v-col sm="1">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-col>
        <v-col>Carregando dados...</v-col>
      </v-row>
    </div>
    <generic-gallery v-if="!isLoading" :photos="photos" />
  </v-container>
</template>

<script>
import GenericGallery from "@/components/GenericGallery";
import { getItems, getItem } from "@/services/requests";
export default {
  name: "Gallery",
  components: { GenericGallery },
  data: () => ({
    photos: [],
    isLoading: true
  }),
  methods: {},
  async created() {
    let result = await getItems("/gallery");
    this.photos = result;
    this.isLoading = false;
  }
};
</script>

<style>
</style>