<template>
  <v-dialog v-model="dialog" max-width="500" @input="v => v || close()">
    <v-card>
      <v-card-title>Edit Category</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            label="Name"
            validate-on-blur
            :rules="validationRules"
            clearable
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close()">Close</v-btn>
        <v-btn color="primary" :disabled="!valid" @click="onSubmit">Edit Name</v-btn>
      </v-card-actions>
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
      required: true,
      default: null
    }
  },
  data() {
    return {
      name: ''
    };
  },
  methods: {
    ...mapActions(['editCategory', 'toggleSnackbar']),
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.editCategory({
          _id: this.category._id,
          name: this.name
        })
          .then(() => {
            this.$refs.form.reset();
            this.toggleSnackbar({
              show: true,
              text: 'Category name has been changed',
              color: 'success'
            });
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
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
