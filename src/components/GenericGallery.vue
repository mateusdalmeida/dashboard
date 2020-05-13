<template>
  <v-row no-gutters>
    <v-col cols="12" xs="12" sm="3" md="2" v-for="(image, index) in photos" :key="index">
      <v-hover>
        <v-card slot-scope="{ hover }" class="ma-1" flat style="cursor: pointer">
          <v-img :src="image['url']" aspect-ratio="1">
            <div
              v-if="hover"
              v-ripple="{ center: true }"
              class="title white--text text-center"
              style="height: 100%; opacity: 0.9;"
            >
              <v-row
                @click="remove"
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
                  <v-icon color="white" x-large>mdi-check-circle-outline</v-icon>
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
import { getItems, getItem } from "@/services/requests";
export default {
  name: "GenericGallery",
  props: ["type"],
  data: () => ({
    photos: []
  }),
  methods: {
    remove() {
      //missao pro anderson
      console.log("remove");
    },
    select(image) {
      this.$emit("selectedimage", image);
    }
  },
  async created() {
    let result = await getItems("/gallery");
    this.photos = result;
  }
};
</script>

<style>
</style>