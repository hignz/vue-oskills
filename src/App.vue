<template>
  <v-app>
    <NavigationDrawer v-if="accessToken" />
    <Navbar v-if="accessToken" />
    <v-content>
      <v-progress-linear
        indeterminate
        :active="loading"
        :height="2"
        color="primary"
      ></v-progress-linear>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    <Snackbar />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import NavigationDrawer from './components/NavigationDrawer';
import Snackbar from './components/Snackbar';
import vuetify from './plugins/vuetify';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
    NavigationDrawer,
    Snackbar
  },
  computed: {
    ...mapState(['accessToken', 'loading', 'isDark', 'user'])
  },
  created() {
    vuetify.framework.theme.dark = this.isDark;

    if (this.accessToken && !this.user.length) {
      this.fetchUser();
    }
  },
  methods: {
    ...mapActions(['fetchUser'])
  }
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');

html,
body {
  overflow: auto;
}

a {
  text-decoration: none;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* track */
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #f1f1f1;
}

/* handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #888;
}

/* handle:hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.theme--dark.v-data-table
  tbody
  tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #363b46;
}
</style>
