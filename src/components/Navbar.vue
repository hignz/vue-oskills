<template>
  <nav>
    <v-app-bar flat app :hide-on-scroll="isMobile">
      <router-link to="/dashboard">
        <v-toolbar-title class="text-uppercase ml-sm-5">
          <span class="font-weight-bold primary--text">O</span>
          <span class="font-weight-light grey--text">Skills</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <SearchBar class="px-6" />
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
    ...mapGetters(['accessToken']),
    isMobile() {
      return this.$vuetify.breakpoint.xs ? true : false;
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
