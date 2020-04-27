<template>
  <div class="text-center">
    <v-dialog v-model="isDialogOpen" persistent>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Criar/Editar {{$router.currentRoute.name}}</v-card-title>

        <v-container fluid>
          <div v-for="(fieldType, fieldName) in model" :key="fieldName">
            <v-text-field
              :label="fieldName"
              v-if="fieldType=='string'"
              v-model="modelAnswers[fieldName]"
            ></v-text-field>
            <!-- depois é melhor transformar esse datepicker todo em um componente -->
            <div v-if="fieldType=='date'">
              <v-menu
                v-model="datePickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
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
              :label="fieldName"
              v-if="fieldType=='boolean'"
              v-model="modelAnswers[fieldName]"
            ></v-checkbox>
          </div>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="$emit('close-dialog')" :disabled="loading">Cancelar</v-btn>
          <!-- esse botao vai realizar outro emit, mas é coisa mais pra frente -->
          <v-btn color="primary" text @click="$emit('close-dialog')" :loading="loading">
            Cadastrar/Atualizar
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
  props: ["isDialogOpen", "model"],
  data: () => ({
    loading: false,
    datePickerMenu: false,
    modelAnswers: {}
  })
};
</script>