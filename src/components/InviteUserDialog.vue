<template>
  <placeholder>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <span>Invite User</span>
    </v-tooltip>
    <v-dialog v-model="dialog" max-width="500" @input="v => v || close()">
      <v-card>
        <v-card-title>
          Invite user
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              prepend-icon="mdi-mail"
              label="Email"
              validate-on-blur
              :rules="emailRules"
              clearable
            ></v-text-field>
            <v-select
              v-model="selectedRole"
              label="Role"
              prepend-icon="mdi-account"
              item-text="title"
              item-value="_id"
              :items="roles"
              :rules="requiredRules"
              return-object
            ></v-select>
            <v-checkbox v-model="isAdmin" label="Admin"></v-checkbox>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close()">Close</v-btn>
          <v-btn color="primary" :disabled="!valid" @click="onSubmit"
            >Invite</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </placeholder>
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
      selectedRole: '',
      roles: [],
      isAdmin: false,
      dialog: false
    };
  },
  watch: {
    dialog: function() {
      this.fetchRoles().then(res => {
        this.roles = res.roles;
      });
    }
  },
  methods: {
    ...mapActions(['inviteUser', 'toggleSnackbar', 'fetchRoles']),
    onSubmit() {
      const addInvite = {
        email: this.email,
        roleId: this.selectedRole._id,
        isAdmin: this.isAdmin
      };
      if (this.$refs.form.validate()) {
        this.inviteUser(addInvite)
          .then(() => {
            this.$refs.form.reset();
            this.toggleSnackbar({
              show: true,
              text: 'Invite has been sent',
              color: 'success'
            });
            this.$emit('newInvite', addInvite);
          })
          .catch(err => {
            this.toggleSnackbar({
              show: true,
              text: err.response.data.message,
              color: 'error'
            });
          });
      }
    },
    close() {
      this.$refs.form.reset();
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
