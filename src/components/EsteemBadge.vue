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
      const esteem = this.esteem;
      let color = '';
      if (esteem >= 1 && esteem <= 5) {
        color = 'orange';
      } else if (esteem > 5 && esteem <= 10) {
        color = 'yellow';
      } else if (esteem >= 11 && esteem <= 16) {
        color = 'green';
      } else {
        color = 'blue';
      }

      return color;
    }
  }
};
</script>

<style></style>
