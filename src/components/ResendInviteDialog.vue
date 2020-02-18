<template>
  <v-dialog v-model="resendInviteDialog" width="600" @input="v => v || close()">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon small>
          mdi-email-send-outline
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline" primary-title>
        Resend Invitation
      </v-card-title>
      <v-card-text>
        <v-data-table
          class="mb-4"
          disable-sort
          :headers="[
            {
              text: 'Email',
              align: 'center',
              value: 'email'
            },
            { text: 'Role', value: 'role.title', align: 'center' },
            { text: 'Admin', align: 'center' }
          ]"
          :items="[invitedUser]"
          hide-default-footer
        >
          <template v-slot:item.isAdmin="{ item }">
            <v-simple-checkbox
              v-model="item.isAdmin"
              disabled
            ></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close()">
          Close
        </v-btn>
        <v-btn
          color="error"
          @click="
            resendInvite(
              invitedUser.email,
              invitedUser.role._id,
              invitedUser.isAdmin
            )
          "
        >
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    invitedUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      resendInviteDialog: false
    };
  },
  methods: {
    ...mapActions(['toggleSnackbar', 'inviteUser']),
    resendInvite(email, role, isAdmin) {
      this.inviteUser({
        email: email,
        roleId: role,
        isAdmin: isAdmin
      })
        .then(() => {
          this.close();
          this.toggleSnackbar({
            show: true,
            text: 'Invite has been sent',
            color: 'success'
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
      this.resendInviteDialog = !this.resendInviteDialog;
    }
  }
};
</script>

<style></style>
