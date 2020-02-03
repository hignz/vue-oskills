<template>
  <v-dialog v-model="dialog" max-width="500" @input="v => v || close()">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Invite user
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            prepend-icon="mdi-mail"
            label="Email"
            validate-on-blur
            :rules="emailRules"
            clearable
          ></v-text-field>
          <v-select
            v-model="role"
            label="Role"
            prepend-icon="mdi-account"
            :items="['Senior Developer', 'Junior Developer']"
            :rules="requiredRules"
          ></v-select>
          <v-checkbox v-model="isAdmin" label="Admin"></v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close()">Close</v-btn>
        <v-btn color="primary" :disabled="!valid" @click="onSubmit"
          >Invite</v-btn
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
      valid: false,
      email: '',
      role: '',
      isAdmin: false,
      dialog: false
    };
  },
  methods: {
    ...mapActions(['inviteUser', 'toggleSnackbar']),
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.inviteUser({
          email: this.email,
          role: this.role,
          isAdmin: this.isAdmin
        })
          .then(() => {
            this.$refs.form.reset();
            this.toggleSnackbar({
              show: true,
              text: 'Invite has been sent',
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
