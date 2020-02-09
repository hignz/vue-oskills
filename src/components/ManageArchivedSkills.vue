<template>
  <v-card flat>
    <v-card-title
      >Archived <span class="caption ml-2">({{ skills.length }})</span>
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
      no-data-text="No archived skills loaded"
      no-results-text="No archived skills found"
      multi-sort
    >
      <template v-slot:item.dateArchived="{ item }">
        {{ formatRelative(new Date(item.dateArchived), Date.now()) }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon small @click="showArchivedDialog(item)">
                mdi-archive-arrow-up
              </v-icon>
            </v-btn>
          </template>
          <span>Unarchive</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="archivedDialog" width="500" @input="v => v || close()">
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
              { text: 'Category', value: 'categoryName', align: 'left' }
            ]"
            :items="[selectedSkill]"
            hide-default-footer
          >
          </v-data-table>
          Are you sure you want to unarchive {{ selectedSkill.name }}?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="error" @click="doUnarchiveSkill()">
            Unarchive
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { formatRelative } from 'date-fns';

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
        { text: 'Archived', value: 'dateArchived' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ],
      selectedSkill: {},
      archivedDialog: false,
      formatRelative
    };
  },
  computed: {
    archivedSkills() {
      return this.skills;
    }
  },
  methods: {
    ...mapActions(['unarchiveSkill', 'toggleSnackbar']),
    doUnarchiveSkill() {
      this.unarchiveSkill(this.selectedSkill._id).then(res => {
        console.log(this.selectedSkill);

        this.toggleSnackbar({
          show: true,
          color: 'success',
          text: res.message
        });

        this.$emit('unarchive', this.selectedSkill);
        this.closeDialog();
      });
    },
    showArchivedDialog(item) {
      this.selectedSkill = item;
      this.archivedDialog = true;
    },
    closeDialog() {
      this.archivedDialog = !this.archivedDialog;
    }
  }
};
</script>

<style></style>
