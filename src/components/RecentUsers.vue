<template>
  <v-list v-if="users.length" dense two-line>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(user, i) in users.slice(0, 3)"
        :key="i"
        link
        @click="openProfile(user._id)"
      >
        <v-list-item-avatar>
          <v-img
            :src="`https://randomuser.me/api/portraits/men/${i}.jpg`"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="user.name"></v-list-item-title>
          <v-list-item-subtitle
            class="grey--text"
            v-text="user.role"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action-text>
          {{
            formatDistanceToNow(parseISO(user.dateJoined), { addSuffix: true })
          }}
        </v-list-item-action-text>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { formatDistanceToNow, parseISO } from 'date-fns';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      menuItems: [{ title: 'Similar Users' }, { title: 'New Users' }],
      sortName: 'NEW USERS',
      users: [],
      formatDistanceToNow,
      parseISO
    };
  },
  created() {
    this.fetchRecentUsersSlim('3')
      .then(response => {
        this.users = response.users;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions(['fetchRecentUsersSlim', 'setLoading']),
    openProfile(userId) {
      this.$router.push({
        name: 'profile',
        params: { id: userId }
      });
    }
  }
};
</script>

<style></style>
