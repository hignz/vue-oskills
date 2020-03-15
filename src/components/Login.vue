<template>
  <v-col sm="6" md="4" lg="3">
    <v-card outlined>
      <v-form ref="loginForm" v-model="valid" @submit.prevent="login">
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
          <v-btn text small color="primary" :to="{ path: 'forgot-password' }"
            >Forgot password?</v-btn
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="primary"
            primary
            :disabled="!valid || isLoggingIn"
            type="submit"
            :loading="isLoggingIn"
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
      hidePassword: true,
      isLoggingIn: false
    };
  },
  methods: {
    ...mapActions(['doLogin', 'toggleSnackbar', 'fetchUser']),
    login() {
      if (this.$refs.loginForm.validate()) {
        this.isLoggingIn = true;

        this.doLogin({
          email: this.email,
          password: this.password
        })
          .then(response => {
            const { isAdmin } = response;

            this.$router.push(
              isAdmin ? { name: 'admin' } : { name: 'dashboard' }
            );

            if (isAdmin) {
              this.fetchUser();
            }
          })
          .catch(() => {
            this.toggleSnackbar({
              show: true,
              text: 'Email or password is incorrect',
              color: 'error'
            });
          })
          .finally(() => (this.isLoggingIn = false));
      }
    }
  }
};
</script>

<style></style>
