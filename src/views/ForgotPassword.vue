<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col sm="8" md="3">
        <v-card v-if="!sent" class="elevation-12">
          <v-form ref="form" v-model="valid" @submit.prevent="requestReset">
            <v-toolbar flat>
              <v-toolbar-title>
                Forgot password
              </v-toolbar-title>
            </v-toolbar>
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
        <v-card v-else>
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
        console.log(res);

        this.sent = true;
        this.sentText = res.message;
        this.$refs.form.reset();
      });
    }
  }
};
</script>

<style></style>
