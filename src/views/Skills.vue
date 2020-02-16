<template>
  <v-container v-if="loaded" fluid>
    <v-card>
      <v-card-title>
        My skills
        <v-spacer></v-spacer>
        <AddSkillDialog />
        <v-form>
          <v-text-field
            v-model="searchTerm"
            class="mb-5 mx-5"
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
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="showDeleteDialog(item)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="openSkillProfile(item.skill._id)">
                  mdi-open-in-new
                </v-icon>
              </v-btn>
            </template>
            <span>Open</span>
          </v-tooltip>
        </template>
        <template v-slot:item.esteem="{ item }">
          <EsteemBadge :esteem="item.esteem" />
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
              disable-sort
              :headers="[
                {
                  text: 'Skill',
                  align: 'left',
                  value: 'skill.name'
                },
                { text: 'Esteem', value: 'esteem', align: 'center' },
                { text: 'Esteem Points', value: 'rating', align: 'center' },
                {
                  text: 'Category',
                  value: 'skill.category.name',
                  align: 'left'
                }
              ]"
              :items="[selectedSkill]"
              hide-default-footer
            >
              <template v-slot:item.esteem="{ item }">
                <EsteemBadge :esteem="item.esteem" />
              </template>
            </v-data-table>
            Are you sure you want to delete {{ selectedSkill.name }}? This
            action is irreversible, all esteem gained will be lost.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
            <v-btn text @click="deleteDialog = false">
              Close
            </v-btn>
            <v-btn color="error" @click="deleteSkill()">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddSkillDialog from '../components/AddSkillDialog';
import EsteemBadge from '../components/EsteemBadge';

export default {
  components: {
    AddSkillDialog,
    EsteemBadge
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
          value: 'skill.name'
        },
        { text: 'Esteem', value: 'esteem', align: 'left' },
        { text: 'Esteem Points', value: 'rating', align: 'left' },
        { text: 'Category', value: 'skill.category.name', align: 'left' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ],
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
  },
  methods: {
    ...mapActions([
      'fetchUserSkills',
      'fetchCategoriesArchived',
      'fetchDeleteSkill',
      'toggleSnackbar'
    ]),
    initialize() {},
    showDeleteDialog(item) {
      this.selectedSkill = item;
      this.deleteDialog = true;
    },
    deleteSkill() {
      this.fetchDeleteSkill(this.selectedSkill._id)
        .then(() => {
          this.deleteDialog = false;
          this.toggleSnackbar({
            show: true,
            text: 'Skill deleted!',
            color: 'success'
          });
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

<style>
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
  background: #363b46;
}
</style>
