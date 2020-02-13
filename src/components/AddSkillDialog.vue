<template>
  <v-dialog v-model="dialog" max-width="500" @input="v => v || close()">
    <template v-slot:activator="{ on }">
      <v-btn v-if="isIcon" icon v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-else text color="primary" v-on="on">
        Add a skill
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Add a skill
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-select
            label="Category"
            :items="categories"
            item-text="text"
            item-value="value"
            prepend-inner-icon="mdi-playlist-star"
            required
            @change="populateSkills"
          ></v-select>
          <v-autocomplete
            v-model="selectedSkill"
            label="Skill"
            no-data-text="No skills available"
            :items="skills"
            autocomplete="off"
            auto-select-first
            spellcheck="false"
            :loading="loadingSkills"
            clearable
            prepend-inner-icon="mdi-star"
            required
          ></v-autocomplete>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close()">Close</v-btn>
        <v-btn
          color="primary"
          :disabled="selectedSkill ? false : true"
          :loading="addSkillLoading"
          @click="addSkill"
        >
          Add</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    isIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      skills: [],
      selectedSkill: null,
      dialog: false,
      loadingSkills: false,
      addSkillLoading: false,
      skillCategories: []
    };
  },
  computed: {
    categories() {
      return this.skillCategories.map(o => {
        return {
          text: o.name,
          value: o._id
        };
      });
    }
  },
  watch: {
    dialog(opened) {
      if (opened) {
        this.fetchCategoriesArchived('false').then(res => {
          this.skillCategories = res.categories;
        });
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchSkillsByCategory',
      'addSkillToUser',
      'toggleSnackbar',
      'fetchCategoriesArchived'
    ]),
    populateSkills(categoryId) {
      this.loadingSkills = true;

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
          if (this.$refs.form) {
            this.$refs.form.reset();
          }

          this.toggleSnackbar({
            show: true,
            text: 'Skill added successfully',
            color: 'success'
          });
        })
        .catch(err => {
          console.log(err);

          this.toggleSnackbar({
            show: true,
            text: 'Something went wrong',
            color: 'error'
          });
        })
        .finally(() => (this.addSkillLoading = false));
    },
    close() {
      this.$refs.form.reset();
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
