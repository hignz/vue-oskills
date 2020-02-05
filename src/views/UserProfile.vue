<template>
  <v-container v-if="loaded" fluid>
    <v-card>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12">
          <ProfileBanner :user="user" />
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >CATEGORIES</v-toolbar-title
            >
          </v-toolbar>
          <RadarChart
            :user-skills="user.skills"
            :size="120"
            :height="330"
            :skill-categories="skillCategories"
            class="pr-2"
          ></RadarChart>
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
            subheader
            class="overflow-y-auto"
            dense
            style="max-height: 345px"
          >
            <div v-for="(category, i) in categories" :key="category.name">
              <v-subheader inset>{{ category.categoryName }}</v-subheader>

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
                  <v-btn icon @click="vote(skill)" @click.stop>
                    <v-icon
                      v-if="!skill.votedBy.includes(getUser._id)"
                      color="grey lighten-1"
                      >mdi-arrow-up-bold-outline</v-icon
                    >

                    <v-icon v-else color="primary">mdi-arrow-up-bold</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider v-if="i !== categories.length - 1"></v-divider>
            </div>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ActivityFeed
          v-if="userActivity.length"
          :activity-data="userActivity"
          :is-real-time="false"
        ></ActivityFeed>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const EsteemBadge = () => import('../components/EsteemBadge');
const RadarChart = () => import('../components/RadarChart');
const ActivityFeed = () => import('../components/ActivityFeed');
const ProfileBanner = () => import('../components/ProfileBanner');
import { lightFormat, parseISO } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ActivityFeed,
    EsteemBadge,
    RadarChart,
    ProfileBanner
  },
  data() {
    return {
      selected: [0],
      loaded: false,
      user: {},
      similarUsers: [],
      skillCategories: [],
      userActivity: [],
      lightFormat,
      parseISO
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
    this.fetchUserById(this.$route.params.id).then(response => {
      this.user = response.data;
      this.loaded = true;

      this.fetchParticipantActivity(this.user._id)
        .then(res => {
          this.userActivity = res;
        })
        .catch(err => {
          console.log(err);
        });
    });

    this.fetchCategories().then(res => {
      this.skillCategories = res.categories;
    });
  },
  methods: {
    ...mapActions([
      'fetchUserById',
      'fetchCategories',
      'voteSkill',
      'fetchParticipantActivity',
      'toggleSnackbar',
      'addAdmin'
    ]),
    promoteToAdmin(user) {
      this.addAdmin({
        uId: user._id,
        isAdmin: !user.isAdmin,
        email: user.email
      })
        .then(() => {
          this.user.isAdmin = !this.user.isAdmin;
          this.toggleSnackbar({
            show: true,
            text: this.user.isAdmin
              ? `${this.user.name} has been promoted to admin`
              : `${this.user.name} has been demoted from admin`,
            color: this.user.isAdmin ? 'success' : 'orange darken-3'
          });
        })
        .catch(() => {
          this.toggleSnackbar({
            show: true,
            text: 'Something went wrong',
            color: 'error'
          });
        });
    },
    vote(skill) {
      this.voteSkill(skill._id)
        .then(response => {
          const remainingVotes = response.remainingVotes;
          const snackbarText = response.upvoted
            ? `Voted! Remaining votes: ${remainingVotes}`
            : `Vote removed! Remaining votes ${remainingVotes}`;

          this.toggleSnackbar({
            show: true,
            text: snackbarText,
            color: response.upvoted ? 'success' : 'orange'
          });

          const skill = response.skill;

          this.user.skills = this.user.skills.map(x =>
            x._id == skill._id ? skill.skill : x
          );
        })
        .catch(() => {
          this.toggleSnackbar({
            show: true,
            text: 'You have no votes left for this week.',
            color: 'error'
          });
        });
    },
    openSkillProfile(skillId) {
      this.$router.push({
        name: 'skillProfile',
        params: { id: skillId }
      });
    }
  }
};
</script>
