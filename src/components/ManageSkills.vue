<template>
  <div>
    <v-card>
      <v-card-title
        >Skills ({{ skills.length }})
        <v-spacer></v-spacer>
        <v-form>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            clearable
            hide-details
          ></v-text-field>
        </v-form>
      </v-card-title>

      <v-data-table
        v-if="skills"
        :headers="headers"
        :items="skills"
        :items-per-page="10"
        :search="search"
        no-data-text="No skills loaded"
        no-results-text="No skills found"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="showUnarchivedDialog(item)">
                  mdi-archive
                </v-icon>
              </v-btn>
            </template>
            <span>Archive</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-dialog
        v-model="unArchivedDialog"
        width="500"
        @input="v => v || close()"
      >
        <v-card>
          <v-card-title class="headline" primary-title>
            Are you sure?
          </v-card-title>

          <v-card-text>
            <v-data-table
              class="mb-4"
              disable-sort
              :headers="[
                {
                  text: 'Skill',
                  align: 'center',
                  value: 'name'
                },
                { text: 'Category', value: 'category.name', align: 'left' }
              ]"
              :items="[selectedSkill]"
              hide-default-footer
            >
            </v-data-table>
            Are you sure you want to archive {{ selectedSkill.name }}? Archived
            skills are no longer available to users, but can be unarchived at
            any time.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
            <v-btn text @click="closeDialog()">
              Close
            </v-btn>
            <v-btn color="error" @click="doArchiveSkill()">
              Archive
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    skills: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      search: '',
      loaded: false,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Category', value: 'category.name' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ],
      selectedSkill: {},
      unArchivedDialog: false
    };
  },
  methods: {
    ...mapActions(['archiveSkill', 'toggleSnackbar']),
    showUnarchivedDialog(item) {
      this.selectedSkill = item;
      this.unArchivedDialog = true;
    },
    doArchiveSkill() {
      this.archiveSkill(this.selectedSkill._id).then(res => {
        this.toggleSnackbar({
          show: true,
          color: 'success',
          text: res.message
        });

        this.$emit('archived', this.selectedSkill);
        this.closeDialog();
      });
    },
    closeDialog() {
      this.unArchivedDialog = !this.unArchivedDialog;
    }
  }
};
</script>

<style></style>
