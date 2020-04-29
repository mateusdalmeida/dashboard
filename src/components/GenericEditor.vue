<template>
  <div class="text-center">
    <v-dialog v-model="isDialogOpen" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="!this.itemToUpdate" class="headline">Criar {{$router.currentRoute.name}}</span>
          <span
            v-if="this.itemToUpdate && !isEditing"
            class="headline"
          >Visualizar {{$router.currentRoute.name}}</span>
          <span
            v-if="this.itemToUpdate && isEditing"
            class="headline"
          >Editar {{$router.currentRoute.name}}</span>
          <v-spacer></v-spacer>
          <v-btn v-if="this.itemToUpdate" text color="primary" @click="isEditing = !isEditing">
            Editar
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                :md="fieldType['type']=='radio_btn' ? '12' : '4'"
                v-for="(fieldType, fieldName) in model"
                :key="fieldName"
                :order=" fieldType['type']=='radio_btn' ? 'last' : '' "
              >
                <v-text-field
                  v-if="fieldType=='string'"
                  :label="fieldName"
                  v-model="modelAnswers[fieldName]"
                  :disabled="!isEditing"
                ></v-text-field>

                <!-- depois é melhor transformar esse datepicker todo em um componente -->
                <div v-if="fieldType=='date'">
                  <v-menu
                    v-model="datePickerMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    :top="$vuetify.breakpoint.smAndDown"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :disabled="!isEditing"
                        readonly
                        :label="fieldName"
                        v-on="on"
                        :value="modelAnswers[fieldName]"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      @input="datePickerMenu = false"
                      :label="fieldName"
                      v-model="modelAnswers[fieldName]"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <!-- fim do datepicker -->
                <v-checkbox
                  v-if="fieldType=='boolean'"
                  :label="fieldName"
                  v-model="modelAnswers[fieldName]"
                  :disabled="!isEditing"
                ></v-checkbox>
                <div v-if="fieldType['type']=='radio_btn'">
                  {{fieldName}}
                  <v-radio-group
                    v-model="modelAnswers[fieldName]"
                    row
                    name="asfsf"
                    :disabled="!isEditing"
                  >
                    <v-radio v-for="n in fieldType['items']" :key="n" :label="n" :value="n"></v-radio>
                  </v-radio-group>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="$emit('close-dialog')" :disabled="loading">Cancelar</v-btn>
          <!-- esse botao vai realizar outro emit, mas é coisa mais pra frente -->
          <v-btn
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
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "GenericEditor",
  props: ["isDialogOpen", "model", "apiUrlManual", "itemToUpdate"],
  data: () => ({
    isEditing: false,
    loading: false,
    datePickerMenu: false,
    modelAnswers: {}
  }),
  methods: {
    async createOrUpdate() {
      let apiUrl;
      if (this.$router.currentRoute.meta.apiUrl) {
        apiUrl = this.$router.currentRoute.meta.apiUrl;
      } else {
        apiUrl = this.apiUrlManual;
      }
      let result;
      if (this.itemToUpdate) {
        result = await this.$http.put(
          `${apiUrl}/${this.itemToUpdate.id}`,
          this.modelAnswers
        );
      } else {
        result = await this.$http.post(apiUrl, this.modelAnswers);
      }

      if (result.status == 201 || result.status == 200) {
        // requisicao conseguiu cadastrar com sucesso, entao pode sair
        this.$emit("close-dialog", true);
      }
    }
  },
  beforeMount() {
    if (this.itemToUpdate) {
      this.modelAnswers = JSON.parse(JSON.stringify(this.itemToUpdate));
    } else {
      this.isEditing = true;
    }
  }
};
</script>