<template>
  <v-card flat>
    <v-card-title
      >Active <span class="caption ml-2">({{ categories.length }})</span>
      <v-spacer></v-spacer>
      <EditCategoryDialog></EditCategoryDialog>
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
      :headers="headers"
      :items="categories"
      :search="search"
      no-data-text="No categories loaded"
      no-results-text="No categories found"
    >
      <template v-slot:item.dateAdded="{ item }">
        {{ formatRelative(new Date(item.dateAdded), Date.now()) }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon small @click="showEditDialog(item)">
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon small @click="showArchiveDialog(item)">
                mdi-archive
              </v-icon>
            </v-btn>
          </template>
          <span>Archive</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="archiveDialog" width="500" @input="v => v || close()">
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
                text: 'Name',
                align: 'left',
                value: 'name'
              }
            ]"
            :items="[selectedCategory]"
            hide-default-footer
          >
          </v-data-table>
          Are you sure you want to archive {{ selectedCategory.name }}? This
          action will also archive all skills under this category, thus
          rendering them unavailable to users.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="error" @click="doArchiveCategory()">
            Archive
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import EditCategoryDialog from '../components/EditCategoryDialog';
import { mapActions } from 'vuex';
import { formatRelative } from 'date-fns';

export default {
  components: {
    EditCategoryDialog
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Added', value: 'dateAdded' },
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          align: 'center'
        }
      ],
      archiveDialog: false,
      selectedCategory: {},
      formatRelative
    };
  },
  methods: {
    ...mapActions(['archiveCategory', 'toggleSnackbar']),
    showArchiveDialog(item) {
      this.selectedCategory = item;
      this.archiveDialog = true;
    },
    doArchiveCategory() {
      this.archiveCategory(this.selectedCategory._id).then(res => {
        this.toggleSnackbar({
          show: true,
          color: 'success',
          text: res.message
        });

        this.selectedCategory.dateArchived = Date.now();
        this.$emit('archive', this.selectedCategory);
        this.closeDialog();
      });
    },
    closeDialog() {
      this.archiveDialog = !this.archiveDialog;
    }
  }
};
</script>

<style></style>
