<template>
  <div class="text-center">
    <v-dialog v-model="isDialogOpen" persistent max-width="900px">
      <v-card class="mb-3">
        <v-card-title class="pa-0">
          <v-row class="text-center">
            <v-col cols="12" xs="12" sm="12" md="3" class="pa-3">Upload de imagens</v-col>
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="9"
              id="file-drag-drop"
              ref="fileform"
              class="pa-3 color: grey lighten-3"
              style="cursor: pointer"
            >
              <span class="drop-files">Clique ou arraste as fotos aqui</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="ma-5 pa-5 text-center" v-if="files.length == 0">Adicione novas imagens</v-card-text>
        <v-row v-else no-gutters class="overflow-y-auto" style="max-height: 60vh">
          <v-col
            class="file-listing"
            cols="12"
            v-for="(file, key) in files"
            :key="key"
            xs="12"
            sm="4"
            md="3"
          >
            <v-card outlined class="ma-1">
              <v-card-title>
                <v-card flat>
                  <img class="preview" v-bind:ref="'preview'+parseInt( key )" />
                </v-card>
                <v-spacer />
                <v-btn class="mb-2" icon @click="removeFile( key )">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-row class="ml-2 mr-2 mb-2" no-gutters>
                <v-col>
                  <v-text-field
                    label="Descrição"
                    dense
                    outlined
                    hide-details
                    class="mb-3"
                    prepend-icon="mdi-format-align-justify"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="$emit('close-dialog')" :disabled="loading">Cancelar</v-btn>
          <!--<v-btn
            color="primary"
            :disabled="!isEditing"
            text
            @click="createOrUpdate"
            :loading="loading"
          >
            Salvar
            <template v-slot:loader>
              <v-progress-circular indeterminate></v-progress-circular>
            </template>
          </v-btn>-->
          <v-btn text color="primary" :disabled="!(files.length > 0)">
            Fazer Uploud
            <v-icon right>mdi-cloud-upload-outline</v-icon>
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
    files: []
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
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function() {
              this.$refs["preview" + parseInt(i)][0].src = reader.result;
            }.bind(this),
            false
          );
          reader.readAsDataURL(this.files[i]);
        } else {
          this.$nextTick(function() {
            this.$refs["preview" + parseInt(i)][0].src = "/images/file.png";
          });
        }
      }
    },
    removeFile(key) {
      this.files.splice(key, 1);
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
          // console.log(e.dataTransfer.files);
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            if (e.dataTransfer.files[i].type.substring(0, 5) == "image") {
              this.files.push(e.dataTransfer.files[i]);
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