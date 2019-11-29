<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-icon large :color="color" v-on="on">
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
    color() {
      let esteem = this.esteem;
      let color = '';

      if (esteem >= 0 && esteem <= 5) {
        color = '#FFC914';
      } else if (esteem > 5 && esteem <= 10) {
        color = '#FF7733';
      } else if (esteem >= 11 && esteem <= 16) {
        color = '#5EEB5B';
      } else {
        color = '#3DD6D0';
      }

      return color;
    },
    icon() {
      let esteem = this.esteem;
      let icon = '';

      if (esteem >= 0 && esteem <= 5) {
        icon = 'mdi-star-three-points';
      } else if (esteem > 5 && esteem <= 10) {
        icon = 'mdi-star-four-points';
      } else if (esteem >= 11 && esteem <= 16) {
        icon = 'mdi-star';
      } else {
        icon = 'mdi-hexagram';
      }

      return icon;
    }
  }
};
</script>

<style></style>
