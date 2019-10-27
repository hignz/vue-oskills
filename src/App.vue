<template>
  <v-app>
    <NavigationDrawer v-if="accessToken" />
    <Navbar v-if="accessToken" />
    <v-content>
      <v-progress-linear
        indeterminate
        :active="isLoading"
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
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
    NavigationDrawer
  },
  computed: {
    ...mapGetters(['accessToken', 'isLoading'])
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
      localStorage.setItem('accentColor', '#ff1f2c');
    }
    vuetify.framework.theme.themes.dark.primary = localStorage.getItem(
      'accentColor'
    );
    vuetify.framework.theme.themes.light.primary = localStorage.getItem(
      'accentColor'
    );

    if (this.accessToken) {
      this.$store
        .dispatch('fetchUser')
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
