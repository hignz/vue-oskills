<template>
  <placeholder>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="dialog = !dialog">
          <v-icon>mdi-view-grid-plus</v-icon>
        </v-btn>
      </template>
      <span>Add Category</span>
    </v-tooltip>
    <v-dialog v-model="dialog" max-width="500" @input="v => v || close()">
      <v-card>
        <v-card-title class="mb-4">Add category</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="categoryName"
              label="Category"
              :rules="[minLength(3)]"
              clearable
              required
            ></v-text-field>
            <v-textarea
              v-model="categoryDescription"
              label="Description"
              outlined
              clearable
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close()">Close</v-btn>
          <v-btn color="success" :disabled="!valid" @click="addNewCategory">
            Add</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </placeholder>
</template>

<script>
import { mapActions } from 'vuex';
import validationRules from '../mixins/validationRules';

export default {
  mixins: [validationRules],
  data() {
    return {
      categoryName: null,
      categoryDescription: null,
      dialog: false,
      valid: false
    };
  },
  methods: {
    ...mapActions(['addCategory', 'toggleSnackbar']),
    addNewCategory() {
      const newCategory = {
        name: this.categoryName,
        description: this.categoryDescription
      };
      this.addCategory(newCategory)
        .then(() => {
          this.close();
          this.toggleSnackbar({
            show: true,
            text: 'Category added successfully',
            color: 'success'
          });

          this.$emit('newCategory', newCategory);
        })
        .catch(() => {
          this.toggleSnackbar({
            show: true,
            text: 'Something went wrong',
            color: 'error'
          });
        });
    },
    close() {
      this.$refs.form.reset();
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
