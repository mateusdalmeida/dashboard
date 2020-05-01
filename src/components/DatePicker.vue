<template>
  <div>
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
          :value="selectedDate"
        ></v-text-field>
      </template>
      <v-date-picker @input="selectDate" :label="fieldName" v-model="selectedDate"></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: ["fieldName", "isEditing"],
  data: () => ({
    datePickerMenu: false,
    selectedDate: ""
  }),
  methods: {
    selectDate() {
      this.datePickerMenu = false;
      this.$emit("input", this.selectedDate);
    }
  }
};
</script>