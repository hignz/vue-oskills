<template>
  <div>
    <v-row>
      <v-col class="mb-0 pb-0">
        <span class="grey--text">
          <v-icon color="grey" class="pb-1">
            mdi-filter-variant
          </v-icon>
          Filter</span
        >
      </v-col>

      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row align="start" justify="space-around">
            <v-col cols="12" sm="12" md="3">
              <v-select
                v-model="selectedCategory"
                label="Category"
                :items="categories"
                item-text="text"
                item-value="value"
                :rules="requiredRules"
                return-object
                required
                @change="populateSkills"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-select
                v-model="selectedSkill"
                label="Skill"
                no-data-text="No skills found"
                :items="skills"
                autocomplete="off"
                auto-select-first
                :rules="requiredRules"
                clearable
                return-object
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="3" class="pt-8">
              <v-range-slider
                v-model="range"
                step="1"
                :max="20"
                thumb-label
                tick-size="4"
                label="Esteem"
              ></v-range-slider>
            </v-col>
            <v-col cols="12" sm="12" md="3" class="pa-6">
              <v-btn
                text
                block
                color="primary"
                :loading="searching"
                @click="doSearch()"
                >Search</v-btn
              >
            </v-col>
          </v-row>
        </v-form>

        <p v-if="searched && !results.length">No results found</p>
        <v-row v-else>
          <v-col v-for="result in results" :key="result._id" sm="12" md="3">
            <MiniProfile :user="result.owner" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import MiniProfile from './MiniProfile';
import validationRules from '../mixins/validationRules';

export default {
  components: {
    MiniProfile
  },
  mixins: [validationRules],
  data() {
    return {
      results: [],
      range: [1, 10],
      categories: [],
      skills: [],
      selectedCategory: null,
      selectedSkill: {},
      searched: false,
      valid: false,
      searching: false
    };
  },
  computed: {
    noResults() {
      return this.results.length <= 0;
    }
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions([
      'fetchCategoriesArchived',
      'fetchSkillsByCategory',
      'fetchUsersByFilter'
    ]),
    fetchCategories() {
      this.fetchCategoriesArchived('false').then(res => {
        this.categories = res.categories.map(el => {
          return {
            text: el.name,
            value: el._id
          };
        });
      });
    },
    populateSkills() {
      this.fetchSkillsByCategory(this.selectedCategory.value).then(response => {
        this.skills = response.skills.map(o => {
          return {
            text: o.name,
            value: o._id
          };
        });
      });
    },
    doSearch() {
      if (this.$refs.form.validate()) {
        this.searching = true;
        this.fetchUsersByFilter({
          skillId: this.selectedSkill.value,
          min: this.range[0],
          max: this.range[1]
        }).then(res => {
          this.results = res.users;
          this.searched = true;
          this.searching = false;
        });
      }
    }
  }
};
</script>

<style></style>
