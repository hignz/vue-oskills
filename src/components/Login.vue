<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          Sign in to OSkills
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form id="loginForm" ref="loginForm" @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="E-mail"
            prepend-inner-icon="mdi-account"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
            :type="value ? 'password' : 'text'"
            required
            @click:append="() => (value = !value)"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" class="primary" form="loginForm" primary
          >Sign In</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="showSnackbar"
      color="primary"
      :timeout="4000"
      :bottom="true"
    >
      {{ snackbarText }}
      <v-btn dark text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-flex>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showSnackbar: false,
      snackbarText: '',
      value: String
    };
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.$store
          .dispatch('doLogin', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            this.$router.push('/dashboard');
          })
          .catch(err => {
            console.log(err);
            this.snackbarText = err.message;
            this.showSnackbar = true;
          });
      }
    }
  }
};
</script>

<style></style>
