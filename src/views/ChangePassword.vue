<template>
  <v-container v-if="authenticated" fill-height>
    <v-row align="center" justify="center">
      <v-col sm="8" md="3">
        <v-card v-if="!submitted" class="elevation-12">
          <v-form ref="form" v-model="valid" @submit.prevent="changePassword">
            <v-toolbar flat>
              <v-toolbar-title>
                Change password
              </v-toolbar-title>
            </v-toolbar>
            <v-card-subtitle
              >Please enter your new password below</v-card-subtitle
            >
            <v-card-text>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="hidePassword ? 'password' : 'text'"
                :rules="passwordRules"
                required
                @click:append="() => (hidePassword = !hidePassword)"
              >
              </v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm password"
                prepend-inner-icon="mdi-lock"
                :append-icon="hideConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="hideConfirmPassword ? 'password' : 'text'"
                :rules="passwordRules"
                required
                @click:append="
                  () => (hideConfirmPassword = !hideConfirmPassword)
                "
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" primary :disabled="!valid" type="submit"
                >Change</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card v-else>
          <v-card-text class="text-center">
            Your password was successfully changed. Please login to continue.
          </v-card-text>

          <v-card-actions>
            <v-btn text block color="primary" :to="{ name: 'login' }">
              Return to login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import validationRules from '../mixins/validationRules';

export default {
  mixins: [validationRules],
  data() {
    return {
      token: '',
      authenticated: false,
      submitted: false,
      password: '',
      confirmPassword: '',
      hidePassword: true,
      hideConfirmPassword: true,
      valid: false
    };
  },
  created() {
    this.token = this.$route.params.resetToken;

    this.verifyResetRequest(this.token)
      .then(() => {
        this.authenticated = true;
      })
      .catch(() => {
        this.$router.push({ name: 'login' });
      });
  },
  methods: {
    ...mapActions(['verifyResetRequest', 'resetPassword']),
    changePassword() {
      this.resetPassword({
        resetToken: this.token,
        newPassword: this.password
      })
        .then(() => {
          this.submitted = true;
        })
        .catch(() => {});
    }
  }
};
</script>

<style></style>
