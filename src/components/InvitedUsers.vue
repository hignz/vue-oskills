<template>
  <v-card flat>
    <v-card-title
      >Invited
      <v-spacer></v-spacer>
      <v-form>
        <v-text-field
          v-model="searchTerm"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          clearable
          hide-details
        ></v-text-field>
      </v-form>
    </v-card-title>

    <template>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="searchTerm"
        item-key="email"
        no-data-text="No users loaded"
        no-results-text="No users found"
        :items-per-page="10"
      >
        <template v-slot:item.invitedAt="{ item }">
          {{
            formatDistanceToNow(new Date(item.invitedAt), {
              addSuffix: true
            })
          }}
        </template>

        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click="showInviteDialog(item)">
                <v-icon small>
                  mdi-email-send-outline
                </v-icon>
              </v-btn>
            </template>
            <span>Resend invitation</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click="showEditInviteDialog(item)">
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Delete user</span>
          </v-tooltip>
        </template>
      </v-data-table>

      <v-dialog v-model="inviteDialog" width="500" @input="v => v || close()">
        <v-card>
          <v-card-title class="headline" primary-title>
            Resend Invitation
          </v-card-title>

          <v-card-text>
            Please check if the details are correct
            <v-spacer></v-spacer>
            <p>{{ selectedUser.email }}</p>
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
                  selectedUser.email,
                  selectedUser.role,
                  selectedUser.isAdmin
                )
              "
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="editInviteDialog"
        width="500"
        @input="v => v || closeEdit()"
      >
        <v-card>
          <v-card-title class="headline" primary-title>
            Edit
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-row>
              <v-col>
                <p>{{ newInvite.email }}</p>
              </v-col>
              <v-col>
                <p>{{ newInvite.role }}</p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="email"
              label="Email"
              placeholder="Email"
            ></v-text-field>
            <v-select
              v-model="role"
              label="Role"
              :items="['Senior Developer', 'Junior Developer']"
            ></v-select>
            <v-checkbox v-model="isAdmin" label="Admin"></v-checkbox>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="closeEdit()">
              Close
            </v-btn>
            <v-btn color="error" @click="editInvite(newInvite)">
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { formatDistanceToNow } from 'date-fns';

export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchTerm: '',
      headers: [
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Role',
          align: 'center',
          sortable: true,
          value: 'role'
        },
        {
          text: 'Invited',
          align: 'center',
          sortable: true,
          value: 'invitedAt'
        },
        {
          text: 'Actions',
          value: 'action',
          align: 'center'
        }
      ],
      selectedUser: {},
      inviteDialog: false,
      newInvite: {},
      editInviteDialog: false,
      email: null,
      role: null,
      isAdmin: false,
      formatDistanceToNow
    };
  },
  methods: {
    ...mapActions(['toggleSnackbar', 'inviteUser', 'updateInvite']),
    openUserProfile(userId) {
      this.$router.push({
        name: 'profile',
        params: { id: userId }
      });
    },
    showEditInviteDialog(item) {
      console.log(item);
      this.newInvite = item;
      this.editInviteDialog = true;
    },
    editInvite(inviteData) {
      this.updateInvite({
        userId: inviteData._id,
        email: this.email,
        role: this.role,
        isAdmin: this.isAdmin
      })
        .then(() => {
          this.closeEdit();
          this.toggleSnackbar({
            show: true,
            text: 'User updated successfully',
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
    showInviteDialog(item) {
      this.selectedUser = item;
      this.inviteDialog = true;
    },
    resendInvite(email, role, isAdmin) {
      this.inviteUser({
        email: email,
        role: role,
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
      this.inviteDialog = !this.inviteDialog;
    },
    closeEdit() {
      this.editInviteDialog = !this.editInviteDialog;
    }
  }
};
</script>

<style></style>
