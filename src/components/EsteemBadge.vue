<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-icon
        large
        :color="
          skill.esteem === 1 ? 'red' : skill.esteem === 2 ? 'orange' : 'green'
        "
        v-on="on"
      >
        mdi-hexagon
      </v-icon>
    </template>
    <span>{{ skill.esteem }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    skill: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
