<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-icon
        x-large
        :color="placeholder ? 'grey' : color"
        :class="animatedClass"
        v-on="on"
      >
        {{ placeholder ? 'mdi-hexagon-outline' : icon }}
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
      default: 0
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      colors: [
        '#ff1414',
        '#FF7733',
        '#FFC914',
        '#5EEB5B',
        '#3DD6D0',
        '#961bff'
      ],
      upvoted: null
    };
  },
  computed: {
    icon() {
      const i =
        this.esteem >= 25
          ? 6
          : this.esteem <= 0 || Math.ceil(this.esteem % 5) <= 0
          ? 1
          : (this.esteem % 5) + 1;

      return `mdi-hexagon-slice-${i}`;
    },
    color() {
      const i =
        Math.floor(this.esteem / 5) < 6 ? Math.floor(this.esteem / 5) : 5;
      return this.colors[i];
    },
    animatedClass() {
      return this.upvoted === null
        ? ''
        : this.upvoted
        ? 'rotate-center'
        : 'rotate-center-reverse';
    }
  },
  watch: {
    esteem: function(newVal, oldVal) {
      if (newVal > oldVal) {
        this.upvoted = true;
      } else {
        this.upvoted = false;
      }
    }
  }
};
</script>

<style scoped>
.rotate-center {
  -webkit-animation: rotate-center 0.6s ease-in-out both;
  animation: rotate-center 0.6s ease-in-out both;
}

/* ----------------------------------------------
 * Generated by Animista on 2020-2-12 4:5:28
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation rotate-center
 * ----------------------------------------
 */
@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.rotate-center-reverse {
  -webkit-animation: rotate-center-reverse 0.6s ease-in-out reverse both;
  animation: rotate-center-reverse 0.6s ease-in-out reverse both;
}

@-webkit-keyframes rotate-center-reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center-reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
