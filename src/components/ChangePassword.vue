<template>
  <v-form v-model="valid">
    <v-text-field
      v-if="!showChangePasswordInput"
      type="password"
      label="Password"
      prepend-inner-icon="mdi-textbox-password"
      value="madeuprandompassword"
      disabled
    ></v-text-field>
    <v-text-field
      v-if="showChangePasswordInput"
      v-model="oldPassword"
      :rules="requiredRules"
      validate-on-blur
      type="password"
      label="Old password"
      counter
    ></v-text-field>
    <v-text-field
      v-if="showChangePasswordInput"
      v-model="newPassword"
      label="Password"
      :rules="passwordRules"
      :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="hidePassword ? 'password' : 'text'"
      hint="Make sure it's at least 8 characters."
      counter
      required
      @click:append="hidePassword = !hidePassword"
    >
    </v-text-field>
    <v-text-field
      v-if="showChangePasswordInput"
      v-model="newPasswordConfirm"
      :rules="passwordRules"
      label="Confirm password"
      hint="Make sure it's at least 8 characters."
      :append-icon="hidePasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
      :type="hidePasswordConfirm ? 'password' : 'text'"
      counter
      required
      @click:append="hidePasswordConfirm = !hidePasswordConfirm"
    >
    </v-text-field>
    <v-btn
      v-if="!showChangePasswordInput"
      text
      color="primary"
      block
      @click="showChangePasswordInput = !showChangePasswordInput"
      >Change password</v-btn
    >
    <div v-if="showChangePasswordInput" class="">
      <p class="text-center caption mt-4">
        You will be logged out after successfully changing your password
      </p>
      <v-btn-toggle dense class="ml-7 mt-4">
        <v-btn text @click="showChangePasswordInput = !showChangePasswordInput">
          <v-icon color="error">
            mdi-close
          </v-icon>
        </v-btn>
        <v-btn
          color="success"
          text
          block
          :disabled="!valid"
          @click="changePassword()"
          >Update</v-btn
        >
      </v-btn-toggle>
    </div>
  </v-form>
</template>

<script>
import validationRules from '../mixins/validationRules';
import { mapActions } from 'vuex';

export default {
  mixins: [validationRules],
  data() {
    return {
      showChangePasswordInput: false,
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      valid: false,
      hidePassword: true,
      hidePasswordConfirm: true,
      passwordRules: [
        v => !!v || 'Password is required',
        v => v === this.newPassword || 'Passwords must match',
        v => v.length > 7 || 'Password must be at least 8 characters'
      ]
    };
  },
  methods: {
    ...mapActions(['doChangePassword', 'doLogout', 'toggleSnackbar']),
    changePassword() {
      this.doChangePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
        .then(() => {
          this.doLogout();
        })
        .catch(() => {
          this.incorrectOldPassword = true;
          this.toggleSnackbar({
            show: true,
            text: 'Something went wrong',
            color: 'error'
          });
        });
    }
  }
};
</script>

<style></style>
