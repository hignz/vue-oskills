<template>
  <v-list rounded dense two-line flat>
    <v-subheader
      >ACTIVITY FEED
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-subheader>

    <v-list-item-group color="primary">
      <v-list-item v-for="(activity, i) in activities" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="activity.message"></v-list-item-title>
          <v-list-item-subtitle>{{
            moment(activity.logDate).fromNow()
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    activities: null,
    loaded: false
  }),
  created() {
    this.$store
      .dispatch('fetchActivites')
      .then(res => {
        console.log(res);
        this.activities = res;
      })
      .catch(err => {
        console.log(err);
        this.loaded = false;
      });
  }
};
</script>

<style></style>
