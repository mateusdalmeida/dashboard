<template>
  <v-container>
    <v-card>
      <v-card-title>
        Suas Imagens
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="imageUploadDialog = true"
          >Adicionar imagens</v-btn
        >
      </v-card-title>
      <generic-gallery
        :type="'gallery'"
        :images="images"
        @delete-image="deleteImage"
      />
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
import { getItems, getItem, deleteItem } from "@/services/requests";
export default {
  name: "Gallery",
  components: { GenericGallery, ImageUpload },
  data: () => ({
    imageUploadDialog: false,
    apiUrl: "",
    images: [],
  }),
  methods: {
    closeDialog() {
      this.imageUploadDialog = false;
      this.requestData();
    },
    async requestData() {
      // this.isLoading = true;
      let result = await getItems(this.apiUrl);
      this.images = result;
      // this.isLoading = false;
    },
    async deleteImage(image) {
      let apiUrl;
      if (this.$router.currentRoute.meta.apiUrl) {
        apiUrl = this.$router.currentRoute.meta.apiUrl;
      } else {
        apiUrl = this.apiUrlManual;
      }
      let result;
      result = await deleteItem(apiUrl, image.id);
      if (typeof result != "string") {
        // de alguma forma reseta o carregamento das imagens ou algo assim

        //isso aqui

        // this.photos.splice(index, 1);
        // for (let index = 0; index < this.images.length; index++) {
        //   if (this.images[index].id == image.id) {
        //     this.images.splice(index, 1);
        //     break;
        //   }
        // }
        // ou isso
        this.requestData();
      }
    },
  },
  async created() {
    this.apiUrl = this.$router.currentRoute.meta.apiUrl;
    await this.requestData();
  },
};
</script>

<style></style>
