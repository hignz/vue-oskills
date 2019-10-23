<template>
  <v-container fluid>
    <v-col class="text-center">
      <h1 class="subheading grey--text pt-5">
        <span class="font-weight-light">Welcome to </span>
        <span class="primary--text">O</span>
        <span class="font-weight-light">Skills</span>
      </h1>
    </v-col>
    <v-container v-if="verified && !completed" fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-stepper v-model="n" vertical class="elevation-0">
                <v-stepper-step :complete="n > 1" :step="1" :editable="true">
                  Personal Details
                </v-stepper-step>
                <v-stepper-content step="1">
                  <v-col sm="12">
                    <v-text-field
                      v-model="firstName"
                      name="firstName"
                      label="First Name"
                      :rules="nameRules"
                      class="pb-3"
                      required
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="lastName"
                      name="lastName"
                      label="Last Name"
                      :rules="nameRules"
                      class="pb-3"
                      required
                    >
                    </v-text-field>
                    <v-autocomplete
                      v-model="selectedSkills"
                      :items="skills"
                      item-text="text"
                      item-value="value"
                      dense
                      no-data-text="No skill available"
                      chips
                      autocomplete="off"
                      label="Skills"
                      multiple
                      class="pb-3"
                      required
                    >
                    </v-autocomplete>
                    <v-file-input
                      chips
                      label="Profile Picture"
                      prepend-icon="mdi-camera"
                      show-size
                      accept="image/png, image/jpeg, image/bmp"
                      required
                    ></v-file-input>
                  </v-col>

                  <v-col class="mx-auto pt-6" sm="12">
                    <v-btn color="primary" @click="n = 2">Next</v-btn>
                  </v-col>
                </v-stepper-content>

                <v-stepper-step :complete="n > 2" step="2" :editable="true">
                  Appearance
                </v-stepper-step>
                <v-stepper-content step="2">
                  <v-row>
                    <v-col sm="6" class="text-center">
                      <DarkThemeSwitch></DarkThemeSwitch>
                      <AccentColorPicker></AccentColorPicker>
                    </v-col>
                  </v-row>
                  <v-col class="mx-auto pt-6" cols="12" sm="12">
                    <v-btn text @click="n = 1">Back</v-btn>
                    <v-btn color="primary" class="ml-2" @click="n = 3"
                      >Next</v-btn
                    >
                  </v-col>
                </v-stepper-content>

                <v-stepper-step :complete="n > 3" step="3" :editable="true">
                  Password
                </v-stepper-step>
                <v-stepper-content step="3">
                  <v-row>
                    <v-col sm="12" class="mx-auto">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        class="pb-3"
                        required
                        @click:append="show1 = !show1"
                      ></v-text-field>
                      <v-text-field
                        v-model="confirmPassword"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="show2 ? 'text' : 'password'"
                        label="Confirm password"
                        hint="At least 8 characters"
                        counter
                        required
                        class="pb-3"
                        @click:append="show2 = !show2"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-col class="mx-auto pt-6" sm="12">
                    <v-btn text @click="n = 2">Back</v-btn>
                    <v-btn
                      :disabled="!valid"
                      type="submit"
                      class="ml-2"
                      color="primary"
                      @click="onComplete()"
                      >Complete</v-btn
                    >
                  </v-col>
                </v-stepper-content>
              </v-stepper>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-col v-if="verified === false" class="text-center">
      <h1 class="subheading grey--text">
        User not recognized
      </h1>
    </v-col>
    <v-col v-if="completed" class="text-center">
      <h1 class="subheading grey--text">
        Registration complete
      </h1>
      <v-btn class="primary" to="/login">Login</v-btn>
    </v-col>
  </v-container>
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
      valid: true,
      n: 1,
      show1: false,
      show2: false,
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Passwords must match',
        v => v.length > 7 || 'Password must be at least 8 characters'
      ],
      nameRules: [
        v => !!v || 'Required',
        v => v.length > 2 || 'Name must be at least 3 characters'
      ],
      skills: [],
      selectedSkills: [],
      verified: null,
      completed: null
    };
  },
  created() {
    const token = this.$route.params.token;
    this.$store
      .dispatch('verifyUser', token)
      .then(() => {
        this.verified = true;

        this.$store
          .dispatch('fetchAllSkills')
          .then(response => {
            this.skills = response.data.skills.map(o => {
              return {
                text: o.name,
                value: o._id
              };
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(() => {
        this.verified = false;
      });
  },
  methods: {
    onComplete() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$store.dispatch('doRegister', {
          name: `${this.firstName} ${this.lastName}`,
          skills: this.selectedSkills,
          password: this.password,
          verificationToken: this.$route.params.token
        });

        this.completed = true;
      }
    }
  }
};
</script>

<style></style>
