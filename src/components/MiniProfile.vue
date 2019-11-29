<template>
  <v-card max-width="344" height="310" class="mx-auto">
    <v-list-item dense @click="openProfile">
      <v-list-item-avatar>
        <v-avatar size="50">
          <v-img :src="randomUserImg"></v-img>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle class="grey--text">{{
          user.role
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list dense nav>
      <v-subheader class="caption">Top Skills</v-subheader>
      <v-list-item-group v-if="sortedSkills.length" color="primary">
        <v-list-item
          v-for="(skill, i) in sortedSkills"
          :key="i"
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

              <v-icon v-else color="primary">
                mdi-vote
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn color="white" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
const EsteemBadge = () => import('./EsteemBadge');

export default {
  components: { EsteemBadge },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedSkill: {},
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: ''
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    sortedSkills() {
      return this.user.skills
        .concat()
        .sort((a, b) => b.esteem - a.esteem)
        .slice(0, 3);
    },
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
    }
  },
  methods: {
    openProfile() {
      this.$router.push({
        name: 'profile',
        params: { id: this.user._id }
      });
    },
    openSkillProfile(skillId) {
      this.$router.push({
        name: 'skillProfile',
        params: { id: skillId }
      });
    },

    vote(skill) {
      this.$store
        .dispatch('voteSkill', skill._id)
        .then(response => {
          this.snackbarText = `Voted! Remaining votes: ${response.data.remainingVotes}`;
          this.snackbarColor = 'accent';
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

          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.title:hover {
  cursor: pointer;
}
</style>
