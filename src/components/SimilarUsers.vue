<template>
  <v-card>
    <v-toolbar dense flat>
      <v-toolbar-title class="subtitle-2 grey--text">{{
        sortName
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in menuItems" :key="i" @click="">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-list dense two-line>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(user, i) in users.slice(0, 3)"
          :key="i"
          :to="{ name: 'profile', params: { id: user._id, user } }"
          link
        >
          <v-list-item-avatar>
            <v-img
              :src="`https://randomuser.me/api/portraits/men/${i}.jpg`"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
            <v-list-item-subtitle v-text="user.role"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    users: {
      require: true
    }
  },
  data: () => ({
    menuItems: [{ title: 'Similar Users' }, { title: 'New Users' }],
    sortName: 'NEW USERS'
  }),
  methods: {
    openProfile(user) {
      this.$router.push({
        name: 'profile',
        params: { id: user._id, user: user }
      });
    }
  }
};
</script>

<style></style>
