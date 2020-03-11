<template>
  <div>
    <v-card-title
      >Active
      <span class="caption ml-2 grey--text">({{ categories.length }})</span>
      <v-spacer></v-spacer>
      <AdminAddCategoryDialog
        @newCategory="emitCategoryAdded"
      ></AdminAddCategoryDialog>
      <v-form>
        <v-text-field
          v-model="search"
          class="mb-5 mx-5"
          append-icon="mdi-magnify"
          label="Search active..."
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
              <v-icon small @click="showArchiveDialog(item)">
                mdi-archive
              </v-icon>
            </v-btn>
          </template>
          <span>Archive</span>
        </v-tooltip>
        <EditCategoryDialog
          :category="item"
          @update="updateCategory"
        ></EditCategoryDialog>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon small @click="openCategoryProfile(item._id)">
                mdi-open-in-new
              </v-icon>
            </v-btn>
          </template>
          <span>Category profile</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="archiveDialog" width="500" @input="v => v || close()">
      <v-card>
        <v-card-title class="headline" primary-title>
          Are you sure?
        </v-card-title>

        <v-card-text class="text-center">
          Are you sure you want to archive
          <strong>{{ selectedCategory.name }}</strong
          >? This action will also archive all skills under this category, thus
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
  </div>
</template>

<script>
import EditCategoryDialog from '../components/EditCategoryDialog';
import AdminAddCategoryDialog from '../components/AdminAddCategoryDialog';
import { mapActions } from 'vuex';
import { formatRelative } from 'date-fns';

export default {
  components: {
    EditCategoryDialog,
    AdminAddCategoryDialog
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
    showEditDialog(item) {
      this.selectedCategory = item;
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
    },
    updateCategory(i) {
      this.categories.forEach(e => {
        if (e._id === i.categoryId) {
          e.name = i.name;
        }
      });
    },
    openCategoryProfile(categoryId) {
      this.$router.push({
        name: 'category',
        params: { id: categoryId }
      });
    },
    emitCategoryAdded(item) {
      this.$emit('newCategory', item);
    }
  }
};
</script>

<style></style>
