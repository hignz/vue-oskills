<template>
  <v-container fluid>
    <v-card outlined>
      <v-subheader>Account</v-subheader>
      <v-card-text>
        <v-row>
          <v-col sm="12">
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <ChangeEmail />
              </v-col>
              <v-col cols="12" sm="12" md="2">
                <ChangePassword />
              </v-col>
              <v-col cols="12" sm="12" md="2" class="text-center">
                <UploadProfilePicture />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-subheader class="mt-4">Appearance</v-subheader>
      <v-card-text>
        <v-row>
          <v-col sm="12">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="subtitle-2">Theme</p>
                <DarkThemeSwitch></DarkThemeSwitch>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6" md="6">
                <p class="subtitle-2">
                  Accent
                </p>
                <AccentColorPicker></AccentColorPicker>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import AccentColorPicker from '../components/AccentColorPicker';
import DarkThemeSwitch from '../components/DarkThemeSwitch';
import { mapState } from 'vuex';
import ChangeEmail from '../components/ChangeEmail';
import ChangePassword from '../components/ChangePassword';
import UploadProfilePicture from '../components/UploadProfilePicture';

export default {
  components: {
    AccentColorPicker,
    DarkThemeSwitch,
    ChangePassword,
    ChangeEmail,
    UploadProfilePicture
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style></style>
