<template>
  <v-container fluid>
    <v-col class="text-center">
      <h1 class="subheading grey--text pt-5">
        <span class="font-weight-light">Welcome to </span>
        <span class="primary--text">O</span>
        <span class="font-weight-light">Skills</span>
      </h1>
    </v-col>
    <v-row
      v-if="verified && !completed && !isLoading"
      align="center"
      justify="center"
    >
      <v-col sm="12" md="5">
        <v-card>
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="true"
            @submit.prevent="onSubmit"
          >
            <v-stepper v-model="n" vertical class="elevation-0">
              <v-stepper-step :complete="n > 1" :step="1" :editable="true">
                Personal details
              </v-stepper-step>
              <v-stepper-content step="1" class="pl-0">
                <v-card-text>
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
                    clearable
                    multiple
                    class="pb-3"
                    required
                  >
                  </v-autocomplete>
                  <v-file-input
                    v-model="image"
                    :rules="imageRules"
                    placeholder="Avatar"
                    accept="image/png, image/jpeg, image/bmp"
                    show-size
                    required
                    @change="preview"
                  ></v-file-input>
                </v-card-text>

                <v-col class="mx-auto mt-4" sm="12">
                  <v-btn color="primary" @click="n = 2">Next</v-btn>
                </v-col>
              </v-stepper-content>

              <v-stepper-step :complete="n > 2" step="2" :editable="true">
                Appearance
              </v-stepper-step>
              <v-stepper-content step="2" class="pl-0">
                <v-card-text>
                  <v-subheader>Theme</v-subheader>
                  <DarkThemeSwitch class="pl-3"></DarkThemeSwitch>
                  <v-subheader>Accent</v-subheader>
                  <AccentColorPicker></AccentColorPicker>
                  <v-btn text class="mt-4" @click="n = 1">Back</v-btn>
                  <v-btn color="primary" class="ml-2 mt-4" @click="n = 3"
                    >Next</v-btn
                  >
                </v-card-text>
              </v-stepper-content>

              <v-stepper-step :complete="n > 3" step="3" :editable="true">
                Password
              </v-stepper-step>
              <v-stepper-content step="3" class="pl-0">
                <v-row>
                  <v-col sm="6">
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="show1 ? 'text' : 'password'"
                      label="Password"
                      hint="Make sure it's at least 8 characters."
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
                      hint="Make sure it's at least 8 characters."
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
                    >Complete</v-btn
                  >
                </v-col>
              </v-stepper-content>
            </v-stepper>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col
        v-if="!verified && !completed && !isLoading"
        sm="4"
        class="text-center"
      >
        <v-alert text color="error" icon="mdi-exclamation" border="left">
          User not found.
          <p class="my-0 py-0"></p>
        </v-alert>
      </v-col>
      <v-col v-if="verified && completed" sm="4" class="text-center">
        <v-card outlined>
          <v-card-text>
            <p class="body-1 grey--text mt-6 text-center">
              Registration complete! Please login to continue.
            </p>
            <v-card-actions>
              <v-btn text block class="mt-4" color="success" to="/login"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AccentColorPicker from '../components/AccentColorPicker';
import DarkThemeSwitch from '../components/DarkThemeSwitch';
import { mapActions } from 'vuex';
import validationRules from '../mixins/validationRules';

export default {
  components: {
    AccentColorPicker,
    DarkThemeSwitch
  },
  mixins: [validationRules],
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
      skills: [],
      selectedSkills: [],
      image: null,
      verified: null,
      completed: null,
      isLoading: true,
      passwordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Passwords must match',
        v => v.length > 7 || 'Password must be at least 8 characters'
      ],
      imageRules: [
        v => !v || v.size < 1000000 || 'Avatar size should be less than 1 MB!'
      ]
    };
  },
  created() {
    const token = this.$route.params.token;
    if (!this.completed) {
      this.verifyUser(token)
        .then(() => {
          this.verified = true;

          this.fetchAllSkills()
            .then(response => {
              this.skills = response.skills.map(o => {
                return {
                  text: o.name,
                  value: o._id
                };
              });
            })
            .catch(() => {});
        })
        .catch(() => {
          this.setLoading(false);

          this.verified = false;
        })
        .finally(() => (this.isLoading = false));
    }
  },
  methods: {
    ...mapActions([
      'fetchAllSkills',
      'doRegister',
      'verifyUser',
      'toggleSnackbar',
      'setLoading'
    ]),
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.doRegister({
          name: `${this.firstName} ${this.lastName}`,
          skills: this.selectedSkills,
          password: this.password,
          verificationToken: this.$route.params.token,
          image: this.image
        })
          .then(() => {
            this.completed = true;
          })
          .catch(() => {
            this.toggleSnackbar({
              show: true,
              text: 'Something went wrong',
              color: 'error'
            });
          });
      }
    }
  }
};
</script>

<style>
.theme--dark.v-stepper {
  background: #282c34;
}
</style>
