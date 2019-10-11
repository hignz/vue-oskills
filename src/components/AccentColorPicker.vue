<template>
  <v-color-picker
    v-model="color"
    mode="hexa"
    :hide-mode-switch="true"
  ></v-color-picker>
</template>

<script>
import vuetify from '../plugins/vuetify';

export default {
  data() {
    return {
      type: 'hex',
      hex: '#696969'
    };
  },
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      }
    }
  },
  watch: {
    hex: val => {
      vuetify.framework.theme.themes.dark.primary = val;
      vuetify.framework.theme.themes.light.primary = val;
      localStorage.setItem('accentColor', val);
    }
  }
};
</script>

<style></style>
