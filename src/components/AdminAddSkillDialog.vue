<template>
  <v-dialog v-model="dialog" max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-flask-plus-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Add Skill</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-select
            v-model="selectedCategory"
            label="Category"
            :items="categories"
            item-text="categoryName"
            item-value="categoryId"
            return-object=""
          >
          </v-select>
          <v-text-field v-model="skillName" label="Skill"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" @click="addNewSkill"> Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      categories: [],
      selectedCategory: null,
      skillName: null,
      dialog: false,
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: ''
    };
  },
  created() {
    this.fetchCategories()
      .then(response => {
        this.categories = response.categories.map(c => {
          return {
            categoryName: c.name,
            categoryId: c._id
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions([
      'fetchCategories',
      'fetchAllSkills',
      'addSkill',
      'toggleSnackbar'
    ]),
    addNewSkill() {
      console.log(this.selectedCategory);
      this.addSkill({
        name: this.skillName,
        categoryId: this.selectedCategory.categoryId,
        categoryName: this.selectedCategory.categoryName
      })
        .then(() => {
          this.$refs.form.reset();
          this.toggleSnackbar({
            show: true,
            text: 'Skill added successfully',
            color: 'success'
          });
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
};
</script>

<style></style>
