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
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import NavigationDrawer from './components/NavigationDrawer';
import vuetify from './plugins/vuetify';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
    NavigationDrawer
  },
  computed: {
    ...mapState(['accessToken', 'loading', 'isDark'])
  },
  created() {
    vuetify.framework.theme.dark = this.isDark;

    if (this.accessToken) {
      this.fetchUser();
    }
  },
  methods: {
    ...mapActions(['fetchUser'])
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');

.v-application {
  font-family: 'Poppins', sans-serif;
}

a {
  text-decoration: none;
  color: white;
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
</style>
