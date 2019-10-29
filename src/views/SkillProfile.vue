<template>
  <v-container v-if="loaded">
    <v-card>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="4">
              <v-row justify="center" align="center" class="mb-6">
                <v-avatar color="primary" size="62">
                  <span class="white--text headline">{{ skill.name[0] }}</span>
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
                {{ skill.categoryName }}
              </v-row>

              <v-row class="mt-5" justify="center" align="center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" color="primary" v-on="on">
                      <v-icon class="pa-1 mb-1" left>mdi-account-group</v-icon>
                      {{ skill.usersWith }}
                    </v-chip>
                  </template>
                  <span>Users with this skill</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" color="primary" v-on="on">
                      <v-icon class="pa-1" left>mdi-division</v-icon>
                      {{ skill.averageEsteem.toFixed(1) }}
                    </v-chip>
                  </template>
                  <span>Average Esteem level</span>
                </v-tooltip>
              </v-row>

              <v-row align="center" justify="center" class="mt-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-if="isAdded"
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
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >USERS WITH THIS SKILL</v-toolbar-title
            >
          </v-toolbar>

          <v-list two-line class="overflow-y-auto" style="max-height: 345px">
            <v-list-item
              v-for="(owner, i) in skill.owners"
              :key="owner._id"
              link
              @click="openProfile(owner._id)"
            >
              <v-list-item-avatar>
                <v-img
                  :src="`https://randomuser.me/api/portraits/men/${i}.jpg`"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="owner.name"></v-list-item-title>
                <v-list-item-subtitle
                  class="grey--text"
                  v-text="owner.role"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <EsteemBadge :esteem="owner.esteem"></EsteemBadge>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4"> <v-card :height="392"></v-card> </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card :height="392">
          <ActivityFeed :skill-id="skill._id"></ActivityFeed
        ></v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="showSnackbar" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn color="white" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import EsteemBadge from '../components/EsteemBadge';
import ActivityFeed from '../components/ActivityFeed';

export default {
  components: {
    EsteemBadge,
    ActivityFeed
  },
  data() {
    return {
      skill: {},
      showSnackbar: false,
      loaded: false,
      snackbarText: '',
      snackbarColor: ''
    };
  },
  computed: {
    ...mapGetters(['skills']),
    isAdded() {
      return !this.skills.filter(e => e.skillId === this.skill._id).length > 0;
    }
  },
  created() {
    const skillId = this.$route.params.id;

    this.$store
      .dispatch('fetchSkillInfo', skillId)
      .then(res => {
        this.skill = res;
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    addSkill() {
      this.$store
        .dispatch('addSkillToUser', { skillId: this.skill._id })
        .then(() => {
          this.snackbarText = `${this.skill.name} added!`;
          this.snackbarColor = 'primary';
          this.showSnackbar = true;
        })
        .catch(err => {
          console.log(err);
          this.snackbarText = 'Something went wrong!';
          this.snackbarColor = 'error';
          this.showSnackbar = true;
        });
    },
    openProfile(ownerId) {
      this.$store.dispatch('updateLoading', true);

      this.$router.push({
        name: 'profile',
        params: { id: ownerId }
      });
    }
  }
};
</script>

<style></style>
