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
                class="subtitle-2 grey--text link"
                justify="center"
                align="center"
                @click="openCategoryProfile(skill.categoryId)"
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
                  <span>Amount of users with this skill</span>
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
      <v-col cols="12" sm="12" md="4">
        <v-card :height="392">
          <v-card-title>Under construction</v-card-title>
          <!-- <v-row no-gutters="">
            <v-col cols="12" sm="12" md="6">
              <RadialChart
                :series-data="[skill.averageEsteem]"
                series-name="Average Esteem"
                :size="100"
              ></RadialChart>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <RadialChart
                :series-data="[skill.usersWith]"
                series-name="Average Esteem"
                :size="100"
              ></RadialChart>
            </v-col>
          </v-row> -->
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ActivityFeed :skill-id="skill._id"></ActivityFeed>
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
import { mapGetters, mapActions } from 'vuex';

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

    this.fetchSkillInfo(skillId)
      .then(res => {
        this.skill = res;
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions(['addSkillToUser', 'setLoading', 'fetchSkillInfo']),
    addSkill() {
      this.addSkillToUser({ skillId: this.skill._id })
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
      this.setLoading(true);

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

<style>
.link {
  cursor: pointer;
}
</style>
