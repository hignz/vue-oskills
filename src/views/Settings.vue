<template>
  <v-container fluid>
    <v-card>
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
                  <ChangeEmail />
                  <!-- <v-divider class="mt-8"></v-divider> -->
                </v-col>
                <v-col cols="12" sm="12" md="2">
                  <ChangePassword />
                </v-col>
                <v-col cols="12" sm="12" md="2">
                  <ChangeProfilePicture />
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col cols="12" sm="12" md="2">
                  <ChangePassword />
                </v-col>
              </v-row> -->
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
                  Accent
                </p>
                <AccentColorPicker></AccentColorPicker>
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
import { mapState, mapActions } from 'vuex';
import ChangeEmail from '../components/ChangeEmail';
import ChangePassword from '../components/ChangePassword';
import ChangeProfilePicture from '../components/ChangeProfilePicture';

export default {
  components: {
    AccentColorPicker,
    DarkThemeSwitch,
    ChangePassword,
    ChangeEmail,
    ChangeProfilePicture
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['user'])
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
