<template>
  <div class="text-center">
    <v-dialog v-model="isDialogOpen" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="!this.itemToUpdate" class="headline"
            >Criar {{ $router.currentRoute.name }}</span
          >
          <span v-if="this.itemToUpdate && !isEditing" class="headline"
            >Visualizar {{ $router.currentRoute.name }}</span
          >
          <span v-if="this.itemToUpdate && isEditing" class="headline"
            >Editar {{ $router.currentRoute.name }}</span
          >
          <v-spacer></v-spacer>
          <v-btn
            v-if="this.itemToUpdate && module_type != 'view'"
            text
            color="primary"
            @click="isEditing = !isEditing"
          >
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
                :md="
                  fieldType['type'] == 'radio_btn' ||
                  fieldType['type'] == 'multiple' ||
                  fieldType == 'richtext'
                    ? '12'
                    : '4'
                "
                v-for="(fieldType, fieldName) in model"
                :key="fieldName"
                :order="fieldType['type'] == 'radio_btn' ? 'last' : ''"
              >
                <editor
                  v-if="fieldType == 'richtext'"
                  v-model="modelAnswers[fieldName]"
                  :disabled="!isEditing"
                  :label="fieldName"
                  :contentToUpdate="
                    modelAnswers[fieldName]
                      ? modelAnswers[fieldName].toString()
                      : ''
                  "
                />
                <v-text-field
                  v-if="fieldType == 'string'"
                  :label="fieldName"
                  v-model="modelAnswers[fieldName]"
                  dense
                  outlined
                  hide-details
                  :disabled="!isEditing"
                ></v-text-field>

                <date-picker
                  v-if="fieldType == 'date'"
                  v-model="modelAnswers[fieldName]"
                  :isEditing="isEditing"
                  :fieldName="fieldName"
                />

                <div v-if="fieldType['type'] == 'multiple'">
                  <!-- aqui vai ser a div responsável pelos items multiplos -->
                  <!-- {{ model[fieldName]["items"] }} -->
                  {{ fieldName }}
                  <v-btn
                    :disabled="!isEditing"
                    @click="addToMultipleField(fieldName)"
                    ><v-icon>mdi-plus</v-icon></v-btn
                  >
                  <v-container>
                    <v-row
                      class="mt-1"
                      v-for="(item, index) in modelAnswers[fieldName]"
                      :key="index"
                    >
                      <v-text-field
                        dense
                        outlined
                        hide-details
                        v-model="modelAnswers[fieldName][index]"
                        :disabled="!isEditing"
                      ></v-text-field>
                      <!-- regra para pelo menos um multiple :disabled="modelAnswers[fieldName].length == 1" -->
                      <v-btn
                        :disabled="!isEditing"
                        @click="removeFromMultipleField(fieldName, index)"
                        ><v-icon>mdi-trash-can</v-icon></v-btn
                      >
                    </v-row>
                  </v-container>
                </div>

                <v-col v-if="fieldType == 'img_picker'">
                  <v-card flat v-if="modelAnswers[fieldName]">
                    <v-img :src="modelAnswers[fieldName]['url']"></v-img>
                  </v-card>
                  <v-btn
                    :disabled="!isEditing"
                    text
                    color="primary"
                    @click="dialog = true"
                    block
                  >
                    {{ modelAnswers[fieldName] ? "Trocar" : "Selecionar" }}
                    <v-icon right>mdi-camera</v-icon>
                  </v-btn>
                  <v-dialog v-model="dialog" max-width="600px">
                    <v-card>
                      <v-card-title>Selecione uma imagem</v-card-title>
                      <div class="overflow-y-auto" style="max-height: 60vh">
                        <generic-gallery
                          @selectedimage="imagepicker($event, fieldName)"
                          :type="'input'"
                        />
                      </div>
                    </v-card>
                  </v-dialog>
                </v-col>

                <v-checkbox
                  v-if="fieldType == 'boolean'"
                  :label="fieldName"
                  v-model="modelAnswers[fieldName]"
                  :disabled="!isEditing"
                ></v-checkbox>
                <div v-if="fieldType['type'] == 'radio_btn'">
                  <v-radio-group
                    v-model="modelAnswers[fieldName]"
                    row
                    :disabled="!isEditing"
                  >
                    <!-- 
                      existe um problema aqui: o title nesse caso em especifico existe, mas imagina
                      se fosse uma lista de usuarios? aqui nao teria o title, mas algo tipo o username
                      ou algo do tipo. Nao consegui pensar nessa solucao
                    -->
                    <v-radio
                      v-for="n in externalFields[fieldName]"
                      :key="n.title"
                      :label="n.title"
                      :value="n.title"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="$emit('close-dialog')"
            :disabled="loading"
            >Cancelar</v-btn
          >
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
import TipTap from "@/components/TipTap";
import GenericGallery from "@/components/GenericGallery";
import DatePicker from "@/components/DatePicker";
import { getItems, createItem, updateItem } from "@/services/requests";

