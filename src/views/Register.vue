<template>
  <v-container>
    <v-col class="text-center">
      <h1 class="subheading grey--text">
        Welcome to
        <span class="primary--text">O</span>
        <span class="font-weight-light">Skills</span>
      </h1>
    </v-col>
    <v-container v-if="verified" fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card flat>
            <v-stepper v-model="n" vertical>
              <v-stepper-step :complete="n > 1" :step="1" :editable="true">
                Personal Details
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-col sm="8">
                  <v-file-input chips label="Profile Picture"> </v-file-input>
                  <v-text-field
                    v-model="firstName"
                    name="firstName"
                    label="First Name"
                    :rules="nameRules"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="lastName"
                    name="lastName"
                    label="Last Name"
                    :rules="nameRules"
                  >
                  </v-text-field>
                  <v-autocomplete
                    v-model="selectedSkills"
                    :items="skills"
                    item-text="text"
                    item-value="value"
                    attach
                    chips
                    dense
                    label="Skills"
                    multiple
                  ></v-autocomplete>
                </v-col>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="n = 2">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="n > 2" step="2" :editable="true">
                Appearance
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-row>
                  <v-col>
                    <v-switch
                      v-model="darkMode"
                      label="Dark Mode"
                      color="primary"
                    >
                    </v-switch>
                  </v-col>
                </v-row>

                <v-btn color="primary" @click="n = 3">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="n > 3" step="3" :editable="true">
                Password
              </v-stepper-step>
              <v-stepper-content step="3">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="show1 ? 'text' : 'password'"
                      label="Password"
                      hint="At least 8 characters"
                      counter
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
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-btn type="submit" color="primary" @click="complete()"
                  >Complete</v-btn
                >
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <p v-else>Not Recognized</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
      verified: false
    };
  },
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      },
      comparePasswords() {
        return this.password !== this.confirmPassword
          ? 'Passwords do not match'
          : '';
      }
    },
    darkMode: {
      get() {
        return this.$store.state.isDark;
      },
      set(value) {
        this.$store.dispatch('toggleDarkMode', value);
      }
    }
  },
  created() {
    const token = this.$route.params.token;
    this.$store
      .dispatch('verifyUser', token)
      .then(response => {
        console.log(response.data);
        this.verified = true;

        this.$store
          .dispatch('fetchAllSkills')
          .then(response => {
            console.log(response);
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
      .catch(err => {
        console.log(err);
        this.verified = false;
      });
  },
  methods: {
    complete() {
      const user = {
        name: this.firstName + this.lastName,
        skills: this.selectedSkills,
        password: this.password
      };

      console.log(user);
    }
  }
};
</script>

<style></style>