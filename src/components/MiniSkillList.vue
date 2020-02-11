<template>
  <div>
    <v-toolbar dense flat>
      <v-toolbar-title class="subtitle-2 grey--text"
        >TOP SKILLS</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <AddSkillDialog v-if="skills && skills.length" />
      <v-btn icon @click="openAllSkills">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list v-if="skills && skills.length" dense two-line>
      <v-list-item-group>
        <v-list-item
          v-for="(s, i) in skills"
          :key="i"
          :to="{
            name: 'skillProfile',
            params: { id: s.skill._id }
          }"
        >
          <v-list-item-avatar>
            <EsteemBadge :esteem="s.esteem"></EsteemBadge>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ s.skill.name }}</v-list-item-title>
            <v-list-item-subtitle class="grey--text">
              {{ s.skill.category.name }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action-text>
            {{ s.rating }}
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-else>
      <v-card-text class="mt-8">
        <p class="text-center grey--text">
          You have not added any skills yet.
        </p>
        <p class="text-center grey--text">
          Add a skill to get started.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <AddSkillDialog :is-icon="false" />
        <v-spacer />
      </v-card-actions>
    </template>
  </div>
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
  data() {
    return {
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
