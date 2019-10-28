<template>
  <v-card>
    <v-toolbar dense flat>
      <v-toolbar-title class="subtitle-2 grey--text"
        >TOP SKILLS</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <AddSkillDialog></AddSkillDialog>
      <v-btn icon @click="openAllSkills">
        <v-icon>mdi-arrow-expand</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list v-if="skills && skills.length" dense two-line>
      <v-list-item-group>
        <v-list-item
          v-for="(skill, i) in skills"
          :key="i"
          :to="{
            name: 'skillProfile',
            params: { id: skill.skillId }
          }"
        >
          <v-list-item-avatar>
            <EsteemBadge :esteem="skill.esteem"></EsteemBadge>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="skill.name"></v-list-item-title>
            <v-list-item-subtitle
              class="grey--text"
              v-text="skill.categoryName"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action-text>
            {{ skill.rating }}
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list v-else dense two-line>
      <v-list-item>You have no skills, please add some.</v-list-item>
    </v-list>
  </v-card>
</template>

<script>
const AddSkillDialog = () => import('./AddSkillDialog');
const EsteemBadge = () => import('./EsteemBadge');

export default {
  components: {
    AddSkillDialog,
    EsteemBadge
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
