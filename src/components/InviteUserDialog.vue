<template>
  <v-dialog v-model="dialog" max-width="600px">
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
            :rules="emailRules"
            clearable
          ></v-text-field>
          <v-select
            v-model="role"
            label="Role"
            prepend-icon="mdi-account"
            :items="['Senior Developer', 'Junior Developer']"
            :rules="requiredRule"
          ></v-select>
          <v-checkbox v-model="isAdmin" label="Admin"></v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = !dialog">Close</v-btn>
        <v-btn color="primary" :disabled="!valid" @click="onSubmit"
          >Invite</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="showSnackbar" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import Snackbar from 'vuex';

export default {
  data() {
    return {
      valid: false,
      email: '',
      role: '',
      isAdmin: false,
      dialog: false,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid'
      ],
      requiredRule: [v => !!v || 'Field is required'],
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: 'primary'
    };
  },
  methods: {
    ...mapActions(['inviteUser']),
    onSubmit() {
      if (this.$refs.form.validate()) {
        console.log('VALID');

        this.inviteUser({
          email: this.email,
          role: this.role,
          isAdmin: this.isAdmin
        })
          .then(() => {
            this.$refs.form.reset();
            this.snackbarText = 'Invite has been sent!';
            this.snackbarColor = 'primary';

            this.showSnackbar = true;
          })
          .catch(err => {
            this.snackbarText = err.response.data;
            this.snackbarColor = 'error';
            this.showSnackbar = true;
          });
      }
    }
  }
};
</script>

<style></style>
