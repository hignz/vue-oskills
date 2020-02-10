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
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        no-data-text="No users loaded"
        no-results-text="No users found"
        show-expand
        :items-per-page="10"
      >
        <template v-slot:item.dateJoined="{ item }">
          {{ userDateJoined(item.dateJoined) }}
        </template>
        <template v-slot:item.action="{ item }">
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
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <RadarChart
                  v-if="item.skills.length"
                  :user-skills="item.skills"
                  :size="120"
                  :height="330"
                  :skill-categories="skillCategories"
                  class="pr-2"
                ></RadarChart>
              </v-col>
              <v-col>
                <v-data-table
                  :headers="headers1"
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
          </td>
        </template>
      </v-data-table>
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
          value: 'role'
        },
        {
          text: 'Date Joined',
          align: 'center',
          sortable: true,
          value: 'dateJoined'
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          align: 'center'
        }
      ],
      headers1: [
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
      ],
      selectedUser: {},
      skillCategories: []
    };
  },
  methods: {
    ...mapActions(['toggleSnackbar']),
    openUserProfile(userId) {
      this.$router.push({
        name: 'profile',
        params: { id: userId }
      });
    },
    userDateJoined(date) {
      return lightFormat(new Date(date), 'dd-MM-yyyy');
    }
  }
};
</script>

<style></style>
