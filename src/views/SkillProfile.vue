<template>
  <v-container v-if="loaded" fluid>
    <v-card outlined>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="4">
              <v-row justify="center" align="center" class="mb-6">
                <v-avatar color="primary" size="62">
                  <span v-if="skill.name" class="white--text headline">{{
                    skill.name[0]
                  }}</span>
                </v-avatar>
              </v-row>
              <v-row class="subheading-1" justify="center" align="center">
                {{ skill.name }}
              </v-row>
              <v-row
                class="subtitle-2 grey--text"
                justify="center"
                align="center"
              >
                <p
                  class="link"
                  @click="openCategoryProfile(skill.category._id)"
                >
                  {{ skill.category.name }}
                </p>

                <p
                  v-if="skill.description"
                  class="text-center grey--text mt-md-6 mx-4"
                >
                  {{ skill.description }}
                </p>
              </v-row>

              <v-row justify="center" align="center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" outlined v-on="on">
                      <v-icon class="pa-1 mb-1" left>mdi-account-group</v-icon>
                      {{ skill.usersWith }}
                    </v-chip>
                  </template>
                  <span>Amount of users with this skill</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" outlined v-on="on">
                      <v-icon class="pa-1" left>mdi-division</v-icon>
                      {{ averageRounded }}
                    </v-chip>
                  </template>
                  <span>Average Esteem level</span>
                </v-tooltip>
              </v-row>

              <v-row align="center" justify="center" class="mt-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-if="user && !isAdded"
                      icon
                      small
                      color="primary"
                      v-on="on"
                      @click="addSkill()"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Add this skill to your profile</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-card height="410" outlined>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >USERS WITH {{ skill.name }}</v-toolbar-title
            >
          </v-toolbar>

          <v-list
            v-if="skill.owners && skill.owners.length"
            two-line
            class="overflow-y-auto"
            style="max-height: 360px"
            dense
          >
            <v-list-item
              v-for="o in skill.owners"
              :key="o.owner._id"
              link
              @click="openProfile(o.owner._id)"
            >
              <v-list-item-avatar>
                <v-img v-if="o.owner.image" :src="o.owner.image"></v-img>
                <v-icon v-else large>mdi-account-circle</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="o.owner.name"></v-list-item-title>
                <v-list-item-subtitle
                  class="grey--text"
                  v-text="o.owner.role.title"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <EsteemBadge :esteem="o.esteem"></EsteemBadge>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-text v-else>
            <p class="text-center grey--text mt-12">
              No users have added this skill to their profile
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card height="410" outlined>
          <v-toolbar flat dense>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Description</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text class="grey--text"
            ><p v-if="skill.description" class="text-center grey--text mt-md-6">
              {{ skill.description }}
            </p>
            <p v-else class="text-center mt-12">Not available</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card v-if="skillActivityData.length" height="410" outlined>
          <v-toolbar flat dense>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Activity</v-toolbar-title
            >
          </v-toolbar>
          <ActivityFeed
            :activity-data="skillActivityData"
            :is-real-time="false"
            :height="360"
          ></ActivityFeed>
        </v-card>
        <v-card v-else outlined height="410">
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >Activity</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text class="text-center grey--text">
            <p class="mt-12">This skill has no activity</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ActivityFeed from '../components/ActivityFeed';
import EsteemBadge from '../components/EsteemBadge';

export default {
  components: {
    ActivityFeed,
    EsteemBadge
  },
  data() {
    return {
      skill: {},
      skillActivityData: [],
      loaded: false
    };
  },
  computed: {
    ...mapState(['user']),
    isAdded() {
      return this.user.skills.some(e => e.skill._id === this.skill._id);
    },
    averageRounded() {
      return Math.round(this.skill.averageEsteem * 10) / 10;
    }
  },
  created() {
    const skillId = this.$route.params.id;

    this.fetchSkill(skillId).then(res => {
      this.skill = res;
      this.loaded = true;
    });

    this.fetchSkillActivity(skillId).then(res => {
      this.skillActivityData = res;
    });
  },
  methods: {
    ...mapActions([
      'addSkillToUser',
      'setLoading',
      'fetchSkill',
      'toggleSnackbar',
      'fetchSkillActivity'
    ]),
    addSkill() {
      this.addSkillToUser({ skillId: this.skill._id })
        .then(() => {
          this.toggleSnackbar({
            show: true,
            text: `${this.skill.name} added!`,
            color: 'success'
          });
        })
        .catch(() => {
          this.toggleSnackbar({
            show: true,
            text: 'Something went wrong!',
            color: 'error'
          });
        });
    },
    openProfile(ownerId) {
      this.$router.push({
        name: 'profile',
        params: { id: ownerId }
      });
    },
    openCategoryProfile(categoryId) {
      this.$router.push({
        name: 'category',
        params: { id: categoryId }
      });
    }
  }
};
</script>

<style></style>
