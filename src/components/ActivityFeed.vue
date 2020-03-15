<template>
  <v-list dense two-line nav class="overflow-y-auto" :height="height">
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(activity, i) in activities"
        :key="i"
        class="ml-0 pl-0"
        @click="navigateTo(activity)"
      >
        <v-list-item-avatar>
          <v-icon>mdi-circle-medium</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-if="getSkillName(activity).length"
            >{{ getMessage(activity)[0] }}
            <span
              v-if="getSkillName(activity).length"
              class="primary--text font-weight-bold"
              >{{ getSkillName(activity) }}</span
            >
            <span v-if="getMessage(activity).length">{{
              getMessage(activity)[1]
            }}</span>
          </v-list-item-title>
          <v-list-item-title v-else>{{ activity.message }}</v-list-item-title>
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
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
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
    },
    fullSize: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 300
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
  computed: {
    size() {
      return this.fullSize ? '300px' : '14.5em';
    }
  },
  created() {
    this.activities = this.activityData;

    if (this.isRealTime) {
      const pusher = new Pusher('0dcf669b79776f397e0b', {
        cluster: 'eu',
        forceTLS: true
      });

      const channel = pusher.subscribe('recent');
      channel.bind('activity-event', data => {
        this.activities.unshift(data.fullDocument);
      });
    }
  },
  methods: {
    navigateTo(activity) {
      const to =
        this.$router.currentRoute.name === 'skillProfile'
          ? { name: 'profile', params: { id: activity.participantId } }
          : { name: 'skillProfile', params: { id: activity.skillId._id } };

      this.$router.push(to);
    },
    getSkillName(activity) {
      let skillName;
      if (activity.skillId && activity.skillId.name) {
        skillName = activity.skillId.name;
      } else if (activity.categoryId && activity.categoryId.name) {
        skillName = activity.categoryId.name;
      }

      return skillName || '';
    },
    getMessage(activity) {
      const message = activity.message;
      const skillName = this.getSkillName(activity);
      const indexOfSkill = message.indexOf(skillName);

      return [
        message.substring(0, indexOfSkill),
        message.substring(indexOfSkill + skillName.length, message.length)
      ];
    }
  }
};
</script>

<style></style>
