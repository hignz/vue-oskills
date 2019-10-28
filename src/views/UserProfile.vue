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
          <v-row class="subheading-1" justify="center" align="center">
            {{ user.name }}
          </v-row>
          <v-row class="subtitle-2 grey--text" justify="center" align="center">
            {{ user.role }}
          </v-row>
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
                    {{ moment(user.dateJoined).format('DD-MM-YYYY') }}
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
              <v-icon small>
                mdi-plus
              </v-icon>
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
            <v-toolbar-title class="subtitle-2 grey--text"
              >CATEGORIES</v-toolbar-title
            >
          </v-toolbar>
          <RadarChart
            :user-skills="user.skills"
            :size="120"
            :height="330"
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

          <v-list subheader class="overflow-y-auto" style="max-height: 345px">
            <div
              v-for="(category, i) in getSkillsByCategories"
              :key="category.name"
            >
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
                    >
                      mdi-vote-outline
                    </v-icon>

                    <v-icon v-else color="orange">
                      mdi-vote
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider
                v-if="i !== getSkillsByCategories.length - 1"
                inset
              ></v-divider>
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
      <v-btn color="white" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

const EsteemBadge = () => import('../components/EsteemBadge');
const RadarChart = () => import('../components/RadarChart');
const ActivityFeed = () => import('../components/ActivityFeed');

export default {
  components: {
    EsteemBadge,
    RadarChart,
    ActivityFeed
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
      snackbarColor: ''
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    promoteBtnText() {
      return this.user.isAdmin ? 'Demote' : 'Promote';
    },
    sortedSkills() {
      return this.user.skills.concat().sort((a, b) => b.rating - a.rating);
    },
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
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
    this.$store
      .dispatch('fetchUserById', this.$route.params.id)
      .then(response => {
        this.user = response;
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.$store.dispatch('updateLoading', false));
  },
  methods: {
    vote(skill) {
      this.$store
        .dispatch('voteSkill', skill._id)
        .then(response => {
          this.showSnackbar = false;
          this.snackbarText = `Voted! Remaining votes: ${response.data.remainingVotes}`;
          this.snackbarColor = 'primary';
          this.showSnackbar = true;

          const skill = response.data.skill;
          this.user.skills = this.user.skills.map(x =>
            x._id == skill._id ? skill : x
          );
        })
        .catch(err => {
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
