<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add a skill</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-select
                  label="Category"
                  :items="categories"
                  item-text="text"
                  item-value="value"
                  required
                  @change="populateSkills"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="selectedSkill"
                  label="Skill"
                  :items="skills"
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          :disabled="selectedSkill ? false : true"
          @click="addSkill"
        >
          <v-icon>mdi-plus</v-icon> Add Skill</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="showSnackbar" color="success">
      {{ snackbarText }}
      <v-btn color="white" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => {
    return {
      categories: {},
      skills: [],
      selectedSkill: null,
      dialog: false,
      showSnackbar: false,
      snackbarText: ''
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.$store
      .dispatch('fetchCategories')
      .then(response => {
        this.categories = response.data.categories.map(o => {
          return {
            text: o.name,
            value: o._id
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    populateSkills(categoryId) {
      this.$store
        .dispatch('fetchSkillsById', categoryId)
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
    },
    addSkill() {
      this.$store
        .dispatch('addSkillToUser', {
          skillId: this.selectedSkill,
          userId: this.user
        })
        .then(response => {
          // TODO: commit response to store.user
          this.$refs.form.reset();
          console.log(response.data.user);
          this.snackbarText = 'Skill added!';
          this.showSnackbar = true;
          this.$store.dispatch('updateUser', response.data.user);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
