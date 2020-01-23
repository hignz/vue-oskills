<template>
  <v-container v-if="loaded" fluid>
    <v-card>
      <v-card-title>
        Skill list
        <v-spacer></v-spacer>
        <AddSkillDialog :skill-categories="skillCategories" />
        <v-form>
          <v-text-field
            v-model="searchTerm"
            class="mb-5 ml-5"
            prepend-inner-icon="mdi-magnify"
            label="Search skills..."
            single-line
            clearable
            hide-details
          ></v-text-field>
        </v-form>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="user.skills"
        sort-by="rating"
        :search="searchTerm"
        no-results-text="No matching skills found"
        :sort-desc="true"
      >
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="showDeleteDialog(item)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="openSkillProfile(item.skillId)">
                  mdi-file-star-outline
                </v-icon>
              </v-btn>
            </template>
            <span>Skill profile</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-dialog v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title class="headline" primary-title>
            Are you sure?
          </v-card-title>

          <v-card-text>
            <v-data-table
              v-if="loaded"
              class="mb-4"
              :headers="[
                {
                  text: 'Skill',
                  align: 'center',
                  value: 'name'
                },
                { text: 'Rating', value: 'rating', align: 'center' },
                { text: 'Esteem', value: 'esteem', align: 'center' },
                { text: 'Category', value: 'categoryName', align: 'left' }
              ]"
              :items="[selectedSkill]"
              hide-default-footer
            >
            </v-data-table>
            Are you sure you want to delete {{ selectedSkill.name }}? This
            action is irreversible, all esteem gained will be lost.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary" text @click="deleteDialog = false">
              Close
            </v-btn>
            <div class="flex-grow-1"></div>
            <v-btn color="error" text @click="deleteSkill()">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="showSnackbar" color="success">
        {{ snackbarText }}
        <v-btn color="white" text @click="showSnackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddSkillDialog from '../components/AddSkillDialog';

export default {
  components: {
    AddSkillDialog
  },
  data() {
    return {
      loaded: false,
      deleteDialog: false,
      selectedSkill: {},
      headers: [
        {
          text: 'Skill',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Esteem', value: 'esteem', align: 'center' },
        { text: 'Esteem Points', value: 'rating', align: 'center' },
        { text: 'Category', value: 'categoryName', align: 'center' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ],
      showSnackbar: false,
      snackbarText: '',
      searchTerm: '',
      skillCategories: []
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.fetchUserSkills()
      .then(() => {
        this.initialize();
        this.loaded = true;
      })
      .catch(err => console.log(err));

    this.fetchCategories()
      .then(res => {
        this.skillCategories = res.categories;
      })
      .catch(err => console.log(err));
  },
  methods: {
    ...mapActions(['fetchUserSkills', 'fetchCategories', 'fetchDeleteSkill']),
    initialize() {},
    showDeleteDialog(item) {
      this.selectedSkill = item;
      this.deleteDialog = true;
    },
    deleteSkill() {
      this.fetchDeleteSkill(this.selectedSkill._id)
        .then(() => {
          this.deleteDialog = false;
          this.showSnackbar = true;
          this.snackbarText = 'Skill deleted!';
        })
        .catch(err => console.log(err));
    },
    openSkillProfile(skillId) {
      this.$router.push({
        name: 'skillProfile',
        params: { id: skillId }
      });
    }
  }
};
</script>

<style></style>
