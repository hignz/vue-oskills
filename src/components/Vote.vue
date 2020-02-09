<template>
  <v-btn icon :loading="voting" color="primary" @click="vote()" @click.stop>
    <v-icon v-if="votedByUser" color="primary">mdi-arrow-up-bold</v-icon>
    <v-icon v-else color="grey lighten-1">mdi-arrow-up-bold-outline</v-icon>
  </v-btn>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    skill: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      voting: false
    };
  },
  computed: {
    ...mapState(['user']),
    votedByUser() {
      return this.skill.votedBy.filter(el => el === this.user._id).length > 0;
    }
  },
  created() {},
  methods: {
    ...mapActions(['voteSkill', 'toggleSnackbar']),
    vote() {
      this.voting = true;
      this.voteSkill(this.skill._id)
        .then(response => {
          this.toggleSnackbar({
            show: true,
            text: response.message,
            color: response.upvoted ? 'success' : 'orange'
          });

          if (response.upvoted) {
            this.skill.votedBy.push(this.user._id);
          } else {
            this.skill.votedBy = this.skill.votedBy.filter(
              el => el !== this.user._id
            );
          }

          this.$emit('voted', response.skill);
        })
        .catch(() => {
          this.toggleSnackbar({
            show: true,
            text: 'You have no votes left for this week.',
            color: 'error'
          });
        })
        .finally(() => (this.voting = false));
    }
  }
};
</script>

<style></style>
