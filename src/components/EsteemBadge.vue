<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-icon large :color="placeholder ? 'grey' : badge.color" v-on="on">
        {{ placeholder ? 'mdi-hexagon-outline' : badge.icon }}
      </v-icon>
    </template>
    <span>{{ esteem || 0 }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    esteem: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: Boolean,
      default: false
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
