<template>
  <div class="text-center">
    <v-dialog v-model="isDialogOpen" persistent max-width="900px">
      <v-card>
        <v-card-title class="pa-0">
          <v-row class="text-center ma-0">
            <v-col cols="12" xs="12" sm="12" md="3">Upload de imagens</v-col>
            <v-col v-if="loading" cols="12" xs="12" sm="12" md="9" class="color: grey lighten-3">
              <span class="text--disabled">Clique ou arraste as fotos aqui</span>
            </v-col>
            <v-col
              v-else
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
                :disabled="loading"
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
              <v-img :aspect-ratio="16/9" :src="imagesPreview[key]"></v-img>
              <v-card-text class="pa-2">
                <v-text-field
                  :disabled="loading"
                  label="Descrição"
                  v-model="dataAux[key].name"
                  dense
                  outlined
                  hide-details
                  prepend-icon="mdi-format-align-justify"
                ></v-text-field>
                <v-text-field
                  :disabled="loading"
                  class="mt-2"
                  label="Data"
                  v-model="dataAux[key].date"
                  dense
                  outlined
                  hide-details
                  prepend-icon="mdi-calendar"
                ></v-text-field>
              </v-card-text>
              <v-btn color="red" :disabled="loading" text block @click="removeFile( key )">
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
          <v-btn
            color="primary"
            @click="uploadFiles"
            :disabled="!(images.length > 0)"
            text
            :loading="loading"
          >
            Fazer Upload
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
    images: [],
    imagesPreview: [],
    dataAux: []
  }),
  methods: {
    readAsDataURL(imageFile) {
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.imagesPreview.push(reader.result);
        }.bind(this),
        false
      );
      reader.readAsDataURL(imageFile);
    },
    uploadFiles() {
      this.loading = true;
      console.log(this.images);
      console.log(this.dataAux);
      setTimeout(() => {
        this.close();
        this.loading = false;
      }, 1000);
    },
    determineDragAndDropCapable() {
      var div = document.createElement("div");

      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },
    onFilePicked(e) {
      for (let index = 0; index < e.target.files.length; index++) {
        this.images.push(e.target.files[index]);
        this.readAsDataURL(e.target.files[index]);
        this.dataAux.push({
          name: e.target.files[index].name,
          date: new Date(e.target.files[index].lastModified).toLocaleDateString(
            "en-ca"
          )
        });
      }
    },
    removeFile(key) {
      this.images.splice(key, 1);
      this.imagesPreview.splice(key, 1);
      this.dataAux.splice(key, 1);
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
              this.readAsDataURL(e.dataTransfer.files[i]);
              this.dataAux.push({
                name: e.dataTransfer.files[i].name,
                date: new Date(
                  e.dataTransfer.files[i].lastModified
                ).toLocaleDateString("en-ca")
              });
            }
          }
        }.bind(this)
      );
    }
  }
};
</script>

<style>
</style>