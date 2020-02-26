<template>
  <v-dialog v-model="dialog" max-width="500" @input="v => v || close()">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-flask-plus-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="mb-4">Add skill</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-select
            v-model="selectedCategory"
            label="Category"
            :items="categories"
            item-text="categoryName"
            item-value="categoryId"
            :rules="requiredRules"
            return-object
          >
          </v-select>
          <v-checkbox
            v-model="showArchivedCategories"
            label="Show archived categories"
            input-value="false"
            value
          ></v-checkbox>
          <v-text-field
            v-model="skillName"
            label="Skill"
            :rules="requiredRules"
          ></v-text-field>
          <v-checkbox
            v-model="archiveSkill"
            label="Archive"
            :disabled="lockArchiveSkill"
            input-value="false"
            value
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close()">Close</v-btn>
        <v-btn color="success" :disabled="!valid" @click="addNewSkill">
          Add</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import validationRules from '../mixins/validationRules';

export default {
  mixins: [validationRules],
  data() {
    return {
      categories: [],
      selectedCategory: null,
      skillName: null,
      dialog: false,
      valid: false,
      archiveSkill: false,
      showArchivedCategories: false,
      lockArchiveSkill: false
    };
  },
  watch: {
    dialog(opened) {
      if (opened) {
        this.fetchUnarchivedCategories();
      }
    },
    showArchivedCategories(newValue) {
      if (newValue) {
        this.lockArchiveSkill = true;
        this.archiveSkill = true;

        this.fetchArchivedCategories();
      } else {
        this.$refs.form.reset();

        this.lockArchiveSkill = false;
        this.archiveSkill = false;

        this.fetchUnarchivedCategories();
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchCategories',
      'fetchCategoriesArchived',
      'fetchAllSkills',
      'addSkill',
      'toggleSnackbar'
    ]),
    fetchArchivedCategories() {
      this.fetchCategoriesArchived('true').then(res => {
        this.categories = res.categories.map(c => {
          return {
            categoryName: c.name,
            categoryId: c._id
          };
        });
      });
    },
    fetchUnarchivedCategories() {
      this.fetchCategoriesArchived('false').then(res => {
        this.categories = res.categories.map(c => {
          return {
            categoryName: c.name,
            categoryId: c._id
          };
        });
      });
    },
    addNewSkill() {
      const archived = this.archiveSkill;

      this.addSkill({
        name: this.skillName,
        categoryId: this.selectedCategory.categoryId,
        archived: this.archiveSkill
      })
        .then(() => {
          this.close();
          this.toggleSnackbar({
            show: true,
            text: 'Skill added successfully',
            color: 'success'
          });

          this.$emit('skillAdded', archived ? 0 : 1);
        })
        .catch(err => {
          this.toggleSnackbar({
            show: true,
            text: err.response.data.error,
            color: 'error'
          });
        });
    },
    close() {
      this.$refs.form.reset();
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
