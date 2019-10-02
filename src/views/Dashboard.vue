<template>
  <v-container v-if="user.skills">
    <p class="subheading grey--text">Dashboard</p>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-2" outlined tile>
          <v-container>
            <v-row>
              <v-col cols="3">Welcome, {{ user.name.split(' ')[0] }}</v-col>
              <v-col cols="3">
                <v-row>
                  {{ sortedSkills[0].name }}
                </v-row>
                <v-row>
                  <v-icon
                    class="ml-4"
                    :color="sortedSkills[0].esteem <= 1 ? 'orange' : 'green'"
                  >
                    mdi-circle
                  </v-icon>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" sm="12">
        <v-card class="pa-2" outlined tile>
          .col-12 .col-md-8
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card class="pa-2" outlined tile>
          .col-6 .col-md-4
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <SimilarUsers :users="similarUsers" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <SkillList :skills="user.skills"></SkillList>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card> .col-6 .col-md-4 </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimilarUsers from '../components/SimilarUsers';
import SkillList from '../components/SkillList';

export default {
  components: {
    SimilarUsers,
    SkillList
  },
  data() {
    return {
      user: {},
      similarUsers: [],
      loaded: false,
      now: new Date().toLocaleDateString()
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
  created() {
    this.$store
      .dispatch('fetchUser')
      .then(response => {
        this.user = response.data.data;
        this.chartLabels = this.user.skills.map(a => a.name);
        this.chartData = this.user.skills.map(a => a.rating);
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });

    this.$store
      .dispatch('getAllUsers')
      .then(response => {
        this.similarUsers = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    toggle(index) {
      const i = this.selected.indexOf(index);

      if (i > -1) {
        this.selected.splice(i, 1);
      } else {
        this.selected.push(index);
      }
    }
  }
};
</script>
