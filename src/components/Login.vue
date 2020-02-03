<template>
  <v-col sm="8" md="4">
    <v-card class="elevation-12">
      <v-form ref="loginForm" v-model="valid" @submit.prevent="login">
        <v-toolbar flat>
          <v-toolbar-title>
            Sign in to OSkills
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            validate-on-blur
            prepend-inner-icon="mdi-account"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="hidePassword ? 'password' : 'text'"
            :rules="requiredRules"
            required
            @click:append="() => (hidePassword = !hidePassword)"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" primary :disabled="!valid" type="submit"
            >Sign In</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-col>
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
      password: '',
      hidePassword: true
    };
  },
  methods: {
    ...mapActions(['doLogin', 'toggleSnackbar']),
    login() {
      if (this.$refs.loginForm.validate()) {
        this.doLogin({
          email: this.email,
          password: this.password
        })
          .then(response => {
            const { isAdmin } = response;

            this.$router.push(
              isAdmin ? { name: 'admin' } : { name: 'dashboard' }
            );
          })
          .catch(() => {
            this.toggleSnackbar({
              show: true,
              text: 'Email or password is incorrect',
              color: 'error'
            });
          });
      }
    }
  }
};
</script>

<style></style>
