<template>
  <v-card flat>
    <v-card-title
      >Registered
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
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        no-data-text="No users loaded"
        no-results-text="No users found"
        show-expand
        expand-icon="mdi-chevron-down"
        :items-per-page="10"
      >
        <template v-slot:item.joinedAt="{ item }">
          {{ userDateJoined(item.joinedAt) }}
        </template>

        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="showDeleteDialog(item)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Delete user</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="openUserProfile(item._id)">
                  mdi-account-card-details
                </v-icon>
              </v-btn>
            </template>
            <span>User profile</span>
          </v-tooltip>
        </template>

        <template v-slot:expanded-item="{ item }">
          <td :colspan="12">
            <v-row v-if="item.skills.length">
              <v-col cols="12" sm="12" md="6">
                <RadarChart
                  v-if="item.skills.length"
                  :user-skills="item.skills"
                  :size="120"
                  :height="330"
                  :skill-categories="skillCategories"
                  :hide-logged-in-user="true"
                  class="pr-2"
                ></RadarChart>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-data-table
                  :headers="[
                    {
                      text: 'Name',
                      align: 'left',
                      sortable: true,
                      value: 'skill.name'
                    },
                    {
                      text: 'Category',
                      align: 'left',
                      sortable: true,
                      value: 'skill.category.name'
                    },
                    {
                      text: 'Esteem',
                      align: 'center',
                      sortable: true,
                      value: 'esteem'
                    }
                  ]"
                  :items="item.skills"
                  item-key="name"
                  no-data-text="No skills loaded"
                  no-results-text="No skills found"
                  :items-per-page="5"
                >
                  <template v-slot:item.esteem="{ item }">
                    <EsteemBadge :esteem="item.esteem"></EsteemBadge>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <div v-else class="text-center grey--text mt-3">
              <p class="text-center grey--text">
                This user have not added any skills yet
              </p>
            </div>
          </td>
        </template>
      </v-data-table>

      <v-dialog v-model="deleteDialog" width="500" @input="v => v || close()">
        <v-card>
          <v-card-title class="headline" primary-title>
            Are you sure?
          </v-card-title>

          <v-card-text>
            Are you sure you want to delete {{ selectedUser.name }} ? Once you
            delete this user this action will be irreversible
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />

            <v-btn text @click="close()">
              Close
            </v-btn>
            <v-btn color="error" @click="removeUser(selectedUser._id)">
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
import RadarChart from '../components/RadarChart';
import EsteemBadge from '../components/EsteemBadge';
import { lightFormat } from 'date-fns';

export default {
  components: {
    RadarChart,
    EsteemBadge
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
      expanded: [],
      singleExpand: false,
      deleteDialog: false,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Role',
          align: 'center',
          sortable: true,
          value: 'role.title'
        },
        {
          text: 'Date Joined',
          align: 'center',
          sortable: true,
          value: 'joinedAt'
        },
        {
          text: 'Actions',
          value: 'action',
          align: 'center'
        }
      ],
      selectedUser: {},
      skillCategories: []
    };
  },
  methods: {
    ...mapActions(['toggleSnackbar', 'deleteUser']),
    openUserProfile(userId) {
      this.$router.push({
        name: 'profile',
        params: { id: userId }
      });
    },
    showDeleteDialog(item) {
      this.selectedUser = item;
      this.deleteDialog = true;
    },
    removeUser(userId) {
      this.deleteUser({ userId: userId })
        .then(() => {
          this.close();
          this.toggleSnackbar({
            show: true,
            text: 'User deleted successfully',
            color: 'success'
          });
          this.$emit('userDeleted', userId);
        })
        .catch(err => {
          this.toggleSnackbar({
            show: true,
            text: err.response.data.error,
            color: 'error'
          });
        });
    },
    close() {
      this.deleteDialog = !this.deleteDialog;
    },
    userDateJoined(date) {
      return lightFormat(new Date(date), 'dd-MM-yyyy');
    }
  }
};
</script>

<style></style>
