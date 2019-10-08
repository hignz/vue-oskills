<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img :src="randomUserImg" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline title" @click="openProfile">{{
          user.name
        }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list>
      <v-subheader>Top Skills</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(skill, i) in sortedSkills" :key="i">
          <v-list-item-icon>
            <v-icon
              :color="
                skill.esteem === 1
                  ? 'red'
                  : skill.esteem === 2
                  ? 'orange'
                  : 'green'
              "
              >mdi-circle</v-icon
            >
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="skill.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-thumb-up</v-icon>
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
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
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
    }
  }
};
</script>

<style scoped>
.title:hover {
  cursor: pointer;
}
</style>