export default {
  name: "GenericEditor",
  props: ["isDialogOpen", "model", "apiUrlManual", "itemToUpdate"],
  components: { DatePicker, GenericGallery, editor: TipTap },
  data: () => ({
    isEditing: false,
    loading: false,
    datePickerMenu: false,
    modelAnswers: {},
    externalFields: {},
    module_type: "",
    dialog: false,
  }),
  methods: {
    imagepicker(file, fieldName) {
      this.modelAnswers[fieldName] = file;
      this.dialog = false;
    },
    addToMultipleField(fieldName) {
      let fieldType = this.model[fieldName]["items"];
      if (!this.modelAnswers[fieldName]) {
        this.$set(this.modelAnswers, fieldName, []);
      }
      switch (fieldType) {
        case "string":
          this.modelAnswers[fieldName].push("");
          break;
        default:
          this.modelAnswers[fieldName].push({});
          break;
      }
    },
    removeFromMultipleField(fieldName, index) {
      this.modelAnswers[fieldName].splice(index, 1);
      if (this.modelAnswers[fieldName].length == 0) {
        delete this.modelAnswers[fieldName];
      }
    },
    async createOrUpdate() {
      let apiUrl;
      if (this.$router.currentRoute.meta.apiUrl) {
        apiUrl = this.$router.currentRoute.meta.apiUrl;
      } else {
        apiUrl = this.apiUrlManual;
      }
      let result;
      if (this.itemToUpdate) {
        result = await updateItem(
          apiUrl,
          this.itemToUpdate.id,
          this.modelAnswers
        );
      } else {
        result = await createItem(apiUrl, this.modelAnswers);
      }

      if (typeof result != "string") {
        // requisicao conseguiu cadastrar com sucesso, entao pode sair
        this.$emit("close-dialog", true);
      }
    },
  },
  beforeMount() {
    // recupera qual o tipo de modulo
    if (this.$router.currentRoute.meta.module_type) {
      this.module_type = this.$router.currentRoute.meta.module_type;
    }
    // realiza uma verificacao para observar se algum dos fields
    // do model é um objeto e cria um array com esses objetos
    let externalFields = Object.entries(this.model).filter((e) => {
      if (typeof e[1] == "object") {
        return e;
      }
    });
    // para cada field do tipo objeto realiza um get para o seu
    // endpoint na api (para pegar os valores)
    externalFields.forEach(async (externalField) => {
      // verifica se o external field possui module
      if (externalField[1].items.module) {
        let result = await getItems(externalField[1].items.module);
        // atualiza a variavel externalFields com uma nova chave (o nome do field)
        // e o array de itens obtido na requisicao
        // a variavel external fields é utilizada dentro do v-for
        if (typeof result != "string") {
          this.$set(this.externalFields, externalField[0], result);
        }
      } else {
        this.$set(this.externalFields, externalField[0], externalField[1]);
      }
    });

    if (this.itemToUpdate) {
      this.modelAnswers = JSON.parse(JSON.stringify(this.itemToUpdate));
    } else {
      this.isEditing = true;
    }
  },
};
</script>
