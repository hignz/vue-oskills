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
              <ResendInviteDialog :invited-user="item"></ResendInviteDialog>
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
              <v-btn icon v-on="on" @click="showDeleteInviteDialog(item)">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Delete user</span>
          </v-tooltip>
        </template>
      </v-data-table>

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
            <v-divider></v-divider>
            <v-text-field
              v-model="email"
              label="Email"
              placeholder="Email"
              class="mt-3"
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
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="deleteInviteDialog"
        width="500"
        @input="v => v || closeDelete()"
      >
        <v-card>
          <v-card-title class="headline" primary-title>
            Are you sure?
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-4">
            Are you sure you want to delete invitation for
            {{ deleteInvite.email }} ? This action is irreversible
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />

            <v-btn text @click="closeDelete()">
              Close
            </v-btn>
            <v-btn color="error" @click="deleteUserInvite(deleteInvite._id)">
              Delete
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
import ResendInviteDialog from '../components/ResendInviteDialog';

export default {
  components: {
    ResendInviteDialog
  },
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
      newInvite: {},
      deleteInvite: {},
      editInviteDialog: false,
      deleteInviteDialog: false,
      email: null,
      role: null,
      isAdmin: false,
      formatDistanceToNow
    };
  },
  watch: {
    editInviteDialog(opened) {
      if (opened) {
        this.email = this.newInvite.email;
        this.role = this.newInvite.role;
        this.isAdmin = this.newInvite.isAdmin;
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleSnackbar',
      'inviteUser',
      'updateInvite',
      'deleteUser'
    ]),
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
          this.$emit('invite', inviteData._id);
        })
        .catch(err => {
          this.toggleSnackbar({
            show: true,
            text: err.response.data,
            color: 'error'
          });
        });
    },
    showDeleteInviteDialog(item) {
      this.deleteInvite = item;
      this.deleteInviteDialog = true;
    },
    deleteUserInvite(userId) {
      this.deleteUser({ userId: userId })
        .then(() => {
          this.closeDelete();
          this.toggleSnackbar({
            show: true,
            text: 'Invitation deleted successfully',
            color: 'success'
          });
          this.$emit('invite', userId);
        })
        .catch(err => {
          this.toggleSnackbar({
            show: true,
            text: err.response.data.error,
            color: 'error'
          });
        });
    },
    closeEdit() {
      this.editInviteDialog = !this.editInviteDialog;
    },
    closeDelete() {
      this.deleteInviteDialog = !this.deleteInviteDialog;
    }
  }
};
</script>

<style></style>
