<template>
  <v-dialog v-model="dialog" max-width="500" @input="v => v || close()">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="mb-4">Add role</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="roleName"
            label="Title"
            :rules="[minLength(2)]"
            clearable
            required
          ></v-text-field>
          <v-slider
            v-model="voteCount"
            class="mt-4"
            label="Vote count"
            type="number"
            dense
            thumb-label
          />
          <v-slider
            v-model="voteWeight"
            class="mt-4"
            label="Vote weight"
            type="number"
            dense
            min="1"
            thumb-label
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close()">Close</v-btn>
        <v-btn color="success" :disabled="!valid" @click="addNewRole"
          >Add</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import validationRules from '../mixins/validationRules';

export default {
  mixins: [validationRules],
  data() {
    return {
      roleName: null,
      voteWeight: 0,
      voteCount: 0,
      dialog: false,
      valid: false
    };
  },
  methods: {
    ...mapActions(['doAddRole', 'toggleSnackbar']),
    addNewRole() {
      const role = {
        title: this.roleName,
        voteWeight: this.voteWeight,
        voteCount: this.voteCount
      };
      this.doAddRole(role)
        .then(() => {
          this.close();
          this.toggleSnackbar({
            show: true,
            text: 'Role added successfully',
            color: 'success'
          });

          this.$emit('roleAdded', role);
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
