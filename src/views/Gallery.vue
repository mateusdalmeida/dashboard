<template>
  <v-container>
    <v-card>
      <v-card-title>
        Suas Imagens
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="imageUploadDialog = true">Adicionar imagens</v-btn>
      </v-card-title>
      <generic-gallery v-if="!isLoading" :photos="photos" />
    </v-card>
    <image-upload
      v-if="imageUploadDialog"
      :isDialogOpen="imageUploadDialog"
      @close-dialog="closeDialog"
    />
  </v-container>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
import GenericGallery from "@/components/GenericGallery";
import { getItems, getItem } from "@/services/requests";
export default {
  name: "Gallery",
  components: { GenericGallery, ImageUpload },
  data: () => ({
    photos: [],
    isLoading: true,
    imageUploadDialog: false
  }),
  methods: {
    closeDialog() {
      this.imageUploadDialog = false;
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