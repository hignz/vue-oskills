<template>
  <v-card>
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
          :rules="requiredRule"
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
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      hidePassword: true,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid'
      ],
      requiredRule: [v => !!v || 'Field is required']
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
