<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="toggleDrawer"
      ></v-app-bar-nav-icon>
      <router-link to="/dashboard">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-bold primary--text">O</span>
          <span class="font-weight-light grey--text">Skills</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <SearchBar />
      <ProfileMenu />
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
  computed: {
    ...mapGetters(['accessToken'])
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch('toggleDrawer', this.showDrawer);
    }
  }
};
</script>

<style></style>
