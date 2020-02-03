<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-icon large :color="badge.color" v-on="on">
        mdi-hexagon
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

      if (this.esteem >= 0 && this.esteem <= 5) {
        icon = 'mdi-star-three-points';
        color = '#FF7733';
      } else if (this.esteem > 5 && this.esteem <= 10) {
        icon = 'mdi-star-four-points';
        color = '#FFC914';
      } else if (this.esteem >= 11 && this.esteem <= 16) {
        icon = 'mdi-star';
        color = '#5EEB5B';
      } else {
        icon = 'mdi-hexagram';
        color = '#3DD6D0';
      }

      return { icon, color };
    }
  }
};
</script>

<style></style>
