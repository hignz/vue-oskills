<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col sm="6" class="text-center my-12">
        <v-toolbar-title class="text-uppercase">
          <span class="display-1 font-weight-bold primary--text">O</span>
          <span class="display-1 font-weight-light grey--text">Skills</span>
        </v-toolbar-title>
        <v-toolbar-title class="primary--text mt-4"
          >Forgot password</v-toolbar-title
        >
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col sm="6" md="4" lg="3">
        <v-card v-if="!sent" outlined>
          <v-form ref="form" v-model="valid" @submit.prevent="requestReset">
            <v-card-subtitle
              >Please enter your account's verified email address below and we
              will send you a password reset link</v-card-subtitle
            >
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                spellcheck="false"
                prepend-inner-icon="mdi-mail"
                required
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" primary :disabled="!valid" type="submit"
                >Send</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card v-else outlined>
          <v-card-text class="text-center">
            {{ sentText }}
          </v-card-text>

          <v-card-actions>
            <v-btn text block color="primary" @click="sent = !sent">
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
      valid: false,
      email: '',
      sent: false,
      sentText: ''
    };
  },
  created() {
    this.$store.dispatch('setLoading', false);
  },
  methods: {
    ...mapActions(['doPasswordResetRequest']),
    requestReset() {
      this.doPasswordResetRequest(this.email).then(res => {
        this.sent = true;
        this.sentText = res.message;
        this.$refs.form.reset();
      });
    }
  }
};
</script>

<style></style>
