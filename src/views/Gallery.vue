<template>
  <v-container>
    <generic-gallery :photos="photos" />
  </v-container>
</template>

<script>
import GenericGallery from "@/components/GenericGallery";
import { getItems, getItem } from "@/services/requests";
export default {
  name: "Gallery",
  components: { GenericGallery },
  data: () => ({
    photos: []
  }),
  methods: {},
  async created() {
    let result = await getItems("/gallery");
    this.photos = result;
  }
};
</script>

<style>
</style>