<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon color="primary" dark v-on="on">
        <v-icon>mdi-download</v-icon>
      </v-btn>
      Reports
    </template>
    <v-list dense subheader>
      <v-subheader>
        Report type
      </v-subheader>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="downloadReport(item.slug)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      items: [
        {
          title: 'Users',
          slug: 'users'
        },
        {
          title: 'Skills',
          slug: 'skills'
        },
        {
          title: 'Active skills',
          slug: 'active-skills'
        }
      ]
    };
  },
  methods: {
    ...mapActions(['fetchReport']),
    downloadReport(type) {
      this.fetchReport(type);
    }
  }
};
</script>

<style></style>
