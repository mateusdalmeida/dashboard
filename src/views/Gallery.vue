<template>
  <v-container>
    <v-card>
      <v-card-title>
        Suas Imagens
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="imageUploadDialog = true">Adicionar imagens</v-btn>
      </v-card-title>
      <generic-gallery :type="'input'" />
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
    imageUploadDialog: false
  }),
  methods: {
    closeDialog() {
      this.imageUploadDialog = false;
    }
  }
};
</script>

<style>
</style>