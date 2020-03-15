<template>
  <v-form v-model="valid">
    <v-text-field
      label="Email"
      class="text-center"
      prepend-inner-icon="mdi-email"
      :value="user.email"
      disabled
    >
    </v-text-field>
    <v-text-field
      v-if="showNewEmailInput"
      v-model="newEmail"
      label="New email"
      :rules="emailRules"
      type="email"
      class="text-center"
    ></v-text-field>
    <v-btn
      v-if="!showNewEmailInput"
      text
      color="primary"
      block
      @click="showNewEmailInput = !showNewEmailInput"
      >Change email</v-btn
    >
    <v-btn-toggle dense class="ml-7 mt-4">
      <v-btn
        v-if="showNewEmailInput"
        text
        @click="showNewEmailInput = !showNewEmailInput"
      >
        <v-icon color="error">
          mdi-close
        </v-icon>
      </v-btn>
      <v-btn
        v-if="showNewEmailInput"
        color="success"
        text
        block
        :disabled="!valid"
        @click="showNewEmailInput = !showNewEmailInput"
        >Update</v-btn
      >
    </v-btn-toggle>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';
import validationRules from '../mixins/validationRules';

export default {
  mixins: [validationRules],
  data() {
    return {
      showNewEmailInput: false,
      newEmail: '',
      valid: false
    };
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style></style>
