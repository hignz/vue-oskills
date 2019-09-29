<template>
  <v-card>
    <v-navigation-drawer
      v-if="test"
      v-model="showDrawer"
      :mini-variant.sync="mini"
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Welcome</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in links"
          :key="item.title"
          :to="item.route"
          links
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item link to="/account">
            <v-list-item-title>Account</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link to="/appearance">
            <v-list-item-title>Appearance</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-brush</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showDrawer: true,
      mini: true,
      links: [
        { icon: 'mdi-bulletin-board', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-magnify', text: 'Browse', route: '/browse' }
      ]
    };
  },
  computed: {
    test() {
      return this.$store.state.accessToken;
    },
    getUserName() {
      return this.$store.state.user;
    }
  }
};
</script>

<style></style>
