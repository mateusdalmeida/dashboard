<template>
  <v-container>
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