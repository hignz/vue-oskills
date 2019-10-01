<template>
  <v-app>
    <NavigationDrawer v-if="showNavDrawer" />
    <Navbar />
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import NavigationDrawer from './components/NavigationDrawer';
import vuetify from './plugins/vuetify';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Navbar,
    NavigationDrawer
  },
  data() {
    return {
      user: {}
    };
  },
  computed: {
    isDark() {
      return this.$store.state.isDark;
    },
    showNavDrawer() {
      return this.$store.getters.showNavigationBar;
    }
  },
  created() {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (401 === error.response.status) {
          localStorage.removeItem('accessToken');
          this.$store.state.accessToken = null;
          this.$router.push({ path: '/login' });
        }
        return Promise.reject(error);
      }
    );

    vuetify.framework.theme.dark = this.$store.state.isDark;
    if (!localStorage.getItem('accentColor')) {
      localStorage.setItem('accentColor', '#ee44aa');
    }
    vuetify.framework.theme.themes.dark.primary = localStorage.getItem(
      'accentColor'
    );
    vuetify.framework.theme.themes.light.primary = localStorage.getItem(
      'accentColor'
    );

    if (this.$store.state.accessToken) {
      this.$store
        .dispatch('fetchUser')
        .then(response => {
          this.user = response.data.data;
          console.log(this.user);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css';

.page {
  position: absolute;
}
</style>
