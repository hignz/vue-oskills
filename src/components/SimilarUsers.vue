<template>
  <div>
    <v-list v-if="users.length">
      <v-list-item v-for="user in users" :key="user._id"> </v-list-item>
    </v-list>
    <template v-else>
      <v-card-text class="mt-8">
        <p class="grey--text text-center">We can't find any similar users.</p>
        <p class="grey--text text-center">
          Visit the explore page to find other users.
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" :to="{ name: 'explore' }">Explore</v-btn>
        <v-spacer />
      </v-card-actions>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  }
};
</script>

<style></style>
