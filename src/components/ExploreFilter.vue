<template>
  <div>
    <v-row>
      <v-col class="mb-2">
        <span class="grey--text">
          <v-icon color="grey" class="pb-1">
            mdi-account-search
          </v-icon>
          Find</span
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="2">
        <v-form ref="form" v-model="valid">
          <v-select
            v-model="selectedCategory"
            label="Category"
            :items="categories"
            item-text="text"
            item-value="value"
            :rules="requiredRules"
            return-object
            dense
            outlined
            required
            @change="populateSkills"
          ></v-select>
          <v-select
            v-model="selectedSkills"
            label="Skills"
            class="mb-2"
            no-data-text="No skills found"
            :items="skills"
            autocomplete="off"
            :rules="arrayRules"
            clearable
            multiple
            dense
            small-chips
            outlined
            return-object
            required
          ></v-select>
          <v-range-slider
            v-model="range"
            label="Esteem"
            class="mb-2"
            step="1"
            :max="30"
            thumb-label
            tick-size="4"
          ></v-range-slider>
          <v-btn
            block
            text
            color="primary"
            :loading="searching"
            :disabled="!valid"
            @click="doSearch()"
            >Search</v-btn
          >
        </v-form>
      </v-col>
      <v-col cols="12" sm="12" md="10" class="pt-0">
        <RecentlyJoined v-if="!searched" />
        <p v-if="searched" class="grey--text">
          {{ searchTerm }}
        </p>

        <div v-if="!results.length" class="grey--text text-center mt-12">
          <v-icon v-if="searched" x-large class="grey--text mb-2">
            mdi-account-off
          </v-icon>
          <p v-if="searched" class="title">
            No results found
          </p>
        </div>
        <v-row v-else align="start" justify="start">
          <v-col v-for="result in results" :key="result._id" sm="12" md="4">
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
import RecentlyJoined from '../components/RecentlyJoined';

export default {
  components: {
    MiniProfile,
    RecentlyJoined
  },
  mixins: [validationRules],
  data() {
    return {
      results: [],
      range: [0, 10],
      categories: [],
      skills: [],
      selectedCategory: null,
      selectedSkills: [],
      searched: false,
      valid: false,
      searching: false,
      searchTerm: null
    };
  },
  computed: {
    noResults() {
      return this.results.length <= 0;
    },
    selectedSkillsToString() {
      return this.selectedSkills.map(el => el.text).join(', ');
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
        this.searchTerm = `Results for ${this.selectedSkillsToString} between ${this.range[0]} - ${this.range[1]}`;
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
