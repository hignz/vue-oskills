<template>
  <v-card>
    <v-navigation-drawer
      v-model="showDrawer"
      :mini-variant.sync="showNavigationDrawer"
      :width="210"
      app
    >
      <v-list-item>
        <v-list-item-avatar size="47">
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Welcome</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in links"
          v-if="!item.requiresAdmin || (getUser.isAdmin && item.requiresAdmin)"
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
        <div class="pa-2">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn text block @click="logout()" v-on="on">
                <v-icon>
                  mdi-logout
                </v-icon>
              </v-btn>
            </template>
            <span>Logout</span>
          </v-tooltip>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

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
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-star-circle', text: 'Skills', route: '/skills' },
        { icon: 'mdi-magnify', text: 'Explore', route: '/explore' },
        { icon: 'mdi-settings', text: 'Settings', route: '/settings' }
      ]
    };
  },
  computed: {
    ...mapGetters(['showNavigationDrawer', 'getUser'])
  },
  methods: {
    logout() {
      this.$store.dispatch('doLogout');
    }
  }
};
</script>

<style></style>
