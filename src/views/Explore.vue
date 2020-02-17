<template>
  <v-container fluid>
    <ExploreFilter></ExploreFilter>
    <!-- <RecentlyAddedSkills class="mb-12" /> -->
    <!-- <RecentlyJoined /> -->
  </v-container>
</template>

<script>
import RecentlyJoined from '../components/RecentlyJoined';
import RecentlyAddedSkills from '../components/RecentlyAddedSkills';
import ExploreFilter from '../components/ExploreFilter';

export default {
  components: {
    RecentlyJoined,
    RecentlyAddedSkills,
    ExploreFilter
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
