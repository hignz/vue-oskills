<template>
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
</template>

<script>
export default {
  data: () => ({
    menuItems: [{ title: 'Similar Users' }, { title: 'New Users' }],
    sortName: 'NEW USERS',
    users: []
  }),
  created() {
    this.$store
      .dispatch('fetchRecentUsers')
      .then(response => {
        this.users = response.data.users;
      })
      .catch(err => {
        console.log(err);
      });
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
