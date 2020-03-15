<template>
  <div>
    <v-chip-group v-model="colorSelection" class="mb-2" mandatory>
      <v-chip
        v-for="c in colors"
        :key="c.value"
        pill
        @click="changeAccentColor(c)"
      >
        <v-avatar left :color="c.value"></v-avatar>
        {{ c.name }}
      </v-chip>
      <v-chip pill @click="showColorPicker = !showColorPicker">
        Custom
      </v-chip>
    </v-chip-group>

    <v-color-picker
      v-if="showColorPicker"
      v-model="color"
      mode="hexa"
      :hide-mode-switch="true"
    ></v-color-picker>
  </div>
</template>

<script>
import vuetify from '../plugins/vuetify';

export default {
  data() {
    return {
      type: 'hex',
      hex: '',
      showColorPicker: false,
      colorSelection: 0,
      colors: [
        { name: 'Overstock red', value: '#ff1f2c' },
        { name: 'Cyan', value: '#41D1AB' },
        { name: 'Blue', value: '#72DDF7' },
        { name: 'Purple', value: '#BD93F9' },
        { name: 'Coral', value: '#EF596F' },
        { name: 'Orange', value: '#ff3d00' },
        { name: 'Yellow', value: '#F1FA8C' }
      ]
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
  },
  created() {
    this.hex = vuetify.framework.theme.isDark
      ? vuetify.framework.theme.themes.dark.primary
      : vuetify.framework.theme.themes.light.primary;
  },
  methods: {
    changeAccentColor(c) {
      const value = c.value;
      this.color = value;
      vuetify.framework.theme.themes.dark.primary = value;
      vuetify.framework.theme.themes.light.primary = value;
      localStorage.setItem('accentColor', value);
    }
  }
};
</script>

<style></style>
