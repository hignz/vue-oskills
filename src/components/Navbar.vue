<template>
  <nav>
    <v-app-bar flat app :color="backgroundColor">
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="toggleDrawer"
      ></v-app-bar-nav-icon>
      <router-link to="/dashboard">
        <v-toolbar-title class="text-uppercase ml-sm-5">
          <span class="font-weight-bold primary--text">O</span>
          <span class="font-weight-light grey--text">Skills</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <SearchBar class="mx-sm-6 ml-4" />
      <ProfileMenu />
    </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';
import vuetify from '../plugins/vuetify';

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
    ...mapGetters(['accessToken']),
    backgroundColor() {
      return vuetify.framework.theme.isDark ? '#21252b' : '#f9f9f9';
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch('toggleDrawer', this.showDrawer);
    }
  }
};
</script>

<style></style>
