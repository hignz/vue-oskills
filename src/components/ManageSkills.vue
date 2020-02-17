<template>
  <div>
    <v-card flat>
      <v-card-title
        >Active
        <span class="caption ml-2 grey--text">({{ skills.length }})</span>
        <v-spacer></v-spacer>
        <v-form>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search active skills..."
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
      >
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon text v-on="on">
                <v-icon small @click="showUnarchivedDialog(item)">
                  mdi-archive
                </v-icon>
              </v-btn>
            </template>
            <span>Archive</span>
          </v-tooltip>
          <EditSkillDialog
            :skill="item"
            @update="updateSkill"
          ></EditSkillDialog>
          <v-btn icon>
            <v-icon small @click="openSkillProfile(item._id)">
              mdi-star
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:item.dateAdded="{ item }">
          {{ formatRelative(new Date(item.dateAdded), Date.now()) }}
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
            Are you sure you want to archive
            <strong>{{ selectedSkill.name }}</strong
            >? Archived skills are no longer available to users, but can be
            unarchived at any time.
          </v-card-text>

          <v-data-table
            class="mb-4"
            disable-sort
            :headers="[
              {
                text: 'Skill',
                value: 'name',
                align: 'center'
              },
              { text: 'Category', value: 'category.name', align: 'center' },
              {
                text: 'Added',
                value: 'dateAdded',
                align: 'left'
              }
            ]"
            :items="[selectedSkill]"
            hide-default-footer
          >
            <template v-slot:item.dateAdded="{ item }">
              {{ formatRelative(new Date(item.dateAdded), Date.now()) }}
            </template>
          </v-data-table>

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
import { formatRelative, lightFormat } from 'date-fns';
import EditSkillDialog from './EditSkillDialog';

export default {
  components: {
    EditSkillDialog
  },
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
        { text: 'Added', value: 'dateAdded' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ],
      selectedSkill: {},
      unArchivedDialog: false,
      formatRelative,
      lightFormat
    };
  },
  methods: {
    ...mapActions(['archiveSkill', 'toggleSnackbar']),
    showUnarchivedDialog(item) {
      this.selectedSkill = item;
      this.unArchivedDialog = true;
    },
    dateJoined(date) {
      return lightFormat(new Date(date), 'dd-MM-yyyy');
    },
    doArchiveSkill() {
      this.archiveSkill(this.selectedSkill._id).then(res => {
        this.toggleSnackbar({
          show: true,
          color: 'success',
          text: res.message
        });

        this.selectedSkill.dateArchived = Date.now();
        this.$emit('archive', this.selectedSkill);
        this.closeDialog();
      });
    },
    closeDialog() {
      this.unArchivedDialog = !this.unArchivedDialog;
    },
    updateSkill(e) {
      this.skills.forEach(s => {
        if (s._id === e.skillId) {
          s.name = e.name;
          s.category.name = e.categoryName;
        }
      });
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
