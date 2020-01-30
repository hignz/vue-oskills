<template>
  <v-container v-if="loaded">
    <v-card>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12">
          <v-row justify="center" align="center" class="ma-4">
            <v-avatar size="128">
              <v-img :src="randomUserImg"></v-img>
            </v-avatar>
          </v-row>
          <v-row class="subheading-1" justify="center" align="center">{{ user.name }}</v-row>
          <v-row class="subtitle-2 grey--text" justify="center" align="center">{{ user.role }}</v-row>
          <v-row class="subtitle-2 grey--text" justify="center" align="center">
            <v-col cols="12" sm="12" class="text-center">
              <v-tooltip v-if="getLowestSkill" bottom>
                <template v-slot:activator="{ on }">
                  <v-chip class="ma-2" color="primary" v-on="on">
                    <v-icon class="pa-1" left>mdi-flag</v-icon>
                    {{ getLowestSkill.name }}
                  </v-chip>
                </template>
                <span>{{ user.name }} wants to improve this skill.</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-chip class="ma-2" color="primary" v-on="on">
                    <v-icon class="pa-1" left>mdi-calendar-range</v-icon>
                    {{ lightFormat(parseISO(user.dateJoined), 'dd-mm-yyyy') }}
                  </v-chip>
                </template>
                <span>When {{ user.name }} joined OSkills.</span>
              </v-tooltip>
              <v-tooltip v-if="getBestSkill" bottom>
                <template v-slot:activator="{ on }">
                  <v-chip class="ma-2" color="primary" v-on="on">
                    <v-icon class="pa-1" left>mdi-star</v-icon>
                    {{ getBestSkill.name }}
                  </v-chip>
                </template>
                <span>{{ user.name }}'s' best skill.</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-btn v-if="getUser.isAdmin" small color="primary" outlined>
              <v-icon small>mdi-plus</v-icon>
              {{ promoteBtnText }}
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text">CATEGORIES</v-toolbar-title>
          </v-toolbar>
          <RadarChart
            :user-skills="skills"
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
            <v-toolbar-title class="subtitle-2 grey--text">SKILLS</v-toolbar-title>
          </v-toolbar>

          <v-list subheader class="overflow-y-auto" dense style="max-height: 345px">
            <div v-for="(category, i) in getSkillsByCategories" :key="category.name">
              <v-subheader inset>{{ category.name }}</v-subheader>

              <v-list-item
                v-for="skill in category.skills"
                :key="skill.name"
                link
                @click="openSkillProfile(skill.skillId)"
              >
                <v-list-item-avatar>
                  <EsteemBadge :esteem="skill.esteem"></EsteemBadge>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="skill.name"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="vote(skill)" @click.stop>
                    <v-icon
                      v-if="!skill.votedBy.includes(getUser._id)"
                      color="grey lighten-1"
                    >mdi-arrow-up-bold-outline</v-icon>

                    <v-icon v-else color="primary">mdi-arrow-up-bold</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider v-if="i !== getSkillsByCategories.length - 1"></v-divider>
            </div>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ActivityFeed :participant-id="user._id"></ActivityFeed>
      </v-col>
    </v-row>
    <v-snackbar v-model="showSnackbar" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn color="white" text @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
const EsteemBadge = () => import('../components/EsteemBadge');
const RadarChart = () => import('../components/RadarChart');
const ActivityFeed = () => import('../components/ActivityFeed');
import { lightFormat, parseISO } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ActivityFeed,
    EsteemBadge,
    RadarChart
  },
  data() {
    return {
      selected: [0],
      loaded: false,
      user: {},
      similarUsers: [],
      categories: [],
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: '',
      skillCategories: [],
      userActivities: [],
      lightFormat,
      parseISO
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    promoteBtnText() {
      return this.user.isAdmin ? 'Demote' : 'Promote';
    },
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
    },
    skills() {
      return this.user.skills;
    },
    getBestSkill() {
      return this.user.skills.reduce(
        (prev, current) => (prev.rating > current.rating ? prev : current),
        0
      );
    },
    getLowestSkill() {
      return this.user.skills.reduce(
        (prev, current) => (prev.rating > current.rating ? current : prev),
        this.user.skills[0]
      );
    },
    getSkillsByCategories() {
      let cats = this.user.skills
        .map(e => e['categoryName'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => this.user.skills[e])
        .map(e => {
          return {
            name: this.user.skills[e].categoryName,
            skills: []
          };
        });

      cats.forEach(cat => {
        this.user.skills.forEach(skill => {
          if (skill.categoryName === cat.name) {
            cat.skills.push(skill);
          }
        });
      });

      return cats;
    }
  },
  created() {
    this.fetchUserById(this.$route.params.id)
      .then(response => {
        this.user = response.data;
        this.loaded = true;

        this.fetchParticipantActivity(this.user._id)
          .then(res => {
            console.log('test', res);
            this.userActivities = res;
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.$store.dispatch('setLoading', false));

    this.fetchCategories()
      .then(res => {
        this.skillCategories = res.categories;
      })
      .catch(err => console.log(err));
  },
  methods: {
    ...mapActions([
      'fetchUserById',
      'fetchCategories',
      'voteSkill',
      'fetchParticipantActivity'
    ]),
    vote(skill) {
      this.voteSkill(skill._id)
        .then(response => {
          const remainingVotes = response.remainingVotes;
          this.snackbarText = response.upvoted
            ? `Voted! Remaining votes: ${remainingVotes}`
            : `Vote removed! Remaining votes ${remainingVotes}`;
          this.snackbarColor = response.upvoted ? 'success' : 'orange';
          this.showSnackbar = true;

          const skill = response.skill;
          this.user.skills = this.user.skills.map(x =>
            x._id == skill._id ? skill : x
          );
        })
        .catch(() => {
          this.showSnackbar = false;
          this.snackbarText = 'You have no votes left for this week.';
          this.snackbarColor = 'error';
          this.showSnackbar = true;
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
