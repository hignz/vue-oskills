<template>
  <div>
    <v-row>
      <v-col class="mb-0 pb-0">
        <span class="grey--text">
          <v-icon color="grey" class="pb-1">
            mdi-account-search
          </v-icon>
          Find</span
        >
      </v-col>

      <v-col cols="12" class="pt-0">
        <v-form ref="form" v-model="valid">
          <v-row align="start">
            <v-col cols="12" sm="12" md="3">
              <v-select
                v-model="selectedCategory"
                label="Category"
                :items="categories"
                item-text="text"
                item-value="value"
                :rules="requiredRules"
                return-object
                chips
                dense
                required
                @change="populateSkills"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-select
                v-model="selectedSkills"
                label="Skills"
                no-data-text="No skills found"
                :items="skills"
                autocomplete="off"
                :rules="requiredRules"
                clearable
                multiple
                dense
                chips
                return-object
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="3" class="pt-6">
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
                block
                color="success"
                :loading="searching"
                @click="doSearch()"
                >Search</v-btn
              >
            </v-col>
          </v-row>
        </v-form>

        <div v-if="!results.length" class="grey--text text-center mt-12">
          <v-icon x-large class="grey--text mb-2">{{
            searched ? 'mdi-account-off' : 'mdi-account-search'
          }}</v-icon>
          <p v-if="searched">
            No results found
          </p>
          <p v-else class="title">
            Please search pls
          </p>
        </div>
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
      selectedSkills: [],
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
      'fetchUsersWithSkills'
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
      this.fetchSkillsByCategory({
        categoryId: this.selectedCategory.value,
        filter: false
      }).then(response => {
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
        this.fetchUsersWithSkills({
          skillIds: this.selectedSkills.map(el => el.value),
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
