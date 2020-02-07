<template>
  <v-card flat>
    <v-card-title
      >Users
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
        show-expand
        no-data-text="No users loaded"
        no-results-text="No users found"
      >
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
            <RadarChart
              v-if="item.skills.length"
              :user-skills="item.skills"
              :size="120"
              :height="330"
              :skill-categories="skillCategories"
              class="pr-2"
            ></RadarChart>

            <!--  <v-list-item v-for="skill in item.skills" :key="skill._id">
              <v-list-item-avatar>
                <EsteemBadge :esteem="skill.esteem"></EsteemBadge>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-text="skill.skill.name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </td>
        </template>
      </v-data-table>
    </template>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { lightFormat } from 'date-fns';
import EsteemBadge from '../components/EsteemBadge';
import RadarChart from '../components/RadarChart';

export default {
  components: {
    EsteemBadge,
    RadarChart
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
      singleExpand: true,
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
      selectedUser: {},
      skillCategories: []
    };
  },
  computed: {
    categories() {
      if (!this.users.skills.length) {
        return [];
      }
      const arr = [
        ...new Set(this.users.skills.flat().map(el => el.skill.category.name))
      ];

      const categories = arr.map(el => ({
        categoryName: el,
        skills: this.user.skills.filter(elm => elm.skill.category.name === el)
      }));

      return categories;
    }
  },
  created() {
    this.fetchCategoriesArchived('false').then(res => {
      this.skillCategories = res.categories;
    });
  },
  methods: {
    ...mapActions(['toggleSnackbar', 'fetchCategoriesArchived']),
    openUserProfile(userId) {
      this.$router.push({
        name: 'profile',
        params: { id: userId }
      });
    }
  }
};
</script>

<style></style>
