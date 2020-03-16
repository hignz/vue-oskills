<template>
  <v-dialog v-model="dialog" width="500" @input="v => v || closeEdit()">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">
        Edit invitation
      </v-card-title>
      <v-form ref="form" v-model="valid">
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            prepend-icon="mdi-mail"
            placeholder="Email"
            :rules="emailRules"
            clearable
            class="mt-3"
          ></v-text-field>
          <v-select
            v-model="selectedRole"
            label="Role"
            :items="roles"
            :rules="requiredRules"
            prepend-icon="mdi-account"
            item-text="title"
            item-value="_id"
            return-object
          ></v-select>
          <v-checkbox v-model="isAdmin" label="Admin"></v-checkbox>
          <v-spacer></v-spacer>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close()">
          Close
        </v-btn>
        <v-btn color="primary" :disabled="!valid" @click="onSubmit()">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import validationRules from '../mixins/validationRules';

export default {
  mixins: [validationRules],
  props: {
    invite: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      roles: [],
      dialog: false,
      email: null,
      selectedRole: null,
      isAdmin: false,
      valid: false
    };
  },
  watch: {
    dialog(opened) {
      if (opened) {
        this.email = this.invite.email;
        this.role = this.invite.role;
        this.isAdmin = this.invite.isAdmin;
        this.fetchAllRoles().then(res => {
          this.roles = res.roles;
        });
      }
    }
  },
  methods: {
    ...mapActions(['toggleSnackbar', 'fetchAllRoles', 'updateInvite']),
    onSubmit() {
      this.updateInvite({
        userId: this.invite._id,
        email: this.email,
        roleId: this.selectedRole._id,
        isAdmin: this.isAdmin
      })
        .then(() => {
          this.close();
          this.toggleSnackbar({
            show: true,
            text: 'Invitation successfully updated!',
            color: 'success'
          });
          this.$emit('update', {
            userId: this.invite._id,
            email: this.email,
            role: this.selectedRole,
            isAdmin: this.isAdmin
          });
        })
        .catch(err => {
          this.toggleSnackbar({
            show: true,
            text: err.response.data,
            color: 'error'
          });
        });
    },
    close() {
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
