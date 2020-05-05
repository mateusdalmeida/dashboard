<template>
  <div class="text-center">
    <v-dialog v-model="isDialogOpen" persistent max-width="900px">
      <v-card>
        <v-card-title class="pa-0">
          <v-row class="text-center ma-0">
            <v-col cols="12" xs="12" sm="12" md="3">Upload de imagens</v-col>
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="9"
              ref="fileform"
              class="color: grey lighten-3"
              style="cursor: pointer"
              @click="$refs.inputUpload.click()"
            >
              <input
                v-show="false"
                ref="inputUpload"
                accept="image/*"
                multiple
                type="file"
                @change="onFilePicked"
              />
              <span>Clique ou arraste as fotos aqui</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5 text-center" v-if="images.length == 0">Adicione novas imagens</v-card-text>
        <v-row v-else no-gutters class="overflow-y-auto" style="max-height: 60vh">
          <v-col class cols="12" v-for="(file, key) in images" :key="key" xs="12" sm="4" md="3">
            <v-card outlined class="ma-1">
              <v-img :aspect-ratio="16/9" v-bind:ref="'preview'+parseInt( key )"></v-img>
              <v-card-text class="pa-2">
                <v-text-field
                  label="Descrição"
                  dense
                  outlined
                  hide-details
                  prepend-icon="mdi-format-align-justify"
                ></v-text-field>
                <v-text-field
                  class="mt-2"
                  label="Data"
                  dense
                  outlined
                  hide-details
                  prepend-icon="mdi-calendar"
                ></v-text-field>
              </v-card-text>
              <v-btn color="red" text block @click="removeFile( key )">
                Remover
                <v-icon rigth>mdi-delete-outline</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="$emit('close-dialog')" :disabled="loading">Cancelar</v-btn>
          <v-btn color="primary" :disabled="!(images.length > 0)" text :loading="loading">
            Fazer Uploud
            <v-icon right>mdi-cloud-upload-outline</v-icon>
            <template v-slot:loader>
              <v-progress-circular indeterminate></v-progress-circular>
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "ImageUpload",
  props: ["isDialogOpen"],
  data: () => ({
    loading: false,
    dragAndDropCapable: false,
    images: []
  }),
  methods: {
    determineDragAndDropCapable() {
      var div = document.createElement("div");

      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },
    getImagePreviews() {
      for (let i = 0; i < this.images.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.images[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function() {
              this.$refs["preview" + parseInt(i)][0].src = reader.result;
            }.bind(this),
            false
          );
          reader.readAsDataURL(this.images[i]);
        } else {
          this.$nextTick(function() {
            this.$refs["preview" + parseInt(i)][0].src = "/images/file.png";
          });
        }
      }
    },
    onFilePicked(e) {
      this.images.push(...e.target.files);
      this.getImagePreviews();
    },
    removeFile(key) {
      this.images.splice(key, 1);
      this.getImagePreviews();
    },
    close() {
      this.$emit("close-dialog", true);
    }
  },
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    if (this.dragAndDropCapable) {
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop"
      ].forEach(
        function(evt) {
          this.$refs.fileform.addEventListener(
            evt,
            function(e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        }.bind(this)
      );

      this.$refs.fileform.addEventListener(
        "drop",
        function(e) {
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            if (e.dataTransfer.files[i].type.substring(0, 5) == "image") {
              this.images.push(e.dataTransfer.files[i]);
              this.getImagePreviews();
            }
          }
        }.bind(this)
      );
    }
  }
};
</script>

<style>
div.file-listing {
  width: 400px;
  margin: auto;
  padding: 10px;
}

div.file-listing img {
  height: 100px;
}
</style>