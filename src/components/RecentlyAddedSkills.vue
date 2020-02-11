<template>
  <div>
    <v-row>
      <v-col class="mb-0 pb-0">
        <span class="grey--text">
          <v-icon color="grey" class="pb-1">
            mdi-star
          </v-icon>
          Recently added</span
        >
      </v-col>
    </v-row>
    <v-row v-if="skills.length" justify="start" class="ml-1 mt-2">
      <v-chip-group>
        <v-chip
          v-for="skill in skills"
          :key="skill._id"
          :to="{ name: 'skillProfile', params: { id: skill._id } }"
        >
          {{ skill.name }}
        </v-chip>
      </v-chip-group>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      skills: []
    };
  },
  created() {
    this.fetchRecentlyAddedSkills().then(response => {
      this.skills = response;
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions(['fetchRecentlyAddedSkills'])
  }
};
</script>

<style></style>
