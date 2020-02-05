<template>
  <div>
    <v-toolbar dense flat>
      <v-toolbar-title class="subtitle-2 grey--text">ACTIVITY</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list dense two-line flat class="overflow-y-auto" max-height="14.5em">
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(activity, i) in activities"
          :key="i"
          @click="openSkillProfile(activity.skillId._id)"
        >
          <v-list-item-avatar>
            <v-icon>mdi-circle-medium</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ activity.message }}</v-list-item-title>
            <v-list-item-subtitle class="grey--text">
              {{
                formatDistanceToNow(new Date(activity.logDate), {
                  addSuffix: true
                })
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import { mapActions } from 'vuex';
import Pusher from 'pusher-js';

export default {
  props: {
    activityData: {
      type: Array,
      required: true,
      default: null
    },
    isRealTime: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      activities: [],
      loaded: false,
      loading: false,
      formatDistanceToNow
    };
  },
  created() {
    this.activities = this.activityData;

    if (this.isRealTime) {
      const pusher = new Pusher('0dcf669b79776f397e0b', {
        cluster: 'eu',
        forceTLS: true
      });

      const channel = pusher.subscribe('recent-activity');
      channel.bind('activity-event', data => {
        this.activities.unshift(data.fullDocument);
      });
    }
  },
  methods: {
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
