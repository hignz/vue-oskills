<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img :src="randomUserImg" alt="" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list dense rounded>
      <v-subheader>Skills</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in sortedSkills" :key="i">
          <v-list-item-icon>
            <v-icon>mdi-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
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
  components: {},
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartLabels: null,
      chartData: null
    };
  },
  computed: {
    sortedSkills() {
      return this.user.skills
        .concat()
        .slice(0, 3)
        .sort((a, b) => b.rating - a.rating);
    },
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
    }
  },
  created() {
    this.chartData = this.user.skills.map(a => a.rating);
    this.chartLabels = this.user.skills.map(a => a.name);
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

<style>
.detailsSection {
  cursor: pointer;
  border-right: 0.5px solid black;
}
</style>
