<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item dense @click="openProfile">
      <v-list-item-avatar color="grey">
        <img :src="randomUserImg" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list dense two-line>
      <v-subheader class="ml-2">Top Skills</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(skill, i) in sortedSkills" :key="i">
          <v-list-item-avatar>
            <EsteemBadge :skill="skill"></EsteemBadge>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="skill.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="vote(skill._id)">
              <v-icon
                :color="
                  skill.votedBy.includes(user._id)
                    ? 'red lighten-1'
                    : 'grey lighten-1'
                "
                >mdi-vote</v-icon
              >
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="openProfile">
        View Profile
      </v-btn>
    </v-card-actions>
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
      selectedSkill: {}
    };
  },
  computed: {
    ...mapGetters['getUser'],
    sortedSkills() {
      return this.user.skills
        .concat()
        .sort((a, b) => b.rating - a.rating)
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
        params: { id: this.user._id, user: this.user }
      });
    },
    vote(skillId) {
      this.$store
        .dispatch('voteSkill', skillId)
        .then(() => {
          // TODO highlight voted skill
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.title:hover {
  cursor: pointer;
}
</style>
