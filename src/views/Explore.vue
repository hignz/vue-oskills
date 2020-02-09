<template>
  <v-container fluid>
    <RecentlyJoined />
  </v-container>
</template>

<script>
import RecentlyJoined from '../components/RecentlyJoined';

export default {
  components: {
    RecentlyJoined
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
