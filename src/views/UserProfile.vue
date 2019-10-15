<template>
  <v-container v-if="loaded" fluid>
    <p class="subheading grey--text">Profile</p>

    <v-card>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="6">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="6">
              <v-row justify="center" align="center">
                <v-col cols="12" sm="12" md="6" class="text-center">
                  <v-avatar size="72">
                    <v-img :src="randomUserImg"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-row class="subheading-1" justify="center" align="end">
                    {{ user.name }}
                  </v-row>
                  <v-row
                    class="subtitle-2 grey--text"
                    justify="center"
                    align="end"
                  >
                    {{ user.role }}
                  </v-row>
                  <v-row
                    class="subtitle-2 grey--text"
                    justify="center"
                    align="end"
                  >
                    Joined: {{ moment(user.dateJoined).format('DD-MM-YYYY') }}
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <!-- <v-col cols="12" sm="12" md="6">
              <v-col>
                <v-row justify="start" align="center">
                  {{ user.name }}
                </v-row>
                <v-row justify="start" align="center">
                  {{ user.name }}
                </v-row>
              </v-col> -->
            <!-- </v-col> -->
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-card>1</v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-card>2</v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="6">
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="(cat, i) in getSkillsByCategories"
            :key="cat.name"
          >
            <v-expansion-panel-header>
              {{ cat.name }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-list>
                <template v-for="(skill, j) in cat.skills">
                  <v-list-item :key="skill._id">
                    <template v-slot:default="{ active, toggle }">
                      <v-list-item-content>
                        <v-list-item-title>{{ skill.name }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="vote(skill)">
                          <v-icon
                            v-if="!skill.votedBy.includes(getUser._id)"
                            color="grey lighten-1"
                          >
                            mdi-vote-outline
                          </v-icon>

                          <v-icon v-else color="yellow">
                            mdi-vote
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-divider
                    v-if="j + 1 < cat.skills.length"
                    :key="j"
                  ></v-divider>
                </template>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-row>
          <v-col cols="12" sm="12" md="6"><v-card>1</v-card></v-col>
          <v-col cols="12" sm="12" md="6"><v-card>2</v-card></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12"><v-card>3</v-card></v-col>
        </v-row>
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

export default {
  components: {},
  data() {
    return {
      selected: [0],
      loaded: false,
      user: null,
      similarUsers: [],
      categories: [],
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: ''
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    sortedSkills() {
      return this.user.skills.concat().sort((a, b) => b.rating - a.rating);
    },
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
    },
    getBestSkill() {
      return this.user.skills.reduce((prev, current) =>
        prev.rating > current.rating ? prev : current
      );
    },
    getLowestSkill() {
      return this.user.skills.reduce((prev, current) =>
        prev.rating > current.rating ? current : prev
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
      });
  },
  methods: {
    vote(skill) {
      this.$store
        .dispatch('voteSkill', skill._id)
        .then(response => {
          this.snackbarText = `Voted! Remaining votes: ${this.getUser.remainingVotes}`;
          this.snackbarColor = 'accent';
          this.showSnackbar = true;

          const s = response.data.skill;
          this.user.skills = this.user.skills.map(x =>
            x._id == s._id ? s : x
          );
        })
        .catch(err => {
          this.snackbarText = 'You have no remaining votes!';
          this.snackbarColor = 'error';
          this.showSnackbar = true;

          console.log(err);
        });
    }
  }
};
</script>
