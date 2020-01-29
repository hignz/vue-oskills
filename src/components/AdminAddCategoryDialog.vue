<template>
  <v-dialog v-model="dialog" max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-view-grid-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Add Category</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="categoryName" label="Category"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="addNewCategory"> Add</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :bottom="true"
      :timeout="3000"
    >
      {{ snackbarText }}
      <v-btn color="red" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      categoryName: null,
      dialog: false,
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: ''
    };
  },
  methods: {
    ...mapActions(['addCategory']),
    addNewCategory() {
      this.addCategory({
        name: this.categoryName
      })
        .then(() => {
          this.$refs.form.reset();
          this.snackbarText = 'Category added successfully!';
          this.snackbarColor = 'success';
          this.showSnackbar = true;
        })
        .catch(() => {
          this.snackbarText = 'Something went wrong';
          this.snackbarColor = 'error';
          this.showSnackbar = true;
        });
    }
  }
};
</script>

<style></style>
