<template>
  <v-container>
    <v-row class="headline" align="center" justify="center">
      <v-col class="text-center pt-12 pb-8">
        <h1 class="subheading grey--text pt-5">
          <span class="font-weight-light">Welcome to </span>
          <span class="primary--text">O</span>
          <span class="font-weight-light">Skills</span>
        </h1>
      </v-col>
    </v-row>
    <v-container v-if="verified + !completed" fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card flat>
            <v-form>
              <v-stepper v-model="n" vertical>
                <v-stepper-step :complete="n > 1" :step="1" :editable="true">
                  Personal Details
                </v-stepper-step>
                <v-stepper-content step="1">
                  <v-col sm="8" class="mx-auto">
                    <v-text-field
                      v-model="firstName"
                      name="firstName"
                      label="First Name"
                      :rules="nameRules"
                      class="pb-3"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="lastName"
                      name="lastName"
                      label="Last Name"
                      :rules="nameRules"
                      class="pb-3"
                    >
                    </v-text-field>
                    <v-autocomplete
                      v-model="selectedSkills"
                      :items="skills"
                      item-text="text"
                      item-value="value"
                      attach
                      dense
                      chips
                      label="Skills"
                      multiple
                      class="pb-3"
                      menu-props="auto"
                    >
                    </v-autocomplete>
                    <v-file-input
                      chips
                      label="Profile Picture"
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>

                  <v-col class="mx-auto pt-6" sm="4">
                    <v-btn color="primary" @click="n = 2">Continue</v-btn>
                  </v-col>
                </v-stepper-content>

                <v-stepper-step :complete="n > 2" step="2" :editable="true">
                  Appearance
                </v-stepper-step>
                <v-stepper-content step="2">
                  <v-row>
                    <v-col class="mx-auto" sm="3">
                      <v-switch
                        v-model="darkMode"
                        label="Dark Mode"
                        color="primary"
                      >
                      </v-switch>
                    </v-col>
                  </v-row>
                  <v-col class="mx-auto pt-6" cols="12" sm="4">
                    <v-btn color="primary" col="6" @click="n = 3"
                      >Continue</v-btn
                    >
                    <v-btn text col="6" @click="n = 1">Back</v-btn>
                  </v-col>
                </v-stepper-content>

                <v-stepper-step :complete="n > 3" step="3" :editable="true">
                  Password
                </v-stepper-step>
                <v-stepper-content step="3">
                  <v-row>
                    <v-col sm="8" class="mx-auto">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        class="pb-3"
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
                        class="pb-3"
                        @click:append="show2 = !show2"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-col class="mx-auto pt-6" sm="4">
                    <v-btn type="submit" color="primary" @click="complete()"
                      >Complete</v-btn
                    >
                    <v-btn text @click="n = 2">Back</v-btn>
                  </v-col>
                </v-stepper-content>
              </v-stepper>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-col v-else class="text-center">
      <h1 class="subheading grey--text">
        User not recognized
      </h1>
    </v-col>
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
      verified: false,
      completed: false
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
