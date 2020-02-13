<template>
  <div>
    <v-list v-if="users.length" dense two-line>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="user in users"
          :key="user._id"
          link
          @click="openProfile(user._id)"
        >
          <v-list-item-avatar>
            <v-img v-if="user.image" :src="user.image"></v-img>
            <v-icon v-else large>mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
            <v-list-item-subtitle
              class="grey--text"
              v-text="user.role.title"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action-text>
            {{
              formatDistanceToNow(parseISO(user.joinedAt), {
                addSuffix: true
              })
            }}
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-else>
      <v-card-text class="mt-8">
        <p class="text-center grey--text">
          No users have joined up yet.
        </p>
        <p class="text-center grey--text">
          This makes us sad.
        </p>
      </v-card-text>
    </template>
  </div>
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
