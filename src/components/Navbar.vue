<template>
  <nav>
    <v-app-bar flat app>
      <router-link to="/">
        <v-toolbar-title class="text-uppercase grey--text">
          <span class="primary--text">O</span>
          <span class="font-weight-light">Skills</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <SearchBar class="mt-4"></SearchBar>
      <v-spacer></v-spacer>
      <ProfileMenu v-if="accessToken" />
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
  computed: mapGetters(['showNavigationBar', 'accessToken', 'getUser']),
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
      this.$store.dispatch('toggleDrawer', this.showDrawer);
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
}
</style>
