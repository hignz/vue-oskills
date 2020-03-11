<template>
  <v-navigation-drawer
    v-model="expandedNavDrawer"
    :mini-variant="mini"
    mini-variant-width="80"
    app
  >
    <v-list-item class="mt-1">
      <v-list-item-avatar size="40">
        <v-img
          v-if="!isDark"
          :src="require('../assets/OrangeLogo_NoBG.png')"
        ></v-img>
        <v-img
          v-if="isDark"
          :src="require('../assets/WhiteLogo_NoBG.png')"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-list dense nav>
      <v-list-item-group value="true">
        <v-list-item
          v-for="item in adminLinks"
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
      </v-list-item-group>
      <v-divider v-if="adminLinks.length" class="my-4" />
      <v-list-item-group value="true">
        <v-list-item
          v-for="item in memberLinks"
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
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div class="pa-2 d-md-none">
        <v-btn block text @click="logout()">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      showDrawer: true,
      mini: true,
      links: [
        {
          icon: 'mdi-account-tie',
          text: 'Admin',
          route: '/admin',
          requiresAdmin: true
        },
        {
          icon: 'mdi-account-details',
          text: 'Manage',
          route: '/manage',
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
          icon: 'mdi-cog',
          text: 'Settings',
          route: '/settings'
        }
      ]
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['expandedNavDrawer', 'isDark']),
    filteredLinks() {
      return this.links.filter(
        e => !e.requiresAdmin || (this.user.isAdmin && e.requiresAdmin)
      );
    },
    adminLinks() {
      return this.links.filter(e => this.user.isAdmin && e.requiresAdmin);
    },
    memberLinks() {
      return this.links.filter(e => !e.requiresAdmin);
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
    logout() {
      this.$store.dispatch('doLogout');
    }
  }
};
</script>

<style></style>
