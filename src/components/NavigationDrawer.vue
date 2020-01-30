<template>
  <v-navigation-drawer
    v-model="expandedNavDrawer"
    :mini-variant="mini"
    mini-variant-width="80"
    app
  >
    <v-list-item>
      <v-list-item-avatar size="47">
        <v-icon color="primary" class="animated rollIn">mdi-star</v-icon>
      </v-list-item-avatar>

      <v-list-item-title>Welcome</v-list-item-title>
    </v-list-item>

    <v-list dense nav>
      <v-list-item
        v-for="item in filteredLinks"
        :key="item.title"
        :to="item.route"
        links
      >
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-list-item-icon v-on="on">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </template>
          <span>{{ item.text }}</span>
        </v-tooltip>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2 d-md-none">
        <v-btn block text @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      showDrawer: true,
      mini: true,
      links: [
        {
          icon: 'mdi-account-key',
          text: 'Admin',
          route: '/admin',
          requiresAdmin: true
        },
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          route: '/dashboard'
        },
        {
          icon: 'mdi-star-circle',
          text: 'Skills',
          route: '/skills'
        },
        {
          icon: 'mdi-magnify',
          text: 'Explore',
          route: '/explore'
        },
        {
          icon: 'mdi-settings',
          text: 'Settings',
          route: '/settings'
        }
      ]
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['expandedNavDrawer']),
    filteredLinks() {
      return this.links.filter(
        e => !e.requiresAdmin || (this.user.isAdmin && e.requiresAdmin)
      );
    },
    expandedNavDrawer: {
      get: function() {
        return this.$store.getters.expandedNavDrawer;
      },
      set: function(value) {
        return this.$store.dispatch('toggleDrawer', value);
      }
    }
  },
  methods: {
    ...mapActions(['doLogout']),
    logout() {
      this.doLogout();
    }
  }
};
</script>

<style></style>
