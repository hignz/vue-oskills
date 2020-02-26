<template>
  <v-container v-if="loaded" fluid>
    <v-card outlined>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="4">
              <v-row justify="center" align="center" class="mb-6">
                <v-avatar color="primary" size="62">
                  <span v-if="category.name" class="white--text headline">{{
                    category.name[0]
                  }}</span>
                </v-avatar>
              </v-row>
              <v-row class="subheading-1" justify="center" align="center">
                {{ category.name }}
              </v-row>

              <v-row class="mt-5" justify="center" align="center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" v-on="on">
                      <v-icon class="pa-1 mb-1" left>mdi-star-circle</v-icon>
                      {{ skillsIn.length }}
                    </v-chip>
                  </template>
                  <span>Amount of skils in this category</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-card height="100%" outlined>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Skills in category</v-toolbar-title
            >
          </v-toolbar>

          <v-list
            v-if="skillsIn.length"
            class="overflow-y-auto"
            style="max-height: 345px"
            dense
          >
            <v-list-item v-for="s in skillsIn" :key="s._id">
              <v-list-item-avatar>
                <v-icon>mdi-circle-medium</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="s.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action> </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-text v-else>
            <p class="text-center grey--text mt-12">
              No users have added this skill to their profile
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card height="100%" outlined>
          <v-toolbar flat dense>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Top Skills</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text class="grey--text"
            ><p class="text-center grey--text">
              Under construction
            </p></v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card outlined height="100%">
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Activity</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text class="text-center grey--text" outlined>
            <p>This category has no activity</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ActivityFeed from '../components/ActivityFeed';

export default {
  components: {
    ActivityFeed
  },
  data() {
    return {
      category: {},
      loaded: false,
      skillsIn: {},
      categoryActivityData: []
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    const categoryId = this.$route.params.id;

    this.fetchCategory(categoryId).then(res => {
      this.category = res.category;
      this.skillsIn = res.skillsIn;
      console.log(res);
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions([
      'setLoading',
      'fetchCategory',
      'fetchCategoryActivity',
      'toggleSnackbar'
    ])
  }
};
</script>

<style>
.link {
  cursor: pointer;
}
</style>
