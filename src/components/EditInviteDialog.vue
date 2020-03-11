<template>
  <v-dialog v-model="dialog" width="500" @input="v => v || closeEdit()">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <span>Edit</span>

    <v-card>
      <v-card-title class="headline" primary-title>
        Edit
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-divider></v-divider>
        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Email"
          class="mt-3"
        ></v-text-field>
        <v-select
          v-model="selectedRole"
          label="Role"
          :items="roles"
          item-text="title"
          item-value="_id"
          return-object
        ></v-select>
        <v-checkbox v-model="isAdmin" label="Admin"></v-checkbox>
        <v-spacer></v-spacer>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close()">
          Close
        </v-btn>
        <v-btn color="error" @click="editInvite()">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
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
      isAdmin: false
    };
  },
  watch: {
    dialog(opened) {
      if (opened) {
        this.email = this.invite.email;
        this.role = this.invite.role;
        this.isAdmin = this.invite.isAdmin;
        this.fetchRoles().then(res => {
          this.roles = res.roles;
        });
      }
    }
  },
  methods: {
    ...mapActions(['toggleSnackbar', 'fetchRoles', 'updateInvite']),
    editInvite() {
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
            text: 'User updated successfully',
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
