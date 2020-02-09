<template>
  <v-container fluid>
    <RecentlyAddedSkills class="mb-12" />
    <RecentlyJoined />
  </v-container>
</template>

<script>
import RecentlyJoined from '../components/RecentlyJoined';
import RecentlyAddedSkills from '../components/RecentlyAddedSkills';

export default {
  components: {
    RecentlyJoined,
    RecentlyAddedSkills
  },
  data() {
    return {
      users: {},
      loaded: false
    };
  }
};
</script>

<style></style>
