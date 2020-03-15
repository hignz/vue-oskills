<template>
  <v-container fluid>
    <RecentlyAddedSkills class="mb-6" />
    <ExploreFilter></ExploreFilter>
  </v-container>
</template>

<script>
import RecentlyAddedSkills from '../components/RecentlyAddedSkills';
import ExploreFilter from '../components/ExploreFilter';

export default {
  components: {
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
