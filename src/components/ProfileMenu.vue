<template>
  <v-menu
    v-if="user"
    v-model="menu"
    :close-on-content-click="false"
    offset-x
    max-width="300"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="mx-sm-5 mb-2" small fab v-on="on">
        <v-avatar>
          <v-img v-if="user.image" :src="user.image"></v-img>
          <v-icon v-else large>mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-card>
      <v-list dense two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img v-if="user.image" :src="user.image" />
            <v-icon v-else large>mdi-account-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="subtitle-1">{{
              user.name
            }}</v-list-item-title>
            <v-list-item-subtitle v-if="user.role" class="caption grey--text">{{
              user.role.title
            }}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="user.role" class="caption grey--text"
              >Remaining votes:
              <span class="primary--text">{{
                user.remainingVotes
              }}</span></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item @click="toggleDarkMode()">
          <v-list-item-avatar>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Dark mode</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text @click.stop>
            <v-switch v-model="darkMode" color="primary" dense></v-switch>
          </v-list-item-action-text>
        </v-list-item>
        <v-list-item @click="navigateTo('/settings')">
          <v-list-item-avatar>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-avatar>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
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
    },
    navigateTo(path) {
      this.menu = false;
      this.$router.push({ path }).catch(() => {});
    }
  }
};
</script>

<style></style>
