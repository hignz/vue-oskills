<template>
  <v-card>
    <v-toolbar dense flat>
      <v-toolbar-title class="subtitle-2 grey--text">ACTIVITY</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :loading="loading" @click="getActivity()">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list
      v-if="loaded"
      dense
      two-line
      flat
      class="overflow-y-auto"
      :style="maxHeight"
    >
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(activity, i) in activities"
          :key="i"
          @click="openSkillProfile(activity.skillId._id)"
        >
          <v-list-item-avatar>
            <v-icon>
              mdi-circle-medium
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ activity.message }}</v-list-item-title>
            <v-list-item-subtitle class="grey--text">{{
              moment(activity.logDate).fromNow()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    participantId: {
      type: String,
      required: false,
      default: null
    },
    skillId: {
      type: String,
      required: false,
      default: null
    }
  },
  data: () => ({
    activities: null,
    loaded: false,
    loading: false
  }),
  computed: {
    maxHeight() {
      return this.participantId || this.skillId
        ? 'max-height: 350px'
        : 'max-height: 232px';
    }
  },
  created() {
    this.getActivity();
  },
  methods: {
    getActivity() {
      this.loading = true;

      if (this.participantId) {
        this.getUserActivity();
      } else if (this.skillId) {
        this.getSkillActivity();
      } else {
        this.getRecentActivity();
      }
    },
    getRecentActivity() {
      this.$store
        .dispatch('fetchRecentActivity')
        .then(res => {
          this.loaded = true;
          this.activities = res;
        })
        .catch(err => {
          console.log(err);
          this.loaded = false;
        })
        .finally(() => (this.loading = false));
    },
    getUserActivity() {
      this.$store
        .dispatch('fetchUserActivity', this.participantId)
        .then(res => {
          this.loaded = true;
          this.activities = res;
        })
        .catch(err => {
          console.log(err);
          this.loaded = false;
        })
        .finally(() => (this.loading = false));
    },
    getSkillActivity() {
      this.$store
        .dispatch('fetchSkillActivity', this.skillId)
        .then(res => {
          this.loaded = true;
          this.activities = res;
        })
        .catch(err => {
          console.log(err);
          this.loaded = false;
        })
        .finally(() => (this.loading = false));
    },
    openSkillProfile(skillId) {
      this.$router.push({
        name: 'skillProfile',
        params: { id: skillId }
      });
    }
  }
};
</script>

<style></style>
