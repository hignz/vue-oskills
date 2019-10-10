<template>
  <v-list rounded dense>
    <v-subheader
      >SKILLS
      <v-spacer></v-spacer>
      <AddSkillDialog></AddSkillDialog>
      <v-tooltip top>
        <span>Add a new skill</span>
      </v-tooltip>
    </v-subheader>

    <v-list-item-group color="primary">
      <v-list-item
        v-for="(skill, i) in skills"
        :key="i"
        :to="{
          name: 'skillprofile',
          params: { id: skill.skillId }
        }"
      >
        <v-list-item-content>
          <v-list-item-title v-text="skill.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar>
          {{ skill.rating }}
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>
    <v-btn block text rounded @click="openAllSkills">All</v-btn>
  </v-list>
</template>

<script>
const AddSkillDialog = () => import('./AddSkillDialog');

export default {
  components: {
    AddSkillDialog
  },
  props: {
    skills: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      dialog: false,
      selectedSkill: {}
    };
  },
  methods: {
    openAllSkills() {
      this.$router.push({ name: 'skills' });
    }
  }
};
</script>

<style></style>
