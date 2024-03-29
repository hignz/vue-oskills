<template>
  <v-dialog
    v-model="editSkillDialog"
    max-width="500"
    @input="v => v || close()"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-card-title class="mb-4">Edit Skill</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Name"
            :rules="requiredRules"
            prepend-icon="mdi-pencil"
            clearable
          ></v-text-field>
          <v-select
            v-model="category"
            label="Category"
            :items="skillCategories"
            item-text="text"
            item-value="value"
            prepend-icon="mdi-playlist-star"
            return-object
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close()">Close</v-btn>
          <v-btn color="success" :disabled="!valid" type="submit">Edit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import validationRules from '../mixins/validationRules';
import { mapActions } from 'vuex';
export default {
  mixins: [validationRules],
  props: {
    skill: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      valid: false,
      name: '',
      editSkillDialog: false,
      categories: [],
      category: {}
    };
  },
  computed: {
    skillCategories() {
      return this.categories.map(c => {
        return {
          text: c.name,
          value: c._id
        };
      });
    }
  },
  watch: {
    editSkillDialog(opened) {
      this.fetchCategories().then(res => {
        this.categories = res.categories;
      });
      if (opened) {
        this.name = this.skill.name;
        this.category = {
          text: this.skill.category.name,
          value: this.skill.category._id
        };
      }
    }
  },
  created() {},
  methods: {
    ...mapActions(['editSkill', 'toggleSnackbar', 'fetchCategories']),
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.editSkill({
          skillId: this.skill._id,
          name: this.name,
          categoryId: this.category.value
        }).then(() => {
          this.toggleSnackbar({
            show: true,
            text: 'Skill has been edited',
            color: 'success'
          });
          this.$emit('update', {
            skillId: this.skill._id,
            categoryName: this.category.text,
            name: this.name
          });
          this.close();
        });
      }
    },
    close() {
      this.$refs.form.reset();
      this.editSkillDialog = !this.editSkillDialog;
    }
  }
};
</script>

<style></style>
