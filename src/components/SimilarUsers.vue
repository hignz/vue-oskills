<template>
  <v-card flat>
    <!-- <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Similar Users</v-toolbar-title>
      <v-spacer />
      <v-toolbar-side-icon>
        <v-icon>mdi-open-in-new</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar> -->
    <v-list rounded dense="">
      <v-subheader>SIMILAR USERS</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in users.data"
          :key="i"
          :to="{ name: 'profile', params: { id: item._id, user: item } }"
          link
        >
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ['users'],
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
