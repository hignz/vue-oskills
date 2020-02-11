<template>
  <v-container v-if="loaded" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12">
        <ProfileBanner :user="user" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >CATEGORIES</v-toolbar-title
            >
          </v-toolbar>
          <RadarChart
            v-if="user.skills.length"
            :user-skills="user.skills"
            :size="120"
            :height="330"
            :skill-categories="skillCategories"
            class="pr-2"
          ></RadarChart>
          <v-card-text v-else>
            <p class="text-center grey--text">
              This user has not added any skills yet
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >SKILLS</v-toolbar-title
            >
          </v-toolbar>

          <v-list
            v-if="categories.length"
            subheader
            class="overflow-y-auto"
            dense
            style="max-height: 345px"
          >
            <div v-for="(category, i) in categories" :key="category.name">
              <v-subheader
                class="subtitle-2"
                inset
                @click="navigateTo({ name: 'category', id: category._id })"
                >{{ category.categoryName }}</v-subheader
              >

              <v-list-item
                v-for="skill in category.skills"
                :key="skill._id"
                link
                @click="openSkillProfile(skill.skill._id)"
              >
                <v-list-item-avatar>
                  <EsteemBadge :esteem="skill.esteem"></EsteemBadge>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="skill.skill.name"
                  ></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <Vote :skill="skill" @voted="updateSkills" />
                </v-list-item-action>
              </v-list-item>

              <v-divider v-if="i !== categories.length - 1"></v-divider>
            </div>
          </v-list>
          <v-card-text v-else>
            <p class="text-center grey--text">
              This user has not added any skills yet
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card v-if="userActivity.length">
          <ActivityFeed
            :activity-data="userActivity"
            :is-real-time="false"
            :full-size="true"
          ></ActivityFeed>
        </v-card>
        <v-card v-else>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >Activity</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text>
            <p class="text-center grey--text">
              This user has no activity
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const EsteemBadge = () => import('../components/EsteemBadge');
const RadarChart = () => import('../components/RadarChart');
const ActivityFeed = () => import('../components/ActivityFeed');
const ProfileBanner = () => import('../components/ProfileBanner');
const Vote = () => import('../components/Vote');
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ActivityFeed,
    EsteemBadge,
    RadarChart,
    ProfileBanner,
    Vote
  },
  data() {
    return {
      selected: [0],
      loaded: false,
      user: {},
      similarUsers: [],
      skillCategories: [],
      userActivity: []
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    categories() {
      const arr = [
        ...new Set(this.user.skills.flat().map(el => el.skill.category.name))
      ];

      const categories = arr.map(el => ({
        categoryName: el,
        skills: this.user.skills.filter(elm => elm.skill.category.name === el)
      }));

      return categories;
    }
  },
  created() {
    if (this.$router.currentRoute.params.id === this.getUser._id) {
      return this.$router.push({ name: 'dashboard' });
    }

    this.fetchUserById(this.$route.params.id).then(response => {
      this.user = response.data;
      this.loaded = true;

      this.fetchParticipantActivity(this.user._id).then(res => {
        this.userActivity = res;
      });
    });

    this.fetchCategoriesArchived('false').then(res => {
      this.skillCategories = res.categories;
    });
  },
  methods: {
    ...mapActions([
      'fetchUserById',
      'fetchCategoriesArchived',
      'fetchParticipantActivity'
    ]),
    openSkillProfile(skillId) {
      this.$router.push({
        name: 'skillProfile',
        params: { id: skillId }
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    updateSkills(skill) {
      this.user.skills = this.user.skills.map(el =>
        el._id === skill._id ? skill : el
      );
    }
  }
};
</script>
