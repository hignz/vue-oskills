<template>
  <v-card height="310">
    <v-list-item dense @click="openProfile">
      <v-list-item-avatar>
        <v-avatar size="50">
          <v-img :src="randomUserImg"></v-img>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list v-if="sortedSkills.length" dense nav>
      <v-subheader class="caption">Top Skills</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(skill, i) in sortedSkills"
          :key="i"
          @click="openSkillProfile(skill.skill._id)"
        >
          <v-list-item-avatar>
            <EsteemBadge :esteem="skill.esteem"></EsteemBadge>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="skill.skill.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <Vote :skill="skill" />
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-text v-else class="text-center mt-12">
      <v-icon x-large class="grey--text mb-2">mdi-alert-circle-outline</v-icon>
      <p>This user has not added any skills yet</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import Vote from './Vote';
const EsteemBadge = () => import('./EsteemBadge');

export default {
  components: { EsteemBadge, Vote },
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
    }
  }
};
</script>

<style scoped>
.title:hover {
  cursor: pointer;
}
</style>
