<template>
  <v-list rounded dense link>
    <v-subheader
      >SKILLS
      <v-spacer></v-spacer>
      <AddSkillDialog></AddSkillDialog>
      <v-tooltip top>
        <span>Add a new skill</span>
      </v-tooltip>
    </v-subheader>

    <v-list-item-group color="primary">
      <v-list-item v-for="i in 3" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="skills[i].name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar>
          {{ skills[i].rating }}
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>
    <v-list-item-group color="primary">
      <v-list-item>
        <v-spacer></v-spacer>
        <v-list-item-content>
          View All
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import AddSkillDialog from './AddSkillDialog';

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
      dialog: false
    };
  }
};
</script>

<style></style>
