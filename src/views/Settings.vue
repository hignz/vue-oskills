<template>
  <v-card>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab>
        Account
      </v-tab>
      <v-tab>
        Appearence
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :transition="false" :reverse-transition="false">
        <v-card flat>
          <v-card-text>a</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item :transition="false" :reverse-transition="false">
        <v-container>
          <v-card flat>
            <v-card-text>
              <DarkThemeSwitch></DarkThemeSwitch>
              <p><v-icon>mdi-palette-outline</v-icon> Accent Color</p>
              <AccentColorPicker></AccentColorPicker>
            </v-card-text>
          </v-card>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import AccentColorPicker from '../components/AccentColorPicker';
import DarkThemeSwitch from '../components/DarkThemeSwitch';

export default {
  components: {
    AccentColorPicker,
    DarkThemeSwitch
  },
  data() {
    return {
      tab: null
    };
  }
};
</script>

<style></style>
