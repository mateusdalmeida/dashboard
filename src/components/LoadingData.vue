<template>
  <div class="text-center">
    <v-progress-circular indeterminate></v-progress-circular>
    <div>Carregando dados...</div>
  </div>
</template>
<script>
export default {
  name: "LoadingData",
  data: () => ({})
};
</script>