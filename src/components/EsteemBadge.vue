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

      switch (this.esteem) {
        case 0:
          icon = 'mdi-hexagon-slice-1';
          break;
        case 1:
          icon = 'mdi-hexagon-slice-3';
          break;
        case 2:
          icon = 'mdi-hexagon-slice-5';
          break;
        case 3:
          icon = 'mdi-hexagon-slice-1';
          break;
        case 4:
          icon = 'mdi-hexagon-slice-2';
          break;
        case 5:
          icon = 'mdi-hexagon-slice-4';
          break;
        case 6:
          icon = 'mdi-hexagon-slice-5';
          break;
        case 7:
          icon = 'mdi-hexagon-slice-1';
          break;
        case 8:
          icon = 'mdi-hexagon-slice-2';
          break;
        case 9:
          icon = 'mdi-hexagon-slice-3';
          break;
        case 10:
          icon = 'mdi-hexagon-slice-4';
          break;
        case 11:
          icon = 'mdi-hexagon-slice-5';
          break;
        case 12:
          icon = 'mdi-hexagon-slice-1';
          break;
        case 13:
          icon = 'mdi-hexagon-slice-2';
          break;
        case 14:
          icon = 'mdi-hexagon-slice-3';
          break;
        case 15:
          icon = 'mdi-hexagon-slice-4';
          break;
        case 16:
          icon = 'mdi-hexagon-slice-5';
          break;
        case 17:
          icon = 'mdi-hexagon-slice-5';
          break;
        case 18:
          icon = 'mdi-hexagon-slice-1';
          break;
        case 19:
          icon = 'mdi-hexagon-slice-2';
          break;
        case 20:
          icon = 'mdi-hexagon-slice-3';
          break;
        case 21:
          icon = 'mdi-hexagon-slice-4';
          break;
        case 22:
          icon = 'mdi-hexagon-slice-5';
          break;
        case 23:
          icon = 'mdi-hexagon-slice-5';
          break;
        default:
          icon = 'mdi-hexagon-slice-6';
          break;
      }

      if (this.esteem >= 0 && this.esteem < 3) {
        color = '#FF7733';
      } else if (this.esteem >= 3 && this.esteem <= 6) {
        color = '#FFC914';
      } else if (this.esteem >= 7 && this.esteem <= 11) {
        color = '#FFC914';
      } else if (this.esteem >= 12 && this.esteem <= 17) {
        color = '#5EEB5B';
      } else if (this.esteem >= 18 && this.esteem <= 23) {
        color = '#3DD6D0';
      } else {
        color = '#BD93F9';
      }

      return { icon, color };
    }
  }
};
</script>

<style></style>
