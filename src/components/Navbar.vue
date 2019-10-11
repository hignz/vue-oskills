<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <router-link to="/dashboard">
        <v-toolbar-title class="text-uppercase grey--text">
          <span class="primary--text">O</span>
          <span class="font-weight-light">Skills</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <SearchBar class="mt-4"></SearchBar>
      <!-- <ProfileMenu /> -->
    </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';

export default {
  components: {
    ProfileMenu,
    SearchBar
  },
  data() {
    return {
      showDrawer: true
    };
  },
  computed: mapGetters(['showNavigationDrawer', 'accessToken', 'getUser']),
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
      this.$store.dispatch('toggleDrawer', this.showDrawer);
    }
  }
};
</script>

<style></style>
