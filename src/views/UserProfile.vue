<template>
  <v-container v-if="loaded" fluid>
    <p class="subheading grey--text">Profile</p>

    <v-card>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="6">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="6">
              <v-row justify="center" align="center">
                <v-col cols="12" sm="12" md="6">
                  <v-avatar size="72">
                    <v-img :src="randomUserImg"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-row class="subheading-1" justify="start" align="end">
                    {{ user.name }}
                  </v-row>
                  <v-row
                    class="subtitle-2 grey--text"
                    justify="start"
                    align="end"
                  >
                    {{ user.role }}
                  </v-row>
                  <v-row
                    class="subtitle-2 grey--text"
                    justify="start"
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

    <v-card class="mt-1">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="6">
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="(skill, i) in user.skills" :key="i">
              <v-expansion-panel-header>
                {{ skill.name }}
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-list>
                  <v-list-item v-for="(s, j) in user.skills" :key="j">
                    <v-list-item-title>{{ s.name }}</v-list-item-title>
                  </v-list-item>
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
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selected: [0],
      loaded: false,
      user: null,
      similarUsers: []
    };
  },
  computed: {
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
    }
  },
  mounted() {},
  created() {
    this.$store
      .dispatch('fetchUser', this.$route.params.id)
      .then(response => {
        this.user = response;
        this.loaded = true;

        const categories = ['Data', 'Languages'];

        const x = categories.map(e => {
          return {
            name: e,
            skills: []
          };
        });

        console.log(x);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    toggle(index) {
      const i = this.selected.indexOf(index);

      if (i > -1) {
        this.user.skills[index].rating--;
        this.user.skills[index].votedFor = false;
        this.selected.splice(i, 1);
      } else {
        this.user.skills[index].rating++;
        this.user.skills[index].votedFor = true;
        this.selected.push(index);
      }
    }
  }
};
</script>
