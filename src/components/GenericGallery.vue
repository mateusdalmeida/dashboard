<template>
  <v-row no-gutters>
    <v-col xs="12" sm="2" md="2">
      <v-hover v-for="(image, index) in col1" :key="index">
        <v-card slot-scope="{ hover }" class="ma-1" flat style="cursor: pointer">
          <v-img :src="image['url']">
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
    <v-col xs="12" sm="2" md="2">
      <v-hover v-for="(image, index) in col2" :key="index">
        <v-card slot-scope="{ hover }" class="ma-1" flat style="cursor: pointer">
          <v-img :src="image['url']">
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
    <v-col xs="12" sm="2" md="2">
      <v-hover v-for="(image, index) in col3" :key="index">
        <v-card slot-scope="{ hover }" class="ma-1" flat style="cursor: pointer">
          <v-img :src="image['url']">
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
    <v-col xs="12" sm="2" md="2">
      <v-hover v-for="(image, index) in col4" :key="index">
        <v-card slot-scope="{ hover }" class="ma-1" flat style="cursor: pointer">
          <v-img :src="image['url']">
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
    <v-col xs="12" sm="2" md="2">
      <v-hover v-for="(image, index) in col5" :key="index">
        <v-card slot-scope="{ hover }" class="ma-1" flat style="cursor: pointer">
          <v-img :src="image['url']">
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
    <v-col xs="12" sm="2" md="2">
      <v-hover v-for="(image, index) in col6" :key="index">
        <v-card slot-scope="{ hover }" class="ma-1" flat style="cursor: pointer">
          <v-img :src="image['url']">
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
export default {
  name: "GenericGallery",
  props: ["photos", "type"],
  data: () => ({
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    col5: [],
    col6: []
  }),
  methods: {
    remove() {
      //missao pro anderson
      console.log("remove");
    },
    select(image) {
      console.log(image);
    }
  },
  created() {
    let count = 0;
    for (const photo in this.photos) {
      count++;
      switch (count) {
        case 1:
          this.col1.push(this.photos[photo]);
          break;
        case 2:
          this.col2.push(this.photos[photo]);
          break;
        case 3:
          this.col3.push(this.photos[photo]);
          break;
        case 4:
          this.col4.push(this.photos[photo]);
          break;
        case 5:
          this.col5.push(this.photos[photo]);
          break;
        case 6:
          this.col6.push(this.photos[photo]);
          count = 0;
          break;
      }
    }
  }
};
</script>

<style>
</style>