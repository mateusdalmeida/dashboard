<template>
  <v-container>
    <div v-for="image in images" :key="image.id">
      <v-img
        :src="image.img"
        width="150px"
        height="150px"
        @click="onSelectedImage(image)"
      ></v-img>
    </div>
  </v-container>
</template>
<script>
import { getItems } from "@/services/requests";
export default {
  data() {
    return {
      images: [],
    };
  },
  async created() {
    let images = await getItems("/gallery");
    this.images = images;
  },
  methods: {
    onSelectedImage(image) {
      this.$emit("select-file", { src: image.img, alt: image.name });
    },
  },
};
</script>
