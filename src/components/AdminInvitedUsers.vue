<template>
  <div>
    <v-list v-if="users.length">
      <v-list-item v-for="user in users" :key="user._id">
        <v-list-item-content>
          <v-list-item-title v-text="user.email"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-else>
      <v-card-text class="mt-8">
        <p class="grey--text text-center">
          We can't find any pending invitations.
        </p>
        <p class="grey--text text-center">
          You can add new user by creating new invitation.
        </p>
      </v-card-text>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style></style>
