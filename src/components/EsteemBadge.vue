<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-icon large :color="badge.color" v-on="on">
        {{ badge.icon }}
      </v-icon>
    </template>
    <span>{{ esteem }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    esteem: {
      type: Number,
      required: true
    }
  },
  computed: {
    badge() {
      let icon = '';
      let color = '';

      if (this.esteem >= 0 && this.esteem < 3) {
        icon = 'mdi-hexagon-slice-1';
        color = '#FF7733';
      } else if (this.esteem >= 3 && this.esteem <= 5) {
        icon = 'mdi-hexagon-slice-2';
        color = '#FFC914';
      } else if (this.esteem > 5 && this.esteem <= 10) {
        icon = 'mdi-hexagon-slice-3';
        color = '#FFC914';
      } else if (this.esteem >= 11 && this.esteem <= 16) {
        icon = 'mdi-hexagon-slice-4';
        color = '#5EEB5B';
      } else {
        icon = 'mdi-hexagon-slice-5';
        color = '#3DD6D0';
      }

      return { icon, color };
    }
  }
};
</script>

<style></style>
