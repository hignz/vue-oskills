<template>
  <v-list rounded dense flat>
    <v-subheader
      >SIMILAR USERS
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <span>Change view</span>
      </v-tooltip>
    </v-subheader>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in users.data"
        :key="i"
        :to="{ name: 'profile', params: { id: item._id, user: item } }"
        link
      >
        <v-list-item-avatar>
          <v-img
            :src="`https://randomuser.me/api/portraits/men/${i}.jpg`"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    users: {
      require: true
    }
  },
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
