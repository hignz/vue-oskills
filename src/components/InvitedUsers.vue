<template>
  <div>
    <v-card-title
      >Invited
      <span class="caption ml-2 grey--text">({{ users.length }})</span>
      <v-spacer></v-spacer>
      <InviteUserDialog @newInvite="updateUsers" />
      <v-form>
        <v-text-field
          v-model="searchTerm"
          class="mb-5 mx-5"
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
        sort-by="invitedAt"
        sort-desc
      >
        <template v-slot:item.invitedAt="{ item }">
          {{
            formatDistanceToNow(new Date(item.invitedAt), {
              addSuffix: true
            })
          }}
        </template>

        <template v-slot:item.action="{ item }">
          <ResendInviteDialog :invited-user="item"></ResendInviteDialog>

          <EditInviteDialog
            :invite="item"
            @update="emitEditInvite"
          ></EditInviteDialog>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click="showDeleteInviteDialog(item)">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Revoke invitation</span>
          </v-tooltip>
        </template>
      </v-data-table>

      <v-dialog
        v-model="deleteInviteDialog"
        width="500"
        @input="v => v || closeDelete()"
      >
        <v-card>
          <v-card-title class="headline" primary-title>
            Are you sure?
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="form" v-model="valid">
              Are you sure you want to revoke this invitation for
              {{ deleteInvite.email }} ? This action is irreversible
              <p class="mt-3">
                Please type
                <span class="font-weight-bold error--text">
                  {{ deleteInvite.email }}
                </span>
                to confirm:
              </p>
              <v-text-field
                v-model="confirmUser"
                class="pt-0"
                :rules="deleteRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="closeDelete()">
              Close
            </v-btn>
            <v-btn
              color="error"
              :disabled="!valid"
              @click="deleteUserInvite(deleteInvite._id)"
            >
              Revoke
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatDistanceToNow } from 'date-fns';
import ResendInviteDialog from '../components/ResendInviteDialog';
import EditInviteDialog from '../components/EditInviteDialog';
import InviteUserDialog from '../components/InviteUserDialog';
import validationRules from '../mixins/validationRules';

export default {
  components: {
    ResendInviteDialog,
    EditInviteDialog,
    InviteUserDialog
  },
  mixins: [validationRules],
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
          value: 'role.title'
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
      deleteInviteDialog: false,
      email: null,
      role: null,
      isAdmin: false,
      formatDistanceToNow,
      confirmUser: '',
      valid: false,
      deleteRules: [
        v => !!v || 'Required',
        v => v === this.deleteInvite.email || 'Email must match'
      ]
    };
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
    showDeleteInviteDialog(item) {
      this.deleteInvite = item;
      this.deleteInviteDialog = true;
    },
    deleteUserInvite(user) {
      this.deleteUser({ userId: user })
        .then(() => {
          this.closeDelete();
          this.toggleSnackbar({
            show: true,
            text: 'Invitation deleted successfully',
            color: 'success'
          });
          this.$emit('invite', user);
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
      this.$refs.form.reset();
      this.deleteInviteDialog = !this.deleteInviteDialog;
    },
    emitEditInvite(item) {
      this.$emit('invite', item);
    },
    updateUsers(item) {
      this.users.push(item);
    }
  }
};
</script>

<style></style>
