<template>
  <v-snackbar v-model="showSnack">
    <v-btn color="primary" text @click="show = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showSnack: this.show
    };
  }
};
</script>

<style></style>
