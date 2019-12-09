<template>
  <v-menu
    v-if="user"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn fab small color="primary" v-on="on">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list dense>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/52.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="subtitle-1">{{
              user.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="caption grey--text">{{
              user.role
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item @click="toggleDarkMode()">
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dark Theme</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action @click.stop>
            <v-switch v-model="darkMode" color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      available: true,
      menu: false
    };
  },
  computed: {
    ...mapState(['user']),
    darkMode: {
      get() {
        return this.$store.state.isDark;
      },
      set(value) {
        this.$store.dispatch('toggleDarkMode', value);
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('doLogout');
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    }
  }
};
</script>

<style></style>
