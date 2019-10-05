<template>
  <v-container v-if="user" fluid>
    <p class="subheading grey--text">Profile</p>

    <v-row></v-row>
    <v-row></v-row>
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
      .then(result => {
        this.user = result.data.data;
        this.loaded = true;
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