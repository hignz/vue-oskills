<template>
  <v-lazy>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Add a skill
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
                    :loading="loadingCategories"
                    prepend-inner-icon="mdi-playlist-star"
                    required
                    @change="populateSkills"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="selectedSkill"
                    label="Skill"
                    no-data-text="No skills available"
                    :items="skills"
                    autocomplete="off"
                    auto-select-first
                    :loading="loadingSkills"
                    clearable
                    prepend-inner-icon="mdi-star"
                    required
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            :disabled="selectedSkill ? false : true"
            :loading="addSkillLoading"
            @click="addSkill"
          >
            Add</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="showSnackbar"
        :color="snackbarColor"
        :bottom="true"
        :timeout="3000"
      >
        {{ snackbarText }}
        <v-btn color="red" text @click="showSnackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-dialog>
  </v-lazy>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    skillCategories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categories: [],
      skills: [],
      selectedSkill: null,
      dialog: false,
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: '',
      loadingCategories: false,
      loadingSkills: false,
      addSkillLoading: false
    };
  },
  created() {
    this.loadingCategories = true;
    this.categories = this.skillCategories.map(o => {
      return {
        text: o.name,
        value: o._id
      };
    });
    this.loadingCategories = false;
  },
  methods: {
    ...mapActions(['fetchSkillsByCategory', 'addSkillToUser']),
    populateSkills(categoryId) {
      this.loadingSkills = true;
      this.skills = [];
      this.fetchSkillsByCategory(categoryId)
        .then(response => {
          this.skills = response.skills.map(o => {
            return {
              text: o.name,
              value: o._id
            };
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.loadingSkills = false));
    },
    addSkill() {
      this.addSkillLoading = true;
      this.addSkillToUser({
        skillId: this.selectedSkill
      })
        .then(() => {
          this.$refs.form.reset();
          this.skills = [];
          this.snackbarText = 'Skill added successfully!';
          this.snackbarColor = 'success';
          this.showSnackbar = true;
        })
        .catch(() => {
          this.snackbarText = 'Something went wrong';
          this.snackbarColor = 'error';
          this.showSnackbar = true;
        })
        .finally(() => (this.addSkillLoading = false));
    }
  }
};
</script>

<style></style>
