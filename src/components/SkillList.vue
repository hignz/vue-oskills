<template>
  <v-list rounded dense>
    <v-subheader
      >SKILLS
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add a new skill</span>
      </v-tooltip>
    </v-subheader>

    <v-list-item-group color="primary">
      <v-list-item v-for="(skill, i) in skills" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="skill.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar>
          {{ skill.rating }}
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    skills: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
