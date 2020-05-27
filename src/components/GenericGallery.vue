<template>
  <v-row no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="3"
      md="2"
      v-for="(image, index) in images"
      :key="index"
    >
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          class="ma-1"
          flat
          style="cursor: pointer"
        >
          <v-img :src="image['img']" aspect-ratio="1">
            <div
              v-if="hover"
              v-ripple="{ center: true }"
              class="title white--text text-center"
              style="height: 100%; opacity: 0.9;"
            >
              <v-row
                @click="remove(image, index)"
                v-if="type == 'gallery'"
                class="red"
                style="height: 100%"
                align="center"
              >
                <v-col>
                  <v-icon color="white" x-large>mdi-delete-outline</v-icon>
                </v-col>
              </v-row>
              <v-row
                @click="select(image)"
                v-if="type == 'input'"
                class="primary"
                style="height: 100%"
                align="center"
              >
                <v-col>
                  <v-icon color="white" x-large
                    >mdi-check-circle-outline</v-icon
                  >
                </v-col>
              </v-row>
            </div>
          </v-img>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { getItems, getItem, deleteItem } from "@/services/requests";
export default {
  name: "GenericGallery",
  props: ["type", "images"],
  data: () => ({}),
  methods: {
    remove(img, index) {
      let data = img;
      data['index'] = index;
      this.$emit("delete-image", data);
      // let apiUrl;
      // if (this.$router.currentRoute.meta.apiUrl) {
      //   apiUrl = this.$router.currentRoute.meta.apiUrl;
      // } else {
      //   apiUrl = this.apiUrlManual;
      // }
      // let result;
      // result = await deleteItem(apiUrl, img.id);
      // if (typeof result != "string") {
      //   // requisicao conseguiu cadastrar com sucesso, entao pode sair
      //   // de alguma forma reseta o carregamento das imagens ou algo assim
      //   // this.photos.splice(index, 1);
      // }
    },
    select(image) {
      this.$emit("selectedimage", image);
    },
  },
};
</script>

<style></style>
