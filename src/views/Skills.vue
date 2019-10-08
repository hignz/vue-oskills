<template>
  <v-container v-if="loaded">
    <v-data-table
      :headers="headers"
      :items="skills"
      sort-by="rating"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Skill List</v-toolbar-title>
          <v-spacer></v-spacer>
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
          Confirm deletion
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
              { text: 'Esteem', value: 'esteem', align: 'center' }
            ]"
            :items="[selectedSkill]"
            hide-default-footer
          >
          </v-data-table>
          Are you sure you want to delete {{ selectedSkill.name }}? This action
          is irreversible, all esteem gained will be lost.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="deleteDialog = false">
            Close
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="deleteSkill()">
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
      ],
      showSnackbar: false,
      snackbarText: ''
    };
  },
  computed: {
    ...mapGetters(['skills'])
  },
  created() {
    this.$store
      .dispatch('fetchSkills')
      .then(() => {
        this.initialize();
        this.loaded = true;
      })
      .catch(err => console.log(err));
  },
  methods: {
    initialize() {},

    showDeleteDialog(item) {
      this.selectedSkill = item;
      this.deleteDialog = true;
    },
    deleteSkill() {
      this.$store
        .dispatch('fetchDeleteSkill', this.selectedSkill.skillId)
        .then(() => {
          this.deleteDialog = false;
          this.showSnackbar = true;
          this.snackbarText = 'Skill deleted!';
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
