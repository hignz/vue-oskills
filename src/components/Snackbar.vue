<template>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="3000"
    :bottom="true"
  >
    {{ snackbar.text }}
    <v-btn text @click="closeSnackbar">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['snackbar'])
  },
  methods: {
    closeSnackbar() {
      this.snackbar.show = false;
    }
  }
};
</script>

<style></style>
