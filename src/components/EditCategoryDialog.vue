<template>
  <v-dialog
    v-model="editCategoryDialog"
    max-width="500"
    @input="v => v || close()"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="mb-4">Edit Category</v-card-title>

      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Name"
            :rules="requiredRules"
            clearable
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close()">Close</v-btn>
          <v-btn color="success" :disabled="!valid" type="submit"
            >Edit Name</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import validationRules from '../mixins/validationRules';
import { mapActions } from 'vuex';

export default {
  mixins: [validationRules],
  props: {
    category: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      valid: false,
      name: '',
      editCategoryDialog: false
    };
  },
  watch: {
    editCategoryDialog(opened) {
      if (opened) {
        this.name = this.category.name;
      }
    }
  },
  methods: {
    ...mapActions(['editCategory', 'toggleSnackbar']),
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.editCategory({
          categoryId: this.category._id,
          name: this.name
        })
          .then(() => {
            this.toggleSnackbar({
              show: true,
              text: 'Category name has been changed',
              color: 'success'
            });
            this.$emit('update', {
              categoryId: this.category._id,
              name: this.name
            });
            this.close();
          })
          .catch(err => {
            this.toggleSnackbar({
              show: true,
              text: err.response.data,
              color: 'error'
            });
          });
      }
    },
    close() {
      this.$refs.form.reset();
      this.editCategoryDialog = !this.editCategoryDialog;
    }
  }
};
</script>

<style></style>
