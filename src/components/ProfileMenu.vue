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
            <img src="https://randomuser.me/api/portraits/men/54.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-switch
            v-model="darkMode"
            label="Dark Mode"
            color="primary"
          ></v-switch>
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
  data: () => ({
    available: true,
    menu: false
  }),
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
    }
  }
};
</script>

<style></style>
