<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="skills"
      sort-by="rating"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Skill List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <AddSkillDialog />
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small @click="showDeleteDialog(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>
          Delete skill
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete {{ selectedSkill.name }} ? This action
          is irreversible, all esteem gained will be lost.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="deleteDialog = false">
            Close
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="deleteDialog = false">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
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
        { text: 'Rating', value: 'rating', align: 'center' },
        { text: 'Esteem', value: 'esteem', align: 'center' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ]
    };
  },
  computed: {
    ...mapGetters(['skills'])
  },
  created() {
    this.$store
      .dispatch('fetchSkills')
      .then(response => {
        this.loaded = true;
        this.initialize();
      })
      .catch(err => console.log(err));
  },
  methods: {
    initialize() {},

    showDeleteDialog(item) {
      this.selectedSkill = item;
      this.deleteDialog = true;
    }
  }
};
</script>

<style></style>
