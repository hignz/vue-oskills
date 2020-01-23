<template>
  <v-container fluid>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col sm="12">
            <fieldset>
              <legend>
                <v-icon class="ml-1">mdi-account</v-icon>
                <span class="mx-2">Account</span>
              </legend>
              <v-row>
                <v-col cols="12" sm="12" md="2">
                  <v-text-field
                    label="Email"
                    class="text-center"
                    value="aaron@gmail.com"
                    disabled
                    >asdasdasd</v-text-field
                  >
                  <v-btn text color="primary" class="float-right" block
                    >Change</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="2">
                  <v-text-field
                    type="password"
                    label="Password"
                    disabled
                    class="text-center"
                    value="sadasasddas"
                  ></v-text-field>
                  <v-btn text color="primary" class="float-right" block
                    >Change</v-btn
                  >
                </v-col>
              </v-row>
            </fieldset>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12">
            <fieldset class="mt-4">
              <legend>
                <v-icon class="ml-1">mdi-palette-outline</v-icon>
                <span class="mx-2">Appearance</span>
              </legend>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <p class="subtitle-2">Theme</p>
                  <DarkThemeSwitch></DarkThemeSwitch>
                </v-col>
              </v-row>

              <v-col cols="12" sm="12" md="12">
                <p class="subtitle-2">
                  Accent Colour
                </p>
                <v-chip-group v-model="colorSelection" class="mb-2" mandatory>
                  <v-chip
                    v-for="color in colors"
                    :key="color.value"
                    pill
                    @click="changeAccentColor(color)"
                  >
                    <v-avatar left :color="color.value"></v-avatar>
                    {{ color.name }}
                  </v-chip>
                  <v-chip pill @click="showColorPicker = !showColorPicker">
                    Custom
                  </v-chip>
                </v-chip-group>
                <AccentColorPicker v-if="showColorPicker"></AccentColorPicker>
              </v-col>
            </fieldset>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import AccentColorPicker from '../components/AccentColorPicker';
import DarkThemeSwitch from '../components/DarkThemeSwitch';
import vuetify from '../plugins/vuetify';

export default {
  components: {
    AccentColorPicker,
    DarkThemeSwitch
  },
  data() {
    return {
      showColorPicker: false,
      colorSelection: 0,
      colors: [
        { name: 'Overstock red', value: '#ff1f2c' },
        { name: 'Cyan', value: '#41D1AB' },
        { name: 'Blue', value: '#72DDF7' },
        { name: 'Orange', value: '#FF7D00' },
        { name: 'Yellow', value: '#CDD130' }
      ]
    };
  },
  methods: {
    changeAccentColor(color) {
      const value = color.value;
      vuetify.framework.theme.themes.dark.primary = value;
      vuetify.framework.theme.themes.light.primary = value;
      localStorage.setItem('accentColor', value);

      this.showColorPicker = false;
    }
  }
};
</script>

<style>
fieldset {
  padding: 16px;
  border-radius: 8px;
}

legend {
  font-weight: 700;
  margin: 0px 6px;
}

.v-slide-group__content {
  white-space: unset !important;
  display: inline-block !important;
  flex: auto;
}
</style>
