<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        Register
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form id="signupForm" ref="signupForm" @submit.prevent="onSignup">
        <v-text-field
          v-model="name"
          name="name"
          label="Name"
          :rules="nameRules"
          prepend-icon="mdi-account"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="email"
          label="E-Mail"
          type="email"
          :rules="emailRules"
          prepend-icon="mdi-mail"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          color="primary"
          name="password"
          label="Password"
          type="password"
          :rules="passwordRules"
          prepend-icon="mdi-lock"
          required
          loading
        >
          <template v-slot:progress>
            <v-progress-linear :value="progress" :color="color" height="7">
            </v-progress-linear>
          </template>
        </v-text-field>
        <v-text-field
          v-model="confirmPassword"
          color="primary"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          :rules="passwordRules"
          prepend-icon="mdi-lock"
          required
          loading
        >
          <template v-slot:progress>
            <v-progress-linear :value="progress2" :color="color2" height="7">
            </v-progress-linear>
          </template>
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" class="primary" form="signupForm">sign up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      value: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length > 2 || 'Name must be at least 3 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Passwords must match',
        v => v.length > 7 || 'Password must be at least 8 characters'
      ]
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? 'Passwords do not match'
        : '';
    },
    progress() {
      return Math.min(100, this.password.length * 10);
    },
    progress2() {
      return Math.min(100, this.confirmPassword.length * 10);
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)];
    },
    color2() {
      return ['error', 'warning', 'success'][Math.floor(this.progress2 / 40)];
    }
  },
  methods: {
    onSignup() {
      if (this.$refs.signupForm.validate()) {
        this.$store.dispatch('doRegister', {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        });
      }
    }
  }
};
</script>

<style></style>
